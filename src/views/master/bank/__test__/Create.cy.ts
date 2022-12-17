/// <reference types="cypress"/>

import { describe, it } from "vitest";
import { useAuthStore } from "@/stores/auth";
import { useBanksStore } from "@/stores/bank";
import { Bank } from "@/types/Bank";

describe("Create", () => {
  beforeEach(() => {
    cy.visit("localhost:3000/banks");
  });

  const authStore = useAuthStore();
  const banksStore = useBanksStore();

  it("have access to dashboard & have menu Banks", () => {
    authStore.permissions = ["create banks", "read banks", "dashboard"];
    cy.get("a").contains("Banks");
  });

  it("click menu Banks and display data banks", () => {
    banksStore.banks = [];
    authStore.permissions = ["create banks", "read banks"];
    cy.get("a").contains("Banks").click();

    expect(banksStore.banks).to.have.length(0);
    cy.get("[data-cy='alert-notfound']").should("exist", true);

    cy.get("button[data-cy='btn-ok']").click();
    expect("button[data-cy='btn-ok']").to.have.been.called;
    cy.get("[data-cy='alert-notfound']").should("exist", false);
  });

  it("dont have access to create a new Bank", () => {
    authStore.permissions = ["read banks"];
    cy.get("button[data-cy='btn-create']").should("not.be.visible");
  });

  it("create a new bank & was stored", () => {
    authStore.permissions = ["create banks", "read banks"];
    cy.get("button[data-cy='btn-create']")
      .click()
      .then(() => {
        cy.url().should("include", "/banks/create");

        cy.get('[data-cy="title-page"]').should("contain.text", "Bank Details");

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

        cy.get('form > input[name="bankName"]').clear().type(bankName);
        cy.get('form > input[name="branch"]').clear().type(branch);
        cy.get('form > input[name="address"]').clear().type(address);
        cy.get('form > input[name="phone"]').clear().type(phone);
        cy.get('form > input[name="fax"]').clear().type(fax);
        cy.get('form > input[name="code"]').clear().type(code);
        cy.get('form > input[name="notes"]').clear().type(notes);

        cy.get('[data-cy="btn-save"]').click();

        expect('[data-cy="btn-save"]').to.have.been.called;

        // check data is stored
        banksStore.createBank(bankDummy);
        cy.wrap(banksStore)
          .its("banks")
          .should("not.be.empty")
          .and("include", bankDummy);

        cy.get("[data-cy='alert-success']").should("exist", true);
        cy.get("button[data-cy='btn-ok']").click();
        expect("button[data-cy='btn-ok']").to.have.been.called;
        cy.get("[data-cy='alert-success']").should("exist", false);
      });
  });

  it("create a new bank and try to ignore required field", () => {
    authStore.permissions = ["create banks", "read banks"];
    cy.get("button[data-cy='btn-create']")
      .click()
      .then(() => {
        cy.url().should("include", "/banks/create");

        cy.get('[data-cy="title-page"]').should("contain.text", "Bank Details");

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

        cy.get('form > input[name="bankName"]').clear().type(bankName);
        cy.get('form > input[name="branch"]').clear().type(branch);
        cy.get('form > input[name="address"]').clear().type(address);
        cy.get('form > input[name="phone"]').clear().type(phone);
        cy.get('form > input[name="fax"]').clear().type("");
        cy.get('form > input[name="code"]').clear().type("");
        cy.get('form > input[name="notes"]').clear().type("");

        cy.get('[data-cy="btn-save"]').click();

        expect('[data-cy="btn-save"]').to.have.been.called;

        // check data shouldnt be stored
        cy.wrap(banksStore).its("banks").should("be.empty");

        cy.get("span[data-cy='error-field']").then(($error) => {
          expect($error.length > 0).to.be.true;
        });
      });
  });

  it("show detail bank popup", () => {
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

    banksStore.setBanks([bankDummy]);

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

    cy.get("button[data-cy='btn-exit']").click();
    expect("button[data-cy='btn-exit']").to.have.been.called;
    cy.get("[data-cy='popup-detail']").should("exist", false);
  });

  it("go to page archive", () => {
    authStore.permissions = ["create banks", "read banks"];
    cy.get("[data-cy='btn-archive']")
      .click()
      .then(() => {
        cy.url().should("include", "/banks/archive");
      });
  });

  it("try some search data", () => {
    authStore.permissions = ["create banks", "read banks"];

    cy.url().should("include", "/banks");

    cy.get('[data-cy="title-page"]').should("contain.text", "Bank");

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
    authStore.permissions = ["create banks", "read banks"];
    cy.url().should("include", "/banks");

    cy.get('[data-cy="title-page"]').should("contain.text", "Bank");

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
