import { describe, it, expect, vi, afterEach, beforeEach } from "vitest";

import { mount } from "@vue/test-utils";
import {selectable_entity_prop, non_selectable_entity_prop} from "./fixtures/entity_fixtures.js";
import SearchResult from "../SearchResult.vue";



describe("Search Result", () => {
    beforeEach(() => {
        vi.useFakeTimers()
    })
    
    afterEach(() => {
        vi.useRealTimers()
    })

    it("renders business name properly", () => {
        const wrapper = mount(SearchResult, { props: { entity: selectable_entity_prop } });

        const el = wrapper.get('[data-test="business-name"]')
        
        expect(el.text()).toBe("The Enfield Tennis Academy");
    });

    it("renders compliant 889 Status properly", () => {
        const wrapper = mount(SearchResult, { props: { entity: selectable_entity_prop } });

        const el = wrapper.get('[data-test="889-status"]')
        
        expect(el.text()).toBe("COMPLIANT");
        expect(el.classes()).toContain('bg-primary')
    });

    it("renders non-compliant 889 Status properly", () => {
        const wrapper = mount(SearchResult, { props: { entity: non_selectable_entity_prop } });

        const el = wrapper.get('[data-test="889-status"]')
        
        expect(el.text()).toBe("PROVIDES AND USES COVERED TELECOMMUNICATIONS");
        expect(el.classes()).toContain('bg-base-dark')
    });

    it("renders expiring registration when expiration date is within 30 days", () => {
        const date = new Date(2022, 11, 16)
        vi.setSystemTime(date)
        const wrapper = mount(SearchResult, { props: { entity: non_selectable_entity_prop } });
        const el = wrapper.find('[data-test="expiration-date"]')
        
        expect(el.exists()).toBe(true)
        expect(el.text()).toBe("Expiring registration: Jan. 14, 2023")
    });

    it("does not render expiring registration when expiration date is beyond 30 days", () => {
        const date = new Date(2022, 11, 15)
        vi.setSystemTime(date)
        
        const wrapper = mount(SearchResult, { props: { entity: non_selectable_entity_prop } });
        const el = wrapper.find('[data-test="expiration-date"]')
        
        expect(el.exists()).toBe(false)
    });
    it("correctly renders city and country when state is not present", () => {
        const wrapper = mount(SearchResult, { props: { entity: non_selectable_entity_prop } });
        const el = wrapper.find('[data-test="address"]')
        
        expect(el.text()).toBe("McMurdo Station ATA")
    });

    it("correctly renders city, state, and country", () => {
        const wrapper = mount(SearchResult, { props: { entity: selectable_entity_prop } });
        const el = wrapper.find('[data-test="address"]')
        
        expect(el.text()).toBe("Boston, MA USA")
    });

});
