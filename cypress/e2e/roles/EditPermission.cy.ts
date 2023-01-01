/// <reference types="cypress"/>

import { useAuthStore } from "@/stores/auth";
import { useRoleStore } from "@/stores/role";
import { Role } from "@/types/Role";
import { setActivePinia, createPinia } from "pinia";

describe("EditPermission Roles", () => {
  let authStore: any,
    roleStore: any = null;
  beforeEach(() => {
    cy.visit("http://localhost:3000/roles");
    cy.viewport("macbook-16");

    setActivePinia(createPinia());

    authStore = useAuthStore();
    roleStore = useRoleStore();
    roleStore.setRoles([]);
    authStore.setPermissions([]);
  });

  it("has access edit role", () => {
    authStore.setPermissions([
      "create roles",
      "read roles",
      "edit roles",
      "update permission",
    ]);

    cy.get('[data-cy="title-page"]').should("contain.text", "Roles");

    cy.get('[data-cy="btn-manage-data"]').should("exist", true);
    cy.get('[data-cy="btn-manage-data"]')
      .click()
      .then(() => {
        cy.url().should("include", "/manage");

        cy.get('[data-cy="subtitle-page"]').should(
          "contain.text",
          "Manage Access & Permissions"
        );

        // click available feature
        cy.get('input[type="checkbox"]').should("exist", true);

        cy.get('input[type="checkbox"]')
          .click()
          .then(() => {
            cy.get('[data-cy="btn-save"]').click();

            // success alert
            // cy.get('[alert-cy="update-success"]').should("exist", true);
          });
      });
  });
});
