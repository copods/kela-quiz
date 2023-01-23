import { cypress } from '~/constants/common.constants'

const commonConstants = {
  test1: `Quantitative - assessment1`,
  add: 'Add',
  submit: 'Submit',
}

describe('Creating the new assessment', () => {
  it('creating the assessment ', () => {
    cy.viewport(1280, 720)
    cy.login()
    cy.customVisit('/members')
    cy.wait(1000)
    cy.get('#tests', { timeout: 60000 })
      .should('have.text', 'Assessments')
      .click()
    cy.wait(1000)
    cy.get('#add-test', { timeout: 6000 }).click()
    cy.wait(1000)
    cy.get('input[placeholder="Enter assessment name"]')
      .clear()
      .type(commonConstants.test1)
    cy.get('#quill-editor').within(() => {
      cy.get('.ql-editor').type(`Test Description`)
    })
    cy.wait(2000)
    cy.get('#next-button', { timeout: 6000 }).should('be.visible')
    cy.get('#next-button').should('have.text', cypress.next).click()

    cy.get('.stepsTab').each(($el) => {
      cy.wrap($el).within((el) => {
        if (
          el[0].getElementsByClassName('stepsName')[0].innerHTML ===
          cypress.step1
        ) {
          cy.get('.stepsName').should('have.text', cypress.step1)
        } else if (
          el[0].getElementsByClassName('stepsName')[0].innerHTML ===
          cypress.step2
        ) {
          cy.get('.stepsName').should('have.text', cypress.step2)
        }
      })
    })
    // user reached to step 2
    cy.get('div#section').each((el) => {
      cy.wrap(el).within(() => {
        if (el.find('.count')[0].innerText != '0') {
          cy.get('button').should('have.text', commonConstants.add).click()
          cy.get('button').should('have.text', cypress.remove)
        }
      })
    })
    cy.wait(1000)
    cy.get('button#next-button').click()
    cy.wait(1000)
    cy.get('button#submit-button')
      .should('have.text', commonConstants.submit)
      .click()
  })
})
