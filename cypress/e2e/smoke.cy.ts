/// <reference types="Cypress"/>
import {
  addQuestion,
  commonConstants,
  cypress,
} from '~/constants/common.constants'
const section1 = `Aptitude - section1`
const test1 = `Aptitude - assessment1`
const deleteTest1 = `Aptitude - assessment2`
const section2 = `Aptitude - section2`
const deleteSection = `Aptitude - delete-Section`

const memberEmail = 'johndoe@example.com'

describe('smoke tests', () => {
  beforeEach(() => {
    // This will clear the local storage for every test
    window.localStorage.clear()
  })

  it('Invalid Email Error Message', () => {
    cy.visit('/sign-in')
    cy.get('#email').clear().type('test@copods.co')
    cy.get('#password').clear().type('kQuiz@copods')
    cy.findByRole('button').click()

    cy.get('#password-error', { timeout: 8000 }).should(
      'have.text',
      'Incorrect email or password'
    )
  })

  it('Invalid Password Error Message', () => {
    cy.visit('/sign-in')
    cy.get('#email').clear().type('copods.demo.sendgrid@gmail.com')
    cy.get('#password').clear().type('anuragpate')
    cy.findByRole('button').click()
    cy.get('#password-error').should('have.text', 'Incorrect email or password')
  })

  it('Successfully Login', () => {
    cy.visit('/sign-in')
    cy.get('#email').clear().type('copods.demo.sendgrid@gmail.com')
    cy.get('#password').clear().type('kQuiz@copods')
    cy.findByRole('button').click()
    cy.wait(1000)

    cy.getCookies()
      .should('have.length', 1)
      .then((cookies) => {
        expect(cookies[0]).to.have.property('name', '__session')
      })
  })

  it('should add workspace', () => {
    cy.visit('/sign-in')
    cy.get('#email', { timeout: 8000 })
      .clear()
      .type('copods.demo.sendgrid@gmail.com')
    cy.get('#password').clear().type('kQuiz@copods')
    cy.findByRole('button').click()
    cy.get('#members', { timeout: 60000 })
      .should('have.text', 'Members')
      .click()
    cy.location('pathname').should('include', '/members')

    let dropdown = cy.get('#dropdown', { timeout: 8000 })

    dropdown
      .click()
      .find('ul')
      .children()
      .each((element, index) => {
        if (index === 0) {
          cy.wrap(element).click()
          return
        }
      })

    // Adding workspace name
    const randomWorkSpaceName = `workSpace-${(Math.random() + 1)
      .toString(36)
      .substring(7)}`

    cy.get('input[name="addWorkspace"]')
      .type(randomWorkSpaceName)
      .should('have.attr', 'value', randomWorkSpaceName)

    cy.get('button[name="addWorkspace"]').click()
    cy.wait(1000)
    // Check for workspace length
    dropdown = cy.get('#dropdown')

    dropdown
      .click()
      .find('ul')
      .find('li')
      .should((item) => {
        expect(item.length).to.be.greaterThan(1)
      })
  })

  // creating test data
  it('Adding a first section', () => {
    cy.visit('/sign-in')
    cy.get('#email').clear().type('copods.demo.sendgrid@gmail.com')
    cy.get('#password').clear().type('kQuiz@copods')
    cy.findByRole('button').click()
    cy.wait(1000)

    cy.get('#sections', { timeout: 8000 }).should('have.text', 'Tests').click()

    cy.get('#add-section').click()
    cy.get('form > div')
      .should('be.visible')
      .within((el) => {
        cy.get('input[placeholder="Enter Test Name"]').type(section1)
        cy.get('textarea').type('Aptitude')
        cy.get('[data-cy="submit"]').click()
      })
  })

  it('Adding a second section', () => {
    cy.visit('/sign-in')
    cy.get('#email').clear().type('copods.demo.sendgrid@gmail.com')
    cy.get('#password').clear().type('kQuiz@copods')
    cy.findByRole('button').click()
    cy.wait(1000)
    cy.get('#sections', { timeout: 8000 }).should('have.text', 'Tests').click()

    cy.get('#add-section').click()
    cy.get('form > div')
      .should('be.visible')
      .within((el) => {
        cy.get(`input[placeholder='Enter Test Name']`).type(section2)
        cy.get('textarea').type('Aptitude')
        cy.get('[data-cy="submit"]').click()
      })
  })

  it('Adding a deleteSection ', () => {
    cy.visit('/sign-in')
    cy.get('#email').clear().type('copods.demo.sendgrid@gmail.com')
    cy.get('#password').clear().type('kQuiz@copods')
    cy.findByRole('button').click()
    cy.wait(1000)
    cy.get('#sections', { timeout: 8000 }).should('have.text', 'Tests').click()

    cy.get('#add-section').click()
    cy.get('form > div')
      .should('be.visible')
      .within((el) => {
        cy.get('input[placeholder="Enter Test Name"]').type(deleteSection)
        cy.get('textarea').type('Aptitude')
        cy.get('[data-cy="submit"]').click()
      })
  })

  it('Add question to the first section', () => {
    cy.visit('/sign-in')
    cy.get('#email').clear().type('copods.demo.sendgrid@gmail.com')
    cy.get('#password').clear().type('kQuiz@copods')
    cy.findByRole('button').click()
    cy.wait(1000)
    cy.get('#sections', { timeout: 8000 }).should('have.text', 'Tests').click()

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
    cy.get('h1', { timeout: 6000 }).should('be.visible')

    cy.get('#Question').get('#dropdown-container').click()
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
    cy.visit('/sign-in')
    cy.get('#email').clear().type('copods.demo.sendgrid@gmail.com')
    cy.get('#password').clear().type('kQuiz@copods')
    cy.findByRole('button').click()
    cy.wait(1000)
    cy.get('#sections', { timeout: 8000 }).should('have.text', 'Tests').click()

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
    cy.get('h1', { timeout: 6000 }).should('be.visible')
    cy.get('#Question').get('#dropdown-container').click()
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

  it('Verify if user able create the assesssment 1', () => {
    cy.visit('/sign-in')
    cy.get('#email').clear().type('copods.demo.sendgrid@gmail.com')
    cy.get('#password').clear().type('kQuiz@copods')
    cy.findByRole('button').click()
    cy.get('#members', { timeout: 60000 })
      .should('have.text', 'Members')
      .click()
    cy.get('#tests', { timeout: 60000 })
      .should('have.text', 'Assessments')
      .click()
    cy.wait(2000)
    cy.get('#add-test', { timeout: 6000 }).click()
    cy.wait(1000)
    cy.location('pathname').should('include', '/assessments/add-assessment')
    cy.get('input[placeholder="Enter assessment name"]')
      .clear()
      .type(deleteTest1)
    cy.get('#quill-editor').within(() => {
      cy.get('.ql-editor').type(`Test Description`)
    })
    cy.wait(1000)
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
    cy.get('div#section').each((el) => {
      cy.wrap(el).within(() => {
        if (el.find('.count')[0].innerText != '0') {
          cy.get('input#no-of-qu').should('have.disabled', true)
          cy.get('input#time').should('have.disabled', true)
          cy.get('button').should('have.text', commonConstants.add).click()
          cy.get('button').should('have.text', cypress.remove)

          cy.get('input#no-of-qu').clear().type('1')
          cy.get('input#time').clear().type('1')
        }
      })
    })
    cy.wait(1000)
    cy.get('button#next-button', { timeout: 8000 }).should('be.visible')
    cy.get('button#next-button').should('have.text', cypress.next).click()
    cy.wait(1000)
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

  it('Verify if user able create the assessment 2', () => {
    cy.visit('/sign-in')
    cy.get('#email').clear().type('copods.demo.sendgrid@gmail.com')
    cy.get('#password').clear().type('kQuiz@copods')
    cy.findByRole('button').click()
    cy.get('#members', { timeout: 60000 })
      .should('have.text', 'Members')
      .click()
    cy.get('#tests', { timeout: 60000 })
      .should('have.text', 'Assessments')
      .click()
    cy.wait(2000)
    cy.get('#add-test', { timeout: 6000 }).click()
    cy.wait(1000)
    cy.location('pathname').should('include', '/assessments/add-assessment')
    cy.get('input[placeholder="Enter assessment name"]').clear().type(test1)
    cy.get('#quill-editor').within(() => {
      cy.get('.ql-editor').type(`Test Description`)
    })
    cy.wait(1000)
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
    cy.get('div#section').each((el) => {
      cy.wrap(el).within(() => {
        if (el.find('.count')[0].innerText != '0') {
          cy.get('input#no-of-qu').should('have.disabled', true)
          cy.get('input#time').should('have.disabled', true)
          cy.get('button').should('have.text', commonConstants.add).click()
          cy.get('button').should('have.text', cypress.remove)

          cy.get('input#no-of-qu').clear().type('1')
          cy.get('input#time').clear().type('1')
        }
      })
    })
    cy.wait(1000)
    cy.get('button#next-button', { timeout: 8000 }).should('be.visible')
    cy.get('button#next-button').should('have.text', cypress.next).click()
    cy.wait(1000)
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
    cy.visit('/sign-in')
    cy.get('#email').clear().type('copods.demo.sendgrid@gmail.com')
    cy.get('#password').clear().type('kQuiz@copods')
    cy.findByRole('button').click()
    cy.wait(1000)
    cy.get('#invite-member', { timeout: 6000 })
      .should('have.text', cypress.addMember)
      .click()
    cy.get('#dialog-wrapper').should('be.visible')

    cy.get('input[name="email"]')
      .clear()
      .type(memberEmail)
      .should('have.value', memberEmail)

    cy.get('div').get('#add-member-modal').find('.dropdownButton').click()
    cy.get('ul').contains('Recruiter').click()
    cy.get('#invite-button').click()
  })

  it('invite candidate for assessment', () => {
    cy.visit('/sign-in')
    cy.get('#email').clear().type('copods.demo.sendgrid@gmail.com')
    cy.get('#password').clear().type('kQuiz@copods')
    cy.findByRole('button').click()
    cy.wait(1000)
    cy.get('#tests', { timeout: 8000 })
      .should('have.text', 'Assessments')
      .click()
    cy.wait(1000)
    cy.get('.test-table-list', { timeout: 8000 }).should('be.visible')
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
    cy.get('.test-name-navigation').contains(test1).click()
    cy.get('#title', { timeout: 8000 }).should('have.text', test1)
    cy.get('#invite-popup-open', { timeout: 8000 }).should('be.visible').click()
    cy.get('input[name="email"]')
      .clear()
      .type('johndoe@example.com')
      .should('have.focus')
      .should('have.value', 'johndoe@example.com')
    cy.get('[data-cy="submit"]').click()
  })
  it('check for not found page', () => {
    cy.login()
    cy.customVisit('/id/not-our-url')

    cy.contains("That's an error.")
  })
})
