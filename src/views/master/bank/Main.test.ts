import { mount } from "@vue/test-utils";
import Main from "./Main.vue";
import { describe, it, expect } from "vitest";
import { Modal } from "@/global-components/modal";

function factory({ data }) {
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

  it("has form create", async () => {
    expect(wrapperDataNull.find("form").exists()).toBe(true);
  });

  it("has Modal Form Create", async () => {
    const modal = wrapperDataNull.findComponent(Modal);
    expect(modal.exists()).toBe(true);
  });
});
