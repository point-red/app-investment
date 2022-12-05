import { mount } from "@vue/test-utils";
import Main from "./Main.vue";
import { describe, it, expect } from "vitest";
import { Modal } from "@/global-components/modal";

function factory(data: object) {
  return mount(Main, {
    data: () => data,
  });
}

describe("Master Bank Index", () => {
  const wrapperDataNull = factory({});

  it("should renders is page content is correct", () => {
    expect(wrapperDataNull.get("h2").text()).toBe("Bank");
  });

  it("should renders table", () => {
    expect(wrapperDataNull.text()).toContain("BANK NAME");
    expect(wrapperDataNull.text()).toContain("CREATED AT");
    expect(wrapperDataNull.text()).toContain("ACTIONS");
  });

  it("has button create", () => {
    expect(wrapperDataNull.find('[data-test="btn-create"]').html()).toContain(
      "Create"
    );
  });

  it("has alert if no data", () => {
    const wrapperData = factory({
      tableData: [],
    });
    expect(wrapperData.html()).toContain("Data not found");
  });

  it("has form create", () => {
    const acl = window.localStorage.getItem("acl");
    if (acl) {
      if (acl.includes("create bank")) {
        expect(wrapperDataNull.find("form").exists()).toBe(true);
        // check input
        expect(wrapperDataNull.find('[for="name"]')).toBe(true);
        expect(wrapperDataNull.find("#name")).toBe(true);
      }
    } else {
      expect(wrapperDataNull.find("form").exists()).toBe(false);
    }
  });

  it("has Modal Form Create", async () => {
    const modal = wrapperDataNull.findComponent(Modal);
    expect(modal.exists()).toBe(true);
  });

  it("Modal create isShow", async () => {
    const wrapperData = factory({
      modalForm: false,
    });
    await wrapperData.find('[data-test="btn-create"]').trigger("click");
    const modal = wrapperData.vm.$data?.modalForm;

    expect(modal).toBe(true);
  });
});
