/// <reference types="cypress"/>

import { describe, it } from "vitest";
import { useAuthStore } from "@/stores/auth";
import { useRoleStore } from "@/stores/role";
import { Role } from "@/types/Role";

describe("Create", () => {
  beforeEach(() => {
    cy.visit("localhost:3000/roles");
  });

  const authStore = useAuthStore();
  const roleStore = useRoleStore();

  it("have permission", () => {
    authStore.permissions = ["create roles", "read roles"];

    cy.get('[data-cy="title-page"]').should("contain.text", "Roles");
  });

  it("dont have permission", () => {
    authStore.permissions = [];

    cy.get("h1").should("contain.text", "Page not found");
  });

  it("have access create", () => {
    authStore.permissions = ["create roles"];

    cy.get('[data-cy="btn-create"]').should("exist", true);
  });

  it("dont have access create", () => {
    authStore.permissions = [];

    cy.get('[data-cy="btn-create"]').should("exist", false);
  });

  it("reders page Roles", () => {
    authStore.permissions = ["create roles", "read roles"];
    const rolesDummy: Role = {
      id: "1",
      roleName: "Admin",
    };

    roleStore.setRoles([rolesDummy]);

    cy.get('[data-cy="title-page"]').should("contain.text", "Roles");

    cy.get('[data-cy="btn-create"]').should("exist", true);

    cy.wrap(roleStore)
      .its("roles")
      .should("not.be.empty")
      .and("include", rolesDummy);
  });

  it("create a new role", () => {
    authStore.permissions = ["create roles", "read roles"];
    cy.get('[data-cy="btn-create"]')
      .click()
      .then(() => {
        cy.get('[data-cy="form-role"]').should("exist", true);

        cy.get('[data-cy="btn-save"]').should("exist", true);

        const rolesDummy: Role = {
          id: "1",
          roleName: "Admin",
        };

        cy.get('form > input[name="roleName"]')
          .clear()
          .type(rolesDummy.roleName);

        cy.get('[data-cy="btn-save"]').click();
        expect('[data-cy="btn-save"]').to.have.been.called;

        roleStore.createRole(rolesDummy);
        cy.wrap(roleStore)
          .its("roles")
          .should("not.be.empty")
          .and("include", rolesDummy);

        cy.get('[data-cy="form-role"]').should("exist", false);
      });
  });

  it("try some search data", () => {
    authStore.permissions = ["create roles", "read roles"];
    cy.get('[data-cy="title-page"]').should("contain.text", "Roles");

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
    authStore.permissions = ["create roles", "read roles"];
    cy.get('[data-cy="title-page"]').should("contain.text", "Roles");

    cy.get('button[data-cy="btn-sort"]')
      .click()
      .then(() => {
        cy.get('[data-cy="sort-asc"]')
          .click()
          .then(() => {
            expect('[data-cy="sort-asc"]').to.have.been.called;
          });
        cy.get('[data-cy="sort-desc"]')
          .click()
          .then(() => {
            expect('[data-cy="sort-desc"]').to.have.been.called;
          });
      });
  });
});
