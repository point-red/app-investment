/// <reference types="cypress"/>

import { useAuthStore } from "@/stores/auth";
import { useRoleStore } from "@/stores/role";
import { Role } from "@/types/Role";
import { setActivePinia, createPinia } from "pinia";

describe("Create Roles", () => {
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

  it("click menu Roles and display data roles", () => {
    authStore.setPermissions(["read role"]);
    expect(roleStore.roles).to.have.length(0);
    cy.get("[data-cy='alert-notfound']").should("exist", true);
    cy.wait(500);

    cy.get("button[data-cy='btn-notfound-ok']")
      .click()
      .then(() => {
        cy.get("[data-cy='alert-notfound']").should("exist", false);
      });
  });

  it("have permission", () => {
    authStore.setPermissions(["read role"]);

    cy.get('[data-cy="title-page"]').should("contain.text", "Roles");
  });

  it("dont have permission", () => {
    cy.get('[data-cy="title-page"]').should("contain.text", "Page not found");
  });

  it("have access create", () => {
    authStore.setPermissions(["create role"]);

    cy.get('[data-cy="btn-create"]').should("exist", true);
  });

  it("dont have access create", () => {
    authStore.setPermissions(["read role"]);

    cy.get('[data-cy="btn-create"]').should("exist", false);
  });

  it("reders page Roles", () => {
    authStore.setPermissions(["read role"]);
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
    cy.get("button[data-cy='btn-notfound-ok']")
      .click()
      .then(() => {
        cy.get("[data-cy='alert-notfound']").should("exist", false);
      });
    authStore.setPermissions(["read role", "create role"]);
    cy.get('[data-cy="btn-create"]')
      .click()
      .then(() => {
        cy.get('[data-cy="form-role"]').should("exist", true);

        cy.get('[data-cy="btn-save"]').should("exist", true);

        const rolesDummy: Role = {
          id: "1",
          roleName: "Admin",
        };

        cy.get('input[name="roleName"]').clear().type(rolesDummy.roleName);

        cy.get('[data-cy="btn-save"]')
          .click()
          .then(() => {
            roleStore.createRole(rolesDummy);
            cy.wrap(roleStore)
              .its("roles")
              .should("not.be.empty")
              .and("include", rolesDummy);
          });

        cy.get('[data-cy="form-role"]').should("exist", false);
      });
  });

  it("try some search data", () => {
    cy.get("button[data-cy='btn-notfound-ok']")
      .click()
      .then(() => {
        cy.get("[data-cy='alert-notfound']").should("exist", false);
      });
    authStore.setPermissions(["read role", "create role"]);

    cy.get('[data-cy="title-page"]').should("contain.text", "Roles");

    cy.get('input[type="search"]')
      .click()
      .then(() => {
        cy.get('input[type="search"]').clear().type("type some name to search");
      });
  });

  it("try some sort data data", () => {
    cy.get("button[data-cy='btn-notfound-ok']")
      .click()
      .then(() => {
        cy.get("[data-cy='alert-notfound']").should("exist", false);
      });
    authStore.setPermissions(["read role", "create role"]);

    cy.get('[data-cy="btn-sort"]')
      .click()
      .then(() => {
        cy.get('[data-cy="sort-asc"]').click();
        cy.get('[data-cy="sort-desc"]').click();
      });
  });
});
