/// <reference types="cypress"/>

import { useAuthStore } from "@/stores/auth";
import { useBanksStore } from "@/stores/bank";
import { Bank } from "@/types/Bank";
import { setActivePinia, createPinia } from "pinia";

describe("Create Bank", () => {
  let authStore: any,
    banksStore: any = null;
  beforeEach(() => {
    cy.visit("http://localhost:3000/bank");
    cy.viewport("macbook-16");

    setActivePinia(createPinia());

    authStore = useAuthStore();
    banksStore = useBanksStore();
  });

  it("click menu Banks and display data banks", () => {
    authStore.permissions = ["create banks", "read banks"];
    banksStore.setBanks([]);

    expect(banksStore.banks).to.have.length(0);
    cy.get("[data-cy='alert-notfound']").should("exist", true);
    cy.wait(500);

    cy.get("button[data-cy='btn-notfound-ok']")
      .click()
      .then(() => {
        cy.get("[data-cy='alert-notfound']").should("exist", false);
      });
  });

  it("dont have access to create a new Bank", () => {
    authStore.permissions = ["read banks"];
    cy.get("button[data-cy='btn-create']").should("not.be.visible");
  });

  it("create a new bank & was stored", () => {
    cy.get("button[data-cy='btn-notfound-ok']")
      .click()
      .then(() => {
        cy.get("[data-cy='alert-notfound']").should("exist", false);
      });
    authStore.permissions = ["create banks", "read banks"];
    cy.get("button[data-cy='btn-create']")
      .click()
      .then(() => {
        cy.url().should("include", "/bank/create");

        cy.get('[data-cy="title-page"]').should("contain.text", "Create Bank");

        const bankDummy: Bank = {
          id: "1",
          bankName: "PT. BANK CENTRAL ASIA",
          branch: "Jakarta",
          address: "Jl. kemana aja",
          phone: "628434243232",
          fax: "021478834",
          code: "KCBDG001",
          notes: "Lorem ipsum",
          account: [
            {
              id: "1",
              accountName: "Accountname holder",
              accountNumber: "8373728233",
              notes: "some notes",
            },
          ],
        };

        const { bankName, branch, address, phone, fax, code, notes } =
          bankDummy;

        cy.get('input[name="bankName"]').clear().type(bankName);
        cy.get('input[name="branch"]').clear().type(branch);
        cy.get('input[name="address"]').clear().type(address);
        cy.get('input[name="phone"]').clear().type(phone);
        cy.get('input[name="fax"]').clear().type(fax);
        cy.get('input[name="code"]').clear().type(code);
        cy.get('input[name="notes"]').clear().type(notes);

        cy.get('[data-cy="btn-save"]')
          .click()
          .then(() => {
            // check data is stored
            banksStore.createBank(bankDummy);
            cy.wrap(banksStore)
              .its("banks")
              .should("not.be.empty")
              .and("include", bankDummy);

            cy.get("[data-cy='alert-success']").should("exist", true);
            cy.get("button[data-cy='btn-alert-success-ok']")
              .click()
              .then(() => {
                cy.get("[data-cy='alert-success']").should("exist", false);
              });
          });
      });
  });

  it("create a new bank and try to ignore required field", () => {
    cy.get("button[data-cy='btn-notfound-ok']")
      .click()
      .then(() => {
        cy.get("[data-cy='alert-notfound']").should("exist", false);
      });
    authStore.permissions = ["create banks", "read banks"];
    cy.get("button[data-cy='btn-create']")
      .click()
      .then(() => {
        cy.url().should("include", "/bank/create");

        cy.get('[data-cy="title-page"]').should("contain.text", "Create Bank");

        const bankDummy: Bank = {
          id: "1",
          bankName: "PT. BANK CENTRAL ASIA",
          branch: "Jakarta",
          address: "Jl. kemana aja",
          phone: "628434243232",
          fax: "021478834",
          code: "KCBDG001",
          notes: "Lorem ipsum",
          account: [],
        };

        const { bankName, branch, address, phone, fax, code, notes } =
          bankDummy;

        cy.get('input[name="bankName"]').clear().type(bankName);
        cy.get('input[name="branch"]').clear().type(branch);
        cy.get('input[name="address"]').clear().type(address);
        cy.get('input[name="phone"]').clear().type(phone);
        cy.get('input[name="fax"]').clear();
        cy.get(' input[name="code"]').clear();
        cy.get('input[name="notes"]').clear();

        cy.get('[data-cy="btn-save"]')
          .click()
          .then(() => {
            // check data shouldnt be stored
            cy.wrap(banksStore).its("banks").should("be.empty");

            cy.get("[data-cy='error-field']").then(($error) => {
              expect($error.length > 0).to.be.true;
            });
          });
      });
  });

  it("show detail bank popup", async () => {
    cy.get("button[data-cy='btn-notfound-ok']")
      .click()
      .then(() => {
        cy.get("[data-cy='alert-notfound']").should("exist", false);
      });
    const bankDummy: Bank = {
      id: "1",
      bankName: "PT. BANK CENTRAL ASIA",
      branch: "Jakarta",
      address: "Jl. kemana aja",
      phone: "628434243232",
      fax: "021478834",
      code: "KCBDG001",
      notes: "Lorem ipsum",
      account: [
        {
          id: "1",
          accountName: "Accountname holder",
          accountNumber: "8373728233",
          notes: "some notes",
        },
      ],
    };

    await banksStore.createBank(bankDummy);

    cy.get('button[data-cy="btn-detail"]')
      .click()
      .then(() => {
        cy.get("[data-cy='popup-detail']").should("exist", true);
        cy.get("button[data-cy='btn-exit']").should("exist", true);
        cy.get("select[data-cy='list-account-bank']").should("exist", true);
        cy.get("option[data-cy='data-account-bank']").then(($accountBank) => {
          expect($accountBank.length === bankDummy.account.length).to.be.true;
        });
      });

    cy.get("button[data-cy='btn-exit']")
      .click()
      .then(() => {
        cy.get("[data-cy='popup-detail']").should("exist", false);
      });
  });

  it("go to page archive", () => {
    cy.visit("http://localhost:3000/bank");
    authStore.permissions = ["create banks", "read banks"];
    cy.get("[data-cy='btn-archive']")
      .click()
      .then(() => {
        cy.url().should("include", "/bank/archive");
      });
  });

  it("try some search data", () => {
    cy.get("button[data-cy='btn-notfound-ok']")
      .click()
      .then(() => {
        cy.get("[data-cy='alert-notfound']").should("exist", false);
      });
    authStore.permissions = ["create banks", "read banks"];

    cy.url().should("include", "/bank");

    cy.get('[data-cy="title-page"]').should("contain.text", "Bank");

    cy.get('input[type="search"]')
      .click()
      .then(() => {
        cy.get('input[type="search"]').clear().type("type some name to search");
      });
  });

  it("try some sort data data", () => {
    cy.get("[data-cy='btn-notfound-ok']")
      .click()
      .then(() => {
        cy.get("[data-cy='alert-notfound']").should("exist", false);
      });
    authStore.permissions = ["create banks", "read banks"];
    cy.url().should("include", "/bank");

    cy.get('[data-cy="title-page"]').should("contain.text", "Bank");

    cy.get('[data-cy="btn-sort"]')
      .click()
      .then(() => {
        cy.get('[data-cy="sort-asc"]').click();
        cy.get('[data-cy="sort-desc"]').click();
      });
  });
});
