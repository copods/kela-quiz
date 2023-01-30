const test1 = `Aptitude - assessment1`

describe('Test for GroupByTestTable, Result', () => {
  beforeEach('sign-in', () => {
    cy.login()

    cy.customVisit('/members')
  })

  it('checks, result page contain header and should be visible', () => {
    cy.get('#group-by-tests').should('have.text', 'Results').click()
    cy.get('h1').should('be.visible')
  })
  it('checks, result page contain header should have correct text', () => {
    cy.get('#group-by-tests').should('have.text', 'Results').click()
    cy.get('h1').should('have.text', 'Results')
  })
  it('checks, result page contain header should have correct classes', () => {
    cy.get('#group-by-tests').should('have.text', 'Results').click()
    cy.get('h1').should('have.class', 'text-3xl font-bold text-gray-900')
  })
  it('checks, result page contain header should have tabIndex', () => {
    cy.get('#group-by-tests').should('have.text', 'Results').click()
    cy.get('h1').should('have.attr', 'tabindex', '0') //checking accessibility
  })
  it('checks, result page contain header should have aria-label', () => {
    cy.get('#group-by-tests').should('have.text', 'Results').click()
    cy.get('h1').should('have.attr', 'aria-label', 'Results') //checking accessibility
  })
  it('checks, result page contain header should have focus', () => {
    cy.get('#group-by-tests').should('have.text', 'Results').click()
    cy.get('h1')
      .should('have.attr', 'aria-label', 'Results')
      .click()
      .should('have.focus') //checking accessibility
  })
  it('checks, sort button should have tab index', () => {
    cy.get('#group-by-tests').should('have.text', 'Results').click()
    cy.get('h1').should('have.text', 'Results') //checking accessibility

    cy.get('#descend', { timeout: 60000 }).should('have.attr', 'tabindex', '0')
  })
  it('checks, sort button should have tab index', () => {
    cy.get('#group-by-tests', { timeout: 8000 })
      .should('have.text', 'Results')
      .click()
    cy.get('h1').should('have.text', 'Results') //checking accessibility

    cy.get('#descend', { timeout: 60000 }).should(
      'have.attr',
      'aria-label',
      'Sort Descending'
    )
  })

  it('checks, sort filter should be visible', () => {
    cy.get('#group-by-tests').should('have.text', 'Results').click()
    cy.get('h1').should('have.text', 'Results')

    cy.get('#sort-filter-body', { timeout: 60000 }).should('be.visible')
  })
  it('checks, dropdown should be visible', () => {
    cy.get('#group-by-tests').should('have.text', 'Results').click()
    cy.get('h1').should('have.text', 'Results')
    cy.get('#dropdown', { timeout: 60000 }).should('be.visible')
  })

  it('checks,total count text should be visible', () => {
    cy.get('#group-by-tests').should('have.text', 'Results').click()
    cy.get('h1').should('have.text', 'Results')

    cy.get('#total-items-value', { timeout: 60000 }).should('be.visible')
  })
  it('checks,total count text should have tabIndex', () => {
    cy.get('#group-by-tests').should('have.text', 'Results').click()
    cy.get('h1').should('have.text', 'Results') //checking accessibility

    cy.get('#total-items-value', { timeout: 60000 }).should(
      'have.attr',
      'tabindex',
      '0'
    )
  })
  it('checks,total count text should have tabIndex', () => {
    cy.get('#group-by-tests').should('have.text', 'Results').click()
    cy.get('h1').should('have.text', 'Results') //checking accessibility

    cy.get('#total-items-value', { timeout: 60000 })
      .should('have.attr', 'tabindex', '0')
      .click()
      .should('have.focus')
  })
  it('Total Count of Test of groupByTable', () => {
    cy.get('#group-by-tests').should('have.text', 'Results').click()
    cy.get('#total-count-value', { timeout: 6000 }).should('be.visible')
  })
  it('sort by name in ascending order ', () => {
    cy.get('#group-by-tests').should('have.text', 'Results').click()
    cy.get('.dropdownButton span span', { timeout: 6000 })
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
    cy.get('#group-by-tests').should('have.text', 'Results').click()
    cy.get('h1').should('have.text', 'Results')
    cy.get('#sort-filter-body', { timeout: 60000 }).should('be.visible')
    cy.get('#descend', { timeout: 8000 }).click()
    cy.get('.dropdownButton span span', { timeout: 6000 })
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
    cy.get('#group-by-tests').should('have.text', 'Results').click()

    cy.get('#sort-filter-container').within(() => {
      cy.get('.dropdownButton')
        .eq(0)
        .click({ multiple: true })
        .get('li div')
        .get('.dropdown-option')
        .get('.not-selected')
        .click()
    })

    cy.get('.dropdownButton span span', { timeout: 6000 })
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
    cy.get('#group-by-tests').should('have.text', 'Results').click()
    cy.get('h1').should('have.text', 'Results')

    cy.get('#sort-filter-body', { timeout: 60000 }).should('be.visible')
    cy.get('#descend', { timeout: 8000 }).click()
    cy.get('#sort-filter-container').within(() => {
      cy.get('.dropdownButton')
        .eq(0)
        .click({ multiple: true })
        .get('li div')
        .get('.dropdown-option')
        .get('.not-selected')
        .click()
    })

    cy.get('.dropdownButton span span', { timeout: 6000 })
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
    cy.viewport(1280, 720)
    cy.get('#group-by-tests').should('have.text', 'Results').click()

    cy.get('.groupByItemTest').contains(test1).click()
    cy.get('#vertical-icon', { timeout: 6000 }).should('be.visible')
    cy.get('#vertical-icon', { timeout: 6000 }).click()
    cy.get('[data-cy="resend-invite"]').should('be.visible')
  })

  it('checks,copy Link button should be visible', () => {
    cy.viewport(1280, 720)
    cy.get('#group-by-tests').should('have.text', 'Results').click()
    cy.get('.groupByItemTest').contains(test1).click()
    cy.get('#vertical-icon', { timeout: 6000 }).should('be.visible')
    cy.get('#vertical-icon', { timeout: 6000 }).click()
    cy.get('[data-cy="copy-link"]').should('be.visible')
  })
  it('checks,table contains assessment name', () => {
    cy.get('#group-by-tests').should('have.text', 'Results').click()

    cy.get('[data-cy="group-by-item-test"]').eq(1).should('have.text', test1)
    cy.get('.groupByItemTest').contains(test1).should('be.visible')
  })
  it('checks,table contains assessment name should be in blue color', () => {
    cy.get('#group-by-tests').should('have.text', 'Results').click()

    cy.get('[data-cy="group-by-item-test"]').eq(1).should('have.text', test1)

    cy.get('.groupByItemTest')
      .contains(test1)
      .should('have.css', 'color', 'rgb(53, 57, 136)')
  })
  it('checks,table contains assessment name should have tabIndex', () => {
    cy.get('#group-by-tests').should('have.text', 'Results').click()

    cy.get('.groupByItemTest')
      .contains(test1)
      .should('have.attr', 'tabindex', '0')
  })
  it('checks,invite candidate from result page', () => {
    cy.viewport(1280, 720)
    cy.get('#group-by-tests').should('have.text', 'Results').click()

    cy.get('.groupByItemTest').contains(test1).click()
    cy.get('#vertical-icon', { timeout: 6000 }).should('be.visible')
    cy.get('#vertical-icon', { timeout: 6000 }).click()
    cy.get('[data-cy="resend-invite"]').should('be.visible').click()
    cy.get('.Toastify__toast').should(
      'have.text',
      'Candidate Invited Successfully'
    )
  })
  it('checks, copy Link from result page', () => {
    cy.viewport(1280, 720)
    cy.get('#group-by-tests').click()
    cy.get('.groupByItemTest').contains(test1).click()
    cy.get('#vertical-icon', { timeout: 6000 }).should('be.visible')
    cy.get('#vertical-icon', { timeout: 6000 }).click()
    cy.get('[data-cy="copy-link"]').should('be.visible').click()
    cy.get('.Toastify__toast').should('have.text', 'Link Copied Successfully')
    cy.window()
      .its('navigator.clipboard')
      .invoke('readText')
      .should('include', '/assessment')
  })
})
