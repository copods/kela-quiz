describe('Test for Assessment Verification', () => {
  it('Check, Assessment registration and verification', () => {
    cy.candidateRegistration()
    cy.candidateVerification()
  })

  it('Check, heading is visible and should have first name', () => {
    cy.checkCandidateName()
  })

  it('Checks, test section should have heading', () => {
    cy.get('.testSectionHeading').should('be.visible')
    cy.get('.testSectionHeading').should('have.text', 'Tests')
  })

  it('Checks, total number of section in test with name', () => {
    const element = [
      'Test 1 -Aptitude - delete-Section',
      'Test 2 -Aptitude - section1',
    ]
    cy.get('.testSectionContent').children().should('have.length', 2)
    cy.get('.testSectionContent')
      .children()
      .each(($el, index) => {
        cy.wrap($el).should('have.text', element[index])
      })
  })

  it('Checks, Instructions section should have proper heading', () => {
    cy.get('.instructionSectionHeading').should('be.visible')
    cy.get('.instructionSectionHeading').should('have.text', 'Instructions')
  })

  it('Checks, total number of instruction in text with name', () => {
    const element = [
      'The duration of this exam is 2 minutes',
      'Each question is worth the same marks',
      "After submitting the section, you won't be able to make any changes",
    ]
    cy.get('.instructionSectionContent').children().should('have.length', 3)
    cy.get('.instructionSectionContent')
      .children()
      .each(($el, index) => {
        cy.wrap($el).should('have.text', element[index])
      })
  })
  it('Checks, gesture should be visisble and have correct text', () => {
    cy.get('.gesture').should('be.visible')
    cy.get('.gesture').should('have.text', 'Best of Luck')
  })
  it('Checks, click on begin assessment', () => {
    cy.get('#start').should('be.visible')
    cy.get('#start').should('have.text', 'Begin Assessment')
    cy.get('#start').click()
    cy.CustomVisitOnCandidateSide(
      'cld44v2oo6743noh4xfv9o55s/cld46i89q17385noh4m07faxet'
    )
  })
})
