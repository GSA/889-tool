// https://docs.cypress.io/api/introduction/api.html

describe("My First Test", () => {
  it("visits the app root url", () => {
    cy.visit("/site/gsa/889-vue/");
    cy.contains("em", "889 Compliance Search");
  });
});
