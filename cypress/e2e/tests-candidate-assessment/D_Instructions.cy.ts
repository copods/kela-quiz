describe('Test for Assessment Verification', () => {
  let commonContants = {
    Begin: 'Begin Assessment',
    BestWishes: 'Best of Luck',
  }

  it('Check, Assessment registration and verification', () => {
    cy.candidateRegistration()
    cy.candidateVerification()
  })

  it('Check, heading is visible and should have first name', () => {
    cy.checkCandidateName()
  })

  it('Checks, test section should have heading', () => {
    cy.get('[data-cy="testSectionHeading"]').should('be.visible')
    cy.get('[data-cy="testSectionHeading"]').should('have.text', 'Tests')
  })

  it('Checks, total number of section in test with name', () => {
    const sectionsInAssessment = [
      'Test 1 -Quantitive - section1',
      'Test 2 -Quantitive - section2',
    ]
    cy.get('[data-cy="testSectionContent"]').children().should('have.length', 2)
    cy.get('[data-cy="testSectionContent"]')
      .children()
      .each(($el, index) => {
        cy.wrap($el).should('have.text', sectionsInAssessment[index])
      })
  })

  it('Checks, Instructions section should have proper heading', () => {
    cy.get('[data-cy="instructionSectionHeading"]').should('be.visible')
    cy.get('[data-cy="instructionSectionHeading"]').should(
      'have.text',
      'Instructions'
    )
  })

  it('Checks, total number of instruction in text with name', () => {
    const instructions = [
      'The duration of this exam is 3 minutes',
      'Each question is worth the same marks',
      "After submitting the section, you won't be able to make any changes",
    ]
    cy.get('[data-cy="instructionSectionContent"]')
      .children()
      .should('have.length', 3)
    cy.get('[data-cy="instructionSectionContent"]')
      .children()
      .each(($el, index) => {
        cy.wrap($el).should('have.text', instructions[index])
      })
  })
  it('Checks,Gesture should be visisble and have correct text', () => {
    cy.get('[data-cy="goodLuckMessageText"]').should('be.visible')
    cy.get('[data-cy="goodLuckMessageText"]').should(
      'have.text',
      commonContants.BestWishes
    )
  })
  it('Checks, click on begin assessment', () => {
    cy.get('#start').should('be.visible')
    cy.get('#start').should('have.text', commonContants.Begin)
    cy.get('#start').click()
  })
})
