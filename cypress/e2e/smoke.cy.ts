/// <reference types="Cypress"/>
import {
  getAddQuestionBtn,
  getAddSectionBtn,
  getAddWorkspaceBtn,
  getAddWorkspaceInput,
  getDropdown,
  getEmail,
  geth1,
  getPassword,
  getPasswordError,
  getSectionCards,
  getSectionName,
  getSections,
  getSubmitBtn,
  getTestNameInput,
  getTextArea,
  visitSignIn,
  getQuestionWithDropdown,
  getQlEditorWrapper,
  getQlEditor,
  getQlEditorInput,
  getSaveAndExit,
  getSaveAndAddMore,
} from 'support/common-function'
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
const question = 'first-question'
const memberEmail = 'johndoe@example.com'

describe('smoke tests', () => {
  beforeEach(() => {
    // This will clear the local storage for every test
    window.localStorage.clear()
  })

  it('Login form validations', () => {
    visitSignIn()

    // To check Invalid Email Error
    getEmail().type('test@copods.co')
    getPassword().type('kQuiz@copods')
    cy.findByRole('button').click()
    getPasswordError().should('have.text', 'Incorrect email or password')

    // To clear fields
    getEmail().clear()
    getPassword().clear()

    // To check Invalid Password Error
    getEmail().type('copods.demo.sendgrid@gmail.com')
    getPassword().type('anuragpate')
    cy.findByRole('button').click()
    getPasswordError().should('have.text', 'Incorrect email or password')

    // To clear fields
    getEmail().clear()
    getPassword().clear()

    // To login
    getEmail().type('copods.demo.sendgrid@gmail.com')
    getPassword().type('kQuiz@copods')
    cy.findByRole('button').click()
    cy.wait(500)

    // To check cookies
    cy.getCookies()
      .should('have.length', 1)
      .then((cookies) => {
        expect(cookies[0]).to.have.property('name', '__session')
      })
  })

  it('Creating user data', () => {
    // To Login
    cy.login()
    cy.wait(1000)

    // To add workspace
    cy.location('pathname').should('include', '/members')
    cy.wait(500)

    const randomWorkSpaceName = `workSpace-${(Math.random() + 1)
      .toString(36)
      .substring(7)}`

    getDropdown()
      .click()
      .find('ul')
      .children()
      .each((element, index) => {
        if (index === 0) {
          cy.wrap(element).click()
          return
        }
      })

    getAddWorkspaceInput()
      .type(randomWorkSpaceName)
      .should('have.attr', 'value', randomWorkSpaceName)

    getAddWorkspaceBtn().click()

    getDropdown()
      .click()
      .find('ul')
      .find('li')
      .should((item) => {
        expect(item.length).to.be.greaterThan(1)
      })
    cy.wait(500)

    // To add sections
    getSections().should('have.text', 'Tests').click()

    // Section 1
    getAddSectionBtn().click()
    cy.get('form > div')
      .should('be.visible')
      .within((el) => {
        getTestNameInput().type(section1)
        getTextArea().type('Aptitude')
        getSubmitBtn().click()
      })
    cy.wait(500)
    getSections().should('have.text', 'Tests').click()

    // Section 2
    getAddSectionBtn().click()
    cy.get('form > div')
      .should('be.visible')
      .within((el) => {
        getTestNameInput().type(section2)
        getTextArea().type('Aptitude')
        getSubmitBtn().click()
      })
    cy.wait(500)
    getSections().should('have.text', 'Tests').click()

    // Delete Section
    getAddSectionBtn().click()
    cy.get('form > div')
      .should('be.visible')
      .within((el) => {
        getTestNameInput().type(deleteSection)
        getTextArea().type('Aptitude')
        getSubmitBtn().click()
      })
    cy.wait(500)
    getSections().should('have.text', 'Tests').click()

    // Add Question 1 to Section 1
    getSectionCards().each(($el) => {
      cy.wrap($el).within((el) => {
        if (
          el[0].getElementsByClassName('sectionName')[0].innerHTML === section1
        ) {
          cy.get('.sectionName').contains(section1)
        }
      })
    })
    cy.wait(1000)
    getSectionName().contains(section1).click()
    cy.wait(2000)
    getAddQuestionBtn()
      .should('have.text', `+ ${addQuestion.addQuestion}`)
      .click()
    cy.location('pathname').should('include', '/add-question')
    geth1().should('be.visible')
    getQuestionWithDropdown().click()
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
    cy.wait(500)

    getQlEditorWrapper().within(() => {
      getQlEditor().type(cypress.useRef).should('have.text', cypress.useRef)
    })
    getQlEditorInput().clear().type(cypress.useRefAns)
    getSaveAndAddMore().click()
    cy.wait(500)

    // Add Question 2 to Section 1
    cy.location('pathname').should('include', '/add-question')
    geth1().should('be.visible')
    getQuestionWithDropdown().click()
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
    cy.wait(500)

    getQlEditorWrapper().within(() => {
      getQlEditor().type(question).should('have.text', question)
    })
    getQlEditorInput().clear().type(cypress.useRefAns)
    getSaveAndExit().click()

    // Add Question to Section 2
    getSectionCards().each(($el) => {
      cy.wrap($el).within((el) => {
        if (
          el[0].getElementsByClassName('sectionName')[0].innerHTML === section2
        ) {
          cy.get('.sectionName').contains(section2)
        }
      })
    })
    cy.wait(1000)
    getSectionName().contains(section2).click()
    cy.wait(2000)
    getAddQuestionBtn()
      .should('have.text', `+ ${addQuestion.addQuestion}`)
      .click()
    cy.location('pathname').should('include', '/add-question')
    geth1().should('be.visible')
    getQuestionWithDropdown().click()
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
    cy.wait(500)

    getQlEditorWrapper().within(() => {
      getQlEditor().type(cypress.useMemo).should('have.text', cypress.useMemo)
    })
    getQlEditorInput().clear().type(cypress.useMemo)
    getSaveAndExit().click()
    cy.wait(500)
  })

  it.skip('should add workspace', () => {
    cy.login()
    cy.customVisit('/members')
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

    cy.get('button[name="addWorkspace"]', { timeout: 6000 }).click()
    cy.wait(2000)
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
  it.skip('Adding a first section', () => {
    cy.login()
    cy.customVisit('/members')
    cy.wait(1000)

    cy.get('#sections', { timeout: 8000 }).should('have.text', 'Tests').click()

    cy.get('#add-section').click()
    cy.get('form > div')
      .should('be.visible')
      .within((el) => {
        cy.get('input[placeholder="Enter Test Name*"]').type(section1)
        cy.get('textarea').type('Aptitude')
        cy.get('[data-cy="submit"]').click()
      })
    cy.wait(2000)
  })

  it.skip('Adding a second section', () => {
    cy.login()
    cy.customVisit('/members')
    cy.wait(1000)
    cy.get('#sections', { timeout: 8000 }).should('have.text', 'Tests').click()

    cy.get('#add-section').click()
    cy.get('form > div')
      .should('be.visible')
      .within((el) => {
        cy.get(`input[placeholder='Enter Test Name*']`).type(section2)
        cy.get('textarea').type('Aptitude')
        cy.get('[data-cy="submit"]').click()
      })
  })

  it.skip('Adding a deleteSection ', () => {
    cy.login()
    cy.customVisit('/members')
    cy.wait(1000)
    cy.get('#sections', { timeout: 8000 }).should('have.text', 'Tests').click()

    cy.get('#add-section').click()
    cy.get('form > div')
      .should('be.visible')
      .within((el) => {
        cy.get('input[placeholder="Enter Test Name*"]').type(deleteSection)
        cy.get('textarea').type('Aptitude')
        cy.get('[data-cy="submit"]').click()
      })
  })

  it.skip('Add question to the first section', () => {
    cy.login()
    cy.customVisit('/members')
    cy.wait(1000)
    cy.get('#sections', { timeout: 8000 }).should('have.text', 'Tests').click()
    cy.wait(3000)
    cy.get('#section-card').each(($el) => {
      cy.wrap($el).within((el) => {
        if (
          el[0].getElementsByClassName('sectionName')[0].innerHTML === section1
        ) {
          cy.get('.sectionName').contains(section1)
        }
      })
    })
    cy.get('.sectionName').contains(section1).click()
    cy.wait(3000)
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

  it.skip('Add question to the second section', () => {
    cy.login()
    cy.customVisit('/members')
    cy.wait(1000)
    cy.get('#sections', { timeout: 8000 }).should('have.text', 'Tests').click()
    cy.wait(3000)
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

  it.skip('Add second question to the first section', () => {
    cy.login()
    cy.customVisit('/members')
    cy.wait(1000)
    cy.get('#sections', { timeout: 6000 }).should('have.text', 'Tests').click()
    cy.wait(3000)
    cy.get('#section-card').each(($el) => {
      cy.wrap($el).within((el) => {
        if (
          el[0].getElementsByClassName('sectionName')[0].innerHTML === section2
        ) {
          cy.get('.sectionName').contains(section2).click()
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
      cy.get('.ql-editor').type(question)
    })
    cy.get('input[placeholder="Write your option here"]')
      .clear()
      .type(cypress.useRefAns)
    cy.get('#save-and-exit').click()
  })

  it.skip('Verify if user able create the assesssment 1', () => {
    cy.login()
    cy.customVisit('/members')
    cy.get('#tests', { timeout: 6000 })
      .should('have.text', 'Assessments')
      .click()
    cy.wait(1000)
    cy.get('#add-test', { timeout: 6000 }).click()
    cy.location('pathname').should('include', '/assessments/add-assessment')
    cy.wait(1000)
    cy.get('input[placeholder="Enter assessment name"]')
      .clear()
      .type(deleteTest1)
    cy.get('#quill-editor').within(() => {
      cy.get('.ql-editor').type(`Test Description`)
    })
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
          cy.get('input#no-of-qu').should('have.disabled', true)
          cy.get('input#time').should('have.disabled', true)
          cy.get('button').should('have.text', commonConstants.add).click()
          cy.get('button').should('have.text', cypress.remove)

          cy.get('input#no-of-qu').clear().type('1')
          cy.get('input#time').clear().type('1')
        }
      })
    })
    cy.wait(2000)
    cy.get('#next-button', { timeout: 6000 }).should('be.visible')
    cy.get('#next-button').should('have.text', cypress.next).click()
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

  it.skip('Verify if user able create the assessment 2', () => {
    cy.login()
    cy.customVisit('/members')
    cy.wait(1000)
    cy.get('#tests', { timeout: 60000 })
      .should('have.text', 'Assessments')
      .click()
    cy.wait(1000)
    cy.get('#add-test', { timeout: 6000 }).click()
    cy.location('pathname').should('include', '/assessments/add-assessment')
    cy.wait(1000)
    cy.get('input[placeholder="Enter assessment name"]').clear().type(test1)
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

  it.skip('Test for adding a new member', () => {
    cy.login()
    cy.customVisit('/members')
    cy.wait(1000)
    cy.get('#invite-member', { timeout: 6000 })
      .should('have.text', 'Invite Member')
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

  it.skip('invite candidate for assessment', () => {
    cy.viewport(1200, 1000)
    cy.login()
    cy.customVisit('/members')
    cy.wait(1000)
    cy.get('#tests', { timeout: 8000 })
      .should('have.text', 'Assessments')
      .click()
    cy.wait(1000)
    cy.get('#assessments-page-title').should('have.text', 'Assessments')
    cy.get('#invite-popup-open0', { timeout: 6000 }).should('be.visible')
    cy.get('#invite-popup-open0', { timeout: 6000 })
      .first()
      .should('be.visible')
      .click({ force: true })

    cy.get('input[name="email"]')
      .type('johndoe@example.com')
      .should('have.focus')
      .should('have.value', 'johndoe@example.com')
    cy.get('[data-cy="submit"]').click()
  })
  it.skip('check for not found page', () => {
    cy.login()
    cy.customVisit('/members')
    cy.wait(1000)
    cy.location().then((res) => {
      cy.customVisit(`${res.pathname}-error`)
    })
    cy.contains("That's an error.")
  })
})
