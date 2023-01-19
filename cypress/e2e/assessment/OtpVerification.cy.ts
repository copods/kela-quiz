describe('Test for candidate assessment verfication', () => {
  it('registration', () => {
    cy.candidateRegistration()
  })

  it('Checks, header of verification page should be visible and correct', () => {
    cy.CustomVisitOnCandidateSide('verification')
    cy.get('#header')
      .should('be.visible')
      .should('have.text', 'OTP Verification')
  })

  it('Checks, Email Id of candidate should be visible and correct', () => {
    cy.CustomVisitOnCandidateSide('verification')
    cy.get('#email').should('be.visible')
  })

  it('Checks, Timer is working fine', () => {
    cy.CustomVisitOnCandidateSide('verification')
    cy.clock()
    cy.get('.resendOTP').should('have.text', ' 01:00')
    cy.tick(1000)
    cy.get('.resendOTP').should('have.text', ' 00:59')
    cy.tick(1000)
    cy.get('.resendOTP').should('have.text', ' 00:58')
    cy.tick(1000)
    cy.get('.resendOTP').should('have.text', ' 00:58')
  })

  it('Checks, Timer ends and text Changes', () => {
    cy.CustomVisitOnCandidateSide('verification')
    cy.wait(60000)
    cy.get('.resendText').should('have.text', "Didn't get a code Resend")
    cy.get('.resendButton').should('be.visible').click()
    cy.get('.Toastify__toast').should(
      'have.text',
      'Otp sent. Please check your email'
    )
  })

  it('Checks, Otp Verification', () => {
    cy.CustomVisitOnCandidateSide('verification')
    cy.get('input[name="field-1"]').type('0')
    cy.get('input[name="field-2"]').type('0')
    cy.get('input[name="field-3"]').type('0')
    cy.get('input[name="field-4"]').type('0')
    cy.url().should('include', 'instructions')
  })
})
