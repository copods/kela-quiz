/// <reference types="Cypress"/>

describe('smoke tests', () => {
  it ("Successfully Login", ()=>{
      cy.visit("/sign-in");
      cy.get("#email").type("anurag@copods.co")
      cy.get("#password").type("anuragpatel")
      cy.findByRole("button").click();
      cy.url().should("includes","/admin/dashboard");
      cy.getCookies()
      .should('have.length', 1)
      .then((cookies) => {
      expect(cookies[0]).to.have.property('name', '__session')
     })
  })
  it ("Email Error Message", ()=>{
      cy.visit("/sign-in");
      cy.get("#email").type("anuragpods.co"); 
      cy.get("#password").type("anuragpatel");
      cy.findByRole("button").click();
      cy.get("#email-error").should("have.text","Email is invalid");
  })
  it ("Password Error Message", ()=>{
    cy.visit("/sign-in");
    cy.get("#email").type("anurag@copods.co"); 
    cy.get("#password").type("anuragp");
    cy.findByRole("button").click();
    cy.get("#password-error").should("have.text","Password is too short");
  })

  it ("Invalid Email Error Message", ()=>{
    cy.visit("/sign-in");
    cy.get("#email").type("ayushi@copods.co"); 
    cy.get("#password").type("anuragpatel");
    cy.findByRole("button").click();
    cy.get("#email-error").should("have.text","Invalid email");
  })
  it ("Invalid Password Error Message", ()=>{
    cy.visit("/sign-in");
    cy.get("#email").type("anurag@copods.co"); 
    cy.get("#password").type("anuragpate");
    cy.findByRole("button").click();
    cy.get("#password-error").should("have.text","Invalid password");
  })
})
