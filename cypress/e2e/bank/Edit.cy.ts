/// <reference types="cypress"/>

import { useAuthStore } from "@/stores/auth";
import { useBanksStore } from "@/stores/bank";
import { Bank } from "@/types/Bank";
import { setActivePinia, createPinia } from "pinia";

describe("Edit Bank", () => {
  let authStore: any,
    banksStore: any = null;
  beforeEach(() => {
    cy.visit("http://localhost:3000/bank");
    cy.viewport("macbook-16");

    setActivePinia(createPinia());

    authStore = useAuthStore();
    banksStore = useBanksStore();
  });

  it("try to edit some data", () => {
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

    cy.get('[data-cy="btn-setting"]')
      .click()
      .then(() => {
        cy.get('[data-cy="btn-edit"]')
          .click()
          .then(() => {
            cy.url().should("include", `/bank/edit/${bankDummy.id}`);
          });
      });

    const updateBankDummy: Bank = {
      id: "1",
      bankName: "PT. BANK CENTRAL ASIA UPDATE",
      branch: "Jakarta",
      address: "Jl. kemana aja update",
      phone: "62843424543543",
      fax: "021478834",
      code: "KCBDG001",
      notes: "Lorem ipsum update",
      account: [
        {
          id: "1",
          accountName: "Accountname holder update",
          accountNumber: "8373728233",
          notes: "some notes update",
        },
      ],
    };

    const { bankName, branch, address, phone, fax, code, notes, account } =
      updateBankDummy;

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
        banksStore.updateBank(bankDummy.id, updateBankDummy);
        // check data is stored
        cy.wrap(banksStore)
          .its("banks")
          .should("not.be.empty")
          .and("include", updateBankDummy);
      });
  });
});
