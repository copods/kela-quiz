import {
  getCopyLinkId,
  getFirstName,
  getGroupByTestId,
  geth1,
  getInvitePopup,
  getLastName,
  getRegistrationButtonId,
  getVeriticalIconId,
} from 'support/common-function'

describe('Test for Candidate assessment Registration', () => {
  const emailId = Math.random()
  let examLink = ''
  it('Check candidate is in correct exam link', () => {
    cy.login()
    cy.customVisit('/members')
    getGroupByTestId().click()
    cy.get('a').find('#tests').click()
    getInvitePopup().click()
    cy.get('.inviteInput').type(`ki${emailId}@copods.co`)
    cy.get('[data-cy="submit"]').click()
    getGroupByTestId().click()
    cy.get('.groupByItemTest').each((el) => {
      const itemText = el.text()
      if (itemText === 'Quantitative - assessment1') {
        cy.wrap(el).click()
      }
    })
    getVeriticalIconId().click()
    getCopyLinkId().should('be.visible').click()
    cy.wrap(
      Cypress.automation('remote:debugger:protocol', {
        command: 'Browser.grantPermissions',
        params: {
          permissions: ['clipboardReadWrite', 'clipboardSanitizedWrite'],
          origin: window.location.origin,
        },
      })
    )

    cy.window()
      .its('navigator.clipboard')
      .invoke('readText')
      .then((text) => {
        examLink = text.split('3000')[1]
        cy.visit(examLink)
      })
  })

  it('Checks, register heading should be visible', () => {
    cy.visit(examLink)
    geth1().should('be.visible')
  })

  it('Checks, First and Last Name field of the page and button should be disable', () => {
    cy.visit(examLink)
    getFirstName()
      .should('be.visible')
      .should('have.attr', 'placeholder', 'Enter first name')

    getLastName()
      .should('be.visible')
      .should('have.attr', 'placeholder', 'Enter last name')

    getRegistrationButtonId().should('be.disabled')
  })

  it('Checks, button color when it is disabled', () => {
    cy.visit(examLink)
    getRegistrationButtonId().should(
      'have.css',
      'background-color',
      'rgb(162, 164, 214)'
    )
  })

  it('Checks, first name is empty button should be disabled', () => {
    cy.visit(examLink)
    getFirstName().should('be.visible').should('be.empty')
    getLastName().should('be.visible').type('jain')
    getRegistrationButtonId().should('be.disabled')
  })

  it('Checks, last name is empty submit buttom should be disabled', () => {
    cy.visit(examLink)
    getFirstName().should('be.visible').type('ayushi')
    getLastName().should('be.visible').should('be.empty')
    getRegistrationButtonId().should('be.disabled')
  })

  it('Checks, submitting the registeration form', () => {
    cy.visit(examLink)
    getFirstName().type('aa')
    getLastName().type('Jain')
    getRegistrationButtonId()
      .should('be.visible')
      .should('have.css', 'background-color', 'rgb(53, 57, 136)')
      .click()
    cy.url().should('include', `${examLink}/verification`)
  })
})
