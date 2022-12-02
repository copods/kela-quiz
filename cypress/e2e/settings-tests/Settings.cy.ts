import { settings, statusCheck, tabs } from '~/constants/common.constants'

describe('Test for settings', () => {
  beforeEach('sign-in', () => {
    cy.login()

    cy.customVisit('/members')
  })
  it('Checks heading of settings page having a text', () => {
    cy.get('a')
      .find('#Settings', { timeout: 8000 })
      .should('have.text', settings.settings)
      .click()
    cy.location('pathname', { timeout: 6000 }).should(
      'include',
      '/settings/general'
    )
    cy.get('h1').should('have.text', settings.settings)
  })
  it('Checks if gap between two tabs is correct', () => {
    cy.get('a')
      .find('#Settings', { timeout: 8000 })
      .should('have.text', settings.settings)
      .click()
    cy.location('pathname', { timeout: 6000 }).should(
      'include',
      '/settings/general'
    )
    cy.get('.tabsWrapper').should('have.css', `gap`, '20px')
  })
  it('Checks heading of settings page having a correct classes applied', () => {
    cy.get('a')
      .find('#Settings', { timeout: 8000 })
      .should('have.text', settings.settings)
      .click()
    cy.location('pathname', { timeout: 6000 }).should(
      'include',
      '/settings/general'
    )
    cy.get('h1').should('to.have.class', 'text-3xl font-bold')
  })
  it('Checks active tab is general', () => {
    cy.get('a')
      .find('#Settings', { timeout: 8000 })
      .should('have.text', settings.settings)
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
    cy.location('pathname').should('include', '/settings/')
  })
  it('Checks general tab having correct text', () => {
    cy.get('a')
      .find('#Settings', { timeout: 8000 })
      .should('have.text', settings.settings)
      .click()
    cy.location('pathname', { timeout: 6000 }).should(
      'include',
      '/settings/general'
    )
    cy.get('#General').should('have.text', tabs.general)
  })
  it('Checks active tab is workspace', () => {
    cy.get('a')
      .find('#Settings', { timeout: 8000 })
      .should('have.text', settings.settings)
      .click()
    cy.location('pathname', { timeout: 6000 }).should(
      'include',
      '/settings/general'
    )
    cy.get('#Workspaces').should('have.text', tabs.workspace).click()
    cy.get('#Workspaces').within(() => {
      cy.get('hr').should(
        'have.class',
        'h-1 w-full rounded-1 border-0 bg-primary'
      )
    })
  })
  it('Checks workspace tab having correct text', () => {
    cy.get('a')
      .find('#Settings', { timeout: 8000 })
      .should('have.text', settings.settings)
      .click()
    cy.location('pathname', { timeout: 6000 }).should(
      'include',
      '/settings/general'
    )
    cy.get('#Workspaces').should('have.text', tabs.workspace)
  })
  it('Checks content heading in general tab having a correct classes', () => {
    cy.get('a')
      .find('#Settings', { timeout: 8000 })
      .should('have.text', settings.settings)
      .click()
    cy.location('pathname', { timeout: 6000 }).should(
      'include',
      '/settings/general'
    )
    cy.get('h3').should('have.class', 'text-lg font-semibold')
  })
  it('Checks reset password pop up will be open after clicking on Click to change', () => {
    cy.get('a')
      .find('#Settings', { timeout: 8000 })
      .should('have.text', settings.settings)
      .click()
    cy.location('pathname', { timeout: 6000 }).should(
      'include',
      '/settings/general'
    )
    cy.get('.resetPassOpenPopUpLink')
      .should('have.text', settings.clickToChange)
      .click()
    cy.get('#dialog-wrapper').should('be.visible')
  })
  it('Checks reset password pop up will be close after clicking on cross icon', () => {
    cy.get('a')
      .find('#Settings', { timeout: 8000 })
      .should('have.text', settings.settings)
      .click()
    cy.location('pathname', { timeout: 6000 }).should(
      'include',
      '/settings/general'
    )
    cy.get('.resetPassOpenPopUpLink')
      .should('have.text', settings.clickToChange)
      .click()
    cy.get('#dialog-wrapper').should('be.visible')
    cy.get('#dialog-close-icon').click()
    cy.get('#dialog-wrapper').should('not.exist')
  })
  it('Checks heading of reset password pop up ', () => {
    cy.get('a')
      .find('#Settings', { timeout: 8000 })
      .should('have.text', settings.settings)
      .click()
    cy.location('pathname', { timeout: 6000 }).should(
      'include',
      '/settings/general'
    )
    cy.get('.resetPassOpenPopUpLink')
      .should('have.text', settings.clickToChange)
      .click()
    cy.get('h2').should('have.text', settings.resetPas)
  })
  it('Checks heading of reset password pop up have focused after opening the reset password pop up ', () => {
    cy.get('a')
      .find('#Settings', { timeout: 8000 })
      .should('have.text', settings.settings)
      .click()
    cy.location('pathname', { timeout: 6000 }).should(
      'include',
      '/settings/general'
    )
    cy.get('.resetPassOpenPopUpLink')
      .should('have.text', settings.clickToChange)
      .click()
    cy.get('h2').should('be.focused')
  })
  it('Checks reset password pop up input fields exists', () => {
    cy.get('a')
      .find('#Settings', { timeout: 8000 })
      .should('have.text', settings.settings)
      .click()
    cy.location('pathname', { timeout: 6000 }).should(
      'include',
      '/settings/general'
    )
    cy.get('.resetPassOpenPopUpLink')
      .should('have.text', settings.clickToChange)
      .click()
    cy.get('#dialog-wrapper').should('be.visible')
    cy.get('#oldPassword', { timeout: 6000 }).should('be.visible')
    cy.get('#newPassword').should('be.visible')
    cy.get('#confirmNewPassword').should('be.visible')
  })
  it('Checks gap between input-container-wrapper', () => {
    cy.get('a')
      .find('#Settings', { timeout: 8000 })
      .should('have.text', settings.settings)
      .click()
    cy.location('pathname', { timeout: 6000 }).should(
      'include',
      '/settings/general'
    )
    cy.get('.resetPassOpenPopUpLink')
      .should('have.text', settings.clickToChange)
      .click()
    cy.get('.input-container-wrapper').should('have.css', `gap`, `24px`)
  })
  it('Checks reset password pop up old password input field Should have focus on clicking on it or selecting it', () => {
    cy.get('a')
      .find('#Settings', { timeout: 8000 })
      .should('have.text', settings.settings)
      .click()
    cy.location('pathname', { timeout: 6000 }).should(
      'include',
      '/settings/general'
    )
    cy.get('.resetPassOpenPopUpLink')
      .should('have.text', settings.clickToChange)
      .click()
    cy.get('#dialog-wrapper').should('be.visible')
    cy.get('#oldPassword', { timeout: 6000 }).click().should('be.focused')
  })
  it('Checks reset password pop up new password input field Should have focus on clicking on it or selecting it', () => {
    cy.get('a')
      .find('#Settings', { timeout: 8000 })
      .should('have.text', settings.settings)
      .click()
    cy.location('pathname', { timeout: 6000 }).should(
      'include',
      '/settings/general'
    )
    cy.get('.resetPassOpenPopUpLink')
      .should('have.text', settings.clickToChange)
      .click()
    cy.get('#dialog-wrapper').should('be.visible')
    cy.get('#newPassword').should('be.visible').click().should('be.focused')
  })
  it('Checks reset password pop up confirm password input field Should have focus on clicking on it or selecting it', () => {
    cy.get('a')
      .find('#Settings', { timeout: 8000 })
      .should('have.text', settings.settings)
      .click()
    cy.location('pathname', { timeout: 6000 }).should(
      'include',
      '/settings/general'
    )
    cy.get('.resetPassOpenPopUpLink')
      .should('have.text', settings.clickToChange)
      .click()
    cy.get('#dialog-wrapper').should('be.visible')
    cy.get('#confirmNewPassword').click().should('be.focused')
  })
  it('Checks reset password pop up old password label have correct text', () => {
    cy.get('a')
      .find('#Settings', { timeout: 8000 })
      .should('have.text', settings.settings)
      .click()
    cy.location('pathname', { timeout: 6000 }).should(
      'include',
      '/settings/general'
    )
    cy.get('.resetPassOpenPopUpLink')
      .should('have.text', settings.clickToChange)
      .click()
    cy.get('#oldPassword', { timeout: 6000 })
      .parent()
      .parent()
      .within(() => {
        cy.get('label').should('have.text', settings.enterOldPassword)
      })
  })
  it('Checks reset password pop up new password label have correct text', () => {
    cy.get('a')
      .find('#Settings', { timeout: 8000 })
      .should('have.text', settings.settings)
      .click()
    cy.location('pathname', { timeout: 6000 }).should(
      'include',
      '/settings/general'
    )
    cy.get('.resetPassOpenPopUpLink')
      .should('have.text', settings.clickToChange)
      .click()
    cy.get('#newPassword', { timeout: 6000 })
      .parent()
      .parent()
      .within(() => {
        cy.get('label').should('have.text', settings.enterNewPass)
      })
  })
  it('Checks reset password pop up confirm new password label have correct text', () => {
    cy.get('a')
      .find('#Settings', { timeout: 8000 })
      .should('have.text', settings.settings)
      .click()
    cy.location('pathname', { timeout: 6000 }).should(
      'include',
      '/settings/general'
    )
    cy.get('.resetPassOpenPopUpLink')
      .should('have.text', settings.clickToChange)
      .click()
    cy.get('#confirmNewPassword', { timeout: 6000 })
      .parent()
      .parent()
      .within(() => {
        cy.get('label').should('have.text', settings.reEnterPass)
      })
  })
  it('Checks reset password pop up old password label have correct classes', () => {
    cy.get('a')
      .find('#Settings', { timeout: 8000 })
      .should('have.text', settings.settings)
      .click()
    cy.location('pathname', { timeout: 6000 }).should(
      'include',
      '/settings/general'
    )
    cy.get('.resetPassOpenPopUpLink')
      .should('have.text', settings.clickToChange)
      .click()
    cy.get('#oldPassword', { timeout: 6000 })
      .parent()
      .parent()
      .within(() => {
        cy.get('label').should('have.class', 'text-gray-800')
      })
  })
  it('Checks reset password pop up new password label have correct classes', () => {
    cy.get('a')
      .find('#Settings', { timeout: 8000 })
      .should('have.text', settings.settings)
      .click()
    cy.location('pathname', { timeout: 6000 }).should(
      'include',
      '/settings/general'
    )
    cy.get('.resetPassOpenPopUpLink')
      .should('have.text', settings.clickToChange)
      .click()
    cy.get('#newPassword', { timeout: 6000 })
      .parent()
      .parent()
      .within(() => {
        cy.get('label').should('have.class', 'text-gray-800')
      })
  })
  it('Checks reset password pop up confirm new password label have correct classes', () => {
    cy.get('a')
      .find('#Settings', { timeout: 8000 })
      .should('have.text', settings.settings)
      .click()
    cy.location('pathname', { timeout: 6000 }).should(
      'include',
      '/settings/general'
    )
    cy.get('.resetPassOpenPopUpLink')
      .should('have.text', settings.clickToChange)
      .click()
    cy.get('#confirmNewPassword', { timeout: 6000 })
      .parent()
      .parent()
      .within(() => {
        cy.get('label').should('have.class', 'text-gray-800')
      })
  })
  it('Checks reset password pop up submit button will be disabled if all input fields are not filled', () => {
    cy.get('a')
      .find('#Settings', { timeout: 8000 })
      .should('have.text', settings.settings)
      .click()
    cy.location('pathname', { timeout: 6000 }).should(
      'include',
      '/settings/general'
    )
    cy.get('.resetPassOpenPopUpLink')
      .should('have.text', settings.clickToChange)
      .click()
    cy.get('[data-cy="submit"]').should(
      'have.class',
      'disabled:bg-primaryDisabled'
    )
  })
  it('Checks reset password pop up submit button will be enabled if all input fields are filled', () => {
    cy.get('a')
      .find('#Settings', { timeout: 8000 })
      .should('have.text', settings.settings)
      .click()
    cy.location('pathname', { timeout: 6000 }).should(
      'include',
      '/settings/general'
    )
    cy.get('.resetPassOpenPopUpLink')
      .should('have.text', settings.clickToChange)
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
  it('Checks reset password pop up submit button text', () => {
    cy.get('a')
      .find('#Settings', { timeout: 8000 })
      .should('have.text', settings.settings)
      .click()
    cy.location('pathname', { timeout: 6000 }).should(
      'include',
      '/settings/general'
    )
    cy.get('.resetPassOpenPopUpLink')
      .should('have.text', settings.clickToChange)
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
    cy.get('[data-cy="submit"]').should('have.text', settings.resetPas)
  })
  it('Checks if new password and confirm password input fields input values not matched then throwing a proper error', () => {
    cy.get('a')
      .find('#Settings', { timeout: 8000 })
      .should('have.text', settings.settings)
      .click()
    cy.location('pathname', { timeout: 6000 }).should(
      'include',
      '/settings/general'
    )
    cy.get('.resetPassOpenPopUpLink')
      .should('have.text', settings.clickToChange)
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
      .blur()
    cy.get('#confirm-password-error').should('have.text', settings.passNotMatch)
  })
  it('Checks classes of error text if new password and confirm password input fields input values not matched', () => {
    cy.get('a')
      .find('#Settings', { timeout: 8000 })
      .should('have.text', settings.settings)
      .click()
    cy.location('pathname', { timeout: 6000 }).should(
      'include',
      '/settings/general'
    )
    cy.get('.resetPassOpenPopUpLink')
      .should('have.text', settings.clickToChange)
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
    cy.get('#confirm-password-error').should('have.class', 'text-red-700')
  })
  it('Checks if new password and confirm password input fields input values matched but total charactes are less than 8', () => {
    cy.get('a')
      .find('#Settings', { timeout: 8000 })
      .should('have.text', settings.settings)
      .click()
    cy.location('pathname', { timeout: 6000 }).should(
      'include',
      '/settings/general'
    )
    cy.get('.resetPassOpenPopUpLink')
      .should('have.text', settings.clickToChange)
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
    cy.get('#new-password-error').should('have.text', settings.minPasswordLimit)
  })
  it('Checks if old password is not matched filled input field then throwing a error', () => {
    cy.get('a')
      .find('#Settings', { timeout: 8000 })
      .should('have.text', settings.settings)
      .click()
    cy.location('pathname', { timeout: 6000 }).should(
      'include',
      '/settings/general'
    )
    cy.get('.resetPassOpenPopUpLink')
      .should('have.text', settings.clickToChange)
      .click()
    cy.get('#oldPassword', { timeout: 6000 })
      .should('be.visible')
      .clear()
      .type('password')
    cy.get('#newPassword').should('be.visible').clear().type('kQuiz@copods')
    cy.get('#confirmNewPassword')
      .should('be.visible')
      .clear()
      .type('kQuiz@copods')
    cy.get('[data-cy="submit"]')
      .should('have.class', 'hover:bg-primaryHover')
      .click()
    cy.get('#password-error').should('have.text', statusCheck.passIsInvalid)
  })
  it('Checks class of error if old password is not matched filled input field', () => {
    cy.get('a')
      .find('#Settings', { timeout: 8000 })
      .should('have.text', settings.settings)
      .click()
    cy.location('pathname', { timeout: 6000 }).should(
      'include',
      '/settings/general'
    )
    cy.get('.resetPassOpenPopUpLink')
      .should('have.text', settings.clickToChange)
      .click()
    cy.get('#oldPassword', { timeout: 6000 })
      .should('be.visible')
      .clear()
      .type('password')
    cy.get('#newPassword').should('be.visible').clear().type('kQuiz@copods')
    cy.get('#confirmNewPassword')
      .should('be.visible')
      .clear()
      .type('kQuiz@copods')
    cy.get('[data-cy="submit"]')
      .should('have.class', 'hover:bg-primaryHover')
      .click()
    cy.get('#password-error').should('have.class', 'text-red-700')
  })
  it('Checks if new password and old password is same then throwing a error', () => {
    cy.get('a')
      .find('#Settings', { timeout: 8000 })
      .should('have.text', settings.settings)
      .click()
    cy.location('pathname', { timeout: 6000 }).should(
      'include',
      '/settings/general'
    )
    cy.get('.resetPassOpenPopUpLink')
      .should('have.text', settings.clickToChange)
      .click()
    cy.get('#oldPassword', { timeout: 6000 })
      .should('be.visible')
      .clear()
      .type('kQuiz@copods')
    cy.get('#newPassword').should('be.visible').clear().type('kQuiz@copods')
    cy.get('#confirmNewPassword')
      .should('be.visible')
      .clear()
      .type('kQuiz@copods')
    cy.get('[data-cy="submit"]')
      .should('have.class', 'hover:bg-primaryHover')
      .click()
    cy.get('#new-password-error').should(
      'have.text',
      settings.passShouldNotBeSame
    )
  })
  it('Checks if toster showing correct message after successfully reset password and Checks if by login in from reseted password', () => {
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
      .type('kQuiz@copods')
    cy.get('#newPassword').should('be.visible').clear().type('kQuiz@careers')
    cy.get('#confirmNewPassword')
      .should('be.visible')
      .clear()
      .type('kQuiz@careers')
    cy.get('[data-cy="submit"]')
      .should('have.class', 'hover:bg-primaryHover')
      .click()
    cy.get('.Toastify__toast-body', { timeout: 6000 }).should(
      'have.text',
      'Password changed successfully !'
    )
    cy.get('.resetPassOpenPopUpLink')
      .should('have.text', 'Click to change')
      .click()
    cy.get('#oldPassword', { timeout: 6000 })
      .should('be.visible')
      .clear()
      .type('kQuiz@careers')
    cy.get('#newPassword').should('be.visible').clear().type('kQuiz@copods')
    cy.get('#confirmNewPassword')
      .should('be.visible')
      .clear()
      .type('kQuiz@copods')
    cy.get('[data-cy="submit"]')
      .should('have.class', 'hover:bg-primaryHover')
      .click()
  })
})
