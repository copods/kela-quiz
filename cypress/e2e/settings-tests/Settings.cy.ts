import { cypress } from '~/constants/common.constants'

describe('Test for settings', () => {
  beforeEach('sign-in', () => {
    cy.visit('/sign-in')
    cy.get('input[name="email"]')
      .focus()
      .clear()
      .type('careers@copods.co')
      .should('have.value', cypress.email)
    cy.get('input[name="password"]')
      .focus()
      .clear()
      .type('kQuiz@copods')
      .should('have.value', cypress.password)
    cy.get('[data-cy="submit"]').click()
    cy.location('pathname').should('include', '/members')
  })
  xit('Checking heading of settings page having a text', () => {
    cy.get('a')
      .find('#Settings', { timeout: 8000 })
      .should('have.text', 'Settings')
      .click()
    cy.location('pathname', { timeout: 6000 }).should(
      'include',
      '/settings/general'
    )
    cy.get('h1').should('have.text', 'Settings')
  })
  xit('Checking gap between two tabs will be correct', () => {
    cy.get('a')
      .find('#Settings', { timeout: 8000 })
      .should('have.text', 'Settings')
      .click()
    cy.location('pathname', { timeout: 6000 }).should(
      'include',
      '/settings/general'
    )
    cy.get('.tabsWrapper').should('have.css', `gap`, '20px')
  })
  xit('Checking heading of settings page having a correct classes applied', () => {
    cy.get('a')
      .find('#Settings', { timeout: 8000 })
      .should('have.text', 'Settings')
      .click()
    cy.location('pathname', { timeout: 6000 }).should(
      'include',
      '/settings/general'
    )
    cy.get('h1').should('to.have.class', 'text-3xl font-bold')
  })
  xit('Checking active tab is general', () => {
    cy.get('a')
      .find('#Settings', { timeout: 8000 })
      .should('have.text', 'Settings')
      .click()
    cy.location('pathname', { timeout: 6000 }).should(
      'include',
      '/settings/general'
    )

    cy.get('#General').within(() => {
      cy.get('hr').should(
        'have.class',
        'h-1 w-full rounded-1 border-0 bg-primary'
      )
    })
    cy.get('#General').should('have.text', 'General').click()
    cy.location('pathname').should('include', '/settings/')
  })
  xit('Checking general tab having correct text', () => {
    cy.get('a')
      .find('#Settings', { timeout: 8000 })
      .should('have.text', 'Settings')
      .click()
    cy.location('pathname', { timeout: 6000 }).should(
      'include',
      '/settings/general'
    )
    cy.get('#General').should('have.text', 'General').click()
  })
  xit('Checking active tab is workspace', () => {
    cy.get('a')
      .find('#Settings', { timeout: 8000 })
      .should('have.text', 'Settings')
      .click()
    cy.location('pathname', { timeout: 6000 }).should(
      'include',
      '/settings/general'
    )
    cy.get('#Workspace').should('have.text', 'Workspace').click()
    cy.get('#Workspace').within(() => {
      cy.get('hr').should(
        'have.class',
        'h-1 w-full rounded-1 border-0 bg-primary'
      )
    })
    cy.get('#Workspace').should('have.text', 'Workspace').click()
  })
  xit('Checking workspace tab having correct text', () => {
    cy.get('a')
      .find('#Settings', { timeout: 8000 })
      .should('have.text', 'Settings')
      .click()
    cy.location('pathname', { timeout: 6000 }).should(
      'include',
      '/settings/general'
    )
    cy.get('#Workspace').should('have.text', 'Workspace').click()
  })

  xit('Checking content heading in general tab having a correct class', () => {
    cy.get('a')
      .find('#Settings', { timeout: 8000 })
      .should('have.text', 'Settings')
      .click()
    cy.location('pathname', { timeout: 6000 }).should(
      'include',
      '/settings/general'
    )
    cy.get('h3').should('have.class', 'text-lg font-semibold')
  })
  xit('Checking reset password pop up will be open after clicking on Click to change', () => {
    cy.get('a')
      .find('#Settings', { timeout: 8000 })
      .should('have.text', 'Settings')
      .click()
    cy.location('pathname', { timeout: 6000 }).should(
      'include',
      '/settings/general'
    )
    cy.get('.resetPassOpenPopUpLink')
      .should('have.text', 'Click to change')
      .click()
    cy.get('#resetPassword-pop-up-model').should('be.visible')
  })
  xit('Checking reset password pop up will be close after clicking on cross icon', () => {
    cy.get('a')
      .find('#Settings', { timeout: 8000 })
      .should('have.text', 'Settings')
      .click()
    cy.location('pathname', { timeout: 6000 }).should(
      'include',
      '/settings/general'
    )
    cy.get('.resetPassOpenPopUpLink')
      .should('have.text', 'Click to change')
      .click()
    cy.get('#resetPassword-pop-up-model').should('be.visible')
    cy.get('#reset-password-popup-close-icon').click()
    cy.get('#resetPassword-pop-up-model').should('not.exist')
  })
  xit('Checking heading of reset password pop up ', () => {
    cy.get('a')
      .find('#Settings', { timeout: 8000 })
      .should('have.text', 'Settings')
      .click()
    cy.location('pathname', { timeout: 6000 }).should(
      'include',
      '/settings/general'
    )
    cy.get('.resetPassOpenPopUpLink')
      .should('have.text', 'Click to change')
      .click()
    cy.get('h2').should('have.text', 'Reset Password')
  })
  xit('Checking heading of reset password pop up have focused after opening the reset password pop up ', () => {
    cy.get('a')
      .find('#Settings', { timeout: 8000 })
      .should('have.text', 'Settings')
      .click()
    cy.location('pathname', { timeout: 6000 }).should(
      'include',
      '/settings/general'
    )
    cy.get('.resetPassOpenPopUpLink')
      .should('have.text', 'Click to change')
      .click()
    cy.get('h2').should('be.focused')
  })
  xit('Checking reset password pop up input fields exists', () => {
    cy.get('a')
      .find('#Settings', { timeout: 8000 })
      .should('have.text', 'Settings')
      .click()
    cy.location('pathname', { timeout: 6000 }).should(
      'include',
      '/settings/general'
    )
    cy.get('.resetPassOpenPopUpLink')
      .should('have.text', 'Click to change')
      .click()
    cy.get('#resetPassword-pop-up-model').should('be.visible')
    cy.get('#oldPassword', { timeout: 6000 }).should('be.visible')
    cy.get('#newPassword').should('be.visible')
    cy.get('#confirmNewPassword').should('be.visible')
  })
  xit('Checking gap between input-container-wrapper', () => {
    cy.get('a')
      .find('#Settings', { timeout: 8000 })
      .should('have.text', 'Settings')
      .click()
    cy.location('pathname', { timeout: 6000 }).should(
      'include',
      '/settings/general'
    )
    cy.get('.resetPassOpenPopUpLink')
      .should('have.text', 'Click to change')
      .click()
    cy.get('.input-container-wrapper').should('have.css', `gap`, `24px`)
  })
  xit('Checking reset password pop up old password input field have focus', () => {
    cy.get('a')
      .find('#Settings', { timeout: 8000 })
      .should('have.text', 'Settings')
      .click()
    cy.location('pathname', { timeout: 6000 }).should(
      'include',
      '/settings/general'
    )
    cy.get('.resetPassOpenPopUpLink')
      .should('have.text', 'Click to change')
      .click()
    cy.get('#resetPassword-pop-up-model').should('be.visible')
    cy.get('#oldPassword', { timeout: 6000 }).click().should('be.focused')
  })
  xit('Checking reset password pop up new password input field have focus', () => {
    cy.get('a')
      .find('#Settings', { timeout: 8000 })
      .should('have.text', 'Settings')
      .click()
    cy.location('pathname', { timeout: 6000 }).should(
      'include',
      '/settings/general'
    )
    cy.get('.resetPassOpenPopUpLink')
      .should('have.text', 'Click to change')
      .click()
    cy.get('#resetPassword-pop-up-model').should('be.visible')
    cy.get('#newPassword').should('be.visible').click().should('be.focused')
  })
  xit('Checking reset password pop up confirm password input field have focus', () => {
    cy.get('a')
      .find('#Settings', { timeout: 8000 })
      .should('have.text', 'Settings')
      .click()
    cy.location('pathname', { timeout: 6000 }).should(
      'include',
      '/settings/general'
    )
    cy.get('.resetPassOpenPopUpLink')
      .should('have.text', 'Click to change')
      .click()
    cy.get('#resetPassword-pop-up-model').should('be.visible')
    cy.get('#confirmNewPassword').click().should('be.focused')
  })
  xit('Checking reset password pop up old password label have correct text', () => {
    cy.get('a')
      .find('#Settings', { timeout: 8000 })
      .should('have.text', 'Settings')
      .click()
    cy.location('pathname', { timeout: 6000 }).should(
      'include',
      '/settings/general'
    )
    cy.get('.resetPassOpenPopUpLink')
      .should('have.text', 'Click to change')
      .click()
    cy.get('#oldPassword', { timeout: 6000 })
      .parent()
      .parent()
      .within(() => {
        cy.get('label').should('have.text', 'Enter Old Password')
      })
  })
  xit('Checking reset password pop up new password label have correct text', () => {
    cy.get('a')
      .find('#Settings', { timeout: 8000 })
      .should('have.text', 'Settings')
      .click()
    cy.location('pathname', { timeout: 6000 }).should(
      'include',
      '/settings/general'
    )
    cy.get('.resetPassOpenPopUpLink')
      .should('have.text', 'Click to change')
      .click()
    cy.get('#newPassword', { timeout: 6000 })
      .parent()
      .parent()
      .within(() => {
        cy.get('label').should('have.text', 'Enter New Password')
      })
  })
  xit('Checking reset password pop up confirm new password label have correct text', () => {
    cy.get('a')
      .find('#Settings', { timeout: 8000 })
      .should('have.text', 'Settings')
      .click()
    cy.location('pathname', { timeout: 6000 }).should(
      'include',
      '/settings/general'
    )
    cy.get('.resetPassOpenPopUpLink')
      .should('have.text', 'Click to change')
      .click()
    cy.get('#confirmNewPassword', { timeout: 6000 })
      .parent()
      .parent()
      .within(() => {
        cy.get('label').should('have.text', 'Confirm New Password')
      })
  })
  xit('Checking reset password pop up old password label have correct class', () => {
    cy.get('a')
      .find('#Settings', { timeout: 8000 })
      .should('have.text', 'Settings')
      .click()
    cy.location('pathname', { timeout: 6000 }).should(
      'include',
      '/settings/general'
    )
    cy.get('.resetPassOpenPopUpLink')
      .should('have.text', 'Click to change')
      .click()
    cy.get('#oldPassword', { timeout: 6000 })
      .parent()
      .parent()
      .within(() => {
        cy.get('label').should('have.class', 'text-gray-800')
      })
  })
  xit('Checking reset password pop up new password label have correct class', () => {
    cy.get('a')
      .find('#Settings', { timeout: 8000 })
      .should('have.text', 'Settings')
      .click()
    cy.location('pathname', { timeout: 6000 }).should(
      'include',
      '/settings/general'
    )
    cy.get('.resetPassOpenPopUpLink')
      .should('have.text', 'Click to change')
      .click()
    cy.get('#newPassword', { timeout: 6000 })
      .parent()
      .parent()
      .within(() => {
        cy.get('label').should('have.class', 'text-gray-800')
      })
  })
  xit('Checking reset password pop up confirm new password label have correct class', () => {
    cy.get('a')
      .find('#Settings', { timeout: 8000 })
      .should('have.text', 'Settings')
      .click()
    cy.location('pathname', { timeout: 6000 }).should(
      'include',
      '/settings/general'
    )
    cy.get('.resetPassOpenPopUpLink')
      .should('have.text', 'Click to change')
      .click()
    cy.get('#confirmNewPassword', { timeout: 6000 })
      .parent()
      .parent()
      .within(() => {
        cy.get('label').should('have.class', 'text-gray-800')
      })
  })
  xit('Checking reset password pop up submit button will be disabled if all input fields are not filled', () => {
    cy.get('a')
      .find('#Settings', { timeout: 8000 })
      .should('have.text', 'Settings')
      .click()
    cy.location('pathname', { timeout: 6000 }).should(
      'include',
      '/settings/general'
    )
    cy.get('.resetPassOpenPopUpLink')
      .should('have.text', 'Click to change')
      .click()
    cy.get('[data-cy="submit"]').should(
      'have.class',
      'disabled:bg-primaryDisabled'
    )
  })
  xit('Checking reset password pop up submit button will be enabled if all input fields are  filled', () => {
    cy.get('a')
      .find('#Settings', { timeout: 8000 })
      .should('have.text', 'Settings')
      .click()
    cy.location('pathname', { timeout: 6000 }).should(
      'include',
      '/settings/general'
    )
    cy.get('.resetPassOpenPopUpLink')
      .should('have.text', 'Click to change')
      .click()
    cy.get('#oldPassword', { timeout: 6000 })
      .should('be.visible')
      .clear()
      .type('password')
    cy.get('#newPassword').should('be.visible').clear().type('newPassword')
    cy.get('#confirmNewPassword')
      .should('be.visible')
      .clear()
      .type('confirmPassword')
    cy.get('[data-cy="submit"]').should('have.class', 'hover:bg-primaryHover')
  })
  xit('Checking reset password pop up submit button text', () => {
    cy.get('a')
      .find('#Settings', { timeout: 8000 })
      .should('have.text', 'Settings')
      .click()
    cy.location('pathname', { timeout: 6000 }).should(
      'include',
      '/settings/general'
    )
    cy.get('.resetPassOpenPopUpLink')
      .should('have.text', 'Click to change')
      .click()
    cy.get('#oldPassword', { timeout: 6000 })
      .should('be.visible')
      .clear()
      .type('password')
    cy.get('#newPassword').should('be.visible').clear().type('newPassword')
    cy.get('#confirmNewPassword')
      .should('be.visible')
      .clear()
      .type('confirmPassword')
    cy.get('[data-cy="submit"]').should('have.text', 'Reset Password')
  })
  xit('Checking if new password and confirm password input fields input values not matched then thowing a proper error', () => {
    cy.get('a')
      .find('#Settings', { timeout: 8000 })
      .should('have.text', 'Settings')
      .click()
    cy.location('pathname', { timeout: 6000 }).should(
      'include',
      '/settings/general'
    )
    cy.get('.resetPassOpenPopUpLink')
      .should('have.text', 'Click to change')
      .click()
    cy.get('#oldPassword', { timeout: 6000 })
      .should('be.visible')
      .clear()
      .type('password')
    cy.get('#newPassword').should('be.visible').clear().type('newPassword')
    cy.get('#confirmNewPassword')
      .should('be.visible')
      .clear()
      .type('confirmPassword')
    cy.get('[data-cy="submit"]')
      .should('have.class', 'hover:bg-primaryHover')
      .click()
    cy.get('#Confirm-password-error').should(
      'have.text',
      'Password is not matched'
    )
  })
  xit('Checking class of error text if new password and confirm password input fields input values not matched', () => {
    cy.get('a')
      .find('#Settings', { timeout: 8000 })
      .should('have.text', 'Settings')
      .click()
    cy.location('pathname', { timeout: 6000 }).should(
      'include',
      '/settings/general'
    )
    cy.get('.resetPassOpenPopUpLink')
      .should('have.text', 'Click to change')
      .click()
    cy.get('#oldPassword', { timeout: 6000 })
      .should('be.visible')
      .clear()
      .type('password')
    cy.get('#newPassword').should('be.visible').clear().type('newPassword')
    cy.get('#confirmNewPassword')
      .should('be.visible')
      .clear()
      .type('confirmPassword')
    cy.get('[data-cy="submit"]')
      .should('have.class', 'hover:bg-primaryHover')
      .click()
    cy.get('#Confirm-password-error').should('have.class', 'text-red-700')
  })
  xit('Checking if new password and confirm password input fields input values matched but total charactes are less than 8', () => {
    cy.get('a')
      .find('#Settings', { timeout: 8000 })
      .should('have.text', 'Settings')
      .click()
    cy.location('pathname', { timeout: 6000 }).should(
      'include',
      '/settings/general'
    )
    cy.get('.resetPassOpenPopUpLink')
      .should('have.text', 'Click to change')
      .click()
    cy.get('#oldPassword', { timeout: 6000 })
      .should('be.visible')
      .clear()
      .type('password')
    cy.get('#newPassword').should('be.visible').clear().type('Password')
    cy.get('#confirmNewPassword').should('be.visible').clear().type('Password')
    cy.get('[data-cy="submit"]')
      .should('have.class', 'hover:bg-primaryHover')
      .click()
    cy.get('#New-password-error').should(
      'have.text',
      'Password should have maximum 8 characters only'
    )
  })

  xit('Checking class of error text if new password and confirm password input fields input values matched but total charactes are more than 8', () => {
    cy.get('a')
      .find('#Settings', { timeout: 8000 })
      .should('have.text', 'Settings')
      .click()
    cy.location('pathname', { timeout: 6000 }).should(
      'include',
      '/settings/general'
    )
    cy.get('.resetPassOpenPopUpLink')
      .should('have.text', 'Click to change')
      .click()
    cy.get('#oldPassword', { timeout: 6000 })
      .should('be.visible')
      .clear()
      .type('password')
    cy.get('#newPassword').should('be.visible').clear().type('kQuiz@careers')
    cy.get('#confirmNewPassword')
      .should('be.visible')
      .clear()
      .type('kQuiz@careers')
    cy.get('[data-cy="submit"]')
      .should('have.class', 'hover:bg-primaryHover')
      .click()
    cy.get('#New-password-error').should('have.class', 'text-red-700')
  })
  xit('Checking if old password is not matched filled input field then throwing a error', () => {
    cy.get('a')
      .find('#Settings', { timeout: 8000 })
      .should('have.text', 'Settings')
      .click()
    cy.location('pathname', { timeout: 6000 }).should(
      'include',
      '/settings/general'
    )
    cy.get('.resetPassOpenPopUpLink')
      .should('have.text', 'Click to change')
      .click()
    cy.get('#oldPassword', { timeout: 6000 })
      .should('be.visible')
      .clear()
      .type('password')
    cy.get('#newPassword').should('be.visible').clear().type('kQuiz')
    cy.get('#confirmNewPassword').should('be.visible').clear().type('kQuiz')
    cy.get('[data-cy="submit"]')
      .should('have.class', 'hover:bg-primaryHover')
      .click()
    cy.get('#Password-error').should('have.text', 'Password is invalid')
  })
  xit('Checking class of error if old password is not matched filled input field ', () => {
    cy.get('a')
      .find('#Settings', { timeout: 8000 })
      .should('have.text', 'Settings')
      .click()
    cy.location('pathname', { timeout: 6000 }).should(
      'include',
      '/settings/general'
    )
    cy.get('.resetPassOpenPopUpLink')
      .should('have.text', 'Click to change')
      .click()
    cy.get('#oldPassword', { timeout: 6000 })
      .should('be.visible')
      .clear()
      .type('password')
    cy.get('#newPassword').should('be.visible').clear().type('kQuiz')
    cy.get('#confirmNewPassword').should('be.visible').clear().type('kQuiz')
    cy.get('[data-cy="submit"]')
      .should('have.class', 'hover:bg-primaryHover')
      .click()
    cy.get('#Password-error').should('have.class', 'text-red-700')
  })
  // it('checking if toster showing correct message after successfully reset password and checking if by login in from reseted password', () => {
  //   cy.get('a')
  //     .find('#Settings', { timeout: 8000 })
  //     .should('have.text', 'Settings')
  //     .click()
  //   cy.location('pathname', { timeout: 6000 }).should(
  //     'include',
  //     '/settings/general'
  //   )
  //   cy.get('.resetPassOpenPopUpLink')
  //     .should('have.text', 'Click to change')
  //     .click()
  //   cy.get('#oldPassword', { timeout: 6000 })
  //     .should('be.visible')
  //     .clear()
  //     .type('kQuiz@copods')
  //   cy.get('#newPassword').should('be.visible').clear().type('kQuiz')
  //   cy.get('#confirmNewPassword').should('be.visible').clear().type('kQuiz')
  //   cy.get('[data-cy="submit"]')
  //     .should('have.class', 'hover:bg-primaryHover')
  //     .click()
  //   cy.get('.Toastify__toast-body', { timeout: 6000 }).should(
  //     'have.text',
  //     'Password changed successfully !'
  //   )
  //   cy.get('#logout-button').should('be.visible').click()
  //   cy.visit('/sign-in')
  //   cy.get('input[name="email"]')
  //     .focus()
  //     .clear()
  //     .type('careers@copods.co')
  //     .should('have.value', cypress.email)
  //   cy.get('input[name="password"]')
  //     .focus()
  //     .clear()
  //     .type('kQuiz')
  //     .should('have.value', 'kQuiz')
  //   cy.get('[data-cy="submit"]').click()
  //   cy.location('pathname').should('include', '/members')
  // })
})
