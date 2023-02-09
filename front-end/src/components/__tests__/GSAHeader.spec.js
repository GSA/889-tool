import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import GSA_Header from "../GSAHeader.vue";

describe("GSA_Header", () => {
  it("renders properly", () => {
    const wrapper = mount(GSA_Header);
    expect(wrapper.text()).toContain("889 Representations Search");
  });
});
