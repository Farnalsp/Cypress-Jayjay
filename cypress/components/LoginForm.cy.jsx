import React from "react";
import LoginForm from "./Login";
describe('LoginForm Component', () => {
  beforeEach(() => {
    cy.mount(<LoginForm />)
  })
  it("Memuat komponen login form", () => {
    cy.contains("h2", "Hello Jayjay Students");
    cy.contains("h3", "Let's learn unit testing!");
    cy.get(".email-input").should("exist");
    cy.get(".phone-input").should("exist");
    cy.get(".login-button").should("exist");
  });

  it("Memasukan email dan phone", () => {
    cy.get(".email-input").type("admin@gmail.com");
    cy.get(".email-input").should("have.value", "admin@gmail.com");
    cy.get(".phone-input").type("admin");
    cy.get(".phone-input").should("have.value", "admin");
  });

  it("Mengirimkan data login", () => {
    cy.intercept("POST", "https://jsonplaceholder.typicode.com/users").as("getUsers");
    cy.get(".email-input").type("admin@gmail.com");
    cy.get(".phone-input").type("admin");
    cy.get(".login-button").click();
    cy.wait("@getUsers");
    cy.get(".login-result").should("exist");
  });
});
