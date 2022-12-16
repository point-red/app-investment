/// <reference types="cypress"/>

import { describe, it } from "vitest";
import { useAuthStore } from "@/stores/auth";

describe("Edit Permission", () => {
  beforeEach(() => {
    cy.visit("localhost:3000/roles/permission");
  });

  const authStore = useAuthStore();

  it("has access edit role", () => {
    authStore.permissions = [
      "create roles",
      "read roles",
      "edit roles",
      "update permission",
    ];
    cy.get("a")
      .contains("Roles")
      .click()
      .then(() => {
        cy.url().should("include", "/roles/permission");

        cy.get('[data-cy="title-page"]').should("contain.text", "Roles");
      });

    cy.get("table").should("exist", true);

    cy.get('button[data-cy="btn-manage-data"]').should("exist", true);
    cy.get('button[data-cy="btn-manage-data"]')
      .click()
      .then(() => {
        cy.url().should("include", "/roles/permission/{someid}");

        cy.get('[data-cy="subtitle-page"]').should(
          "contain.text",
          "Manage access & Permissions"
        );

        // click available feature
        cy.get('input[type="checkbox"]').should("exist", true);

        cy.get('input[type="checkbox"]').click();

        cy.get('[data-cy="btn-save"]').click();

        // success alert
        cy.get('[alert-cy="update-success"]').should("exist", true);
      });
  });
});
