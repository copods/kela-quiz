/// <reference types="Cypress"/>

import { commonConstants, cypress, routeFiles, testsConstants } from "~/constants/common.constants"

describe('smoke tests', () => {
  it('Successfully Login', () => {
    cy.visit('/sign-in')
    cy.get('#email').clear().type('careers@copods.co')
    cy.get('#password').clear().type('kQuiz@copods')
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
    cy.get('#email').clear().type('ayushi@copods.co')
    cy.get('#password').clear().type('kQuiz@copods')
    cy.findByRole('button').click()
    cy.get('#email-error').should('have.text', 'Email is invalid')
  })
  it('Invalid Password Error Message', () => {
    cy.visit('/sign-in')
    cy.get('#email').clear().type('careers@copods.co')
    cy.get('#password').clear().type('anuragpate')
    cy.findByRole('button').click()
    cy.get('#password-error').should('have.text', 'Password is invalid')
  })


  //creating test data
  it('Create Section', () => {
    cy.visit('/sign-in')
    cy.get('#email')
      .clear()
      .type('careers@copods.co')
      .should('have.value', cypress.email)
    cy.get('#password')
      .clear()
      .type('kQuiz@copods')
      .should('have.value', cypress.password)
    cy.findByRole('button').click()

    cy.get('a')
      .find('#Sections')
      .should('have.text', routeFiles.sections)
      .click()
    cy.location('pathname', { timeout: 60000 }).should('include', '/sections')
    cy.get('#add-section').click()
    const sectionName = `Aptitude - ${new Date().getTime()}`
    cy.get('form > div', { timeout: 10000 })
      .should('be.visible')
      .within((el) => {
        cy.get('input').type(sectionName)
        cy.get('textarea').type('Aptitude')
        cy.get("button[type='submit']", { timeout: 10000 }).click()
      })
  })

  it('Create Question', () => {
    cy.visit('/sign-in')
    cy.get('#email')
      .clear()
      .type('careers@copods.co')
      .should('have.value', cypress.email)
    cy.get('#password')
      .clear()
      .type('kQuiz@copods')
      .should('have.value', cypress.password)
    cy.findByRole('button').click()

    cy.get('a')
      .find('#Sections')
      .should('have.text', routeFiles.sections)
      .click()
    cy.location('pathname', { timeout: 60000 }).should('include', '/sections')
    cy.get('.px-5').click()
    cy.get('.addSectionDilog', { timeout: 10000 }).should('be.visible')
    cy.get('input#sectionName').type(`Aptitude - ${new Date().getTime()}`)
    cy.get('textarea#sectionDescription').type(
      `Aptitude -  Description`
    )
    cy.get('button#submitButton', { timeout: 6000 })
      .should('have.text', commonConstants.addButton)
      .click()
    cy.get('#section-cards').children().first().click()
    cy.get('#addQuestion').should('have.text', cypress.addQuest).click()
    cy.location('pathname', { timeout: 60000 }).should(
      'include',
      '/add-question'
    )

    cy.get('h1', { timeout: 2000 }).should('be.visible')
    cy.get('#dropdown > button').click()

    cy.get('ul').within(() => {
      cy.get('li').within(() => {
        cy.get('div').then((el) => {
          ;[...el].map((el) => {
            if (el.innerText === 'Text') {
              el.click()
            }
            return null
          })
        })
      })
    })

    cy.get('#questionEditor #quillEditor').within(() => {
      cy.get('.ql-editor').type(`What is your Test Question ?`)
    })

    cy.get('#optionEditor input').clear().type('Option of question')

    cy.get('#saveAndExit').click()
    cy.location('pathname', { timeout: 60000 }).should('include', '/sections')
  })

  let testName: any
  it('Create Test', () => {
    cy.visit('/sign-in')
    cy.get('#email')
      .clear()
      .type('careers@copods.co')
      .should('have.value', cypress.email)
    cy.get('#password', { timeout: 6000 })
      .clear()
      .type('kQuiz@copods')
      .should('have.value', cypress.password)
    cy.findByRole('button', { timeout: 6000 }).click()

    cy.get('a', { timeout: 10000 })
      .find('#Tests', { timeout: 10000 })
      .should('have.text', testsConstants.Tests)
      .click()
    cy.location('pathname', { timeout: 60000 }).should('include', '/tests')
    cy.get('#addTest', { timeout: 10000 }).click()
    cy.location('pathname', { timeout: 100000 }).should(
      'include',
      '/tests/add-test'
    )
    testName = `Test - ${new Date().getTime()}`
    cy.get('#name', { timeout: 6000 }).clear().type(testName)
    cy.get('#quillEditor').within(() => {
      cy.get('.ql-editor').type(`Test Description`)
    })
    cy.get('button#nextButton').should('have.text', 'Next').click()
    cy.get('#0').find('hr').should('have.class', 'bg-primary')
    cy.get('#1').find('hr').should('have.class', 'bg-primary')
    // user reached to step 2
    cy.get('div#section', { timeout: 60000 }).each((el) => {
      cy.wrap(el).within(() => {
        if (el.find('.count')[0].innerText != '0') {
          cy.get('input#noOfQu').should('have.disabled', true)
          cy.get('input#time').should('have.disabled', true)
          cy.get('button')
            .should('have.text', commonConstants.addButton)
            .click()
          cy.get('button').should('have.text', cypress.Remove)

          cy.get('input#noOfQu').clear().type('1')
          cy.get('input#time').clear().type('1')
          cy.get('input#noOfQu').should('have.value', '1')
          cy.get('input#time').should('have.value', '1')
        }
      })
    })
    cy.get('button#nextButton').should('have.text', cypress.next).click()
    cy.get('#0').find('hr').should('have.class', 'bg-primary')
    cy.get('#1').find('hr').should('have.class', 'bg-primary')
    cy.get('#2').find('hr').should('have.class', 'bg-primary')
    cy.get('button#submitButton', { timeout: 6000 })
      .should('have.text', 'Submit', { timeout: 6000 })
      .click()
    cy.location('pathname', { timeout: 60000 }).should('include', '/tests')
    cy.get('a', { timeout: 10000 })
      .find('#Tests', { timeout: 10000 })
      .should('have.text', testsConstants.Tests)
      .click()
    cy.location('pathname', { timeout: 60000 }).should('include', '/tests')
    cy.get('#sort-filter-body').get('#ascend', { timeout: 6000 }).click()
  })

})
