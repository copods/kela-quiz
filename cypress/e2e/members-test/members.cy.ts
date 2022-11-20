/// <reference types="Cypress"/>
import { cypress, members } from '~/constants/common.constants'
const memberEmail = 'johndoe@example.com'

describe('Test for members', () => {
  beforeEach('sign-in', () => {
    cy.login()
    cy.customVisit('/members')
  })
  it('Test for conforming ,new member is added in a list or not', () => {
    cy.get('a').find('#members').should('have.text', members.members).click()
    cy.location('pathname', { timeout: 60000 }).should('include', '/members')
    cy.get('.inviteMemberRow', { timeout: 8000 }).each(($el) => {
      cy.wrap($el).within((el) => {
        if (
          el[0].getElementsByClassName('memberMail')[0].innerHTML ===
          memberEmail
        ) {
          cy.get('.memberMail').should('have.text', memberEmail)
        }
      })
    })
  })
  it('Test for add-members popUp cancel button', () => {
    cy.get('a').find('#members').should('have.text', members.members).click()
    cy.location('pathname', { timeout: 60000 }).should('include', '/members')
    cy.get('#invite-member').should('have.text', cypress.addMember).click()
    cy.get('#cancel-add-button').should('have.text', 'Cancel').click()
  })
})
