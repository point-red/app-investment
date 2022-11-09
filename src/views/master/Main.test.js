import { mount } from "@vue/test-utils";
import Main from "./Main.vue";
import { describe, it, expect } from "vitest";

describe("Master Master Index", () => {

  it("should renders is page content is correct", () => {
    const wrapper = mount(Main);

    expect(wrapper.get('h2').text()).toBe("Master");
  });
});