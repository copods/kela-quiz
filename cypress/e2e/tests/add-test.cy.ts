import {
  cypress,
  testsConstants,
  commonConstants,
} from '~/constants/common.constants'

const test1 = `Aptitude - test1`

describe('Creating tests', () => {
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

  it('Visiting Add Test Page', () => {
    cy.get('a').find('#tests').should('have.text', testsConstants.Tests).click()
    cy.get('#add-test', { timeout: 6000 })
      .should('have.text', `+ ${testsConstants.addTestbutton}`)
      .click()
    cy.location('pathname').should('include', '/tests/add-test')
  })
  it('Verify if add test page contains 3 tabs', () => {
    cy.get('a').find('#tests').should('have.text', testsConstants.Tests).click()
    cy.get('#add-test', { timeout: 6000 })
      .should('have.text', `+ ${testsConstants.addTestbutton}`)
      .click()
    cy.location('pathname', { timeout: 60000 }).should(
      'include',
      '/tests/add-test'
    )
    cy.get('.stepsTab').each(($el) => {
      cy.wrap($el).within((el) => {
        if (
          el[0].getElementsByClassName('stepsName')[0].innerHTML ===
          cypress.step1
        ) {
          cy.get('.stepsName').should('have.text', cypress.step1)
        } else if (
          el[0].getElementsByClassName('stepsName')[0].innerHTML ===
          cypress.step2
        ) {
          cy.get('.stepsName').should('have.text', cypress.step2)
        } else if (
          el[0].getElementsByClassName('stepsName')[0].innerHTML ===
          cypress.step3
        ) {
          cy.get('.stepsName').should('have.text', cypress.step3)
        }
      })
    })
    cy.get('#0').find('.text-gray-500').should('have.text', cypress.testDetails)
    cy.get('#1')
      .find('.text-gray-500')
      .should('have.text', cypress.selectSections)
    cy.get('#2').find('.text-gray-500').should('have.text', cypress.preview)
  })

  it('Verify if next button is disabled if user do not provide name and description', () => {
    cy.get('a').find('#tests').should('have.text', testsConstants.Tests).click()
    cy.get('#add-test', { timeout: 6000 })
      .should('have.text', `+ ${testsConstants.addTestbutton}`)
      .click()
    cy.location('pathname', { timeout: 60000 }).should(
      'include',
      '/tests/add-test'
    )
    cy.get('button#next-button')
      .should('have.text', 'Next')
      .should('have.disabled', true)
  })
  const test = `Aptitude - section`
  it('Verify if user able to navigate to Step 2 by clicking next button if user provide name and description', () => {
    cy.get('a').find('#tests').should('have.text', testsConstants.Tests).click()
    cy.get('#add-test', { timeout: 6000 })
      .should('have.text', `+ ${testsConstants.addTestbutton}`)
      .click()
    cy.location('pathname', { timeout: 60000 }).should(
      'include',
      '/tests/add-test'
    )
    cy.get('input[placeholder="Enter test name"]', { timeout: 6000 })
      .clear()
      .type(test)
    cy.get('#quill-editor').within(() => {
      cy.get('.ql-editor').type(`Test Description`)
    })

    cy.get('button#next-button').should('have.text', cypress.next).click()
    cy.get('.stepsTab').each(($el) => {
      cy.wrap($el).within((el) => {
        if (
          el[0].getElementsByClassName('stepsName')[0].innerHTML ===
          cypress.step1
        ) {
          cy.get('.stepsName').should('have.text', cypress.step1)
        } else if (
          el[0].getElementsByClassName('stepsName')[0].innerHTML ===
          cypress.step2
        ) {
          cy.get('.stepsName').should('have.text', cypress.step2)
        }
      })
    })
  })

  it('Verify on clicking back button on step 2 user navigate back to step 2', () => {
    cy.get('a').find('#tests').should('have.text', testsConstants.Tests).click()
    cy.get('#add-test', { timeout: 6000 })
      .should('have.text', `+ ${testsConstants.addTestbutton}`)
      .click()
    cy.location('pathname').should('include', '/tests/add-test')
    cy.get('input[placeholder="Enter test name"]', { timeout: 6000 })
      .clear()
      .type(test)
    cy.get('#quill-editor').within(() => {
      cy.get('.ql-editor').type(`Test Description`)
    })
    cy.get('.stepsTab').each(($el) => {
      cy.wrap($el).within((el) => {
        if (
          el[0].getElementsByClassName('stepsName')[0].innerHTML ===
          cypress.step2
        ) {
          cy.get('.stepsName').should('have.text', cypress.step2).click()
        }
      })
    })
    cy.get('button#backButton').should('have.text', cypress.back).click()
  })

  it('Verify if user able to add section and able to input total questions and time', () => {
    cy.get('a').find('#tests').should('have.text', testsConstants.Tests).click()
    cy.get('#add-test', { timeout: 6000 })
      .should('have.text', `+ ${testsConstants.addTestbutton}`)
      .click()
    cy.location('pathname', { timeout: 60000 }).should(
      'include',
      '/tests/add-test'
    )
    cy.get('input[placeholder="Enter test name"]', { timeout: 6000 })
      .clear()
      .type(test)
    cy.get('#quill-editor').within(() => {
      cy.get('.ql-editor').type(`Test Description`)
    })
    cy.get('button#next-button').should('have.text', cypress.next).click()
    cy.get('.stepsTab').each(($el) => {
      cy.wrap($el).within((el) => {
        if (
          el[0].getElementsByClassName('stepsName')[0].innerHTML ===
          cypress.step2
        ) {
          cy.get('.stepsName').should('have.text', cypress.step2).click()
        }
      })
    })
    // user reached to step 2

    cy.get('div#section', { timeout: 60000 }).each((el) => {
      cy.wrap(el).within(() => {
        if (el.find('.count')[0].innerText != '0') {
          cy.get('input#no-of-qu').should('have.disabled', true)
          cy.get('input#time').should('have.disabled', true)
          cy.get('button')
            .should('have.text', commonConstants.addButton)
            .click()
          cy.get('button').should('have.text', cypress.Remove)
          cy.get('input#no-of-qu').clear().type('1')
          cy.get('input#time').clear().type('1')
          cy.get('input#no-of-qu').should('have.value', '1')
          cy.get('input#time').should('have.value', '1')
        }
      })
    })
  })

  it('Verify if user able to remove added section and able to input total questions and time', () => {
    cy.get('a').find('#tests').should('have.text', testsConstants.Tests).click()
    cy.get('#add-test', { timeout: 6000 })
      .should('have.text', `+ ${testsConstants.addTestbutton}`)
      .click()
    cy.location('pathname', { timeout: 60000 }).should(
      'include',
      '/tests/add-test'
    )
    cy.get('input[placeholder="Enter test name"]', { timeout: 6000 })
      .clear()
      .type(test)
    cy.get('#quill-editor').within(() => {
      cy.get('.ql-editor').type(`Test Description`)
    })
    cy.get('button#next-button').should('have.text', cypress.next).click()

    // user reached to step 2

    cy.get('div#section', { timeout: 60000 }).each((el) => {
      cy.wrap(el).within(() => {
        if (el.find('.count')[0].innerText != '0') {
          cy.get('input#no-of-qu').should('have.disabled', true)
          cy.get('input#time').should('have.disabled', true)
          cy.get('button')
            .should('have.text', commonConstants.addButton)
            .click()
          cy.get('button').should('have.text', cypress.Remove)
          cy.get('input#no-of-qu').clear().type('1')
          cy.get('input#time').clear().type('1')
          cy.get('input#no-of-qu').should('have.value', '1')
          cy.get('input#time').should('have.value', '1')
        }
      })
    })
  })

  it('Verify if user able to move to preview tab after selecting sections', () => {
    cy.get('a').find('#tests').should('have.text', testsConstants.Tests).click()
    cy.get('#add-test', { timeout: 6000 })
      .should('have.text', `+ ${testsConstants.addTestbutton}`)
      .click()
    cy.location('pathname', { timeout: 60000 }).should(
      'include',
      '/tests/add-test'
    )
    cy.get('input[placeholder="Enter test name"]', { timeout: 6000 })
      .clear()
      .type(test)
    cy.get('#quill-editor').within(() => {
      cy.get('.ql-editor').type(`Test Description`)
    })

    cy.get('button#next-button').should('have.text', cypress.next).click()

    // user reached to step 2

    cy.get('div#section', { timeout: 60000 }).each((el) => {
      cy.wrap(el).within(() => {
        if (el.find('.count')[0].innerText != '0') {
          cy.get('input#no-of-qu').should('have.disabled', true)
          cy.get('input#time').should('have.disabled', true)
          cy.get('button')
            .should('have.text', commonConstants.addButton)
            .click()
          cy.get('button').should('have.text', cypress.Remove)
          cy.get('input#no-of-qu').clear().type('1')
          cy.get('input#time').clear().type('1')
          cy.get('input#no-of-qu').should('have.value', '1')
          cy.get('input#time').should('have.value', '1')
        }
      })
    })
    cy.get('button#next-button').should('have.text', cypress.next).click()
    cy.get('.stepsTab').each(($el) => {
      cy.wrap($el).within((el) => {
        if (
          el[0].getElementsByClassName('stepsName')[0].innerHTML ===
          cypress.step1
        ) {
          cy.get('.stepsName').should('have.text', cypress.step1)
        } else if (
          el[0].getElementsByClassName('stepsName')[0].innerHTML ===
          cypress.step2
        ) {
          cy.get('.stepsName').should('have.text', cypress.step2)
        } else if (
          el[0].getElementsByClassName('stepsName')[0].innerHTML ===
          cypress.step3
        ) {
          cy.get('.stepsName').should('have.text', cypress.step3)
        }
      })
    })
  })

  it('Verify if user is able to create a test and navigates to Tests Page where can see added test', () => {
    cy.get('a').find('#tests').should('have.text', testsConstants.Tests).click()
    cy.location('pathname', { timeout: 60000 }).should('include', '/tests')
    cy.get('#sort-filter-body').get('#ascend', { timeout: 8000 }).click()

    cy.get('.test-table-list', { timeout: 6000 }).each(($el) => {
      cy.wrap($el).within((el) => {
        if (
          el[0].getElementsByClassName('test-name-navigation')[0].innerHTML ===
          test1
        ) {
          cy.get('.test-name-navigation').should('have.text', test1)
        }
      })
    })
  })
})
