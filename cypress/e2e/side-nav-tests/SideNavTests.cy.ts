import {
  commonConstants,
  members,
  routeFiles,
  testsConstants,
} from '~/constants/common.constants'
import { routes } from '~/constants/route.constants'
describe('Test for Logout, SideNav', () => {
  beforeEach('sign-in', () => {
    cy.visit('/sign-in')
    cy.get('input[name="email"]')
      .clear()
      .type(Cypress.env('email'))
      .should('have.focus')
      .should('have.value', Cypress.env('email'))
    cy.get('input[name="password"]')
      .clear()
      .type(Cypress.env('password'))
      .should('have.focus')
      .should('have.value', Cypress.env('password'))
    cy.get('[data-cy="submit"]').click()
    cy.location('pathname').should('include', '/members')
  })
  it('click all links with loop', () => {
    const menu = cy.get('#sideNavMenu', { timeout: 1000 })
    const menuItems = menu.find('.menuItem')

    menuItems.should((item) => {
      expect(item).to.have.length(4)
    })

    menuItems.each((item) => {
      expect([
        commonConstants.results,
        testsConstants.tests,
        routeFiles.sections,
        members.members,
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
        expect(item).to.have.length(1)
      })
  })

  it('should add workspace', () => {
    let dropdown = cy.get('#dropdown')

    dropdown
      .click()
      .find('ul')
      .children()
      .each((element, index) => {
        if (index === 0) {
          cy.wrap(element).click()
          return
        }
      })

    // Adding workspace name
    const randomWorkSpaceName = `workSpace-${(Math.random() + 1)
      .toString(36)
      .substring(7)}`

    cy.get('input[name="addWorkspace"]')
      .type(randomWorkSpaceName)
      .should('have.attr', 'value', randomWorkSpaceName)

    cy.get('button[name="addWorkspace"]').click()

    cy.wait(500)

    // Check for workspace length
    dropdown = cy.get('#dropdown')

    dropdown
      .click()
      .find('ul')
      .find('li')
      .should((item) => {
        expect(item.length).to.be.greaterThan(1)
      })
  })
})
