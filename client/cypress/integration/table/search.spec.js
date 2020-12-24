import {host} from '../../../src/setupTests'
describe("Home", function () {
  it("Load home page", function () {
    cy.visit(host);
    cy.contains("Search").should("be.visible");
    cy.contains("Reset").should("be.visible");
  });
  it("Search By Bank Name", function () {
    cy.visit(host);
    cy.get('#name').type('Blanda - Witting Bank') 
    cy.get('#search').click()
    cy.contains("JNDIBEA1").should("be.visible");
  });
  it("Search By BIC", function () {
    cy.visit(host);
    cy.get('#bic').type('ANXISTC1') 
    cy.get('#search').click()
    cy.contains("ANXISTC1").should("be.visible");
  });
});
