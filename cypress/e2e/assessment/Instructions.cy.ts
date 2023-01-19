describe('Test for Assessment Verification', () => {
  it('Check, Assessment registration and verification', () => {
    cy.candidateRegistration()
    cy.candidateVerification()
  })

  it('Check, heading is visible and should have first name', () => {
    cy.checkCandidateName()
  })
})
