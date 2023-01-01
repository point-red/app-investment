/// <reference types="cypress"/>

import { useAuthStore } from "@/stores/auth";
import { useRoleStore } from "@/stores/role";
import { Role } from "@/types/Role";
import { setActivePinia, createPinia } from "pinia";

describe("Edit Roles", () => {
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
    authStore.setPermissions(["create role", "read role", "edit role"]);

    const rolesDummy: Role = {
      id: "1",
      roleName: "Admin",
    };

    roleStore.setRoles([rolesDummy]);

    cy.get('[data-cy="title-page"]').should("contain.text", "Roles");

    cy.wrap(roleStore)
      .its("roles")
      .should("not.be.empty")
      .and("include", rolesDummy);

    cy.get('[data-cy="btn-setting"]')
      .click()
      .then(() => {
        cy.get('[data-cy="btn-edit"]').should("exist", true);
      });
  });

  it("edit role", () => {
    authStore.setPermissions(["create role", "read role", "edit role"]);

    const rolesDummy: Role = {
      id: "1",
      roleName: "Admin",
    };

    roleStore.setRoles([rolesDummy]);

    cy.get('[data-cy="title-page"]').should("contain.text", "Roles");

    cy.wrap(roleStore)
      .its("roles")
      .should("not.be.empty")
      .and("include", rolesDummy);

    cy.get('[data-cy="btn-setting"]')
      .click()
      .then(() => {
        cy.get('[data-cy="btn-edit"]').should("exist", true);

        cy.get('[data-cy="btn-edit"]')
          .click()
          .then(() => {
            cy.get('[data-cy="form-role"]').should("exist", true);

            cy.get('[data-cy="btn-save"]').should("exist", true);

            const updateRolesDummy: Role = {
              id: "1",
              roleName: "Admin update",
            };
            // edit current data
            cy.get('input[name="roleName"]')
              .clear()
              .type(updateRolesDummy.roleName);

            cy.get('[data-cy="btn-save"]')
              .click()
              .then(() => {
                roleStore.updateRole(updateRolesDummy.id, updateRolesDummy);
                // check data is stored
                cy.wrap(roleStore)
                  .its("roles")
                  .should("not.be.empty")
                  .and("include", updateRolesDummy);
              });
          });
      });
  });

  it("delete role", () => {
    authStore.setPermissions([
      "create role",
      "read role",
      "edit role",
      "delete roles",
    ]);

    const rolesDummy: Role = {
      id: "1",
      roleName: "Admin",
    };

    roleStore.setRoles([rolesDummy]);

    cy.get('[data-cy="title-page"]').should("contain.text", "Roles");

    cy.get('[data-cy="btn-setting"]')
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

        roleStore.deleteItem(rolesDummy.id);

        cy.wrap(roleStore).its("roles").should("be.empty");
      });
  });

  it("dont have access delete / removal request", () => {
    authStore.setPermissions(["create role", "read role", "edit role"]);

    const rolesDummy: Role = {
      id: "1",
      roleName: "Admin",
    };

    roleStore.setRoles([rolesDummy]);

    cy.get('[data-cy="title-page"]').should("contain.text", "Roles");

    cy.get('[data-cy="btn-setting"]')
      .click()
      .then(() => {
        cy.get('[data-cy="btn-delete"]').should("exist", true);

        cy.get('[data-cy="btn-delete"]').click();

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
            cy.wrap(roleStore)
              .its("roles")
              .should("not.be.empty")
              .and("include", rolesDummy);

            cy.get("[data-cy='alert-request']").should("exist", false);
          });
      });
  });
});
