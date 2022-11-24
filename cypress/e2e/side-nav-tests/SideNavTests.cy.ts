import {
  commonConstants,
  members,
  routeFiles,
  testsConstants,
} from '~/constants/common.constants'
import { routes } from '~/constants/route.constants'
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
    const menu = cy.get('#sideNavMenu')
    const menuItems = menu.find('.menuItem')

    menuItems.should((item) => {
      expect(item).to.have.length(5)
    })

    menuItems.each((item) => {
      expect([
        commonConstants.results,
        testsConstants.assessments,
        routeFiles.tests,
        members.members,
        commonConstants.settings,
      ]).to.include(item.text())

      // @TODO:
      // Need to evalute this, we can use cy.wrap() but it is failling during iteration
      // Will look into this.
      item.click()

      cy.location('pathname').should((item) => {
        expect([
          routes.resultGroupTest,
          routes.assessments,
          routes.tests,
          routes.members,
          routes.settings,
        ]).to.include(item)
      })
    })
  })
  it('Checks text SideNav group title- Results', () => {
    cy.get('#nav-guide-results').should('have.text', sideNavGroupTitles.results)
  })
  it('Checks font weight of SideNav group title- Results', () => {
    cy.get('#nav-guide-results').should('have.css', 'font-weight', '600')
  })
  it('Checks font-size of SideNav group title- Results ', () => {
    cy.get('#nav-guide-results').should('have.css', 'font-size', '12px')
  })
  it('Checks color of SideNav group title- Results ', () => {
    cy.get('#nav-guide-results').should(
      'have.css',
      'color',
      'rgb(156, 163, 175)'
    )
  })
  it('Checks text of SideNav group title- Assessments ', () => {
    cy.get('#nav-guide-assessments').should(
      'have.text',
      sideNavGroupTitles.assessments
    )
  })
  it('Checks font weight of SideNav group title- Assessments ', () => {
    cy.get('#nav-guide-assessments').should('have.css', 'font-weight', '600')
  })
  it('Checks font-size of SideNav group title- Assessments ', () => {
    cy.get('#nav-guide-assessments').should('have.css', 'font-size', '12px')
  })
  it('Checks color of SideNav group title- Assessments ', () => {
    cy.get('#nav-guide-assessments').should(
      'have.css',
      'color',
      'rgb(156, 163, 175)'
    )
  })

  it('Checks text SideNav group title- General', () => {
    cy.get('#nav-guide-general').should('have.text', sideNavGroupTitles.general)
  })
  it('Checks font weight of SideNav group title- General ', () => {
    cy.get('#nav-guide-general').should('have.css', 'font-weight', '600')
  })
  it('Checks font size of SideNav group title- General ', () => {
    cy.get('#nav-guide-general').should('have.css', 'font-size', '12px')
  })
  it('Checks color of SideNav group title- General ', () => {
    cy.get('#nav-guide-general').should(
      'have.css',
      'color',
      'rgb(156, 163, 175)'
    )
  })
  it('Checks for SideNav username text', () => {
    cy.get('#sidenav-username').should('have.text', userName)
  })
  it('Checks for SideNav username color', () => {
    cy.get('#sidenav-username').should('have.css', 'color', 'rgb(17, 24, 39)')
  })
  it('Checks for SideNav username font weight', () => {
    cy.get('#sidenav-username').should('have.css', 'font-weight', '600')
  })
  it('Checks for SideNav username font size', () => {
    cy.get('#sidenav-username').should('have.css', 'font-size', '12px')
  })
  it('Checks for sideNav user email text', () => {
    cy.get('#sidenav-user-email').should('have.text', userEmail)
  })

  it('Checks for sideNav user email color', () => {
    cy.get('#sidenav-user-email').should(
      'have.css',
      'color',
      'rgb(107, 114, 128)'
    )
  })
  it('Checks for sideNav user email font size', () => {
    cy.get('#sidenav-user-email').should('have.css', 'font-size', '12px')
  })
  // user avatar
  it('Checks for sideNav user avatar text', () => {
    cy.get('#sidenav-user-avatar').should('have.text', userAvatarText)
  })
  it('Checks for sideNav user avatar font size', () => {
    cy.get('#sidenav-user-avatar').should('have.css', 'font-size', '18px')
  })
  it('Checks for sideNav user avatar font weight', () => {
    cy.get('#sidenav-user-avatar').should('have.css', 'font-weight', '500')
  })
  it('Checks for sideNav user avatar color', () => {
    cy.get('#sidenav-user-avatar').should(
      'have.css',
      'color',
      'rgb(255, 255, 255)'
    )
  })
  // logout CTA button
  it('Checks for logout CTA button background color', () => {
    cy.get('#logout-button').should(
      'have.css',
      'background-color',
      'rgb(239, 68, 68)'
    )
  })
  it('Checks for logout CTA button padding', () => {
    cy.get('#logout-button').should('have.css', 'padding', '10px 8px')
  })
  it('Checks for logout CTA button cursor', () => {
    cy.get('#logout-button').should('have.css', 'cursor', 'pointer')
  })

  it('should render drop down to switch workspace', () => {
    cy.get('#dropdown').should('be.visible')
  })

  it('should render dropdown for workspace without any workspace', () => {
    const dropdown = cy.get('#dropdown')
    dropdown
      .click()
      .find('ul')
      .find('li')
      .should((item) => {
        expect(item.length).to.be.greaterThan(1)
      })
  })
})
