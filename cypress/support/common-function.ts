export const visitSignIn = () => cy.visit('/sign-in')
export const getEmail = () => cy.get('#email')
export const getPassword = () => cy.get('#password')
export const getPasswordError = () => cy.get('#password-error')
export const getDropdown = () => cy.get('#dropdown', { timeout: 5000 })
export const getAddWorkspaceInput = () => cy.get('input[name="addWorkspace"]')
export const getAddWorkspaceBtn = () => cy.get('button[name="addWorkspace"]')
export const getSections = () => cy.get('#sections')
export const getAddSectionBtn = () => cy.get('#add-section')
export const getTestNameInput = () =>
  cy.get('input[placeholder="Enter Test Name*"]')
export const getTextArea = () => cy.get('textarea')
export const getSubmitBtn = () => cy.get('[data-cy="submit"]')
export const getSectionCards = () => cy.get('#section-card')
export const getSectionName = () => cy.get('.sectionName')
export const getAddQuestionBtn = () =>
  cy.get('#add-question', { timeout: 8000 })
export const geth1 = () => cy.get('h1')
export const getQuestionWithDropdown = () =>
  cy.get('#Question').get('#dropdown-container')
export const getQlEditorWrapper = () => cy.get('#question-editor #quill-editor')
export const getQlEditor = () => cy.get('.ql-editor')
export const getQlEditorInput = () =>
  cy.get('input[placeholder="Write your option here"]')
export const getSaveAndExit = () => cy.get('#save-and-exit')
export const getSaveAndAddMore = () => cy.get('#save-and-add-more')
export const getTests = () => cy.get('#tests')
export const getAddTestBtn = () => cy.get('#add-test')
export const getAssesmentNameInput = () =>
  cy.get('input[placeholder="Enter assessment name"]')
export const getNextBtn = () => cy.get('#next-button')
export const getStepsTabs = () => cy.get('.stepsTab')
export const getNumberOfQuestionsInput = () => cy.get('input#no-of-qu')
export const getTimeInput = () => cy.get('input#time')
export const getAssesmentSubmitBtn = () => cy.get('button#submit-button')
export const getAssesmentQlEditorWrapper = () => cy.get('#quill-editor')
export const getInviteMemberBtn = () => cy.get('#invite-member')
export const getDialogWrapper = () => cy.get('#dialog-wrapper')
export const getEmailInput = () => cy.get('input[name="email"]')
export const getAddMemberModal = () => cy.get('div').get('#add-member-modal')
export const getInviteBtn = () => cy.get('#invite-button')
export const getAssessmentsPageTitle = () => cy.get('#assessments-page-title')
export const getInvitePopup = () => cy.get('#invite-popup-open0')