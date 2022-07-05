/// <reference types="Cypress"/>
describe('Members test', () => {
  it('Sample members', () => {
    cy.visit('/sign-in')
    cy.get('#email').clear()
      .type('careers@copods.co')
      .should('have.value', 'careers@copods.co')
    cy.get('#password').clear()
      .type('kQuiz@copods')
      .should('have.value', 'kQuiz@copods')
    cy.findByRole('button').click()

    cy.get('a').find('#Members').should('have.text', 'Members').click()
    cy.location('pathname', { timeout: 60000 }).should('include', '/members')
    // adding member and checking cancel button on popup
    cy.get('#addMember').click()
    cy.get('#firstName').type('shisui')
    cy.get('#lastName').type('uchiha')
    cy.get('#email')
      .type('shisui.uchiha@copods.co')
      .should('have.value', 'shisui.uchiha@copods.co')
    cy.get('#addUser').click()
    cy.get('#addMember').click()
    cy.get('#cancel').click()

  })
  // it('Sample members', () => {
    // checking delete and cancel button on popup
  //   cy.get('#addMember').click()
  //   cy.get('#crossIcon').click()
  //   cy.get('#deleteButton').click()
  //   cy.get('#deleteConfirm').click()
  // })
})
