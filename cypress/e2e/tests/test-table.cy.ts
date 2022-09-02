import { testsConstants } from '~/constants/common.constants'

const test1 = `Aptitude - test1`
const deleteTest1 = `Aptitude - Detete test`

describe('Visiting Tests', () => {
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
    cy.location('pathname').should('include', '/dashboard')
  })

  // creating data to test Test list page
  it('Visiting Add Test Page', () => {
    cy.get('a').find('#tests').should('have.text', testsConstants.tests).click()
    cy.location('pathname', { timeout: 60000 }).should('include', '/tests')
    cy.get('#add-test', { timeout: 6000 })
      .should('have.text', `+ ${testsConstants.addTestbutton}`)
      .click()
    cy.location('pathname').should('include', '/tests/add-test')
  })

  it('sort by name in ascending order ', () => {
    cy.get('a').find('#tests').should('have.text', testsConstants.tests).click()
    cy.location('pathname', { timeout: 60000 }).should('include', '/tests')
    cy.get('#headlessui-listbox-button-1 span span')
      .invoke('text')
      .then((el) => {
        if (el === 'Name') {
          cy.get('.test-name-navigation', { timeout: 8000 }).then(
            ($elements) => {
              var strings = [...$elements].map(($el) => $el.innerText)
              expect(strings).to.deep.equal(strings.sort())
            }
          )
        }
      })
  })
  it('sort by name in descending order ', () => {
    cy.get('a').find('#tests').should('have.text', testsConstants.tests).click()
    cy.location('pathname', { timeout: 60000 }).should('include', '/tests')
    cy.get('#sort-filter-body').get('#ascend').click()
    cy.get('#headlessui-listbox-button-1 span span')
      .invoke('text')
      .then((el) => {
        if (el === 'Name') {
          cy.get('.test-name-navigation', { timeout: 8000 }).then(
            ($elements) => {
              var strings = [...$elements].map(($el) => $el.innerText)
              expect(strings).to.deep.equal(strings.reverse())
            }
          )
        }
      })
  })
  it('sort by created date in ascending order ', () => {
    cy.get('a').find('#tests').should('have.text', testsConstants.tests).click()
    cy.location('pathname', { timeout: 60000 }).should('include', '/tests')
    cy.get('.dropdown')
      .get('.dropdownButton')
      .click()
      .get('li div')
      .get('.dropdown-option')
      .get('.not-selected')
      .click()
    cy.get('#headlessui-listbox-button-1 span span')
      .invoke('text')
      .then((el) => {
        if (el === 'Created Date') {
          cy.get('.test-name-navigation', { timeout: 8000 }).then(
            ($elements) => {
              var strings = [...$elements].map(($el) => $el.innerText)
              expect(strings).to.deep.equal(strings.sort())
            }
          )
        }
      })
  })
  it('sort by created date in descending order', () => {
    cy.get('a').find('#tests').should('have.text', testsConstants.tests).click()
    cy.location('pathname', { timeout: 60000 }).should('include', '/tests')
    cy.get('#sort-filter-body').get('#ascend').click()
    cy.get('.dropdown')
      .get('.dropdownButton')
      .click()
      .get('li div')
      .get('.dropdown-option')
      .get('.not-selected')
      .click()
    cy.get('#headlessui-listbox-button-1 span span')
      .invoke('text')
      .then((el) => {
        if (el === 'Created Date') {
          cy.get('.test-name-navigation', { timeout: 8000 }).then(
            ($elements) => {
              var strings = [...$elements].map(($el) => $el.innerText)
              expect(strings).to.deep.equal(strings.reverse())
            }
          )
        }
      })
  })

  it('By Clicking test name it should navigate to test details page', () => {
    cy.get('a').find('#tests').should('have.text', testsConstants.tests).click()
    cy.location('pathname', { timeout: 60000 }).should('include', '/tests')
    cy.get('.test-table-list', { timeout: 6000 }).should('be.visible')
    cy.get('.test-table-list')
      .each(($el) => {
        cy.wrap($el).within((el) => {
          if (
            el[0].getElementsByClassName('test-name-navigation')[0]
              .innerHTML === test1
          ) {
            cy.get('.test-name-navigation').should('have.text', test1).click()
          }
        })
      })
      .location('pathname', { timeout: 60000 })
      .should('include', '/tests')
  })

  var strings: any
  it('On click of count in sections, menu with all sections should open', () => {
    cy.get('a').find('#tests').should('have.text', testsConstants.tests).click()
    cy.location('pathname', { timeout: 60000 }).should('include', '/tests')
    cy.get('#chip-group-id', { timeout: 10000 }).then((el) => {
      cy.get('.chip-group').then(($elements) => {
        strings = [...$elements].forEach(($el) => {
          cy.log(strings)
          if ($el.innerText.includes('\n')) {
            cy.get('#section-count-button').click()
          }
        })
      })
    })
  })

  it('On click of delete, test should be deleted', () => {
    cy.get('a').find('#tests').should('have.text', testsConstants.tests).click()
    cy.location('pathname', { timeout: 60000 }).should('include', '/tests')
    cy.get('.test-table-list', { timeout: 8000 }).each(($el) => {
      cy.wrap($el).within((el) => {
        if (
          el[0].getElementsByClassName('test-name-navigation')[0].innerHTML ===
          deleteTest1
        ) {
          cy.get('.test-name-navigation').should('have.text', deleteTest1)
        }
      })
    })
    cy.get('#vertical-icon', { timeout: 6000 }).click()
    cy.get('.delete-test').click()
    cy.get('.confirm-delete').click()
    cy.get('.test-table-list').each(($el) => {
      cy.wrap($el).within((el) => {
        if (
          el[0].getElementsByClassName('test-name-navigation')[0].innerHTML ===
          deleteTest1
        ) {
          cy.contains(deleteTest1).should('not.exist')
        }
      })
    })
  })
})
