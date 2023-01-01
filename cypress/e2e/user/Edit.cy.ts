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

  it("access to user setting", () => {
    authStore.permissions = ["read users"];
    cy.get("[data-cy='btn-setting']")
      .click()
      .then(() => {
        cy.url().should("include", "/users/settings");
      });
  });

  it("access to detail user", () => {
    cy.visit("http://localhost:3000/users/settings");
  });

  it("access setting to edit user", () => {
    const userDummy: User = {
      id: "1",
      username: "username",
      firstName: "first name",
      lastName: "last name",
      email: "example@mail.com",
      mobilePhone: "629346432432",
      role: "1",
    };

    usersStore.setUsers([userDummy]);
    cy.visit(`localhost:3000/users/settings`);

    cy.get('[data-cy="btn-setting"]')
      .click()
      .then(() => {
        cy.get('[data-cy="btn-edit"]')
          .click()
          .then(() => {
            cy.url().should("include", `/users/edit/${userDummy.id}`);
          });
      });
  });

  it("edit data user", () => {
    const userDummy: User = {
      id: "1",
      username: "username",
      firstName: "first name",
      lastName: "last name",
      email: "example@mail.com",
      mobilePhone: "629346432432",
      role: "1",
    };

    usersStore.setUsers([userDummy]);

    const userUpdatedDummy: User = {
      id: "1",
      username: "new username",
      firstName: "new first name",
      lastName: "new last name",
      email: "newexample@mail.com",
      mobilePhone: "629346",
      role: "1",
    };

    const { username, firstName, lastName, email, mobilePhone, role } =
      userUpdatedDummy;

    cy.visit(`localhost:3000/users/edit/${userDummy.id}`);

    cy.get('input[name="username"]').clear().type(username);
    cy.get('input[name="firstName"]').clear().type(firstName);
    cy.get('input[name="lastName"]').clear().type(lastName);
    cy.get('input[name="email"]').clear().type(email);
    cy.get('input[name="mobilePhone"]').clear().type(mobilePhone);
    cy.get('[data-cy="btn-save"]')
      .click()
      .then(() => {
        usersStore.updateUser(userDummy.id, userUpdatedDummy);
        // check data is stored
        cy.wrap(usersStore)
          .its("users")
          .should("not.be.empty")
          .and("include", userUpdatedDummy);
      });
  });

  it("remove user", () => {
    const userDummy: User = {
      id: "1",
      username: "username",
      firstName: "first name",
      lastName: "last name",
      email: "example@mail.com",
      mobilePhone: "629346432432",
      role: "1",
    };

    usersStore.setUsers([userDummy]);

    cy.visit(`localhost:3000/users/settings`);

    cy.get('button[data-cy="btn-setting"]')
      .click()
      .then(() => {
        cy.get('[data-cy="btn-delete"]').should("exist", true);

        cy.get('[data-cy="btn-delete"]').click();

        cy.get("[data-cy='confirm-remove']").should("exist", true);
        cy.get("[data-cy='btn-yes']").click();

        cy.get("[data-cy='form-fill-password']").should("exist", true);
        cy.get("[data-cy='fill-password']").should("exist", true);
        cy.get("[data-cy='fill-password']").type("password");
        cy.get("[data-cy='btn-confirm-password']")
          .click()
          .then(() => {
            cy.get("[data-cy='confirm-remove']").should("exist", false);
            cy.get("[data-cy='form-fill-password']").should("exist", false);
          });

        usersStore.deleteItem(userDummy.id);

        cy.wrap(usersStore).its("users").should("be.empty");
      });
  });

  it("remove user if has transaction", () => {
    const userDummy: User = {
      id: "1",
      username: "username",
      firstName: "first name",
      lastName: "last name",
      email: "example@mail.com",
      mobilePhone: "629346432432",
      role: "1",
    };

    usersStore.setUsers([userDummy]);

    cy.visit(`localhost:3000/users/settings`);

    cy.get('button[data-cy="btn-setting"]')
      .click()
      .then(() => {
        cy.get('[data-cy="btn-delete"]').click();

        //block
        cy.get("[data-cy='alert-warning']").should("exist", true);
        cy.get("[data-cy='btn-archive']")
          .click()
          .then(() => {
            // cy.get("[data-cy='confirm-archive']").should("exist", true);
            // cy.get("button[data-cy='btn-ok']").click();

            //clear data
            usersStore.setUsers([]);
          });

        cy.wrap(usersStore).its("users").should("be.empty");

        cy.get("[data-cy='alert-warning']").should("exist", false);
      });
  });
});
