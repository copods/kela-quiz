/// <reference types="Cypress"/>
describe('Members test', () => {
  it('Sample Login', () => {
    cy.visit('/sign-in')
    cy.get('#email')
      .type('careers@copods.co')
      .should('have.value', 'careers@copods.co')
    cy.get('#password')
      .type('kQuiz@copods')
      .should('have.value', 'kQuiz@copods')
    cy.findByRole('button').click()
    cy.url().should('includes', '/dashboard')
    cy.visit('/members')
    // filling input fields
    cy.get('#addMember').click()
    cy.get('#firstName').type('shisui')
    cy.get('#lastName').type('uchiha')
    cy.get('#email')
      .type('shisui.uchiha@copods.co')
      .should('have.value', 'shisui.uchiha@copods.co')
    cy.get('#addUser').click()
    // for cancel button
    cy.get('#addMember').click()
    cy.get('#cancel').click()

    // for close icon
    cy.get('#addMember').click()
    cy.get('#crossIcon').click()

    cy.get('#deleteButton').click()
    cy.get('#deleteConfirm').click()
  })
})
