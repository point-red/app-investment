/// <reference types="cypress"/>

import { describe, it } from "vitest";
import { useAuthStore } from "@/stores/auth";
import { useOwnersStore } from "@/stores/owner";
import { Owner } from "@/types/Owner";

describe("Create", () => {
  beforeEach(() => {
    cy.visit("localhost:3000/owners");
  });

  const authStore = useAuthStore();
  const ownersStore = useOwnersStore();

  it("try to edit some data", () => {
    authStore.permissions = ["update owners"];

    const ownerDummy: Owner = {
      id: "1",
      firstName: "First name",
      lastName: "Last name",
      email: "example@mail.com",
      phone: "62834342342",
    };

    ownersStore.setOwners([ownerDummy]);

    cy.get('button[data-cy="btn-setting"]')
      .click()
      .then(() => {
        cy.get('[data-cy="btn-edit"]').click();
        expect('[data-cy="btn-edit"]').to.have.been.called;
        cy.url().should("include", `/owners/edit/${ownerDummy.id}`);
      });

    const updateOwnerDummy: Owner = {
      id: "1",
      firstName: "First name update",
      lastName: "Last name update",
      email: "example@mail.com",
      phone: "62834342342",
    };

    const { firstName, lastName, email, phone } = updateOwnerDummy;

    cy.get('form > input[name="firstName"]').clear().type(firstName);
    cy.get('form > input[name="lastName"]').clear().type(lastName);
    cy.get('form > input[name="email"]').clear().type(email);
    cy.get('form > input[name="phone"]').clear().type(phone);

    cy.get('[data-cy="btn-save"]').click();

    expect('[data-cy="btn-save"]').to.have.been.called;

    ownersStore.updateOwner(ownerDummy.id, updateOwnerDummy);
    // check data is stored
    cy.wrap(ownersStore)
      .its("owners")
      .should("not.be.empty")
      .and("include", updateOwnerDummy);
  });

  it("remove owner", () => {
    authStore.permissions = ["delete owners"];
    const ownerDummy: Owner = {
      id: "1",
      firstName: "First name",
      lastName: "Last name",
      email: "example@mail.com",
      phone: "62834342342",
    };

    ownersStore.setOwners([ownerDummy]);

    cy.visit(`localhost:3000/owners/${ownerDummy.id}`);

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

    ownersStore.deleteItem(ownerDummy.id);

    cy.wrap(ownersStore).its("owners").should("be.empty");

    cy.get("[data-cy='alert-success']").should("exist", true);
    cy.get("button[data-cy='btn-ok']").click();
    cy.get("[data-cy='alert-success']").should("exist", false);
  });

  it("remove owner if had transaction", () => {
    authStore.permissions = ["delete owners"];
    const ownerDummy: Owner = {
      id: "1",
      firstName: "First name",
      lastName: "Last name",
      email: "example@mail.com",
      phone: "62834342342",
    };

    ownersStore.setOwners([ownerDummy]);

    cy.visit(`localhost:3000/owners/${ownerDummy.id}`);

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
        ownersStore.setOwners([]);
      });

    cy.wrap(ownersStore).its("owners").should("be.empty");

    cy.get("[data-cy='alert-warning']").should("exist", false);
  });

  it("removal request", () => {
    authStore.permissions = [];
    const ownerDummy: Owner = {
      id: "1",
      firstName: "First name",
      lastName: "Last name",
      email: "example@mail.com",
      phone: "62834342342",
    };

    ownersStore.setOwners([ownerDummy]);

    cy.visit(`localhost:3000/owners/${ownerDummy.id}`);

    cy.get('button[data-cy="btn-setting"]')
      .click()
      .then(() => {
        cy.get('[data-cy="btn-remove"]').click();
        expect('[data-cy="btn-remove"]').to.have.been.called;
      });

    //block
    cy.get("[data-cy='alert-request']").should("exist", true);
    cy.get("[data-cy='form-request']").clear().type("notes for request");
    cy.get('[data-cy="btn-send"]').click();
    expect('[data-cy="btn-send"]').to.have.been.called;

    cy.wrap(ownersStore)
      .its("owners")
      .should("not.be.empty")
      .and("include", ownerDummy);

    cy.get("[data-cy='alert-request']").should("exist", false);
  });
});
