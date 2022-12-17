/// <reference types="cypress"/>

import { describe, it } from "vitest";
import { useAuthStore } from "@/stores/auth";
import { useUsers } from "@/stores/users";
import { User } from "@/types/Users";

describe("Create", () => {
  beforeEach(() => {
    cy.visit("localhost:3000/users");
  });

  const authStore = useAuthStore();
  const usersStore = useUsers();

  it("have access to dashboard & have menu Users", () => {
    authStore.permissions = ["create users", "read users", "dashboard"];
    cy.get("a").contains("Users");
  });

  it("click menu Users and display data users", () => {
    usersStore.users = [];
    authStore.permissions = ["create users", "read users"];
    cy.get("a").contains("Users").click();

    expect(usersStore.users).to.have.length(0);
    cy.get("[data-cy='alert-notfound']").should("exist", true);

    cy.get("button[data-cy='btn-ok']").click();
    expect("button[data-cy='btn-ok']").to.have.been.called;
    cy.get("[data-cy='alert-notfound']").should("exist", false);
  });

  it("dont have access to create a new user", () => {
    authStore.permissions = ["read users"];
    cy.get("button[data-cy='btn-create']").should("not.be.visible");
  });

  it("create a new user & was stored", () => {
    authStore.permissions = ["create users", "read users"];
    cy.get("button[data-cy='btn-create']")
      .click()
      .then(() => {
        cy.url().should("include", "/users/create");

        cy.get('[data-cy="title-page"]').should(
          "contain.text",
          "New Users Detail"
        );

        const userDummy: User = {
          id: "1",
          username: "username",
          firstName: "first name",
          lastName: "last name",
          email: "example@mail.com",
          mobilePhone: "629346432432",
          role: {
            id: "1",
            roleName: "roleName",
            createdAt: new Date().toLocaleDateString(),
          },
        };

        const { username, firstName, lastName, email, mobilePhone, role } =
          userDummy;

        cy.get('form > input[name="username"]').clear().type(username);
        cy.get('form > input[name="firstName"]').clear().type(firstName);
        cy.get('form > input[name="lastName"]').clear().type(lastName);
        cy.get('form > input[name="email"]').clear().type(email);
        cy.get('form > input[name="mobilePhone"]').clear().type(mobilePhone);
        cy.get('form > input[name="role"]').clear().type(role.id);
        cy.get('[data-cy="btn-save"]').click();

        expect('[data-cy="btn-save"]').to.have.been.called;

        // check data is stored
        usersStore.createUser(userDummy);
        cy.wrap(usersStore)
          .its("users")
          .should("not.be.empty")
          .and("include", userDummy);

        cy.get("[data-cy='alert-success']").should("exist", true);
        cy.get("button[data-cy='btn-ok']").click();
        expect("button[data-cy='btn-ok']").to.have.been.called;
        cy.get("[data-cy='alert-success']").should("exist", false);
      });
  });

  it("create a new user and try to ignore required field", () => {
    authStore.permissions = ["create users", "read users"];
    cy.get("a")
      .contains("Invite User")
      .click()
      .then(() => {
        cy.url().should("include", "/users/create");

        cy.get('[data-cy="title-page"]').should(
          "contain.text",
          "New Users Detail"
        );

        const userDummy: User = {
          id: "1",
          username: "username",
          firstName: "first name",
          lastName: "last name",
          email: "example@mail.com",
          mobilePhone: "629346432432",
          role: {
            id: "1",
            roleName: "roleName",
            createdAt: new Date().toLocaleDateString(),
          },
        };

        const { username, firstName, lastName, email, mobilePhone, role } =
          userDummy;

        cy.get('form > input[name="username"]').clear().type(username);
        cy.get('form > input[name="firstName"]').clear().type(firstName);
        cy.get('form > input[name="lastName"]').clear().type(lastName);

        cy.get('[data-cy="btn-save"]').click();

        expect('[data-cy="btn-save"]').to.have.been.called;

        // check data shouldnt be stored
        cy.wrap(usersStore).its("users").should("be.empty");

        cy.get("span[data-cy='error-field']").then(($error) => {
          expect($error.length > 0).to.be.true;
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
    cy.get("a")
      .contains("Users")
      .click()
      .then(() => {
        cy.url().should("include", "/users");

        cy.get('[data-cy="title-page"]').should("contain.text", "Users");
      });

    cy.get('input[type="search"]')
      .click()
      .then(() => {
        cy.get('input[type="search"]')
          .clear()
          .type("type some name to search")
          .then(() => {
            expect("table").should("contain.text", "type some name to search");
          });
      });
  });

  it("try some sort data data", () => {
    authStore.permissions = ["create users", "read users"];
    cy.get("a")
      .contains("Users")
      .click()
      .then(() => {
        cy.url().should("include", "/users");

        cy.get('[data-cy="title-page"]').should("contain.text", "Users");
      });

    cy.get('button[data-cy="btn-sort"]')
      .click()
      .then(() => {
        cy.get('[data-cy="sort-asc"]').click();
        expect('[data-cy="sort-asc"]').to.have.been.called;
        cy.get('[data-cy="sort-desc"]').click();
        expect('[data-cy="sort-desc"]').to.have.been.called;
      });
  });
});
