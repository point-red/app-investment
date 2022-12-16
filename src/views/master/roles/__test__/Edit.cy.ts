/// <reference types="cypress"/>

import { describe, it } from "vitest";
import { useAuthStore } from "@/stores/auth";

describe("Edit", () => {
  beforeEach(() => {
    cy.visit("localhost:3000/roles");
  });

  const authStore = useAuthStore();

  it("has access edit role", () => {
    authStore.permissions = ["create roles", "read roles", "edit roles"];
    cy.get("a")
      .contains("Roles")
      .click()
      .then(() => {
        cy.url().should("include", "/roles");

        cy.get('[data-cy="title-page"]').should("contain.text", "Roles");
      });

    cy.get("table").should("exist", true);

    cy.get('button[data-cy="btn-setting-data"]').should("exist", true);
  });

  it("edit role", () => {
    authStore.permissions = ["create roles", "read roles", "edit roles"];
    cy.get("a")
      .contains("Roles")
      .click()
      .then(() => {
        cy.url().should("include", "/roles");

        cy.get('[data-cy="title-page"]').should("contain.text", "Roles");
      });

    cy.get("table").should("exist", true);

    cy.get('button[data-cy="btn-setting-data"]')
      .click()
      .then(() => {
        cy.get('button[data-cy="btn-setting-edit"]').should("exist", true);

        cy.get('button[data-cy="btn-setting-edit"]')
          .click()
          .then(() => {
            cy.get('[data-cy="form-edit"]').should("exist", true);

            cy.get('[data-cy="btn-save"]').should("exist", true);
            // edit current data
            cy.get('form > input[name="name"]')
              .clear()
              .type("type some role name");
            cy.get('[data-cy="btn-save"]')
              .click()
              .then(() => {
                expect('[data-cy="btn-save"]').to.have.been.called;
                expect("table").should("contain.text", "type some role name");
              });
          });
      });
  });

  it("delete role", () => {
    authStore.permissions = [
      "create roles",
      "read roles",
      "edit roles",
      "delete roles",
    ];
    cy.get("a")
      .contains("Roles")
      .click()
      .then(() => {
        cy.url().should("include", "/roles");

        cy.get('[data-cy="title-page"]').should("contain.text", "Roles");
      });

    cy.get("table").should("exist", true);

    cy.get('button[data-cy="btn-setting-data"]')
      .click()
      .then(() => {
        cy.get('button[data-cy="btn-setting-delete"]').should("exist", true);

        cy.get('button[data-cy="btn-setting-delete"]')
          .click()
          .then(() => {
            cy.get('[alert-cy="delete-confirmation"]').should("exist", true);
            cy.get('[alert-cy="delete-confirmation"]').should(
              "contain.text",
              "Delete Confirmation"
            );

            cy.get('input[data-cy="password"]').clear().type("password user");
            cy.get('button[data-cy="delete"]').click();
          });
      });
  });

  it("dont have access delete", () => {
    authStore.permissions = ["create roles", "read roles", "edit roles"];
    cy.get("a")
      .contains("Roles")
      .click()
      .then(() => {
        cy.url().should("include", "/roles");

        cy.get('[data-cy="title-page"]').should("contain.text", "Roles");
      });

    cy.get("table").should("exist", true);

    cy.get('button[data-cy="btn-setting-data"]')
      .click()
      .then(() => {
        cy.get('button[data-cy="btn-setting-delete"]').should("exist", true);

        cy.get('button[data-cy="btn-setting-delete"]')
          .click()
          .then(() => {
            cy.get('[alert-cy="delete-approval"]').should("exist", true);
            cy.get('[alert-cy="delete-approval"]').should(
              "contain.text",
              "Request Removal"
            );

            cy.get('input[data-cy="note"]').clear().type("note to remove");
            cy.get('button[data-cy="send"]').click();

            cy.get('[alert-cy="approval"]').should("exist", true);
          });
      });
  });
});
