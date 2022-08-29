import { cypress } from '~/constants/common.constants'

describe('Test for GroupByTestTable, Result', () => {
  it('Test for Routing and Active Tab for Results', () => {
    cy.visit('/sign-in')
    cy.get('#email')
      .clear()
      .type(cypress.email)
      .should('have.value', cypress.email)
    cy.get('#password')
      .clear()
      .type(cypress.password)
      .should('have.value', cypress.password)
    cy.findByRole('button').click()
    cy.get('a').find('#Group_By_Tests').should('have.text', cypress.results).click()
    cy.location('pathname', { timeout: 60000 }).should('include', '/results')
  })

  let value: any
  let strings: any

  it('Total Count of Test of groupByTable', () => {
    cy.visit('/sign-in')
    cy.get('#email')
      .clear()
      .type(cypress.email)
      .should('have.value', cypress.email)
    cy.get('#password')
      .clear()
      .type(cypress.password)
      .should('have.value', cypress.password)
    cy.findByRole('button').click()
    cy.get('a').find('#Group_By_Tests').should('have.text', cypress.results).click()
    cy.location('pathname', { timeout: 60000 }).should('include', '/results')
    cy.get('#total-items-value')
      .get('#total-count-value')
      .then(($ele) => {
        value = [...$ele].map(($el) => {
          return $el.innerText
        })
      })
    cy.get('#GroupByTestItems').each(($el) => {
      cy.wrap($el)
        .children()
        .children()
        .within((el) => {
          cy.get('.candidate-name').then(($elements) => {
            strings = [...$elements].map(($el) => $el.innerText)
            expect(parseInt(value)).to.deep.equal(parseInt(strings.length))
          })
        })
    })
  })
  it('sort by name in ascending order ', () => {
    cy.visit('/sign-in')
    cy.get('#email')
      .clear()
      .type(cypress.email)
      .should('have.value', cypress.email)
    cy.get('#password')
      .clear()
      .type(cypress.password)
      .should('have.value', cypress.password)
    cy.findByRole('button').click()
    cy.get('a').find('#Group_By_Tests').should('have.text', cypress.results).click()
    cy.location('pathname', { timeout: 60000 }).should('include', '/results')
    cy.get('#headlessui-listbox-button-1 span span')
      .invoke('text')
      .then((el) => {
        if (el === 'Name') {
          cy.get('#GroupByTestItems').each(($el) => {
            cy.wrap($el)
              .children()
              .children()
              .within((el) => {
                cy.get('.candidate-name').then(($elements) => {
                  var strings = [...$elements].map(($el) => $el.innerText)
                  expect(strings).to.deep.equal(strings.sort().reverse())
                })
              })
          })
        }
      })
  })
  it('sort by name in descending order ', () => {
    cy.visit('/sign-in')
    cy.get('#email')
      .clear()
      .type(cypress.email)
      .should('have.value', cypress.email)
    cy.get('#password')
      .clear()
      .type(cypress.password)
      .should('have.value', cypress.password)
    cy.findByRole('button').click()
    cy.get('a').find('#Group_By_Tests').should('have.text', cypress.results).click()
    cy.location('pathname', { timeout: 60000 }).should('include', '/results')
    cy.get('#sort-filter-body').get('#ascend').click()
    cy.get('#headlessui-listbox-button-1 span span')
      .invoke('text')
      .then((el) => {
        if (el === 'Name') {
          cy.get('#GroupByTestItems').each(($el) => {
            cy.wrap($el)
              .children()
              .children()
              .within((el) => {
                cy.get('.candidate-name').then(($elements) => {
                  var strings = [...$elements].map(($el) => $el.innerText)
                  expect(strings).to.deep.equal(strings.sort().reverse())
                })
              })
          })
        }
      })
  })
  it('sort by created date in ascending order ', () => {
    cy.visit('/sign-in')
    cy.get('#email')
      .clear()
      .type(cypress.email)
      .should('have.value', cypress.email)
    cy.get('#password')
      .clear()
      .type(cypress.password)
      .should('have.value', cypress.password)
    cy.findByRole('button').click()
    cy.get('a').find('#Group_By_Tests').should('have.text', cypress.results).click()
    cy.location('pathname', { timeout: 60000 }).should('include', '/results')
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
          cy.get('#GroupByTestItems').each(($el) => {
            cy.wrap($el)
              .children()
              .children()
              .within((el) => {
                cy.get('.candidate-name').then(($elements) => {
                  var strings = [...$elements].map(($el) => $el.innerText)
                  expect(strings).to.deep.equal(strings.sort())
                })
              })
          })
        }
      })
  })
  it('sort by created date in descending order', () => {
    cy.visit('/sign-in')
    cy.get('#email')
      .clear()
      .type(cypress.email)
      .should('have.value', cypress.email)
    cy.get('#password')
      .clear()
      .type(cypress.password)
      .should('have.value', cypress.password)
    cy.findByRole('button').click()
    cy.get('a').find('#Group_By_Tests').should('have.text', cypress.results).click()
    cy.location('pathname', { timeout: 60000 }).should('include', '/results')
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
          cy.get('#GroupByTestItems').each(($el) => {
            cy.wrap($el)
              .children()
              .children()
              .within((el) => {
                cy.get('.candidate-name').then(($elements) => {
                  var strings = [...$elements].map(($el) => $el.innerText)
                  expect(strings).to.deep.equal(strings.reverse())
                })
              })
          })
        }
      })
  })
})
