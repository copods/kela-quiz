/// <reference types="Cypress">

import { includes } from "cypress/types/lodash"

describe('Test for Logout, SideNav', () => {
  it('Sample Login', () => {
    cy.visit("/sign-in")
    cy.get('#email').type('anurag@copods.co').should('have.value', 'anurag@copods.co')
    cy.get('#password').type('anuragpatel').should('have.value', 'anuragpatel')
    cy.findByRole("button").click();
  })


  it('Test to Direct to Dashboard after Login', () => {
    cy.visit("/sign-in")
    cy.get('#email').type('anurag@copods.co').should('have.value', 'anurag@copods.co')
    cy.get('#password').type('anuragpatel').should('have.value', 'anuragpatel')
    cy.findByRole("button").click()

    cy.location('pathname', { timeout: 60000 })
      .should('include', '/admin/dashboard');

  })

  it('Test for Routing and Active Tab for Results', () => {
    cy.visit("/sign-in")
    cy.get('#email').type('anurag@copods.co').should('have.value', 'anurag@copods.co')
    cy.get('#password').type('anuragpatel').should('have.value', 'anuragpatel')
    cy.findByRole("button").click();

    cy.get('a').find('#Results').should('have.text', 'Results').click()
    cy.location('pathname', { timeout: 60000 })
      .should('include', '/admin/results');
  })

  it('Test for Routing and Active Tab for Tests', () => {
    cy.visit("/sign-in")
    cy.get('#email').type('anurag@copods.co').should('have.value', 'anurag@copods.co')
    cy.get('#password').type('anuragpatel').should('have.value', 'anuragpatel')
    cy.findByRole("button").click();

  
    cy.get('a').find('#Tests').should('have.text', 'Tests').click()
    cy.location('pathname', { timeout: 60000 })
      .should('include', '/admin/tests')
  })

  it('Test for Routing and Active Tab for Members', () => {
    cy.visit("/sign-in")
    cy.get('#email').type('anurag@copods.co').should('have.value', 'anurag@copods.co')
    cy.get('#password').type('anuragpatel').should('have.value', 'anuragpatel')
    cy.findByRole("button").click();


    cy.get('a').find('#Members').should('have.text', 'Members').click()
    cy.location('pathname', { timeout: 60000 })
      .should('include', '/admin/members')
  })

  it('Test for Active Tab Color', () => {
    cy.visit("/sign-in")
    cy.get('#email').type('anurag@copods.co').should('have.value', 'anurag@copods.co')
    cy.get('#password').type('anuragpatel').should('have.value', 'anuragpatel')
    cy.findByRole("button").click();


    cy.get('a').find('#Members').should('have.text', 'Members').click()
    cy.location('pathname', { timeout: 60000 })
      .should('include', '/admin/members')
    cy.get('a').should('have.class', 'bg-blue-50')
  })

  it('Test to redirect to the login page on log out', () => {
    cy.get('form').click().url().should('includes', '/sign-in')
  })

})