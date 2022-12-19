// const question = 'What is question?'
// const editedQuestion = 'Question is edited'
const question = 'What is the question?'
const option1 = 'Option 1'
const option2 = 'Option 2'
const editedQuestion = 'What is question is edited'
const option2Edited = 'Option 2 edited'
/// <reference types="Cypress">
describe('Tests for edit questions', () => {
  beforeEach('sign-in', () => {
    cy.login()

    cy.customVisit('/members')
  })
  it('Checks if question is edited', () => {
    cy.get('#sections', { timeout: 8000 }).should('have.text', 'Tests').click()
    cy.get('#add-question').click()
    cy.get(
      '#question-editor > #quill-editor > .ql-container > .ql-editor'
    ).type(question)
    cy.get(' #optionEditor > #quill-editor > .ql-container > .ql-editor')
      .eq(0)
      .type(option1)
    cy.get(' #optionEditor > #quill-editor > .ql-container > .ql-editor')
      .eq(1)
      .type(option2)
    cy.get('.checkBox').eq(0).click()
    cy.get('#save-and-exit').click()
    cy.get('[data-cy="question-card-wrapper"]')
      .contains('What is the question?')
      .trigger('mouseover')
    cy.get('#edit-icon').click()
    cy.get('#question-editor > #quill-editor > .ql-container > .ql-editor')
      .clear()
      .type(editedQuestion)
    cy.get(' #optionEditor > #quill-editor > .ql-container > .ql-editor')
      .eq(1)
      .clear()
      .type(option2Edited)
    cy.get('.checkBox').eq(0).click()
    cy.get('.checkBox').eq(1).click()
    cy.get('#save-and-exit').click()
    cy.get('[data-cy="question-card-wrapper"]')
      .contains('What is question is edited')
      .should('have.text', 'What is question is edited')
      .click()
    cy.get('.option.ql-editor')
      .eq(1)
      .should('have.text', option2Edited)
      .parent()
      .should('have.css', 'background-color', 'rgb(240, 253, 244)')
  })
})
