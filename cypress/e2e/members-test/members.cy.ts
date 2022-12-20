/// <reference types="Cypress"/>
import { cypress } from '~/constants/common.constants'
const memberEmail = 'johndoe@example.com'

describe('Test for members', () => {
  beforeEach('sign-in', () => {
    cy.login()
    cy.customVisit('/members')
  })
  it('checks, member heading should be visible', () => {
    cy.get('.membersHeading').should('be.visible')
  })
  it('checks, member heading should have correct text', () => {
    cy.get('.membersHeading').should('have.text', 'Members')
  })
  it('checks, member heading should have tabIndex', () => {
    cy.get('.membersHeading').should('have.attr', 'tabindex', '0')
  })
  it('checks, member heading should be focused', () => {
    cy.get('.membersHeading')
      .should('have.attr', 'tabindex', '0')
      .click()
      .should('have.focus')
  })
  it('checks, invite member button should be visible', () => {
    cy.get('#invite-member').should('be.visible')
  })
  it('checks, invite member button should correct text', () => {
    cy.get('#invite-member').should('have.text', 'Invite Member')
  })
  it('checks, invite member button should correct background color', () => {
    cy.get('#invite-member').should(
      'have.css',
      'background-color',
      'rgb(53, 57, 136)'
    )
  })
  it('checks,invite member dialog header should be visible', () => {
    cy.get('#invite-member').should('have.text', 'Invite Member').click()
    cy.get('[data-cy="dialog-header"]', { timeout: 8000 }).should('be.visible')
  })
  it('checks,invite member dialog header should have correct text', () => {
    cy.get('#invite-member').should('have.text', 'Invite Member').click()
    cy.get('[data-cy="dialog-header"]', { timeout: 8000 }).should(
      'have.text',
      'Invite Member'
    )
  })
  it('checks,invite member dialog header should have tabIndex', () => {
    cy.get('#invite-member').should('have.text', 'Invite Member').click()
    cy.get('[data-cy="dialog-header"]', { timeout: 8000 }).should(
      'have.attr',
      'tabindex',
      '0'
    )
  })

  it('checks, invite member popup close icon should be visible', () => {
    cy.get('#invite-member').should('have.text', 'Invite Member').click()
    cy.get('#dialog-close-icon').should('be.visible')
  })
  it('checks, invite member popup close icon should have tabIndex', () => {
    cy.get('#invite-member').should('have.text', 'Invite Member').click()
    cy.get('#dialog-close-icon').should('have.attr', 'tabindex', '0')
  })
  it('checks, invite member popup close icon should have role image', () => {
    cy.get('#invite-member').should('have.text', 'Invite Member').click()
    cy.get('#dialog-close-icon').should('have.attr', 'role', 'img')
  })
  it('checks, invite member popup email input field should be visible', () => {
    cy.get('#invite-member').should('have.text', 'Invite Member').click()
    cy.get('#email').should('be.visible')
  })
  it('checks, invite member popup email input field should have tabIndex', () => {
    cy.get('#invite-member').should('have.text', 'Invite Member').click()
    cy.get('#email').should('have.attr', 'tabindex', '0')
  })
  it('checks, invite member popup email input field should have text type', () => {
    cy.get('#invite-member').should('have.text', 'Invite Member').click()
    cy.get('#email').should('have.attr', 'type', 'text')
  })
  it('checks, invite member popup email input field should have no value after opening the popup', () => {
    cy.get('#invite-member').should('have.text', 'Invite Member').click()
    cy.get('#email').should('have.value', '')
  })
  it('checks, invite member popup dropdown should be visible', () => {
    cy.get('#invite-member').should('have.text', 'Invite Member').click()
    cy.get('#dropdown').should('be.visible')
  })
  it('checks, invite member popup dropdown should have aria label', () => {
    cy.get('#invite-member').should('have.text', 'Invite Member').click()
    cy.get('#dropdown').should('have.attr', 'aria-label', 'Select')
  })
  it('checks, cancel button should have correct text', () => {
    cy.get('#invite-member').should('have.text', 'Invite Member').click()
    cy.get('#cancel-add-button').should('have.text', 'Cancel')
  })

  it('checks, cancel button should have tabindex', () => {
    cy.get('#invite-member').should('have.text', 'Invite Member').click()
    cy.get('#cancel-add-button').should('have.attr', 'tabindex', '0')
  })
  it('checks,cancel Add test button functionality', () => {
    cy.get('#invite-member').should('have.text', 'Invite Member').click()
    cy.get('#cancel-add-button').click()
  })
  it('checks,Invite button should be visible', () => {
    cy.get('#invite-member').should('have.text', 'Invite Member').click()
    cy.get('#invite-button').should('be.visible')
  })
  it('checks,Invite button should have correct text', () => {
    cy.get('#invite-member').should('have.text', 'Invite Member').click()
    cy.get('#invite-button').should('have.text', 'Invite')
  })
  it('checks,Invite button should be disabled', () => {
    cy.get('#invite-member').should('have.text', 'Invite Member').click()
    cy.get('#invite-button').should('have.attr', 'disabled')
  })
  it('checks,Invite button should be clickable after filling all input values in popup', () => {
    cy.get('#invite-member').should('have.text', 'Invite Member').click()
    cy.get('#email')
      .should('have.attr', 'type', 'text')
      .type('johndoe@example.com')
    cy.get('#invite-button').should(
      'have.css',
      'background-color',
      'rgb(53, 57, 136)'
    )
  })
  it('checks,joined member heading should be visible', () => {
    cy.get('#joined-member-heading').should('be.visible')
  })
  it('checks,joined member heading should have test', () => {
    cy.get('#joined-member-heading').should('have.text', 'Joined Members')
  })
  it('checks,joined member heading should have tabIndex', () => {
    cy.get('#joined-member-heading').should('have.attr', 'tabindex', '0')
  })
  it('checks,joined member heading should have aria label', () => {
    cy.get('#joined-member-heading').should(
      'have.attr',
      'aria-label',
      'Joined Members'
    )
  })
  it('checks,invite member heading should be visible', () => {
    cy.get('#invited-member-heading').should('be.visible')
  })
  it('checks,invite member heading should have test', () => {
    cy.get('#invited-member-heading').should('have.text', 'Invited Member')
  })
  it('checks,invite member heading should have tabIndex', () => {
    cy.get('#invited-member-heading').should('have.attr', 'tabindex', '0')
  })
  it('checks,invite member heading should have aria label', () => {
    cy.get('#invited-member-heading').should(
      'have.attr',
      'aria-label',
      'Invited Member'
    )
  })
  it('checks,resend member invite button should be visible', () => {
    cy.get('#resend-member-invite').should('be.visible')
  })
  it('checks,resend member invite button have tabindex', () => {
    cy.get('#resend-member-invite')
      .parent()
      .should('have.attr', 'tabindex', '0')
  })
  it('checks,resend member invite button have tabindex', () => {
    cy.get('#resend-member-invite')
      .parent()
      .should('have.attr', 'tabindex', '0')
  })
  it('Test for conforming ,new member is added in a list or not', () => {
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
    cy.get('#invite-member').should('have.text', cypress.addMember).click()
    cy.get('#cancel-add-button').should('have.text', 'Cancel').click()
  })

  it('Check for owner tag', () => {
    const getElement = cy.get('[data-cy="badge-tag"]')

    getElement.should('have.length', 1)
  })
})
