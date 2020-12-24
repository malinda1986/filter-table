import {host} from '../../../src/setupTests'
describe("Home", function () {
  it("Load home page", function () {
    cy.visit(host);
    cy.contains("Search").should("be.visible");
    cy.contains("Reset").should("be.visible");
  });
});
