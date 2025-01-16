import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import GSA_Footer from "../GSAFooter.vue";

describe("GSA Footer", () => {
  it("renders properly", () => {
    const wrapper = mount(GSA_Footer);
    expect(wrapper.text()).toContain(
      "This search was built by NASA using the SAM.gov Entity Management API.",
    );
  });
});
