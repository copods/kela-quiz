/// <reference types="Cypress"/>

import {
  commonConstants,
  cypress,
  testsConstants,
} from '~/constants/common.constants'
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

  it('Adding a section 1 ', () => {
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
    cy.location('pathname').should('include', '/dashboard')
    cy.get('a').find('#Sections').should('have.text', cypress.Sections).click()
    cy.get('#add-section').click()
    cy.get('form > div')
      .should('be.visible')
      .within((el) => {
        cy.get('input[placeholder="Enter Section Name"]').type(cypress.section1)
        cy.get('textarea').type('Aptitude')
        cy.get('[data-cy="submit"]').click()
      })
  })
  it('Adding a section 1 ', () => {
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
    cy.location('pathname').should('include', '/dashboard')
    cy.get('a').find('#Sections').should('have.text', cypress.Sections).click()
    cy.get('#add-section').click()
    cy.get('form > div')
      .should('be.visible')
      .within((el) => {
        cy.get('input[placeholder="Enter Section Name"]').type(cypress.section2)
        cy.get('textarea').type('Aptitude')
        cy.get('[data-cy="submit"]').click()
      })
  })
  it('Add question in created section1', () => {
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
    cy.location('pathname').should('include', '/dashboard')
    cy.get('a').find('#Sections').should('have.text', cypress.Sections).click()
    cy.get('.section-card').each(($el) => {
      cy.wrap($el).within((el) => {
        if (
          el[0].getElementsByClassName('sectionName')[0].innerHTML ===
          cypress.section1
        ) {
          cy.get('.sectionName').contains(cypress.section1).click()
        }
      })
    }) 
     cy.get('.sectionName').contains(cypress.section1).click()
    cy.get('#addQuestion').should('have.text', cypress.addQuest).click()
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

    cy.get('#questionEditor #quillEditor').within(() => {
      cy.get('.ql-editor').type(`What is your Test Question ?`)
    })
    cy.get('input[placeholder="Write your option here"]')
      .clear()
      .type('Option of question')
    cy.get('#saveAndExit').click()
  })
  it('Add question in created section2', () => {
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
    cy.location('pathname').should('include', '/dashboard')
    cy.get('a').find('#Sections').should('have.text', cypress.Sections).click()
    cy.get('.section-card').each(($el) => {
      cy.wrap($el).within((el) => {
        if (
          el[0].getElementsByClassName('sectionName')[0].innerHTML ===
          cypress.section2
        ) {
          cy.get('.sectionName').contains(cypress.section2)
        }
      })
    })
    cy.get('.sectionName').contains(cypress.section2).click()
    cy.get('#addQuestion').should('have.text', cypress.addQuest).click()
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

    cy.get('#questionEditor #quillEditor').within(() => {
      cy.get('.ql-editor').type(`What is your Test Question ?`)
    })
    cy.get('input[placeholder="Write your option here"]')
      .clear()
      .type('Option of question')
    cy.get('#saveAndExit').click()
  })

  it('Verify if user able create the test', () => {
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
    cy.location('pathname').should('include', '/dashboard')
    cy.get('a').find('#Tests').should('have.text', testsConstants.Tests).click()
    cy.get('#addTest', { timeout: 6000 }).click()
    cy.location('pathname', { timeout: 60000 }).should(
      'include',
      '/tests/add-test'
    )

    cy.get('input[placeholder="Enter test name"]', { timeout: 6000 })
      .clear()
      .type(cypress.deleteTest1)
    cy.get('#quillEditor').within(() => {
      cy.get('.ql-editor').type(`Test Description`)
    })

    cy.get('button#nextButton').should('have.text', cypress.next).click()
    cy.get('.stepsTab').each(($el) => {
      cy.wrap($el).within((el) => {
        if (
          el[0].getElementsByClassName('stepsName')[0].innerHTML ===
          cypress.step1
        ) {
          cy.get('.stepsName').contains(cypress.step1)
        } else if (
          el[0].getElementsByClassName('stepsName')[0].innerHTML ===
          cypress.step2
        ) {
          cy.get('.stepsName').contains(cypress.step2)
        }
      })
    })
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
    cy.get('.stepsTab').each(($el) => {
      cy.wrap($el).within((el) => {
        if (
          el[0].getElementsByClassName('stepsName')[0].innerHTML ===
          cypress.step1
        ) {
          cy.get('.stepsName').contains(cypress.step1)
        } else if (
          el[0].getElementsByClassName('stepsName')[0].innerHTML ===
          cypress.step2
        ) {
          cy.get('.stepsName').contains(cypress.step2)
        } else if (
          el[0].getElementsByClassName('stepsName')[0].innerHTML ===
          cypress.step3
        ) {
          cy.get('.stepsName').contains(cypress.step3)
        }
      })
    })

    cy.get('button#submitButton').should('have.text', cypress.submit).click()
  })
  it('Verify if user able create the test1', () => {
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
    cy.location('pathname').should('include', '/dashboard')
    cy.get('a').find('#Tests').should('have.text', testsConstants.Tests).click()
    cy.get('#addTest', { timeout: 6000 }).click()
    cy.location('pathname', { timeout: 60000 }).should(
      'include',
      '/tests/add-test'
    )

    cy.get('input[placeholder="Enter test name"]', { timeout: 6000 })
      .clear()
      .type(cypress.test1)
    cy.get('#quillEditor').within(() => {
      cy.get('.ql-editor').type(`Test Description`)
    })

    cy.get('button#nextButton').should('have.text', cypress.next).click()
    cy.get('.stepsTab').each(($el) => {
      cy.wrap($el).within((el) => {
        if (
          el[0].getElementsByClassName('stepsName')[0].innerHTML ===
          cypress.step1
        ) {
          cy.get('.stepsName').contains(cypress.step1)
        } else if (
          el[0].getElementsByClassName('stepsName')[0].innerHTML ===
          cypress.step2
        ) {
          cy.get('.stepsName').contains(cypress.step2)
        }
      })
    })
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
    cy.get('.stepsTab').each(($el) => {
      cy.wrap($el).within((el) => {
        if (
          el[0].getElementsByClassName('stepsName')[0].innerHTML ===
          cypress.step1
        ) {
          cy.get('.stepsName').contains(cypress.step1)
        } else if (
          el[0].getElementsByClassName('stepsName')[0].innerHTML ===
          cypress.step2
        ) {
          cy.get('.stepsName').contains(cypress.step2)
        } else if (
          el[0].getElementsByClassName('stepsName')[0].innerHTML ===
          cypress.step3
        ) {
          cy.get('.stepsName').contains(cypress.step3)
        }
      })
    })

    cy.get('button#submitButton').should('have.text', cypress.submit).click()
  })
  it('Test for adding a new member', () => {
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
    cy.get('a').find('#Members').should('have.text', cypress.members).click()
    cy.get('#addMember').should('have.text', cypress.addMember).click()
    cy.get('#AddPopUpModel').should('be.visible')
    cy.get('input[name="firstName"]')
      .clear()
      .type(cypress.memberFirstName)
      .should('have.value', cypress.memberFirstName)
    cy.get('input[name="lastName"]')
      .clear()
      .type(cypress.memberLastName)
      .should('have.value', cypress.memberLastName)
    cy.get('input[name="email"]')
      .clear()
      .type(cypress.memberEmail)
      .should('have.value', cypress.memberEmail)
    cy.get('select').select('Recruiter')
    cy.get('#addbutton').click()
  })
})
