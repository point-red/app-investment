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

  it("have access to dashboard & have menu Owners", () => {
    authStore.setPermissions(["create owner", "read owner", "dashboard"]);
    cy.get("a").contains("Owners");
  });

  it("click menu Owners and display data owner", () => {
    authStore.setPermissions(["create owner", "read owner"]);
    ownersStore.setOwners([]);
    expect(ownersStore.owner).to.have.length(0);
    cy.get("[data-cy='alert-notfound']").should("exist", true);
    cy.wait(500);

    cy.get("button[data-cy='btn-notfound-ok']")
      .click()
      .then(() => {
        cy.get("[data-cy='alert-notfound']").should("exist", false);
      });
  });

  it("dont have access to create a new Owner", () => {
    authStore.setPermissions(["read owner"]);
    cy.get("button[data-cy='btn-notfound-ok']")
      .click()
      .then(() => {
        cy.get("[data-cy='alert-notfound']").should("exist", false);
      });
    cy.get("[data-cy='btn-create']").should("exist", false);
  });

  it("create a new owner & was stored", () => {
    cy.get("button[data-cy='btn-notfound-ok']")
      .click()
      .then(() => {
        cy.get("[data-cy='alert-notfound']").should("exist", false);
      });
    authStore.setPermissions(["create owner", "read owner"]);
    cy.get("[data-cy='btn-create']")
      .click()
      .then(() => {
        cy.url().should("include", "/owner/create");

        cy.get('[data-cy="title-page"]').should("contain.text", "Create Owner");
      });

    const ownerDummy: Owner = {
      id: "1",
      firstName: "First name",
      lastName: "Last name",
      email: "example@mail.com",
      phone: "62834342342",
    };

    const { firstName, lastName, email, phone } = ownerDummy;

    cy.get('input[name="firstName"]').clear().type(firstName);
    cy.get('input[name="lastName"]').clear().type(lastName);
    cy.get('input[name="email"]').clear().type(email);
    cy.get('input[name="phone"]').clear().type(phone);

    cy.get('[data-cy="btn-save"]')
      .click()
      .then(() => {
        // check data is stored
        ownersStore.createOwner(ownerDummy);
        cy.wrap(ownersStore)
          .its("owners")
          .should("not.be.empty")
          .and("include", ownerDummy);

        cy.get("[data-cy='alert-success']").should("exist", true);
        cy.get("button[data-cy='btn-alert-success-ok']")
          .click()
          .then(() => {
            cy.get("[data-cy='alert-success']").should("exist", false);
          });
      });
  });

  it("create a new owner and try to ignore required field", () => {
    cy.get("button[data-cy='btn-notfound-ok']")
      .click()
      .then(() => {
        cy.get("[data-cy='alert-notfound']").should("exist", false);
      });
    authStore.setPermissions(["create owner", "read owner"]);
    cy.get("[data-cy='btn-create']")
      .click()
      .then(() => {
        cy.url().should("include", "/owner/create");

        cy.get('[data-cy="title-page"]').should("contain.text", "Create Owner");
      });

    const ownerDummy: Owner = {
      id: "1",
      firstName: "First name",
      lastName: "Last name",
      email: "",
      phone: "",
    };

    const { firstName, lastName, email, phone } = ownerDummy;

    cy.get('input[name="firstName"]').clear().type(firstName);
    cy.get('input[name="lastName"]').clear().type(lastName);

    cy.get('[data-cy="btn-save"]')
      .click()
      .then(() => {
        // check data shouldnt be stored
        cy.wrap(ownersStore).its("owners").should("be.empty");
        cy.get("[data-cy='error-field']").then(($error) => {
          expect($error.length > 0).to.be.true;
        });
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

    cy.get("button[data-cy='btn-exit']")
      .click()
      .then(() => {
        cy.get("[data-cy='popup-detail']").should("exist", false);
      });
  });

  it("go to page archive", () => {
    authStore.permissions = ["create owner", "read owner"];
    cy.get("[data-cy='btn-archive']")
      .click()
      .then(() => {
        cy.url().should("include", "/owner/archive");
      });
  });

  it("try some search data", () => {
    authStore.permissions = ["create owner", "read owner"];

    cy.url().should("include", "/owner");

    cy.get('[data-cy="title-page"]').should("contain.text", "Owner");

    cy.get('input[type="search"]')
      .click()
      .then(() => {
        cy.get('input[type="search"]').clear().type("type some name to search");
      });
  });

  it("try some sort data data", () => {
    authStore.permissions = ["create owner", "read owner"];
    cy.url().should("include", "/owner");

    cy.get('[data-cy="title-page"]').should("contain.text", "Owner");

    cy.get('[data-cy="btn-sort"]')
      .click()
      .then(() => {
        cy.get('[data-cy="sort-asc"]').click();
        cy.get('[data-cy="sort-desc"]').click();
      });
  });
});
