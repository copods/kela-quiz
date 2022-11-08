import {
  commonConstants,
  members,
  routeFiles,
  testsConstants,
} from '~/constants/common.constants'
import { routes } from '~/constants/route.constants'
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
        testsConstants.tests,
        routeFiles.sections,
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
          routes.tests,
          routes.sections,
          routes.members,
          routes.settings,
        ]).to.include(item)
      })
    })
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
