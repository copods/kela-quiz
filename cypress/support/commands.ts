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
    }
  }
}

function login() {
  let formData = new FormData()

  // @TODO: Need to change this credentials with `careers.copods.demo@gmail.com`
  formData.append('email', Cypress.env('email'))
  formData.append('password', Cypress.env('password'))
  formData.append('redirectTo', '/dashboard')

  const __sessionExist = window.localStorage.getItem('__session')

  // if (!__sessionExist)
  cy.request({
    method: 'POST',
    url: 'http://localhost:3000/sign-in?_data=routes%2Fsign-in',
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

Cypress.Commands.add('login', login)
Cypress.Commands.add('cleanupUser', cleanupUser)
Cypress.Commands.add('customVisit', customVisit)

/*
eslint
  @typescript-eslint/no-namespace: "off",
*/
