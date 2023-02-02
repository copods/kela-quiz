import {
  getEmailIDOfCandidate,
  getOTPFirstInputField,
  getOTPFourthInputField,
  getOTPSecondInputField,
  getOTPThirdInputField,
  getOTPVerificationHeader,
  getResendButton,
  getResendOTP,
  getResendText,
  getToastMessage,
} from 'support/common-function'

describe('Test for candidate assessment verfication', () => {
  it('registration', () => {
    cy.candidateRegistration()
  })

  it('Checks, header of verification page should be visible and correct', () => {
    cy.customVisitOnCandidateSide('verification')
    getOTPVerificationHeader()
      .should('be.visible')
      .should('have.text', 'OTP Verification')
  })

  it('Checks, Email Id of candidate should be visible and correct', () => {
    cy.customVisitOnCandidateSide('verification')
    getEmailIDOfCandidate().should('be.visible')
  })

  it('Checks, Timer is working fine', () => {
    cy.customVisitOnCandidateSide('verification')
    cy.clock()
    getResendOTP().should('have.text', ' 01:00')
    cy.tick(1000)
    getResendOTP().should('have.text', ' 00:59')
    cy.tick(1000)
    getResendOTP().should('have.text', ' 00:58')
    cy.tick(1000)
    getResendOTP().should('have.text', ' 00:57')
  })

  it('Checks, Timer ends and text Changes', () => {
    cy.customVisitOnCandidateSide('verification')
    cy.wait(60000)
    getResendText().should('have.text', "Didn't get a code Resend")
    getResendButton().should('be.visible').click()
    getToastMessage().should('have.text', 'Otp sent. Please check your email')
  })

  it('Checks, Otp Verification', () => {
    cy.customVisitOnCandidateSide('verification')
    getOTPFirstInputField().type('0')
    getOTPSecondInputField().type('0')
    getOTPThirdInputField().type('0')
    getOTPFourthInputField().type('0')
    cy.url().should('include', 'instructions')
  })
})
