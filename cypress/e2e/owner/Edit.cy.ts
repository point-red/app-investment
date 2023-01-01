/// <reference types="cypress"/>

import { useAuthStore } from "@/stores/auth";
import { useOwnersStore } from "@/stores/owner";
import { Owner } from "@/types/Owner";
import { setActivePinia, createPinia } from "pinia";

describe("Create Owners", () => {
  let authStore: any,
    ownersStore: any = null;
  beforeEach(() => {
    cy.visit("http://localhost:3000/owner");
    cy.viewport("macbook-16");

    setActivePinia(createPinia());

    authStore = useAuthStore();
    ownersStore = useOwnersStore();
    ownersStore.setOwners([]);
    authStore.setPermissions([]);
  });

  it("try to edit some data", () => {
    authStore.setPermissions(["update owner"]);

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
        cy.get('[data-cy="btn-edit"]')
          .click()
          .then(() => {
            cy.url().should("include", `/edit/${ownerDummy.id}`);
          });
      });

    const updateOwnerDummy: Owner = {
      id: "1",
      firstName: "First name update",
      lastName: "Last name update",
      email: "example@mail.com",
      phone: "62834342342",
    };

    const { firstName, lastName, email, phone } = updateOwnerDummy;

    cy.get('input[name="firstName"]').clear().type(firstName);
    cy.get('input[name="lastName"]').clear().type(lastName);
    cy.get('input[name="email"]').clear().type(email);
    cy.get('input[name="phone"]').clear().type(phone);

    cy.get('[data-cy="btn-save"]')
      .click()
      .then(() => {
        ownersStore.updateOwner(ownerDummy.id, updateOwnerDummy);
        // check data is stored
        cy.wrap(ownersStore)
          .its("owners")
          .should("not.be.empty")
          .and("include", updateOwnerDummy);
      });
  });

  it("remove owner", () => {
    authStore.setPermissions(["delete owner"]);
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
        cy.get('[data-cy="btn-remove"]').click();
      });

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

    ownersStore.deleteItem(ownerDummy.id);

    cy.wrap(ownersStore).its("owners").should("be.empty");
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

    cy.get('button[data-cy="btn-setting"]')
      .click()
      .then(() => {
        cy.get('[data-cy="btn-remove"]').click();
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
    authStore.setPermissions(["read owner"]);
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
        cy.get('[data-cy="btn-remove"]').click();
      });

    //block
    cy.get("[data-cy='alert-request']").should("exist", true);
    cy.get('[data-cy="btn-request"]')
      .click()
      .then(() => {
        cy.get("[data-cy='alert-form-request']").should("exist", true);
        cy.get("[data-cy='form-request']");
        cy.get('[name="noteRequest"]').clear().type("notes for request");
      });

    cy.get('[data-cy="btn-send"]')
      .click()
      .then(() => {
        cy.wrap(ownersStore)
          .its("owners")
          .should("not.be.empty")
          .and("include", ownerDummy);

        cy.get("[data-cy='alert-request']").should("exist", false);
      });
  });
});
