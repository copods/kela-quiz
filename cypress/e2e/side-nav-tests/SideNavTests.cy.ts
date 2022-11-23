import {
  commonConstants,
  members,
  routeFiles,
  testsConstants,
} from '~/constants/common.constants'
import { routes } from '~/constants/route.constants'
const sideNavTitle = {
  results: 'Results',
  assessments: 'Assessments',
  general: 'General',
}
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
  it('Checks text SideNavTitle- Results', () => {
    cy.get('#nav-guide-results').should('have.text', sideNavTitle.results)
  })
  it('Checks font weight of SideNavTitle- Results', () => {
    cy.get('#nav-guide-results').should('have.css', 'font-weight', '600')
  })
  it('Checks font-size of SideNavTitle- Results ', () => {
    cy.get('#nav-guide-results').should('have.css', 'font-size', '12px')
  })
  it('Checks color of SideNavTitle- Results ', () => {
    cy.get('#nav-guide-results').should(
      'have.css',
      'color',
      'rgb(156, 163, 175)'
    )
  })
  it('Checks text of SideNavTitle- Assessments ', () => {
    cy.get('#nav-guide-assessments').should(
      'have.text',
      sideNavTitle.assessments
    )
  })
  it('Checks font weight of SideNavTitle- Assessments ', () => {
    cy.get('#nav-guide-assessments').should('have.css', 'font-weight', '600')
  })
  it('Checks font-size of SideNavTitle- Assessments ', () => {
    cy.get('#nav-guide-assessments').should('have.css', 'font-size', '12px')
  })
  it('Checks color of SideNavTitle- Assessments ', () => {
    cy.get('#nav-guide-assessments').should(
      'have.css',
      'color',
      'rgb(156, 163, 175)'
    )
  })

  it('Checks text SideNavTitle- General', () => {
    cy.get('#nav-guide-general').should('have.text', sideNavTitle.general)
  })
  it('Checks font weight of SideNavTitle- General ', () => {
    cy.get('#nav-guide-general').should('have.css', 'font-weight', '600')
  })
  it('Checks font size of SideNavTitle- General ', () => {
    cy.get('#nav-guide-general').should('have.css', 'font-size', '12px')
  })
  it('Checks color of SideNavTitle- General ', () => {
    cy.get('#nav-guide-general').should(
      'have.css',
      'color',
      'rgb(156, 163, 175)'
    )
  })
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
