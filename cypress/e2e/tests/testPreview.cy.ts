import { cypress, testsConstants } from '~/constants/common.constants'

const test1 = `Aptitude - assessment2`
const selectedSectionText = 'Selected Tests'
const assessmentDetailsText = 'Assessment Details'
const inviteCandidate = 'Invite Candidate'
describe('Test for testPreview', () => {
  beforeEach('sign-in', () => {
    cy.login()

    cy.customVisit('/members')
  })
  it('test for check preview data match selected test and back button ', () => {
    cy.get('a')
      .find('#tests', { timeout: 6000 })
      .should('have.text', testsConstants.assessments)
      .click()
    cy.location('pathname', { timeout: 60000 }).should(
      'include',
      '/assessments'
    )
    cy.get('.test-name-navigation').contains(test1).should('have.text', test1)
    cy.get('.test-name-navigation').contains(test1).click()
    cy.get('#title', { timeout: 6000 }).should('have.text', test1)
    cy.get('#back-button').click()
  })
  it('test for assessments name', () => {
    cy.get('a')
      .find('#tests', { timeout: 6000 })
      .should('have.text', testsConstants.assessments)
      .click()
    cy.location('pathname', { timeout: 60000 }).should(
      'include',
      '/assessments'
    )
    cy.get('.test-name-navigation', { timeout: 6000 }).contains(test1).click()
    cy.get('#name').should('have.text', cypress.name)
  })
  it('Checks for invite candidate button text', () => {
    cy.get('a')
      .find('#tests', { timeout: 6000 })
      .should('have.text', testsConstants.assessments)
      .click()
    cy.get('.test-name-navigation').contains(test1).click()
    cy.get('#invite-popup-open-text').should('have.text', inviteCandidate)
  })
  it('Checks for invite candidate button color', () => {
    cy.get('a')
      .find('#tests', { timeout: 6000 })
      .should('have.text', testsConstants.assessments)
      .click()
    cy.get('.test-name-navigation').contains(test1).click()
    cy.get('#invite-popup-open-text').should(
      'have.css',
      'color',
      'rgb(53, 57, 136)'
    )
  })
  it('Checks for invite candidate button font-size', () => {
    cy.get('a')
      .find('#tests', { timeout: 6000 })
      .should('have.text', testsConstants.assessments)
      .click()
    cy.get('.test-name-navigation').contains(test1).click()
    cy.get('#invite-popup-open-text').should('have.css', 'font-size', '16px')
  })
  it('Checks for invite candidate button cursor', () => {
    cy.get('a')
      .find('#tests', { timeout: 6000 })
      .should('have.text', testsConstants.assessments)
      .click()
    cy.get('.test-name-navigation').contains(test1).click()
    cy.get('#invite-popup-open-text').should('have.css', 'cursor', 'pointer')
  })

  it('Checks for assessment details text', () => {
    cy.get('a')
      .find('#tests', { timeout: 6000 })
      .should('have.text', testsConstants.assessments)
      .click()
    cy.get('.test-name-navigation').contains(test1).click()
    cy.get('#test-preview-assessment-details').should(
      'have.text',
      assessmentDetailsText
    )
  })
  it('Checks for assessment details text color', () => {
    cy.get('a')
      .find('#tests', { timeout: 6000 })
      .should('have.text', testsConstants.assessments)
      .click()
    cy.get('.test-name-navigation').contains(test1).click()
    cy.get('#test-preview-assessment-details').should(
      'have.css',
      'color',
      'rgb(0, 0, 0)'
    )
  })
  it('Checks for assessment details text font size', () => {
    cy.get('a')
      .find('#tests', { timeout: 6000 })
      .should('have.text', testsConstants.assessments)
      .click()
    cy.get('.test-name-navigation').contains(test1).click()
    cy.get('#test-preview-assessment-details').should(
      'have.css',
      'font-size',
      '20px'
    )
  })
  it('Checks for assessment details text font weight', () => {
    cy.get('a')
      .find('#tests', { timeout: 6000 })
      .should('have.text', testsConstants.assessments)
      .click()
    cy.get('.test-name-navigation').contains(test1).click()
    cy.get('#test-preview-assessment-details').should(
      'have.css',
      'font-weight',
      '600'
    )
  })
  it('Checks for selected section text', () => {
    cy.get('a')
      .find('#tests', { timeout: 6000 })
      .should('have.text', testsConstants.assessments)
      .click()
    cy.get('.test-name-navigation').contains(test1).click()

    cy.get('#test-preview-selected-tests').should(
      'have.text',
      selectedSectionText
    )
  })
  it('Checks for selected section text color', () => {
    cy.get('a')
      .find('#tests', { timeout: 6000 })
      .should('have.text', testsConstants.assessments)
      .click()
    cy.get('.test-name-navigation').contains(test1).click()

    cy.get('#test-preview-selected-tests').should(
      'have.css',
      'color',
      'rgb(0, 0, 0)'
    )
  })
  it('Checks for selected section text font size', () => {
    cy.get('a')
      .find('#tests', { timeout: 6000 })
      .should('have.text', testsConstants.assessments)
      .click()
    cy.get('.test-name-navigation').contains(test1).click()

    cy.get('#test-preview-selected-tests').should(
      'have.css',
      'font-size',
      '20px'
    )
  })
  it('Checks for selected section text font weight', () => {
    cy.get('a')
      .find('#tests', { timeout: 6000 })
      .should('have.text', testsConstants.assessments)
      .click()
    cy.get('.test-name-navigation').contains(test1).click()

    cy.get('#test-preview-selected-tests').should(
      'have.css',
      'font-weight',
      '600'
    )
  })

  it('test for description', () => {
    cy.get('a')
      .find('#tests', { timeout: 6000 })
      .should('have.text', testsConstants.assessments)
      .click()
    cy.location('pathname', { timeout: 60000 }).should(
      'include',
      '/assessments'
    )
    cy.get('.test-name-navigation', { timeout: 6000 }).contains(test1).click()
    cy.get('#description').should('have.text', cypress.description).click()
  })
  it('test for total time', () => {
    cy.get('a')
      .find('#tests', { timeout: 6000 })
      .should('have.text', testsConstants.assessments)
      .click()
    cy.location('pathname', { timeout: 60000 }).should(
      'include',
      '/assessments'
    )
    cy.get('.test-name-navigation', { timeout: 6000 }).contains(test1).click()
    cy.get('#totalTime').should('have.text', cypress.totalTime).click()
  })
  it('test for Total Sections', () => {
    cy.get('a')
      .find('#tests', { timeout: 6000 })
      .should('have.text', testsConstants.assessments)
      .click()
    cy.location('pathname', { timeout: 60000 }).should(
      'include',
      '/assessments'
    )

    cy.get('.test-name-navigation', { timeout: 6000 }).contains(test1).click()
    cy.get('#totalSection').should('have.text', testsConstants.totalTests)
  })
})
