/// <reference types="Cypress"/>
import {
  addQuestion,
  commonConstants,
  members,
  cypress,
  routeFiles,
  testsConstants,
} from '~/constants/common.constants'
const section1 = `Aptitude - section1`
const test1 = `Aptitude - test1`
const deleteTest1 = `Aptitude - Detete test`
const section2 = `Aptitude - section2`
const deleteSection = `Aptitude - delete-Section`
const memberFirstName = 'john'
const memberLastName = 'dow'
const memberEmail = 'johndoe@example.com'

describe('smoke tests', () => {
  beforeEach(() => {
    // This will clear the local storage for every test
    window.localStorage.clear()
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
    cy.get('#email').clear().type('copods.demo.sendgrid@gmail.com')
    cy.get('#password').clear().type('anuragpate')
    cy.findByRole('button').click()
    cy.get('#password-error').should('have.text', 'Password is invalid')
  })

  it('Successfully Login', () => {
    cy.visit('/sign-in')
    cy.get('#email').clear().type('careers@copods.co')
    cy.get('#password').clear().type('kQuiz@copods')
    cy.findByRole('button').click()
    cy.url().should('includes', '/members')
    cy.getCookies()
      .should('have.length', 1)
      .then((cookies) => {
        expect(cookies[0]).to.have.property('name', '__session')
      })
  })

  // creating test data
  it('Adding a first section', () => {
    cy.login()
    cy.customVisit('/members')

    cy.get('a')
      .find('#sections')
      .should('have.text', routeFiles.sections)
      .click()
    cy.get('#add-section').click()
    cy.get('form > div', { timeout: 1000 })
      .should('be.visible')
      .within((el) => {
        cy.get('input[placeholder="Enter Section Name"]').type(section1)
        cy.get('textarea').type('Aptitude')
        cy.get('[data-cy="submit"]').click()
      })
  })

  it('Adding a second section', () => {
    cy.login()
    cy.customVisit('/members')
    cy.get('a')
      .find('#sections')
      .should('have.text', routeFiles.sections)
      .click()
    cy.get('#add-section').click()
    cy.get('form > div', { timeout: 1000 })
      .should('be.visible')
      .within((el) => {
        cy.get(`input[placeholder='Enter Section Name']`).type(section2)
        cy.get('textarea').type('Aptitude')
        cy.get('[data-cy="submit"]').click()
      })
  })

  it('Adding a deleteSection ', () => {
    cy.login()
    cy.customVisit('/members')
    cy.get('a')
      .find('#sections')
      .should('have.text', routeFiles.sections)
      .click()
    cy.get('#add-section').click()
    cy.get('form > div', { timeout: 1000 })
      .should('be.visible')
      .within((el) => {
        cy.get('input[placeholder="Enter Section Name"]').type(deleteSection)
        cy.get('textarea').type('Aptitude')
        cy.get('[data-cy="submit"]').click()
      })
  })

  it('Add question to the first section', () => {
    cy.login()
    cy.customVisit('/members')
    cy.get('a')
      .find('#sections')
      .should('have.text', routeFiles.sections)
      .click()
    cy.get('#section-card').each(($el) => {
      cy.wrap($el).within((el) => {
        if (
          el[0].getElementsByClassName('sectionName')[0].innerHTML === section1
        ) {
          cy.get('.sectionName').contains(section1).click()
        }
      })
    })
    cy.get('.sectionName').contains(section1).click()
    cy.get('#add-question')
      .should('have.text', `+ ${addQuestion.addQuestion}`)
      .click()
    cy.location('pathname').should('include', '/add-question')
    cy.get('h1').should('be.visible')
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
    cy.get('#question-editor #quill-editor').within(() => {
      cy.get('.ql-editor').type(cypress.useRef)
    })
    cy.get('input[placeholder="Write your option here"]')
      .clear()
      .type(cypress.useRefAns)
    cy.get('#save-and-exit').click()
  })

  it('Add question to the second section', () => {
    cy.login()
    cy.customVisit('/members')
    cy.get('a')
      .find('#sections')
      .should('have.text', routeFiles.sections)
      .click()
    cy.get('#section-card').each(($el) => {
      cy.wrap($el).within((el) => {
        if (
          el[0].getElementsByClassName('sectionName')[0].innerHTML === section2
        ) {
          cy.get('.sectionName').should('have.text', section2)
        }
      })
    })
    cy.get('.sectionName').contains(section2).click()
    cy.get('#add-question')
      .should('have.text', `+ ${addQuestion.addQuestion}`)
      .click()
    cy.location('pathname').should('include', '/add-question')
    cy.get('h1').should('be.visible')
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
    cy.get('#question-editor #quill-editor').within(() => {
      cy.get('.ql-editor').type(cypress.useMemo)
    })
    cy.get('input[placeholder="Write your option here"]')
      .clear()
      .type(cypress.useMemoAns)
    cy.get('#save-and-exit').click()
  })

  it('Verify if user able create the test 1', () => {
    cy.login()
    cy.customVisit('/members')
    cy.get('a').find('#tests').should('have.text', testsConstants.tests).click()
    cy.get('#add-test', { timeout: 6000 }).click()
    cy.location('pathname', { timeout: 60000 }).should(
      'include',
      '/tests/add-test'
    )
    cy.get('input[placeholder="Enter test name"]', { timeout: 6000 })
      .clear()
      .type(deleteTest1)
    cy.get('#quill-editor').within(() => {
      cy.get('.ql-editor').type(`Test Description`)
    })
    cy.get('button#next-button').should('have.text', cypress.next).click()
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
    cy.get('div#section', { timeout: 60000 }).each((el) => {
      cy.wrap(el).within(() => {
        if (el.find('.count')[0].innerText != '0') {
          cy.get('input#no-of-qu').should('have.disabled', true)
          cy.get('input#time').should('have.disabled', true)
          cy.get('button').should('have.text', commonConstants.add).click()
          cy.get('button').should('have.text', cypress.remove)

          cy.get('input#no-of-qu').clear().type('1')
          cy.get('input#time').clear().type('1')
          cy.get('input#no-of-qu').should('have.value', '1')
          cy.get('input#time').should('have.value', '1')
        }
      })
    })
    cy.get('button#next-button').should('have.text', cypress.next).click()
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
        } else if (
          el[0].getElementsByClassName('stepsName')[0].innerHTML ===
          cypress.step3
        ) {
          cy.get('.stepsName').should('have.text', cypress.step3)
        }
      })
    })
    cy.get('button#submit-button')
      .should('have.text', commonConstants.submit)
      .click()
  })

  it('Verify if user able create the test 2', () => {
    cy.login()
    cy.customVisit('/members')
    cy.get('a').find('#tests').should('have.text', testsConstants.tests).click()
    cy.get('#add-test', { timeout: 6000 }).click()
    cy.location('pathname', { timeout: 60000 }).should(
      'include',
      '/tests/add-test'
    )
    cy.get('input[placeholder="Enter test name"]', { timeout: 6000 })
      .clear()
      .type(test1)
    cy.get('#quill-editor').within(() => {
      cy.get('.ql-editor').type(`Test Description`)
    })
    cy.get('button#next-button').should('have.text', cypress.next).click()
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
    cy.get('div#section', { timeout: 60000 }).each((el) => {
      cy.wrap(el).within(() => {
        if (el.find('.count')[0].innerText != '0') {
          cy.get('input#no-of-qu').should('have.disabled', true)
          cy.get('input#time').should('have.disabled', true)
          cy.get('button').should('have.text', commonConstants.add).click()
          cy.get('button').should('have.text', cypress.remove)

          cy.get('input#no-of-qu').clear().type('1')
          cy.get('input#time').clear().type('1')
          cy.get('input#no-of-qu').should('have.value', '1')
          cy.get('input#time').should('have.value', '1')
        }
      })
    })
    cy.get('button#next-button').should('have.text', cypress.next).click()
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
        } else if (
          el[0].getElementsByClassName('stepsName')[0].innerHTML ===
          cypress.step3
        ) {
          cy.get('.stepsName').should('have.text', cypress.step3)
        }
      })
    })
    cy.get('button#submit-button')
      .should('have.text', commonConstants.submit)
      .click()
  })

  it('Test for adding a new member', () => {
    cy.login()
    cy.customVisit('/members')
    cy.get('a').find('#members').should('have.text', members.members).click()
    cy.get('#add-member').should('have.text', cypress.addMember).click()
    cy.get('#add-pop-up-model', { timeout: 1000 }).should('be.visible')
    cy.get('input[name="firstName"]')
      .clear()
      .type(memberFirstName)
      .should('have.value', memberFirstName)
    cy.get('input[name="lastName"]')
      .clear()
      .type(memberLastName)
      .should('have.value', memberLastName)
    cy.get('input[name="email"]')
      .clear()
      .type(memberEmail)
      .should('have.value', memberEmail)
    cy.get('div').find('.dropdownButton').click()
    cy.get('ul').contains('Recruiter').click()
    cy.get('#add-button').click()
  })

  it('invite candidate for test', () => {
    cy.visit('/sign-in')
    cy.get('input[name="email"]')
      .clear()
      .type(Cypress.env('email'))
      .should('have.focus')
      .should('have.value', Cypress.env('email'))
    cy.get('input[name="password"]')
      .clear()
      .type(Cypress.env('password'))
      .should('have.focus')
      .should('have.value', Cypress.env('password'))
    cy.get('[data-cy="submit"]').click()
    cy.location('pathname').should('include', '/members')
    cy.get('a').find('#tests').should('have.text', testsConstants.tests).click()
    cy.get('.test-table-list', { timeout: 6000 }).should('be.visible')
    cy.get('.test-table-list').each(($el) => {
      cy.wrap($el).within((el) => {
        if (
          el[0].getElementsByClassName('test-name-navigation')[0].innerHTML ===
          test1
        ) {
          cy.get('.test-name-navigation').should('have.text', test1)
        }
      })
    })
    cy.get('.test-name-navigation')
      .contains(test1)
      .parent()
      .parent()
      .parent()
      .within(() => {
        cy.get('#invite-popup-open', { timeout: 10000 })
          .should('be.visible')
          .click()
      })

    cy.get('input[name="email"]')
      .clear()
      .type('johndoe@example.com')
      .should('have.focus')
      .should('have.value', 'johndoe@example.com')
    cy.get('[data-cy="submit"]').click()
  })
})
