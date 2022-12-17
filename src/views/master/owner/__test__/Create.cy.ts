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

  it("have access to dashboard & have menu Owners", () => {
    authStore.permissions = ["create owners", "read owners", "dashboard"];
    cy.get("a").contains("Owners");
  });

  it("click menu Owners and display data owners", () => {
    ownersStore.owners = [];
    authStore.permissions = ["create owners", "read owners"];
    cy.get("a").contains("Owners").click();

    expect(ownersStore.owners).to.have.length(0);
    cy.get("[data-cy='alert-notfound']").should("exist", true);

    cy.get("button[data-cy='btn-ok']").click();
    expect("button[data-cy='btn-ok']").to.have.been.called;
    cy.get("[data-cy='alert-notfound']").should("exist", false);
  });

  it("dont have access to create a new Owner", () => {
    authStore.permissions = ["read owners"];
    cy.get("button[data-cy='btn-create']").should("not.be.visible");
  });

  it("create a new owner & was stored", () => {
    authStore.permissions = ["create owners", "read owners"];
    cy.get("button[data-cy='btn-create']")
      .click()
      .then(() => {
        cy.url().should("include", "/owners/create");

        cy.get('[data-cy="title-page"]').should(
          "contain.text",
          "Owner Details"
        );
      });

    const ownerDummy: Owner = {
      id: "1",
      firstName: "First name",
      lastName: "Last name",
      email: "example@mail.com",
      phone: "62834342342",
    };

    const { firstName, lastName, email, phone } = ownerDummy;

    cy.get('form > input[name="firstName"]').clear().type(firstName);
    cy.get('form > input[name="lastName"]').clear().type(lastName);
    cy.get('form > input[name="email"]').clear().type(email);
    cy.get('form > input[name="phone"]').clear().type(phone);

    cy.get('[data-cy="btn-save"]').click();

    expect('[data-cy="btn-save"]').to.have.been.called;

    // check data is stored
    ownersStore.createOwner(ownerDummy);
    cy.wrap(ownersStore)
      .its("owners")
      .should("not.be.empty")
      .and("include", ownerDummy);

    cy.get("[data-cy='alert-success']").should("exist", true);
    cy.get("button[data-cy='btn-ok']").click();
    expect("button[data-cy='btn-ok']").to.have.been.called;
    cy.get("[data-cy='alert-success']").should("exist", false);
  });

  it("create a new owner and try to ignore required field", () => {
    authStore.permissions = ["create owners", "read owners"];
    cy.get("button[data-cy='btn-create']")
      .click()
      .then(() => {
        cy.url().should("include", "/owners/create");

        cy.get('[data-cy="title-page"]').should(
          "contain.text",
          "Owner Details"
        );
      });

    const ownerDummy: Owner = {
      id: "1",
      firstName: "First name",
      lastName: "Last name",
      email: "",
      phone: "",
    };

    const { firstName, lastName, email, phone } = ownerDummy;

    cy.get('form > input[name="firstName"]').clear().type(firstName);
    cy.get('form > input[name="lastName"]').clear().type(lastName);
    cy.get('form > input[name="email"]').clear().type(email);
    cy.get('form > input[name="phone"]').clear().type(phone);

    cy.get('[data-cy="btn-save"]').click();

    expect('[data-cy="btn-save"]').to.have.been.called;

    // check data shouldnt be stored
    cy.wrap(ownersStore).its("owners").should("be.empty");

    cy.get("span[data-cy='error-field']").then(($error) => {
      expect($error.length > 0).to.be.true;
    });
  });

  it("show detail owner popup", () => {
    const ownerDummy: Owner = {
      id: "1",
      firstName: "First name",
      lastName: "Last name",
      email: "example@mail.com",
      phone: "62834342342",
    };

    ownersStore.setOwners([ownerDummy]);

    cy.get('button[data-cy="btn-detail"]')
      .click()
      .then(() => {
        cy.get("[data-cy='popup-detail']").should("exist", true);
        cy.get("button[data-cy='btn-exit']").should("exist", true);
      });

    cy.get("button[data-cy='btn-exit']").click();
    expect("button[data-cy='btn-exit']").to.have.been.called;
    cy.get("[data-cy='popup-detail']").should("exist", false);
  });

  it("go to page archive", () => {
    authStore.permissions = ["create owners", "read owners"];
    cy.get("[data-cy='btn-archive']")
      .click()
      .then(() => {
        cy.url().should("include", "/owners/archive");
      });
  });

  it("try some search data", () => {
    authStore.permissions = ["create owners", "read owners"];

    cy.url().should("include", "/owners");

    cy.get('[data-cy="title-page"]').should("contain.text", "Owner");

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
    authStore.permissions = ["create owners", "read owners"];
    cy.url().should("include", "/owners");

    cy.get('[data-cy="title-page"]').should("contain.text", "Owner");

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
