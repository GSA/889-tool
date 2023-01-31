import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import PrototypeAlert from "../PrototypeAlert.vue";

describe("Prototype Alert", () => {
  it("renders properly", () => {
    const wrapper = mount(PrototypeAlert);
    expect(wrapper.text()).toContain("This is a prototype. We are continuously updating functionality and collecting feedback");
  });
});
