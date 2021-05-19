/// <reference types="Cypress"/>

import { User } from "models";

describe("Cypress Studio Demo", function () {
  beforeEach(function () {
    cy.task("db:seed");

    cy.intercept("POST", "/transactions").as("createTransaction");
    
    cy.database("find", "users").then((user: User) => {
      cy.login(user.username, "s3cret", true);
    });
  });
  it("create new transaction", function () {
    // Extend test with Cypress Studio
    cy.getBySelLike("nav-top-new-transaction").click();
    cy.url().should('include', 'transaction/new');

    cy.getBySelLike("user-list-search-input").type('kaylin');
    cy.getBySelLike("user-list-item").first().click();
    cy.getBySelLike("transaction-create-amount-input").type("20");
    cy.getBySelLike("transaction-create-description-input").type("Lunch at 5 Guys");
    
    cy.get("#amount").should("have.value", "$20");
    cy.get("#transaction-create-description-input").should("have.value", "Lunch at 5 Guys");

    cy.getBySelLike("transaction-create-submit-payment").click();
    cy.wait("@createTransaction");

    cy.getBySelLike("new-transaction-return-to-transactions");

    // cy.getBySelLike("transaction-item")

  });
  it("create new bank account", function () {
    // Extend test with Cypress Studio
  });
});
