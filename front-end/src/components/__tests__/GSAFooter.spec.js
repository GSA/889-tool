import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import GSA_Footer from "../GSAFooter.vue";

describe("GSA Footer", () => {
  it("renders properly", () => {
    const wrapper = mount(GSA_Footer);
    expect(wrapper.text()).toContain("The 889 Representations SAM.gov Tool web application was originally developed by NASA");
  });
});
