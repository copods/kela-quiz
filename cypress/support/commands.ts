/* eslint-disable @typescript-eslint/no-unused-vars */
import { faker } from '@faker-js/faker'
import { logIn } from '~/constants/common.constants'

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Logs in function for cypress testing.
       */
      login: typeof Function

      /**
       * Deletes the current @user
       *
       * @returns {typeof cleanupUser}
       * @memberof Chainable
       * @example
       *    cy.cleanupUser()
       * @example
       *    cy.cleanupUser({ email: 'whatever@example.com' })
       */
      cleanupUser: typeof cleanupUser

      /**
       * Logs in function for cypress testing.
       */
      customVisit: typeof Function

      /**
       * candidate Registration for Cypress testing
       */

      candidateRegistration: typeof Function

      /**
       *  candidate Registration for Cypress testing
       */
      CustomVisitOnCandidateSide: typeof Function
      /**
       *  candidate Verification for Cypress Testing
       */
      candidateVerification: typeof Function
      /**
       * candidate Name for Cypress testing
       */
      checkCandidateName: typeof Function
    }
  }
}
let ExamLink = ''
let candidateName = 'Ayushi'

function login() {
  let formData = new FormData()

  // @TODO: Need to change this credentials with `careers.copods.demo@gmail.com`
  formData.append('email', Cypress.env('email'))
  formData.append('password', Cypress.env('password'))
  formData.append('redirectTo', '/dashboard')

  const __sessionExist = window.localStorage.getItem('__session')

  if (!__sessionExist)
    cy.request({
      method: 'POST',
      url: '/sign-in?_data=routes%2Fsign-in',
      body: formData,
    }).then((resp) => {
      const { headers } = resp
      const __session =
        headers?.['set-cookie'] && headers?.['set-cookie'][0].split('=')[1]
      window.localStorage.setItem('__session', __session)
    })
}

function customVisit(path = '') {
  const headers = {
    Cookie: `__session=${window.localStorage.getItem('__session')}`,
  }
  cy.visit(`/${path}`, {
    method: 'GET',
    headers,
  })
  cy.wait(1000)
}

function cleanupUser({ email }: { email?: string } = {}) {
  if (email) {
    deleteUserByEmail(email)
  } else {
    cy.get('@user').then((user) => {
      const email = (user as { email?: string }).email
      if (email) {
        deleteUserByEmail(email)
      }
    })
  }
  cy.clearCookie('__session')
}

function deleteUserByEmail(email: string) {
  cy.exec(
    `npx ts-node --require tsconfig-paths/register ./cypress/support/delete-user.ts "${email}"`
  )
  cy.clearCookie('__session')
}

function candidateRegistration() {
  const emailId = Math.random()
  cy.viewport(1280, 720)
  cy.login()
  cy.customVisit('/members')
  cy.get('#group-by-tests').click()
  cy.get('a').find('#tests').click()
  cy.get('#invite-popup-open0').click()
  cy.get('.inviteInput').type(`ki${emailId}@copds.co`)
  cy.get('[data-cy="submit"]').click()
  cy.get('#group-by-tests').click()
  cy.get('.groupByItemTest').eq(0).click()
  cy.get('#vertical-icon', { timeout: 8000 }).click()
  cy.get('[data-cy="copy-link"]').should('be.visible').click()
  cy.window()
    .its('navigator.clipboard')
    .invoke('readText')
    .then((text) => {
      ExamLink = text
      cy.visit(text)
      cy.get('#firstName').type(candidateName)
      cy.get('#lastName').type('Jain')
      cy.get("[data-cy='submit-button']")
        .should('be.visible')
        .should('have.css', 'background-color', 'rgb(53, 57, 136)')
        .click()
      cy.url().should('eq', `${ExamLink}/verification`)
    })
}

function CustomVisitOnCandidateSide(path = '') {
  ExamLink && cy.visit(`${ExamLink}/${path}`)
}
function candidateVerification() {
  cy.CustomVisitOnCandidateSide('verification')
  cy.get('input[name="field-1"]').type('0')
  cy.get('input[name="field-2"]').type('0')
  cy.get('input[name="field-3"]').type('0')
  cy.get('input[name="field-4"]').type('0')
  cy.url().should('include', 'instructions')
}

function checkCandidateName() {
  cy.get('.heading')
    .should('be.visible')
    .should('have.text', `Welcome ${candidateName}`)
}

Cypress.Commands.add('login', login)
Cypress.Commands.add('cleanupUser', cleanupUser)
Cypress.Commands.add('customVisit', customVisit)
Cypress.Commands.add('candidateRegistration', candidateRegistration)
Cypress.Commands.add('CustomVisitOnCandidateSide', CustomVisitOnCandidateSide)
Cypress.Commands.add('candidateVerification', candidateVerification)
Cypress.Commands.add('checkCandidateName', checkCandidateName)

/*
eslint
  @typescript-eslint/no-namespace: "off",
*/
