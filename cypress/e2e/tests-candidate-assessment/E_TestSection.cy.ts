import {
  getAnswer,
  getAnswerSectionHeading,
  getAnswerSectionLabel,
  getcoolDownCard,
  getQuestion,
  getQuestionSectionHeading,
  getRemainingTime,
  getSectionHeading,
  getStepperContents,
} from 'support/common-function'

const commonContants = {
  sectionHeadingOne: 'Section 1 - 2: Quantitative - assessment1',
  sectionHeadingTwo: 'Section 2 - 2: Quantitative - assessment1',
  coolDown: 'cooldown',
  congratulationText: 'Congratulations! You have completed the exam',
  Next: 'Next',
  Previous: 'Previous',
  EndTest: 'End Test',
  Finish: 'Finish',
  section1: 'Quantitive - section1',
}
describe('Tests for Test Section', () => {
  it('Checks,registration, OTP Verification and Instruction', () => {
    cy.candidateRegistration()
    cy.candidateVerification()
    cy.assessmentInstruction()
  })
  /**
   *  Test Cases For Section 1
   */
  it('Checks, Heading should be visible and correct', () => {
    getSectionHeading().should('be.visible')
    getSectionHeading().should('have.text', commonContants?.sectionHeadingOne)
  })

  it('Checks, timer should be visible and should work properly', () => {
    cy.clock()
    getRemainingTime()
      .first()
      .should('be.visible')
      .should('have.text', 'Time Remaining')
    getRemainingTime().last().should('be.visible')
    cy.wait(1000)
    getRemainingTime().last().invoke('val', '01:00')
    cy.tick(1000)
    getRemainingTime().last().invoke('val', '00:59')
    cy.tick(1000)
    getRemainingTime().last().invoke('val', '00:58')
    cy.tick(1000)
    getRemainingTime().last().invoke('val', '00:57')
    cy.tick(1000)
  })

  it('Checks, Question section heading should be visible and correct', () => {
    getQuestionSectionHeading()
      .should('be.visible')
      .should('have.text', 'Question ')
  })

  it('Checks, Question should be visible', () => {
    getQuestion().should('be.visible')
  })

  it('Checks, Answer section heading should be visible and correct', () => {
    getAnswerSectionHeading()
      .first()
      .should('be.visible')
      .should('have.text', 'Write Correct Answer')
  })

  it('Checks, Answer section has textArea', () => {
    getAnswer().should('be.visible')
    getAnswer().click().should('have.focus') //checking Accessibility
  })

  it('Checks, Previous button should be visible', () => {
    cy.contains('button', commonContants.Previous).should('be.disabled')
    cy.contains('button', commonContants.Previous)
      .should('have.class', 'text-xs')
      .and('have.class', 'font-medium')
      .and('have.class', 'text-primaryDisabled')
  })

  it('Checks, Finish button should be visible', () => {
    cy.contains('button', commonContants.Finish).should('be.visible')
  })

  it('Checks, Attempted question and click on finish', () => {
    cy.contains('button', commonContants.Finish).click()
    cy.url().should('include', commonContants.coolDown)
  })

  /**
   * Cool Down Page
   */

  it('Checks, Cool down page url', () => {
    cy.url().should('contains', commonContants.coolDown)
  })

  it('Checks, Take A Break is visible and should be correct', () => {
    getcoolDownCard()
      .find('span')
      .should('be.visible')
      .should('have.class', 'text-gray-500')
    getcoolDownCard().find('span').should('have.text', 'Take A Break!')
  })

  it('Checks, Heading should be visible and correct styling', () => {
    getcoolDownCard().find('p').should('be.visible')
    getcoolDownCard()
      .find('p')
      .should(
        'have.text',
        `Cheers! ${commonContants.section1} Questions Completed - one more to go`
      )
  })

  it('Checks, cooldownImage is visible', () => {
    cy.get('.w-coolDownCard img').should('be.visible')
  })

  it('Checks, Start new section button should be visible and works fine ', () => {
    cy.contains('button', 'Start New Section')
      .should('be.visible')
      .should('have.class', 'text-gray-50')
      .and('have.class', 'hover:bg-primaryHover')
    cy.contains('button', 'Start New Section').click()
  })

  /**
   *   Test Cases For Question 1 of Section 2
   */

  it('Checks, Heading should be visible and correct', () => {
    getSectionHeading().should('be.visible')
    getSectionHeading().should('have.text', commonContants?.sectionHeadingTwo)
  })

  it('Checks, Stepper section should be visible and work properly', () => {
    getStepperContents()
      .first()
      .find('div')
      .should('have.class', 'bg-primary')
      .and('have.class', 'rounded-full')
      .should('have.text', '1')
    getStepperContents()
      .last()
      .find('div')
      .and('have.class', 'rounded-full')
      .should('have.text', '2')
  })

  it('Check, skip question button should be visible', () => {
    cy.contains('button', 'Skip Question')
      .should('be.visible')
      .should('have.class', 'text-xs')
  })

  it('Checks, Next button should be visible', () => {
    cy.contains('button', commonContants.Next).should('be.visible')
    cy.contains('button', commonContants.Next)
      .should('have.class', 'text-xs')
      .and('have.class', 'font-medium')
      .and('have.class', 'text-gray-50')
      .and('have.class', 'bg-primary')
  })

  it('Checks, Answer Section contains opitons', () => {
    getAnswerSectionLabel().each(($el) => {
      cy.wrap($el).first().get('input').should('be.visible')
    })
  })

  it('Checks,attempt Question and click on skip', () => {
    cy.contains('button', 'Skip Question').click()
    getStepperContents()
      .first()
      .find('div')
      .should('have.class', 'bg-gray-700')
      .find('img')
      .should('be.visible')
    cy.contains('button', commonContants.Previous).click()
    getStepperContents().last().find('div').find('img').should('be.visible')
  })

  it('Checks, attempt Question and click on next', () => {
    getAnswerSectionLabel().first().click()
    cy.contains('button', commonContants.Next).click()
    getStepperContents()
      .first()
      .find('div')
      .should('have.class', 'bg-green-600')
      .find('img')
      .should('be.visible')
  })

  /**
   * Test Cases For Question 2 of Section 2
   */
  it('Checks, Previous button should be visible and should have correct styling', () => {
    cy.contains('button', commonContants.Previous).should('be.visible')
    cy.contains('button', commonContants.Previous)
      .should('have.class', 'text-xs')
      .and('have.class', 'font-medium')
      .and('have.class', 'bg-white')
  })

  it('Checks, Previous button should work correctly', () => {
    cy.contains('button', commonContants.Previous).click()
    getStepperContents().last().find('div').find('img').should('be.visible')
    cy.contains('button', commonContants.Next).click()
  })

  it('Checks, End test button should be visible', () => {
    cy.contains('button', commonContants.EndTest).should('be.visible')
    cy.contains('button', commonContants.EndTest)
      .should('have.class', 'text-xs')
      .and('have.class', 'font-medium')
      .and('have.class', 'text-gray-50')
      .and('have.class', 'bg-primary')
  })

  it('Checks, End Test working correctly', () => {
    getAnswerSectionLabel().last().click()
    cy.contains('button', commonContants.EndTest).should('be.visible').click()
  })

  /**
   * End assessment
   */

  it('Checks, correct page', () => {
    cy.url().should('include', 'end-assessment')
  })

  it('Checks, image is visible or not', () => {
    getcoolDownCard().find('img').should('be.visible')
  })

  it('Checks, Congratulation text is visible and correct', () => {
    getcoolDownCard()
      .find('span')
      .should('have.text', commonContants.congratulationText)
      .should('have.class', 'text-2xl')
      .and('have.class', 'font-bold')
      .and('have.class', 'text-gray-900')
  })
})
