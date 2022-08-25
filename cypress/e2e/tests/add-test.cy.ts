import {
  cypress,
  testsConstants,
  commonConstants,
} from '~/constants/common.constants'

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
  afterEach(() => {
    cy.get('#logoutButton', { timeout: 60000 }).click()
  })
  it('Visiting Add Test Page', () => {
    cy.get('a').find('#Tests').should('have.text', testsConstants.Tests).click()
    cy.get('#addTest', { timeout: 6000 })
      .should('have.text', `+ ${testsConstants.addTestbutton}`)
      .click()
    cy.location('pathname').should('include', '/tests/add-test')
  })

  const section = `Aptitude - ${new Date().getTime()}`

  it('Add section for add test', () => {
    cy.get('a').find('#Sections').should('have.text', cypress.Sections).click()
    cy.get('#add-section').click()
    cy.get('form > div')
      .should('be.visible')
      .within((el) => {
        cy.get('input[placeholder="Enter Section Name"]').type(`${section}`)
        cy.get('textarea').type('Aptitude')
        cy.get('[data-cy="submit"]').click()
      })
  })
  it('Add question in created section for add test', () => {
    cy.get('a').find('#Sections').should('have.text', cypress.Sections).click()
    cy.get('.section-card').each(($el) => {
      cy.wrap($el).within((el) => {
        if (
          el[0].getElementsByClassName('sectionName')[0].innerHTML === section
        ) {
          cy.get('.sectionName').contains(section).click()
        }
      })
    })

    cy.get('#addQuestion').should('have.text', cypress.addQuest).click()
    cy.location('pathname').should('include', '/add-question')
    cy.get('h1').should('be.visible')
    cy.get('#dropdown > button').click()
    cy.get('ul').within(() => {
      cy.get('li').within(() => {
        cy.get('div').then((el) => {
          ;[...el].map((el) => {
            if (el.innerText === 'Text') {
              el.click()
            }
            return null
          })
        })
      })
    })

    cy.get('#questionEditor #quillEditor').within(() => {
      cy.get('.ql-editor').type(`What is your Test Question ?`)
    })
    cy.get('input[placeholder="Write your option here"]')
      .clear()
      .type('Option of question')
    cy.get('#saveAndExit').click()
  })
  it('Verify if add test page contains 3 tabs', () => {
    cy.get('a').find('#Tests').should('have.text', testsConstants.Tests).click()
    cy.get('#addTest', { timeout: 6000 }).click()
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
          cy.get('.stepsName').contains(cypress.step1)
        } else if (
          el[0].getElementsByClassName('stepsName')[0].innerHTML ===
          cypress.step2
        ) {
          cy.get('.stepsName').contains(cypress.step2)
        } else if (
          el[0].getElementsByClassName('stepsName')[0].innerHTML ===
          cypress.step3
        ) {
          cy.get('.stepsName').contains(cypress.step3)
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
    cy.get('a').find('#Tests').should('have.text', testsConstants.Tests).click()
    cy.get('#addTest', { timeout: 6000 }).click()
    cy.location('pathname', { timeout: 60000 }).should(
      'include',
      '/tests/add-test'
    )

    cy.get('button#nextButton')
      .should('have.text', 'Next')
      .should('have.disabled', true)
  })
  const test = `Test - ${new Date().getTime()}`
  it('Verify if user able to navigate to Step 2 by clicking next button if user provide name and description', () => {
    cy.get('a').find('#Tests').should('have.text', testsConstants.Tests).click()
    cy.get('#addTest', { timeout: 6000 }).click()
    cy.location('pathname', { timeout: 60000 }).should(
      'include',
      '/tests/add-test'
    )

    cy.get('input[placeholder="Enter test name"]', { timeout: 6000 })
      .clear()
      .type(test)
    cy.get('#quillEditor').within(() => {
      cy.get('.ql-editor').type(`Test Description`)
    })

    cy.get('button#nextButton').should('have.text', cypress.next).click()
    cy.get('.stepsTab').each(($el) => {
      cy.wrap($el).within((el) => {
        if (
          el[0].getElementsByClassName('stepsName')[0].innerHTML ===
          cypress.step1
        ) {
          cy.get('.stepsName').contains(cypress.step1)
        } else if (
          el[0].getElementsByClassName('stepsName')[0].innerHTML ===
          cypress.step2
        ) {
          cy.get('.stepsName').contains(cypress.step2)
        }
      })
    })
  })

  it('Verify on clicking back button on step 2 user navigate back to step 2', () => {
    cy.get('a').find('#Tests').should('have.text', testsConstants.Tests).click()

    cy.get('#addTest', { timeout: 6000 }).click()
    cy.location('pathname').should('include', '/tests/add-test')

    cy.get('input[placeholder="Enter test name"]', { timeout: 6000 })
      .clear()
      .type(test)
    cy.get('#quillEditor').within(() => {
      cy.get('.ql-editor').type(`Test Description`)
    })
    cy.get('.stepsTab').each(($el) => {
      cy.wrap($el).within((el) => {
        if (
          el[0].getElementsByClassName('stepsName')[0].innerHTML ===
          cypress.step2
        ) {
          cy.get('.stepsName').contains(cypress.step2).click()
        }
      })
    })
    cy.get('button#backButton').should('have.text', cypress.back).click()
  })

  it('Verify if user able to add section and able to input total questions and time', () => {
    cy.get('a').find('#Tests').should('have.text', testsConstants.Tests).click()
    cy.get('#addTest', { timeout: 6000 }).click()
    cy.location('pathname', { timeout: 60000 }).should(
      'include',
      '/tests/add-test'
    )

    cy.get('input[placeholder="Enter test name"]', { timeout: 6000 })
      .clear()
      .type(test)
    cy.get('#quillEditor').within(() => {
      cy.get('.ql-editor').type(`Test Description`)
    })
    cy.get('button#nextButton').should('have.text', cypress.next).click()
    cy.get('.stepsTab').each(($el) => {
      cy.wrap($el).within((el) => {
        if (
          el[0].getElementsByClassName('stepsName')[0].innerHTML ===
          cypress.step2
        ) {
          cy.get('.stepsName').contains(cypress.step2).click()
        }
      })
    })
    // user reached to step 2

    cy.get('div#section', { timeout: 60000 }).each((el) => {
      cy.wrap(el).within(() => {
        if (el.find('.count')[0].innerText != '0') {
          cy.get('input#noOfQu').should('have.disabled', true)
          cy.get('input#time').should('have.disabled', true)
          cy.get('button')
            .should('have.text', commonConstants.addButton)
            .click()
          cy.get('button').should('have.text', cypress.Remove)

          cy.get('input#noOfQu').clear().type('1')
          cy.get('input#time').clear().type('1')
          cy.get('input#noOfQu').should('have.value', '1')
          cy.get('input#time').should('have.value', '1')
        }
      })
    })
  })

  it('Verify if user able to remove added section and able to input total questions and time', () => {
    cy.get('a').find('#Tests').should('have.text', testsConstants.Tests).click()
    cy.get('#addTest', { timeout: 6000 }).click()
    cy.location('pathname', { timeout: 60000 }).should(
      'include',
      '/tests/add-test'
    )

    cy.get('input[placeholder="Enter test name"]', { timeout: 6000 })
      .clear()
      .type(test)
    cy.get('#quillEditor').within(() => {
      cy.get('.ql-editor').type(`Test Description`)
    })

    cy.get('button#nextButton').should('have.text', cypress.next).click()

    // user reached to step 2

    cy.get('div#section', { timeout: 60000 }).each((el) => {
      cy.wrap(el).within(() => {
        if (el.find('.count')[0].innerText != '0') {
          cy.get('input#noOfQu').should('have.disabled', true)
          cy.get('input#time').should('have.disabled', true)
          cy.get('button')
            .should('have.text', commonConstants.addButton)
            .click()
          cy.get('button').should('have.text', cypress.Remove)

          cy.get('input#noOfQu').clear().type('1')
          cy.get('input#time').clear().type('1')
          cy.get('input#noOfQu').should('have.value', '1')
          cy.get('input#time').should('have.value', '1')
        }
      })
    })
  })

  it('Verify if user able to move to preview tab after selecting sections', () => {
    cy.get('a').find('#Tests').should('have.text', testsConstants.Tests).click()
    cy.get('#addTest', { timeout: 6000 }).click()
    cy.location('pathname', { timeout: 60000 }).should(
      'include',
      '/tests/add-test'
    )

    cy.get('input[placeholder="Enter test name"]', { timeout: 6000 })
      .clear()
      .type(test)
    cy.get('#quillEditor').within(() => {
      cy.get('.ql-editor').type(`Test Description`)
    })

    cy.get('button#nextButton').should('have.text', cypress.next).click()

    // user reached to step 2

    cy.get('div#section', { timeout: 60000 }).each((el) => {
      cy.wrap(el).within(() => {
        if (el.find('.count')[0].innerText != '0') {
          cy.get('input#noOfQu').should('have.disabled', true)
          cy.get('input#time').should('have.disabled', true)
          cy.get('button')
            .should('have.text', commonConstants.addButton)
            .click()
          cy.get('button').should('have.text', cypress.Remove)

          cy.get('input#noOfQu').clear().type('1')
          cy.get('input#time').clear().type('1')
          cy.get('input#noOfQu').should('have.value', '1')
          cy.get('input#time').should('have.value', '1')
        }
      })
    })
    cy.get('button#nextButton').should('have.text', cypress.next).click()
    cy.get('.stepsTab').each(($el) => {
      cy.wrap($el).within((el) => {
        if (
          el[0].getElementsByClassName('stepsName')[0].innerHTML ===
          cypress.step1
        ) {
          cy.get('.stepsName').contains(cypress.step1)
        } else if (
          el[0].getElementsByClassName('stepsName')[0].innerHTML ===
          cypress.step2
        ) {
          cy.get('.stepsName').contains(cypress.step2)
        } else if (
          el[0].getElementsByClassName('stepsName')[0].innerHTML ===
          cypress.step3
        ) {
          cy.get('.stepsName').contains(cypress.step3)
        }
      })
    })
  })

  it('Verify if user able create the test and navigate to test list page', () => {
    cy.get('a').find('#Tests').should('have.text', testsConstants.Tests).click()
    cy.get('#addTest', { timeout: 6000 }).click()
    cy.location('pathname', { timeout: 60000 }).should(
      'include',
      '/tests/add-test'
    )

    cy.get('input[placeholder="Enter test name"]', { timeout: 6000 })
      .clear()
      .type(test)
    cy.get('#quillEditor').within(() => {
      cy.get('.ql-editor').type(`Test Description`)
    })

    cy.get('button#nextButton').should('have.text', cypress.next).click()
    cy.get('.stepsTab').each(($el) => {
      cy.wrap($el).within((el) => {
        if (
          el[0].getElementsByClassName('stepsName')[0].innerHTML ===
          cypress.step1
        ) {
          cy.get('.stepsName').contains(cypress.step1)
        } else if (
          el[0].getElementsByClassName('stepsName')[0].innerHTML ===
          cypress.step2
        ) {
          cy.get('.stepsName').contains(cypress.step2)
        }
      })
    })
    // user reached to step 2

    cy.get('div#section', { timeout: 60000 }).each((el) => {
      cy.wrap(el).within(() => {
        if (el.find('.count')[0].innerText != '0') {
          cy.get('input#noOfQu').should('have.disabled', true)
          cy.get('input#time').should('have.disabled', true)
          cy.get('button')
            .should('have.text', commonConstants.addButton)
            .click()
          cy.get('button').should('have.text', cypress.Remove)

          cy.get('input#noOfQu').clear().type('1')
          cy.get('input#time').clear().type('1')
          cy.get('input#noOfQu').should('have.value', '1')
          cy.get('input#time').should('have.value', '1')
        }
      })
    })
    cy.get('button#nextButton').should('have.text', cypress.next).click()
    cy.get('.stepsTab').each(($el) => {
      cy.wrap($el).within((el) => {
        if (
          el[0].getElementsByClassName('stepsName')[0].innerHTML ===
          cypress.step1
        ) {
          cy.get('.stepsName').contains(cypress.step1)
        } else if (
          el[0].getElementsByClassName('stepsName')[0].innerHTML ===
          cypress.step2
        ) {
          cy.get('.stepsName').contains(cypress.step2)
        } else if (
          el[0].getElementsByClassName('stepsName')[0].innerHTML ===
          cypress.step3
        ) {
          cy.get('.stepsName').contains(cypress.step3)
        }
      })
    })

    cy.get('button#submitButton').should('have.text', cypress.submit).click()
  })
  it('Verify if user is able to create a test and navigates to Tests Page where can see added test', () => {
    cy.get('a').find('#Tests').should('have.text', testsConstants.Tests).click()
    cy.get('#addTest', { timeout: 6000 }).click()
    cy.location('pathname', { timeout: 10000 }).should(
      'include',
      '/tests/add-test'
    )

    cy.get('input[placeholder="Enter test name"]', { timeout: 6000 })
      .clear()
      .type(test)
    cy.get('#quillEditor').within(() => {
      cy.get('.ql-editor').type(`Test Description`)
    })
    cy.get('button#nextButton').should('have.text', 'Next').click()
    cy.get('.stepsTab').each(($el) => {
      cy.wrap($el).within((el) => {
        if (
          el[0].getElementsByClassName('stepsName')[0].innerHTML ===
          cypress.step1
        ) {
          cy.get('.stepsName').contains(cypress.step1)
        } else if (
          el[0].getElementsByClassName('stepsName')[0].innerHTML ===
          cypress.step2
        ) {
          cy.get('.stepsName').contains(cypress.step2)
        }
      })
    })
    // user reached to step 2
    cy.get('div#section', { timeout: 60000 }).each((el) => {
      cy.wrap(el).within(() => {
        if (el.find('.count')[0].innerText != '0') {
          cy.get('input#noOfQu').should('have.disabled', true)
          cy.get('input#time').should('have.disabled', true)
          cy.get('button')
            .should('have.text', commonConstants.addButton)
            .click()
          cy.get('button').should('have.text', cypress.Remove)

          cy.get('input#noOfQu').clear().type('1')
          cy.get('input#time').clear().type('1')
          cy.get('input#noOfQu').should('have.value', '1')
          cy.get('input#time').should('have.value', '1')
        }
      })
    })
    cy.get('button#nextButton').should('have.text', cypress.next).click()
    cy.get('.stepsTab').each(($el) => {
      cy.wrap($el).within((el) => {
        if (
          el[0].getElementsByClassName('stepsName')[0].innerHTML ===
          cypress.step1
        ) {
          cy.get('.stepsName').contains(cypress.step1)
        } else if (
          el[0].getElementsByClassName('stepsName')[0].innerHTML ===
          cypress.step2
        ) {
          cy.get('.stepsName').contains(cypress.step2)
        } else if (
          el[0].getElementsByClassName('stepsName')[0].innerHTML ===
          cypress.step3
        ) {
          cy.get('.stepsName').contains(cypress.step3)
        }
      })
    })
    cy.get('button#submitButton').should('have.text', 'Submit').click()
    cy.location('pathname', { timeout: 60000 }).should('include', '/tests')
    cy.get('a', { timeout: 6000 })
      .find('#Tests')
      .should('have.text', testsConstants.Tests)
      .click()
    cy.location('pathname', { timeout: 60000 }).should('include', '/tests')
    cy.get('#sort-filter-body').get('#ascend').click()
    cy.get('#test-list').should('be.visible')
    cy.get('.test-table-list').each(($el) => {
      cy.wrap($el).within((el) => {
        if (
          el[0].getElementsByClassName('test-name-navigation')[0].innerHTML ===
          test
        ) {
          cy.get('.stepsName').contains(test)
        }
      })
    })
  })
})
