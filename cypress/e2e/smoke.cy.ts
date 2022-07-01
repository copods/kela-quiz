/// <reference types="Cypress"/>

describe('smoke tests', () => {
  it('Successfully Login', () => {
    cy.visit('/sign-in')
    cy.get('#email').type('careers@copods.co')
    cy.get('#password').type('kQuiz@copods')
    cy.findByRole('button').click()
    cy.url().should('includes', '/dashboard')
    cy.getCookies()
      .should('have.length', 1)
      .then((cookies) => {
        expect(cookies[0]).to.have.property('name', '__session')
      })
  })

  it('Invalid Email Error Message', () => {
    cy.visit('/sign-in')
    cy.get('#email').type('ayushi@copods.co')
    cy.get('#password').type('kQuiz@copods')
    cy.findByRole('button').click()
    cy.get('#email-error').should('have.text', 'Email is invalid')
  })
  it('Invalid Password Error Message', () => {
    cy.visit('/sign-in')
    cy.get('#email').type('careers@copods.co')
    cy.get('#password').type('anuragpate')
    cy.findByRole('button').click()
    cy.get('#password-error').should('have.text', 'Password is invalid')
  })
})
