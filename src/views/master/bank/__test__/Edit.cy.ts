/// <reference types="cypress"/>

import { describe, it } from "vitest";
import { useAuthStore } from "@/stores/auth";
import { useBanksStore } from "@/stores/bank";
import { Bank } from "@/types/Bank";

describe("Edit and remove", () => {
  beforeEach(() => {
    cy.visit("localhost:3000/banks");
  });

  const authStore = useAuthStore();
  const banksStore = useBanksStore();

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

    cy.get('button[data-cy="btn-setting"]')
      .click()
      .then(() => {
        cy.get('[data-cy="btn-edit"]').click();
        expect('[data-cy="btn-edit"]').to.have.been.called;
        cy.url().should("include", `/banks/edit/${bankDummy.id}`);
      });

    const updateBankDummy: Bank = {
      id: "1",
      bankName: "PT. BANK CENTRAL ASIA UPDATE",
      branch: "Jakarta",
      address: "Jl. kemana aja update",
      phone: "62843424",
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

    cy.get('form > input[name="bankName"]').clear().type(bankName);
    cy.get('form > input[name="branch"]').clear().type(branch);
    cy.get('form > input[name="address"]').clear().type(address);
    cy.get('form > input[name="phone"]').clear().type(phone);
    cy.get('form > input[name="fax"]').clear().type(fax);
    cy.get('form > input[name="code"]').clear().type(code);
    cy.get('form > input[name="notes"]').clear().type(notes);

    cy.get('[data-cy="btn-save"]').click();

    expect('[data-cy="btn-save"]').to.have.been.called;

    banksStore.updateBank(bankDummy.id, updateBankDummy);
    // check data is stored
    cy.wrap(banksStore)
      .its("banks")
      .should("not.be.empty")
      .and("include", updateBankDummy);
  });

  it("try to remove some data bank if had bank accounts", () => {
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

    cy.get('button[data-cy="btn-setting"]')
      .click()
      .then(() => {
        cy.get('[data-cy="btn-remove"]').click();
        expect('[data-cy="btn-remove"]').to.have.been.called;
      });

    //block
    cy.get("[data-cy='alert-warning']").should("exist", true);
    cy.get("button[data-cy='btn-archive']")
      .click()
      .then(() => {
        cy.get("[data-cy='confirm-archive']").should("exist", true);
        cy.get("button[data-cy='btn-ok']").click();

        //clear data
        banksStore.setBanks([]);
      });

    cy.wrap(banksStore).its("banks").should("be.empty");

    cy.get("[data-cy='alert-warning']").should("exist", false);
  });

  it("try to remove some data bank account", () => {
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
    cy.visit(`localhost:3000/banks/detail/${bankDummy.id}`);

    cy.get('button[data-cy="btn-setting"]')
      .click()
      .then(() => {
        cy.get('[data-cy="btn-remove"]').click();
        expect('[data-cy="btn-remove"]').to.have.been.called;
      });

    cy.get("button[data-cy='btn-remove-account']").then(($account) => {
      expect($account.length === bankDummy.account?.length).to.be.true;
    });
    cy.get("button[data-cy='btn-remove-account']").click();
    expect("button[data-cy='btn-remove-account']").to.have.been.called;
    // check data is stored
    banksStore.setBanks({
      ...bankDummy,
      account: [],
    });
    cy.wrap(banksStore)
      .its("banks")
      .should("not.be.empty")
      .and("include", bankDummy);
  });

  it("remove bank", () => {
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

    cy.visit(`localhost:3000/banks/${bankDummy.id}`);

    cy.get('button[data-cy="btn-setting"]')
      .click()
      .then(() => {
        cy.get('[data-cy="btn-remove"]').click();
        expect('[data-cy="btn-remove"]').to.have.been.called;
      });

    cy.get("[data-cy='confirm-remove']").should("exist", true);
    cy.get("button[data-cy='btn-yes']").click();
    cy.get("[data-cy='form-fill-password']").should("exist", true);
    cy.get("[data-cy='fill-password']").should("exist", true);
    cy.get("[data-cy='fill-password']").type("password");
    cy.get("button[data-cy='btn-confirm-password']")
      .click()
      .then(() => {
        cy.get("[data-cy='confirm-remove']").should("exist", false);
        cy.get("[data-cy='form-fill-password']").should("exist", false);
      });

    banksStore.deleteItem(bankDummy.id);

    cy.wrap(banksStore).its("banks").should("be.empty");

    cy.get("[data-cy='alert-success']").should("exist", true);
    cy.get("button[data-cy='btn-ok']").click();
    cy.get("[data-cy='alert-success']").should("exist", false);
  });
});
