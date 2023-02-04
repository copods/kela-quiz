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

  it('Tests to check Attributes/Colors/Visibility/Texts', () => {
    cy.customVisitOnCandidateSide('verification')

    // To check if header is visible
    getOTPVerificationHeader()
      .should('be.visible')
      .should('have.text', 'OTP Verification')

    // To check if email id of candidate is visible
    getEmailIDOfCandidate().should('be.visible')
  })

  it('Test to check OTP flow', () => {
    cy.customVisitOnCandidateSide('verification')

    // To check otp timer
    cy.clock()
    getResendOTP().should('have.text', ' 01:00')
    cy.tick(1000)
    getResendOTP().should('have.text', ' 00:59')
    cy.tick(1000)
    getResendOTP().should('have.text', ' 00:58')
    cy.tick(1000)
    getResendOTP().should('have.text', ' 00:57')
    cy.tick(1000)
    getResendOTP().should('have.text', ' 00:56')
    cy.tick(1000)
    getResendOTP().should('have.text', ' 00:55')

    // To check if text changes after 1 min
    cy.tick(55000)
    getResendText().should('have.text', "Didn't get a code Resend")
    getResendButton().should('be.visible').click()
    getToastMessage().should('have.text', 'Otp sent. Please check your email')

    // To check otp input fields
    getOTPFirstInputField().type('0')
    getOTPSecondInputField().type('0')
    getOTPThirdInputField().type('0')
    getOTPFourthInputField().type('0')
    cy.url().should('include', 'instructions')
  })
})
