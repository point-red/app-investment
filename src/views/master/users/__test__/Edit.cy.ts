/// <reference types="cypress"/>

import { describe, it } from "vitest";
import { useAuthStore } from "@/stores/auth";
import { useUsers } from "@/stores/users";
import { User } from "@/types/Users";

describe("Edit and Remove", () => {
  beforeEach(() => {
    cy.visit("localhost:3000/users");
  });

  const authStore = useAuthStore();
  const usersStore = useUsers();

  it("access to user setting", () => {
    authStore.permissions = ["read users"];
    cy.get("[data-cy='btn-setting']").click();
    expect('[data-cy="btn-setting"]').to.have.been.called;

    cy.url().should("include", "/users/settings");
  });

  it("access to detail user", () => {
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

    usersStore.setUsers([userDummy]);

    cy.get("[data-cy='btn-user-detail']").click();
    expect('[data-cy="btn-setting"]').to.have.been.called;
    cy.url().should("include", `/users/detail/${userDummy.id}`);
  });

  it("access setting to edit user", () => {
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

    usersStore.setUsers([userDummy]);
    cy.visit(`localhost:3000/users/detail/${userDummy.id}`);

    cy.get('button[data-cy="btn-setting"]')
      .click()
      .then(() => {
        cy.get('[data-cy="btn-edit"]').click();
        expect('[data-cy="btn-edit"]').to.have.been.called;
        cy.url().should("include", `/users/edit/${userDummy.id}`);
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
      role: {
        id: "1",
        roleName: "roleName",
        createdAt: new Date().toLocaleDateString(),
      },
    };

    usersStore.setUsers([userDummy]);

    const userUpdatedDummy: User = {
      id: "1",
      username: "new username",
      firstName: "new first name",
      lastName: "new last name",
      email: "newexample@mail.com",
      mobilePhone: "629346",
      role: {
        id: "2",
        roleName: "roleName",
        createdAt: new Date().toLocaleDateString(),
      },
    };

    const { username, firstName, lastName, email, mobilePhone, role } =
      userUpdatedDummy;

    cy.visit(`/users/edit/${userDummy.id}`);

    cy.get('form > input[name="username"]').clear().type(username);
    cy.get('form > input[name="firstName"]').clear().type(firstName);
    cy.get('form > input[name="lastName"]').clear().type(lastName);
    cy.get('form > input[name="email"]').clear().type(email);
    cy.get('form > input[name="mobilePhone"]').clear().type(mobilePhone);
    cy.get('form > input[name="role"]').clear().type(role.id);
    cy.get('[data-cy="btn-save"]').click();

    expect('[data-cy="btn-save"]').to.have.been.called;

    usersStore.updateUser(userDummy.id, userUpdatedDummy);
    // check data is stored
    cy.wrap(usersStore)
      .its("users")
      .should("not.be.empty")
      .and("include", userUpdatedDummy);
  });

  it("remove user", () => {
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

    usersStore.setUsers([userDummy]);

    cy.visit(`localhost:3000/users/detail/${userDummy.id}`);

    cy.get('button[data-cy="btn-setting"]')
      .click()
      .then(() => {
        cy.get('[data-cy="btn-remove"]').click();
        expect('[data-cy="btn-remove"]').to.have.been.called;
      });

    cy.get("[data-cy='confirm-remove']").should("exist", true);
    cy.get("button[data-cy='btn-yes']").click();
    cy.get("[data-cy='form-fill-password']").should("exist", true);
    cy.get("[data-cy='fill-password']").should("exist", true);
    cy.get("[data-cy='fill-password']").type("password");
    cy.get("button[data-cy='btn-confirm-password']")
      .click()
      .then(() => {
        cy.get("[data-cy='confirm-remove']").should("exist", false);
        cy.get("[data-cy='form-fill-password']").should("exist", false);
      });

    usersStore.deleteItem(userDummy.id);

    cy.wrap(usersStore).its("users").should("be.empty");

    cy.get("[data-cy='alert-success']").should("exist", true);
    cy.get("button[data-cy='btn-ok']").click();
    cy.get("[data-cy='alert-success']").should("exist", false);
  });

  it("remove user if has transaction", () => {
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

    usersStore.setUsers([userDummy]);

    cy.visit(`localhost:3000/users/detail/${userDummy.id}`);

    cy.get('button[data-cy="btn-setting"]')
      .click()
      .then(() => {
        cy.get('[data-cy="btn-remove"]').click();
        expect('[data-cy="btn-remove"]').to.have.been.called;
      });

    //block
    cy.get("[data-cy='alert-warning']").should("exist", true);
    cy.get("button[data-cy='btn-archive']")
      .click()
      .then(() => {
        cy.get("[data-cy='confirm-archive']").should("exist", true);
        cy.get("button[data-cy='btn-ok']").click();

        //clear data
        usersStore.setUsers([]);
      });

    cy.wrap(usersStore).its("users").should("be.empty");

    cy.get("[data-cy='alert-warning']").should("exist", false);
  });
});
