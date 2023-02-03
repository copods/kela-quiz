import {
  getNavGuideAssessment,
  getNavGuideGeneral,
  getNavGuideResult,
  getSideNavLogoutBtn,
  getSideNavUserAvatar,
  getSideNavUserEmail,
  getSideNavUserName,
} from 'support/common-function'

const sideNavGroupTitles = {
  results: 'Results',
  assessments: 'Assessments',
  general: 'General',
}
const userName = 'Copods Careers'
const userEmail = 'copods.demo.sendgrid@gmail.com'
const userAvatarText = 'CC'
describe('Test for Logout, SideNav', () => {
  beforeEach('sign-in', () => {
    cy.login()

    cy.customVisit('/members')
  })

  it('click all links with loop', () => {
    const pages = ['members', 'tests', 'sections', 'group-by-tests', 'Settings']
    cy.login()
    cy.customVisit('/members')
    pages.forEach((page) => {
      cy.get(`#${page}`).click()
      cy.customVisit('/members')
    })
  })
  it('Checks text of SideNav group title- Results and css properties', () => {
    getNavGuideResult()
      .should('have.text', sideNavGroupTitles.results)
      .should('have.css', 'font-weight', '600')
      .should('have.css', 'font-size', '12px')
      .should('have.css', 'color', 'rgb(156, 163, 175)')
  })
  it('Checks text of SideNav group title- Assessments and css properties', () => {
    getNavGuideAssessment()
      .should('have.text', sideNavGroupTitles.assessments)
      .should('have.css', 'font-weight', '600')
      .should('have.css', 'font-size', '12px')
      .should('have.css', 'color', 'rgb(156, 163, 175)')
  })

  it('Checks text of SideNav group title- General and css properties', () => {
    getNavGuideGeneral()
      .should('have.text', sideNavGroupTitles.general)
      .should('have.css', 'font-weight', '600')
      .should('have.css', 'font-size', '12px')
      .should('have.css', 'color', 'rgb(156, 163, 175)')
  })
  it('Checks for SideNav username text and css properties', () => {
    getSideNavUserName()
      .should('have.text', userName)
      .should('have.css', 'color', 'rgb(17, 24, 39)')
      .should('have.css', 'font-weight', '600')
      .should('have.css', 'font-size', '12px')
  })

  it('Checks for sideNav user email text and css properties', () => {
    getSideNavUserEmail()
      .should('have.text', userEmail)
      .should('have.css', 'color', 'rgb(107, 114, 128)')
      .should('have.css', 'font-size', '12px')
      .should('have.css', 'font-weight', '400')
  })
  // user avatar
  it('Checks for sideNav user avatar text and css properties', () => {
    getSideNavUserAvatar()
      .should('have.text', userAvatarText)
      .should('have.css', 'font-size', '18px')
      .should('have.css', 'font-weight', '500')
      .should('have.css', 'color', 'rgb(255, 255, 255)')
  })
  // logout CTA button
  it('Checks for logout CTA button css properties', () => {
    getSideNavLogoutBtn()
      .should('have.css', 'background-color', 'rgb(239, 68, 68)')
      .should('have.css', 'padding', '10px 20px')
      .should('have.css', 'cursor', 'pointer')
  })
})
