import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import SearchError from "../SearchError.vue";

describe("SearchError", () => {
  it("renders error message when showError is true", () => {
    const wrapper = mount(SearchError, {
      props: {
        showError: true,
        errorMessage: "Connection failed. Please try again.",
      },
    });

    const container = wrapper.get('[data-test="search-error"]');
    const heading = wrapper.get('[data-test="error-heading"]');
    const message = wrapper.get('[data-test="error-message"]');

    expect(container.exists()).toBe(true);
    expect(heading.text()).toBe("Attention");
    expect(message.text()).toBe("Connection failed. Please try again.");
    expect(container.classes()).toContain("usa-alert--error");
  });

  it("does not render when showError is false", () => {
    const wrapper = mount(SearchError, {
      props: {
        showError: false,
        errorMessage: "Some error message",
      },
    });

    expect(wrapper.find('[data-test="search-error"]').exists()).toBe(false);
  });

  it("does not render when errorMessage is empty", () => {
    const wrapper = mount(SearchError, {
      props: {
        showError: true,
        errorMessage: "",
      },
    });

    expect(wrapper.find('[data-test="search-error"]').exists()).toBe(false);
  });

  it("renders with default props", () => {
    const wrapper = mount(SearchError);

    expect(wrapper.find('[data-test="search-error"]').exists()).toBe(false);
  });
});
