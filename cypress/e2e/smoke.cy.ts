/// <reference types="Cypress"/>

import { faker } from '@faker-js/faker'

describe('smoke tests', () => {
  it('Login', () => {
    cy.visit('/sign-in')
    cy.get('#email')
      .type('anurag@copods.co')
      .should('have.value', 'anurag@copods.co')
    cy.get('#password').type('anuragpatel').should('have.value', 'anuragpatel')
    cy.findByRole('button').click()
    cy.url().should('includes', '/admin/dashboard')
  })
  // it ("Login Message Check", ()=>{
  //     cy.visit("/sign-in");
  //     cy.get("#email").type("anuragpods.co");
  //     cy.get("#password").type("anuragpatel").should("have.value","anuragpatel");
  //     cy.findByRole("button").click();
  //     cy.get("#email-error").should("have.value","Email is invalid");
  //     cy.url().should("includes","/admin/dashboard");
  // })
  // it("should allow you to register and login", () => {
  //   const loginForm = {
  //     email: `${faker.internet.userName()}@example.com`,
  //     password: faker.internet.password(),
  //   };
  //   cy.then(() => ({ email: loginForm.email })).as("user");
  //   cy.visit("/");
  //   cy.findByRole("link", { name: /sign up/i }).click();
  //   cy.findByRole("textbox", { name: /email/i }).type(loginForm.email);
  //   cy.findByLabelText(/password/i).type(loginForm.password);
  //   cy.findByRole("button", { name: /create account/i }).click();
  //   cy.findByRole("link", { name: /notes/i }).click();
  //   cy.findByRole("button", { name: /logout/i }).click();
  //   cy.findByRole("link", { name: /log in/i });
  // });
  // it("should allow you to make a note", () => {
  //   const testNote = {
  //     title: faker.lorem.words(1),
  //     body: faker.lorem.sentences(1),
  //   };
  //   cy.login();
  //   cy.visit("/");
  //   cy.findByRole("link", { name: /notes/i }).click();
  //   cy.findByText("No notes yet");
  //   cy.findByRole("link", { name: /\+ new note/i }).click();
  //   cy.findByRole("textbox", { name: /title/i }).type(testNote.title);
  //   cy.findByRole("textbox", { name: /body/i }).type(testNote.body);
  //   cy.findByRole("button", { name: /save/i }).click();
  //   cy.findByRole("button", { name: /delete/i }).click();
  //   cy.findByText("No notes yet");
  // });
})
