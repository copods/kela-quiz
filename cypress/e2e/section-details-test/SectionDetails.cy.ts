import {
  cypress,
  routeFiles,
  commonConstants,
  sectionsConstants,
} from '~/constants/common.constants'

describe('Test for Section Details', () => {
  it('login and redirect to section page', () => {
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
  })
  let time = new Date().getTime()

  it('Visiting Add Question Page', () => {
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
    cy.get('.px-5').should('be.visible')
    cy.get('.px-5').click()
    cy.get('.addSectionDilog', { timeout: 10000 }).should('be.visible')
    cy.get('input#sectionName').type(`Aptitude - ${time}`)
    cy.get('textarea#sectionDescription').type(`Aptitude - ${time} Description`)
    cy.get('button#submitButton', { timeout: 6000 })
      .should('have.text', commonConstants.addButton)
      .click()
    cy.get('#section-card', { timeout: 6000 }).first().click()
    cy.get('#addQuestion', { timeout: 6000 }).click()
    cy.location('pathname', { timeout: 60000 }).should(
      'include',
      '/add-question'
    )
  })
  it('after adding a new section visiting section page', () => {
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
    cy.get('#section-cards').each((item) => {
      cy.contains(`Aptitude - ${time}`).click()
    })
  })
  it('Visiting Sections page after visiting add question page', () => {
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
    cy.get('#section-cards').each((item) => {
      cy.contains(`Aptitude - ${time}`).click()
    })
    cy.get('#addQuestion').should('have.text', `+ ${sectionsConstants.addQuestion}`).click()
    cy.location('pathname', { timeout: 60000 }).should(
      'include',
      '/add-question'
    )
    cy.get('#Section', { timeout: 6000 }).should('have.text', 'Section').click()
  })
  it('Visiting Sections search input', () => {
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
    cy.get('#section-cards').each((item) => {
      cy.contains(`Aptitude - ${time}`).click()
    })
    cy.get('#sectionSearch').type(`${time}`)
  })
})
