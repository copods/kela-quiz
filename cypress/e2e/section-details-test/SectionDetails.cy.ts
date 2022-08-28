// import {
//   cypress,
//   routeFiles,
//   commonConstants,
// } from '~/constants/common.constants'

// describe('Test for Section Details', () => {
//   beforeEach('sign-in', () => {
//     cy.visit('/sign-in')
//     cy.get('input[name="email"]')
//       .clear()
//       .type(Cypress.env('email'))
//       .should('have.focus')
//       .should('have.value', Cypress.env('email'))
//     cy.get('input[name="password"]')
//       .clear()
//       .type(Cypress.env('password'))
//       .should('have.focus')
//       .should('have.value', Cypress.env('password'))
//     cy.get('[data-cy="submit"]').click()
//     cy.location('pathname').should('include', '/dashboard')
//   })

//   it('Visiting Add Question Page', () => {
//     cy.get('a')
//       .find('#Sections')
//       .should('have.text', routeFiles.sections)
//       .click()
//     cy.location('pathname', { timeout: 60000 }).should('include', '/sections')
//     cy.get('#addQuestion', { timeout: 6000 }).click()
//     cy.location('pathname', { timeout: 60000 }).should(
//       'include',
//       '/add-question'
//     )
//   })
//   it('after adding a new section visiting section page', () => {
//     cy.get('a')
//       .find('#Sections')
//       .should('have.text', routeFiles.sections)
//       .click()
//     cy.location('pathname', { timeout: 60000 }).should('include', '/sections')
//     cy.get('#section-cards').each((item) => {
//       cy.contains(`Aptitude - ${time}`).click()
//     })
//   })
//   it('Visiting Sections page after visiting add question page', () => {
//     cy.visit('/sign-in')
//     cy.get('#email')
//       .clear()
//       .type('careers@copods.co')
//       .should('have.value', cypress.email)
//     cy.get('#password')
//       .clear()
//       .type('kQuiz@copods')
//       .should('have.value', cypress.password)
//     cy.findByRole('button').click()
//     cy.get('a')
//       .find('#Sections')
//       .should('have.text', routeFiles.sections)
//       .click()
//     cy.location('pathname', { timeout: 60000 }).should('include', '/sections')
//     cy.get('#section-cards').each((item) => {
//       cy.contains(`Aptitude - ${time}`).click()
//     })
//     cy.get('#addQuestion').should('have.text', cypress.addQuest).click()
//     cy.location('pathname', { timeout: 60000 }).should(
//       'include',
//       '/add-question'
//     )
//     cy.get('#Section', { timeout: 6000 }).should('have.text', 'Section').click()
//   })
//   it('Visiting Sections search input', () => {
//     cy.visit('/sign-in')
//     cy.get('#email')
//       .clear()
//       .type('careers@copods.co')
//       .should('have.value', cypress.email)
//     cy.get('#password')
//       .clear()
//       .type('kQuiz@copods')
//       .should('have.value', cypress.password)
//     cy.findByRole('button').click()
//     cy.get('a')
//       .find('#Sections')
//       .should('have.text', routeFiles.sections)
//       .click()
//     cy.location('pathname', { timeout: 60000 }).should('include', '/sections')
//     cy.get('#section-cards').each((item) => {
//       cy.contains(`Aptitude - ${time}`).click()
//     })
//     cy.get('#sectionSearch').type(`${time}`)
//   })
// })
