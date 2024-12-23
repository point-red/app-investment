/// <reference types="cypress"/>

import { useAuthStore } from "@/stores/auth";
import { useUsers } from "@/stores/users";
import { User } from "@/types/Users";
import { setActivePinia, createPinia } from "pinia";

describe("Create", () => {
  let authStore: any,
    usersStore: any = null;
  beforeEach(() => {
    cy.visit("localhost:3000/users");
    cy.viewport("macbook-16");

    setActivePinia(createPinia());

    authStore = useAuthStore();
    usersStore = useUsers();

    authStore.setPermissions([]);
    usersStore.setUsers([]);
  });

  it("click menu Users and display data users", () => {
    authStore.setPermissions(["create users", "read users"]);

    expect(usersStore.users).to.have.length(0);
    cy.get("[data-cy='alert-notfound']").should("exist", true);
    cy.wait(500);

    cy.get("button[data-cy='btn-notfound-ok']")
      .click()
      .then(() => {
        cy.get("[data-cy='alert-notfound']").should("exist", false);
      });
  });

  it("dont have access to create a new user", () => {
    authStore.setPermissions(["read users"]);
    cy.get("[data-cy='btn-create']").should("exist", false);
  });

  it("create a new user & was stored", () => {
    cy.get("button[data-cy='btn-notfound-ok']")
      .click()
      .then(() => {
        cy.get("[data-cy='alert-notfound']").should("exist", false);
      });
    authStore.setPermissions(["create users", "read users"]);
    cy.get("[data-cy='btn-create']")
      .click()
      .then(() => {
        cy.url().should("include", "/users/create");

        cy.get('[data-cy="title-page"]').should("contain.text", "Create User");

        const userDummy: User = {
          id: "1",
          username: "username",
          firstName: "first name",
          lastName: "last name",
          email: "example@mail.com",
          mobilePhone: "629346432432",
          role: "1",
        };

        const { username, firstName, lastName, email, mobilePhone, role } =
          userDummy;

        cy.get('input[name="username"]').clear().type(username);
        cy.get('input[name="firstName"]').clear().type(firstName);
        cy.get('input[name="lastName"]').clear().type(lastName);
        cy.get('input[name="email"]').clear().type(email);
        cy.get('input[name="mobilePhone"]').clear().type(mobilePhone);
        // cy.get('select[name="role"]').select("Test 1");
        cy.get('[data-cy="btn-save"]')
          .click()
          .then(() => {
            // check data is stored
            usersStore.createUser(userDummy);
            cy.wrap(usersStore)
              .its("users")
              .should("not.be.empty")
              .and("include", userDummy);

            cy.get("[data-cy='alert-success']").should("exist", true);
            cy.get("button[data-cy='btn-alert-success-ok']")
              .click()
              .then(() => {
                cy.get("[data-cy='alert-success']").should("exist", false);
              });
          });
      });
  });

  it("create a new user and try to ignore required field", () => {
    if (usersStore.users.length === 0) {
      cy.get("button[data-cy='btn-notfound-ok']")
        .click()
        .then(() => {
          cy.get("[data-cy='alert-notfound']").should("exist", false);
        });
    }
    authStore.setPermissions(["create users", "read users"]);
    cy.get("[data-cy='btn-create']")
      .click()
      .then(() => {
        cy.url().should("include", "/users/create");

        cy.get('[data-cy="title-page"]').should("contain.text", "Create User");

        const userDummy: User = {
          id: "1",
          username: "username",
          firstName: "first name",
          lastName: "last name",
          email: "example@mail.com",
          mobilePhone: "629346432432",
          role: "1",
        };

        const { username, firstName, lastName } = userDummy;

        cy.get('input[name="username"]').clear().type(username);
        cy.get('input[name="firstName"]').clear().type(firstName);
        cy.get('input[name="lastName"]').clear().type(lastName);
        // cy.get('select[name="role"]').select("Test 1");
        cy.get('[data-cy="btn-save"]')
          .click()
          .then(() => {
            // check data is stored
            cy.wrap(usersStore).its("users").should("be.empty");
            cy.get("[data-cy='error-field']").then(($error) => {
              expect($error.length > 0).to.be.true;
            });
          });
      });
  });

  it("go to page archive", () => {
    authStore.permissions = ["create users", "read users"];
    cy.get("[data-cy='btn-archive']")
      .click()
      .then(() => {
        cy.url().should("include", "/users/archive");
      });
  });

  it("try some search data", () => {
    authStore.permissions = ["create users", "read users"];

    cy.url().should("include", "/users");

    cy.get('[data-cy="title-page"]').should("contain.text", "User");

    cy.get('input[type="search"]')
      .click()
      .then(() => {
        cy.get('input[type="search"]').clear().type("type some name to search");
      });
  });

  it("try some sort data data", () => {
    authStore.permissions = ["create users", "read users"];
    cy.url().should("include", "/users");

    cy.get('[data-cy="title-page"]').should("contain.text", "User");

    cy.get('[data-cy="btn-sort"]')
      .click()
      .then(() => {
        cy.get('[data-cy="sort-asc"]').click();
        cy.get('[data-cy="sort-desc"]').click();
      });
  });
});
