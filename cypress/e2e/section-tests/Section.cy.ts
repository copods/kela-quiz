import { cypress, routeFiles } from '~/constants/common.constants'

/// <reference types="Cypress">
describe('Test for Section', () => {
  beforeEach('sign-in', () => {
    cy.visit('/sign-in')
    cy.get('input[name="email"]')
      .focus()
      .clear()
      .type('careers@copods.co')
      .should('have.value', cypress.email)
    cy.get('input[name="password"]')
      .focus()
      .clear()
      .type('kQuiz@copods')
      .should('have.value', cypress.password)
    cy.get('[data-cy="submit"]').click()
    cy.get('a')
      .find('#Sections')
      .should('have.text', routeFiles.sections)
      .click()
    cy.location('pathname', { timeout: 6000 }).should('include', '/sections')
  })

  it('cancel Add section', () => {
    cy.get('a')
      .find('#Sections')
      .should('have.text', routeFiles.sections)
      .click()
    cy.location('pathname', { timeout: 6000 }).should('include', '/sections')
    cy.get('#add-section').click()
    cy.get('form > div')
      .should('be.visible')
      .within(() => {
        cy.get("button[type='button']").click()
      })
  })

  it('Check Active State of Section', () => {
    cy.get('a')
      .find('#Sections')
      .should('have.text', routeFiles.sections)
      .click()
    cy.location('pathname', { timeout: 6000 }).should('include', '/sections')
    cy.location().then((loc) => {
      cy.location('search').should('include', loc.search)
    })
  })
  it('check new Added section', () => {
    cy.get('a')
      .find('#Sections')
      .should('have.text', routeFiles.sections)
      .click()
    cy.location('pathname', { timeout: 6000 }).should('include', '/sections')
    cy.get('.section-card', { timeout: 8000 }).each(($el) => {
      cy.wrap($el).within((el) => {
        if (
          el[0].getElementsByClassName('sectionName')[0].innerHTML ===
          cypress.section1
        ) {
          cy.get('.sectionName').contains(cypress.section1)
        }
      })
    })
  })
  it('SortBy Name or created Date', () => {
    cy.get('a')
      .find('#Sections')
      .should('have.text', routeFiles.sections)
      .click()
    cy.location('pathname', { timeout: 6000 }).should('include', '/sections')
    cy.location().then((loc) => {
      cy.location('search').should('include', loc.search)
    })
    cy.get('.sectionLSWrapper').within(() => {
      cy.get('#section-cards')
        .get('a')
        .then((listing) => {
          const listingCount = Cypress.$(listing).length
          expect(listing).to.have.length(listingCount)
          cy.get('#headlessui-listbox-button-1 span span')
            .invoke('text')
            .then((el) => {
              if (el === 'Name') {
                cy.get('h2').then(($elements) => {
                  var strings = [...$elements].map(($el) => $el.innerText)
                  expect(strings).to.deep.equal([...strings].sort())
                })
              } else if (el === 'Created Date') {
                cy.get('.created-by-date').then(($elements) => {
                  var strings = [...$elements].map(($el) => {
                    return new Date($el.innerText).toLocaleDateString
                  })
                  expect(strings).to.deep.equal([...strings].sort())
                })
              }
            })
        })
    })
  })
})
