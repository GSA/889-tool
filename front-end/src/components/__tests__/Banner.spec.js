import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import Banner from "../Banner.vue";

describe("Banner", () => {
  it("renders properly", () => {
    const wrapper = mount(Banner);
    expect(wrapper.text()).toContain("An official website of the United States government");
  });
});
