/// <reference types="cypress"/>

import { describe, it } from "vitest";
import { useAuthStore } from "@/stores/auth";
import { useRoleStore } from "@/stores/role";
import { Role } from "@/types/Role";

describe("Edit", () => {
  beforeEach(() => {
    cy.visit("localhost:3000/roles");
  });

  const authStore = useAuthStore();
  const roleStore = useRoleStore();

  it("has access edit role", () => {
    authStore.permissions = ["create roles", "read roles", "edit roles"];

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

    cy.get('button[data-cy="btn-setting-data"]').should("exist", true);
  });

  it("edit role", () => {
    authStore.permissions = ["create roles", "read roles", "edit roles"];

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

    cy.get('button[data-cy="btn-setting-data"]')
      .click()
      .then(() => {
        cy.get('button[data-cy="btn-setting-edit"]').should("exist", true);

        cy.get('button[data-cy="btn-setting-edit"]')
          .click()
          .then(() => {
            cy.get('[data-cy="form-role"]').should("exist", true);

            cy.get('[data-cy="btn-save"]').should("exist", true);

            const updateRolesDummy: Role = {
              id: "1",
              roleName: "Admin update",
            };
            // edit current data
            cy.get('form > input[name="name"]')
              .clear()
              .type(updateRolesDummy.roleName);

            cy.get('[data-cy="btn-save"]').click();
            expect('[data-cy="btn-save"]').to.have.been.called;

            roleStore.updateRole(updateRolesDummy.id, updateRolesDummy);
            // check data is stored
            cy.wrap(roleStore)
              .its("roles")
              .should("not.be.empty")
              .and("include", updateRolesDummy);
          });
      });
  });

  it("delete role", () => {
    authStore.permissions = ["delete roles"];

    const rolesDummy: Role = {
      id: "1",
      roleName: "Admin",
    };

    roleStore.setRoles([rolesDummy]);

    cy.get('[data-cy="title-page"]').should("contain.text", "Roles");

    cy.get('button[data-cy="btn-setting-data"]')
      .click()
      .then(() => {
        cy.get('button[data-cy="btn-setting-delete"]').should("exist", true);

        cy.get('button[data-cy="btn-setting-delete"]').click();

        cy.get("[data-cy='form-fill-password']").should("exist", true);
        cy.get("[data-cy='fill-password']").should("exist", true);
        cy.get("[data-cy='fill-password']").type("password");
        cy.get("button[data-cy='btn-confirm-password']")
          .click()
          .then(() => {
            cy.get("[data-cy='confirm-remove']").should("exist", false);
            cy.get("[data-cy='form-fill-password']").should("exist", false);
          });

        roleStore.deleteItem(rolesDummy.id);

        cy.wrap(roleStore).its("users").should("be.empty");
      });
  });

  it("dont have access delete / removal request", () => {
    authStore.permissions = ["read roles"];

    const rolesDummy: Role = {
      id: "1",
      roleName: "Admin",
    };

    roleStore.setRoles([rolesDummy]);

    cy.get('[data-cy="title-page"]').should("contain.text", "Roles");

    cy.get('button[data-cy="btn-setting-data"]')
      .click()
      .then(() => {
        cy.get('button[data-cy="btn-setting-delete"]').should("exist", true);

        cy.get('button[data-cy="btn-setting-delete"]').click();

        //block
        cy.get("[data-cy='alert-request']").should("exist", true);
        cy.get("[data-cy='form-request']").clear().type("notes for request");
        cy.get('[data-cy="btn-send"]').click();
        expect('[data-cy="btn-send"]').to.have.been.called;

        cy.wrap(roleStore)
          .its("owners")
          .should("not.be.empty")
          .and("include", rolesDummy);

        cy.get("[data-cy='alert-request']").should("exist", false);
      });
  });
});
