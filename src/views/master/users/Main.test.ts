import { mount } from "@vue/test-utils";
import Main from "./Main.vue";
import { describe, it, expect } from "vitest";
import { Modal } from "@/global-components/modal";

function factory({ data }) {
  return mount(Main, {
    data: () => data,
  });
}

describe("Master User Index", () => {
  const wrapperDataNull = factory({});

  it("should renders is page content is correct", () => {
    expect(wrapperDataNull.get("h2").text()).toBe("Users");
  });

  it("should renders table", () => {
    expect(wrapperDataNull.text()).toContain("USER NAME");
    expect(wrapperDataNull.text()).toContain("CREATED AT");
    expect(wrapperDataNull.text()).toContain("ACTIONS");
  });

  it("has button create", () => {
    expect(wrapperDataNull.find('[data-test="btn-create"]').html()).toContain(
      "Create"
    );
  });

  it("has form create", () => {
    const acl = window.localStorage.getItem("acl");
    if (acl) {
      if (acl.includes("create user")) {
        expect(wrapperDataNull.find("form").exists()).toBe(true);
        // check input
        expect(wrapperDataNull.find('[for="username"]')).toBe(true);
        expect(wrapperDataNull.find("#username")).toBe(true);

        expect(wrapperDataNull.find('[for="firstname"]')).toBe(true);
        expect(wrapperDataNull.find("#firstname")).toBe(true);

        expect(wrapperDataNull.find('[for="email"]')).toBe(true);
        expect(wrapperDataNull.find("#email")).toBe(true);

        expect(wrapperDataNull.find('[for="lastname"]')).toBe(true);
        expect(wrapperDataNull.find("#lastname")).toBe(true);

        expect(wrapperDataNull.find('[for="mobilephone"]')).toBe(true);
        expect(wrapperDataNull.find("#mobilephone")).toBe(true);

        expect(wrapperDataNull.find('[for="role"]')).toBe(true);
        expect(wrapperDataNull.find("#role")).toBe(true);
      }
    } else {
      expect(wrapperDataNull.find("form").exists()).toBe(false);
    }
  });

  it("has Modal Form Create", async () => {
    const modal = wrapperDataNull.findComponent(Modal);
    expect(modal.exists()).toBe(true);
  });
});
