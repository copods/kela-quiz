import {
  commonConstants,
  cypress,
  routeFiles,
  statusCheck,
} from '~/constants/common.constants'
const section1 = `Aptitude - section1`
const deleteSection = `Aptitude - delete-Section`

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
    cy.location('pathname').should('include', '/members')
  })
  it('cancel Add section', () => {
    cy.get('a')
      .find('#sections', { timeout: 8000 })
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
  it('allows users to search questions', () => {
    cy.get('a')
      .find('#sections', { timeout: 8000 })
      .should('have.text', routeFiles.sections)
      .click()
    cy.location('pathname', { timeout: 6000 }).should('include', '/sections')
    cy.get('input[name="search"]', { timeout: 6000 })
      .clear()
      .type(cypress.useMemo)
    cy.get('.ql-editor').each(($el) => {
      cy.wrap($el).within((el) => {
        if (
          el[0].getElementsByClassName('question')[0].innerHTML ===
          cypress.useMemo
        ) {
          cy.get('.question').should('have.text', cypress.useMemo)
        }
      })
    })
  })
  it('Check Active State of Section', () => {
    cy.get('a')
      .find('#sections')
      .should('have.text', routeFiles.sections)
      .click()
    cy.location('pathname', { timeout: 6000 }).should('include', '/sections')
    cy.location().then((loc) => {
      cy.location('search').should('include', loc.search)
    })
  })
  it('Test for valid error message while adding new section without Title', () => {
    cy.get('a')
      .find('#sections')
      .should('have.text', routeFiles.sections)
      .click()
    cy.location('pathname', { timeout: 60000 }).should('include', '/sections')
    cy.get('#add-section', { timeout: 6000 }).click()
    cy.get('form > div')
      .should('be.visible')
      .within((el) => {
        cy.get('[data-cy="submit"]').click()
      })
    cy.get('.Toastify__toast').should('have.text', statusCheck.nameIsReq)
  })
  it('Test for valid error message while adding new section without Description', () => {
    cy.get('a')
      .find('#sections')
      .should('have.text', routeFiles.sections)
      .click()
    cy.location('pathname', { timeout: 60000 }).should('include', '/sections')
    cy.get('#add-section', { timeout: 6000 }).click()
    cy.get('form > div')
      .should('be.visible')
      .within((el) => {
        cy.get('input[placeholder="Enter Section Name"]').type(
          `${section1} ${new Date().getTime()}`
        )

        cy.get('[data-cy="submit"]').click()
      })
    cy.get('.Toastify__toast').should('have.text', statusCheck.descIsReq)
  })
  it('Test for valid error message while adding new section with duplicate Title', () => {
    cy.get('a')
      .find('#sections')
      .should('have.text', routeFiles.sections)
      .click()
    cy.location('pathname', { timeout: 6000 }).should('include', '/sections')
    cy.get('#add-section', { timeout: 6000 }).click()
    cy.get('form > div')
      .should('be.visible')
      .within((el) => {
        cy.get('input[placeholder="Enter Section Name"]').type(section1)
        cy.get('textarea').type('Aptitude')
        cy.get('[data-cy="submit"]').click()
      })
    cy.get('.Toastify__toast').should('have.text', cypress.duplicateTitle)
    cy.get('.Toastify__close-button').click()
  })
  it('SortBy Name or created Date', () => {
    cy.get('a')
      .find('#sections')
      .should('have.text', routeFiles.sections)
      .click()
    cy.location('pathname', { timeout: 6000 }).should('include', '/sections')
    cy.get('.sectionLSWrapper', { timeout: 6000 }).within(() => {
      cy.get('#section-cards')
        .get('#section-link')
        .then((listing) => {
          const listingCount = Cypress.$(listing).length
          expect(listing).to.have.length(listingCount)
          cy.get('#headlessui-listbox-button-1 span span')
            .invoke('text')
            .then((el) => {
              if (el === 'Name') {
                cy.get('h2').then(($elements) => {
                  let strings = [...$elements].map(($el) => $el.innerText)
                  expect(strings).to.deep.equal([...strings].sort())
                })
              } else if (el === 'Created Date') {
                cy.get('.created-by-date').then(($elements) => {
                  let strings = [...$elements].map(($el) => {
                    return new Date($el.innerText).toLocaleDateString
                  })
                  expect(strings).to.deep.equal([...strings].sort())
                })
              }
            })
        })
    })
  })
  it('Test for deleting the section and check if it is deleted or not', () => {
    cy.get('a')
      .find('#sections')
      .should('have.text', routeFiles.sections)
      .click()
    cy.location('pathname', { timeout: 6000 }).should('include', '/sections')
    cy.get('#section-card ').each(($el) => {
      cy.wrap($el).within((el) => {
        if (
          el[0].getElementsByClassName('sectionName')[0].innerHTML ===
          deleteSection
        ) {
          cy.get('.sectionName')
            .should('have.text', deleteSection)
            .parent()
            .within(() => {
              cy.get('.verticalDots', { timeout: 6000 }).click()
            })
        }
      })
    })
    cy.get('[data-cy="delete-section"]').should('have.text', 'Delete').click()
    cy.get('#delete-dialog').should('be.visible')
    cy.get('#confirm-delete')
      .should('have.text', commonConstants.delete)
      .click()
    cy.get('.Toastify__toast').should('have.text', statusCheck.deletedSuccess)
    cy.get('.Toastify__close-button').click()
    cy.location('pathname', { timeout: 6000 }).should('include', '/sections')
    cy.get('#section-card', { timeout: 8000 }).each(($el) => {
      cy.wrap($el).within((el) => {
        if (
          el[0].getElementsByClassName('sectionName')[0].innerHTML ===
          deleteSection
        ) {
          cy.get('.sectionName')
            .should('have.text', deleteSection)
            .should('not.exist')
        }
      })
    })
  })
})
