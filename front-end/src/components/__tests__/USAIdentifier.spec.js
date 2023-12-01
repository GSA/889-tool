import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import USA_ID from "../USAIdentifier.vue";

describe("USA Identifier", () => {
  it("renders properly", () => {
    const wrapper = mount(USA_ID);
    expect(wrapper.text()).toContain(
      "An official website of the General Services Administration",
    );
  });
});
