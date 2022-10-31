import { commonConstants, testsConstants } from '~/constants/common.constants'
const test1 = `Aptitude - test1`

describe('Test for GroupByTestTable, Result', () => {
  beforeEach('sign-in', () => {
    cy.login()

    cy.customVisit('/members')
  })
  let value: string
  let strings: Array<string>
  it('Total Count of Test of groupByTable', () => {
    cy.get('a')
      .find('#group-by-tests')
      .should('have.text', commonConstants.results)
      .click()
    cy.location('pathname', { timeout: 60000 }).should('include', '/results')
    cy.get('#total-items-value', { timeout: 60000 })
      .get('#total-count-value')
      .then(($ele) => {
        value = $ele[0].innerText
      })
    cy.get('#group-by-test-items').each(($el) => {
      cy.wrap($el)
        .children()
        .children()
        .within((el) => {
          cy.get('.candidate-name', { timeout: 60000 }).then(($elements) => {
            strings = [...$elements].map(($el) => $el.innerText)
            expect(parseInt(value)).to.deep.equal(parseInt(`${strings.length}`))
          })
        })
    })
  })
  it('sort by name in ascending order ', () => {
    cy.get('a', { timeout: 6000 })
      .find('#group-by-tests')
      .should('have.text', commonConstants.results)
      .click()
    cy.location('pathname', { timeout: 60000 }).should('include', '/results')
    cy.get('#headlessui-listbox-button-1 span span', { timeout: 60000 })
      .invoke('text')
      .then((el) => {
        if (el === 'Name') {
          cy.get('#group-by-test-items').each(($el) => {
            cy.wrap($el)
              .children()
              .children()
              .within((el) => {
                cy.get('.candidate-name').then(($elements) => {
                  let strings = [...$elements].map(($el) => $el.innerText)
                  expect(strings).to.deep.equal(strings.sort())
                })
              })
          })
        }
      })
  })
  it('sort by name in descending order ', () => {
    cy.get('a', { timeout: 6000 })
      .find('#group-by-tests')
      .should('have.text', commonConstants.results)
      .click()
    cy.location('pathname', { timeout: 60000 }).should('include', '/results')
    cy.get('#sort-filter-body', { timeout: 60000 }).get('#ascend').click()
    cy.get('#headlessui-listbox-button-1 span span')
      .invoke('text')
      .then((el) => {
        if (el === 'Name') {
          cy.get('#group-by-test-items').each(($el) => {
            cy.wrap($el)
              .children()
              .children()
              .within((el) => {
                cy.get('.candidate-name', { timeout: 60000 }).then(
                  ($elements) => {
                    let strings = [...$elements].map(($el) => $el.innerText)
                    expect(strings).to.deep.equal(strings.sort().reverse())
                  }
                )
              })
          })
        }
      })
  })
  it('sort by created date in ascending order ', () => {
    cy.get('a', { timeout: 6000 })
      .find('#group-by-tests')
      .should('have.text', commonConstants.results)
      .click()
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
          cy.get('#group-by-test-items').each(($el) => {
            cy.wrap($el)
              .children()
              .children()
              .within((el) => {
                cy.get('.candidate-name', { timeout: 10000 }).then(
                  ($elements) => {
                    let strings = [...$elements].map(($el) => $el.innerText)
                    expect(strings).to.deep.equal(strings.sort())
                  }
                )
              })
          })
        }
      })
  })
  it('sort by created date in descending order', () => {
    cy.get('a', { timeout: 6000 })
      .find('#group-by-tests')
      .should('have.text', commonConstants.results)
      .click()
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
          cy.get('#group-by-test-items').each(($el) => {
            cy.wrap($el)
              .children()
              .children()
              .within((el) => {
                cy.get('.candidate-name', { timeout: 10000 }).then(
                  ($elements) => {
                    let strings = [...$elements].map(($el) => $el.innerText)
                    expect(strings).to.deep.equal(strings.reverse())
                  }
                )
              })
          })
        }
      })
  })
  it('checks,invite candidate button should be visible', () => {
    cy.get('a', { timeout: 6000 })
      .find('#group-by-tests')
      .should('have.text', commonConstants.results)
      .click()
    cy.get('.groupTestRow', { timeout: 8000 }).each(($el) => {
      cy.wrap($el).within((el) => {
        if (
          el[0].getElementsByClassName('groupByItemTest')[0].innerHTML === test1
        ) {
          cy.get('.groupByItemTest').should('have.text', test1)
        }
      })
    })
    cy.get('.groupByItemTest').contains(test1).click()
    cy.get('#vertical-icon', { timeout: 8000 }).should('be.visible').click()
    cy.get('.deleteTest').should('be.visible')
  })
  it('checks,invite candidate from result page', () => {
    cy.get('a', { timeout: 6000 })
      .find('#group-by-tests')
      .should('have.text', commonConstants.results)
      .click()
    cy.get('.groupTestRow', { timeout: 8000 }).each(($el) => {
      cy.wrap($el).within((el) => {
        if (
          el[0].getElementsByClassName('groupByItemTest')[0].innerHTML === test1
        ) {
          cy.get('.groupByItemTest').should('have.text', test1)
        }
      })
    })
    cy.get('.groupByItemTest').contains(test1).click()
    cy.get('#vertical-icon', { timeout: 8000 }).should('be.visible').click()
    cy.get('.deleteTest').should('be.visible').click()
    cy.get('.Toastify__toast').should('have.text', testsConstants.reinvited)
  })
})
