describe('Test for candidate assessment verfication', () => {
  it('registration', () => {
    cy.candidateRegistration()
  })

  it('Checks, header of verification page should be visible and correct', () => {
    cy.customVisitOnCandidateSide('verification')
    cy.get('[data-cy="header"]', { timeout: 6000 })
      .should('be.visible')
      .should('have.text', 'OTP Verification')
  })

  it('Checks, Email Id of candidate should be visible and correct', () => {
    cy.customVisitOnCandidateSide('verification')
    cy.get('[data-cy="email"]', { timeout: 6000 }).should('be.visible')
  })

  it('Checks, Timer is working fine', () => {
    cy.customVisitOnCandidateSide('verification')
    cy.clock()
    cy.get('[data-cy="resendOTP"]', { timeout: 6000 }).should(
      'have.text',
      ' 01:00'
    )
    cy.tick(1000)
    cy.get('[data-cy="resendOTP"]').should('have.text', ' 00:59')
    cy.tick(1000)
    cy.get('[data-cy="resendOTP"]').should('have.text', ' 00:58')
    cy.tick(1000)
    cy.get('[data-cy="resendOTP"]').should('have.text', ' 00:57')
  })

  it('Checks, Timer ends and text Changes', () => {
    cy.customVisitOnCandidateSide('verification')
    cy.wait(60000)
    cy.get("[data-cy='resendText']", { timeout: 6000 }).should(
      'have.text',
      "Didn't get a code Resend"
    )
    cy.get('[data-cy="resendButton"]').should('be.visible').click()
    cy.get('.Toastify__toast').should(
      'have.text',
      'Otp sent. Please check your email'
    )
  })

  it('Checks, Otp Verification', () => {
    cy.customVisitOnCandidateSide('verification')
    cy.get('input[name="field-1"]', { timeout: 6000 }).type('0')
    cy.get('input[name="field-2"]').type('0')
    cy.get('input[name="field-3"]').type('0')
    cy.get('input[name="field-4"]').type('0')
    cy.url().should('include', 'instructions')
  })
})
