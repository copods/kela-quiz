import { cypress } from '~/constants/common.constants'
const time = new Date().getTime()
describe('Visiting group by test of results page', () => {
  // creating data to test Test list page

  it('Create Section and  test', () => {
    cy.visit('/sign-in')
    cy.get('#email')
      .clear()
      .type(cypress.email)
      .should('have.value', cypress.email)
    cy.get('#password', { timeout: 6000 })
      .clear()
      .type(cypress.password)
      .should('have.value', cypress.password)
    cy.findByRole('button', { timeout: 6000 }).click()
    cy.get('a')
      .find('#Sections', { timeout: 6000 })
      .should('have.text', cypress.Sections)
      .click()
    cy.location('pathname', { timeout: 60000 }).should('include', '/sections')
    cy.get('#add-section', { timeout: 60000 }).click()
    const sectionName = `Aptitude - ${time}`
    cy.get('form > div', { timeout: 10000 })
      .should('be.visible')
      .within((el) => {
        cy.get('input').type(sectionName)
        cy.get('textarea').type('Aptitude')
        cy.get(`button[type=${cypress.submit}]`, { timeout: 10000 }).click()
      })
    cy.get('#addQuestion', { timeout: 6000 })
      .should('have.text', cypress.addQuest)
      .click()
    cy.location('pathname').should('include', '/add-question')
    cy.get('h1', { timeout: 6000 }).should('be.visible')
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
    cy.get('#saveAndExit', { timeout: 6000 }).click()
    cy.get('a')
      .find('#Tests', { timeout: 6000 })
      .should('have.text', cypress.Tests)
      .click()
    cy.location('pathname', { timeout: 60000 }).should('include', '/tests')
    cy.get('#addTest', { timeout: 6000 }).click()
    cy.location('pathname', { timeout: 60000 }).should(
      'include',
      '/tests/add-test'
    )
    cy.get('#name', { timeout: 60000 }).clear().type(`Test - ${time}`)
    cy.get('#quillEditor').within(() => {
      cy.get('.ql-editor').type(`Test ${cypress.description}`)
    })
    cy.get('button#nextButton').should('have.text', cypress.next).click()
    cy.get('#0').find('hr').should('have.class', 'bg-primary')
    cy.get('#1').find('hr').should('have.class', 'bg-primary')
    // user reached to step 2
    cy.get('div#section', { timeout: 60000 }).each((el) => {
      cy.wrap(el).within(() => {
        if (el.find('.count')[0].innerText != '0') {
          cy.get('input#noOfQu').should('have.disabled', true)
          cy.get('input#time').should('have.disabled', true)
          cy.get('button').should('have.text', cypress.Add).click()
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
      .should('have.text', cypress.submit)
      .click()
    cy.location('pathname', { timeout: 60000 }).should('include', '/tests')
    cy.get('a', { timeout: 6000 })
      .find('#Group_By_Tests', { timeout: 6000 })
      .should('have.text', 'Group By Tests')
      .click()
    cy.location('pathname', { timeout: 60000 }).should('include', '/results')
  })

  it('Check if that test is coming on group by test page or not', () => {
    cy.visit('/sign-in')
    cy.get('#email', { timeout: 6000 })
      .clear()
      .type('careers@copods.co')
      .should('have.value', 'careers@copods.co')
    cy.get('#password', { timeout: 6000 })
      .clear()
      .type('kQuiz@copods')
      .should('have.value', 'kQuiz@copods')
    cy.findByRole('button').click()

    cy.get('a', { timeout: 6000 })
      .find('#Group_By_Tests', { timeout: 6000 })
      .should('have.text', 'Group By Tests')
      .click()
    cy.location('pathname', { timeout: 60000 }).should('include', '/results')
  })
  it('Check  that if list of candidate is coming after clicking a test in group byt test in results page ', () => {
    cy.visit('/sign-in')
    cy.get('#email', { timeout: 6000 })
      .clear()
      .type('careers@copods.co')
      .should('have.value', 'careers@copods.co')
    cy.get('#password', { timeout: 6000 })
      .clear()
      .type('kQuiz@copods')
      .should('have.value', 'kQuiz@copods')
    cy.findByRole('button').click()

    cy.get('a')
      .find('#Group_By_Tests', { timeout: 6000 })
      .should('have.text', 'Group By Tests')
      .click()
    cy.location('pathname', { timeout: 60000 }).should('include', '/results')
    cy.get('#group-by-test-container', { timeout: 6000 })
      .get('#group-by-items-container', { timeout: 6000 })
      .get('#group-by-item-test', { timeout: 6000 })
      .click()
  })
  it('Check  that if list of attended candidate is coming after clicking a test in group byt test in results page ', () => {
    cy.visit('/sign-in')
    cy.get('#email', { timeout: 6000 })
      .clear()
      .type('careers@copods.co')
      .should('have.value', 'careers@copods.co')
    cy.get('#password', { timeout: 6000 })
      .clear()
      .type('kQuiz@copods')
      .should('have.value', 'kQuiz@copods')
    cy.findByRole('button', { timeout: 6000 }).click()

    cy.get('a')
      .find('#Group_By_Tests', { timeout: 6000 })
      .should('have.text', 'Group By Tests')
      .click()
    cy.location('pathname', { timeout: 60000 }).should('include', '/results')
    cy.get('#group-by-test-container', { timeout: 6000 })
      .get('#group-by-items-container', { timeout: 6000 })
      .get('#group-by-item-test', { timeout: 6000 })
      .click()
    cy.get('#Group_By_Tests-test-candidate-list-tab', { timeout: 6000 })
      .get('#tab-title')
      .invoke('text')
      .then((el) => {
        if (el === 'attending') {
          console.log(el, 'el')
        }
      })
  })
})
