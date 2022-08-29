import {
  cypress,
  testsConstants,
  // routeFiles,
  commonConstants,
} from '~/constants/common.constants'

describe('Creating tests', () => {
  it('Visiting Add Test Page', () => {
    cy.visit('/sign-in')
    cy.get('#email')
      .clear()
      .type('careers@copods.co')
      .should('have.value', cypress.email)
    cy.get('#password')
      .clear()
      .type('kQuiz@copods')
      .should('have.value', cypress.password)
    cy.findByRole('button').click()

    cy.get('a', { timeout: 6000 })
      .find('#Tests', { timeout: 6000 })
      .should('have.text', testsConstants.Tests)
      .click()
    cy.location('pathname', { timeout: 60000 }).should('include', '/tests')
    cy.get('#addTest').click()
    cy.location('pathname', { timeout: 60000 }).should(
      'include',
      '/tests/add-test'
    )
  })

  // it('Add section and question to section add test', () => {
  //   cy.visit('/sign-in')
  //   cy.get('#email')
  //     .clear()
  //     .type('careers@copods.co')
  //     .should('have.value', cypress.email)
  //   cy.get('#password', { timeout: 6000 })
  //     .clear()
  //     .type('kQuiz@copods')
  //     .should('have.value', cypress.password)
  //   cy.findByRole('button', { timeout: 10000 }).click()
  //   cy.get('a', { timeout: 10000 })
  //     .find('#Sections', { timeout: 10000 })
  //     .should('have.text', routeFiles.sections)
  //     .click()
  //   cy.location('pathname', { timeout: 60000 }).should('include', '/sections')
  //   cy.get('.px-5', { timeout: 10000 }).click()
  //   cy.get('.addSectionDilog', { timeout: 10000 }).should('be.visible')
  //   cy.get('input#sectionName').type(`Aptitude - ${new Date().getTime()}`)
  //   cy.get('textarea#sectionDescription').type(
  //     `Aptitude - ${new Date().getTime()} Description`
  //   )
  //   cy.get('button#submitButton', { timeout: 6000 })
  //     .should('have.text', commonConstants.addButton)
  //     .click()
  //   cy.get('a', { timeout: 6000 })
  //     .find('#Tests', { timeout: 6000 })
  //     .should('have.text', testsConstants.Tests)
  //     .click()
  //   cy.get('a', { timeout: 10000 })
  //     .find('#Sections', { timeout: 10000 })
  //     .should('have.text', routeFiles.sections)
  //     .click()
  //   cy.get('#section-card', { timeout: 20000 }).first().click()
  //   cy.get('#addQuestion').should('have.text', cypress.addQuest).click()
  //   cy.location('pathname', { timeout: 60000 }).should(
  //     'include',
  //     '/add-question'
  //   )

  //   cy.get('h1', { timeout: 2000 }).should('be.visible')
  //   cy.get('#dropdown > button').click()

  //   cy.get('ul').within(() => {
  //     cy.get('li').within(() => {
  //       cy.get('div').then((el) => {
  //         ;[...el].map((el) => {
  //           if (el.innerText === 'Text') {
  //             el.click()
  //           }
  //           return null
  //         })
  //       })
  //     })
  //   })

  //   cy.get('#questionEditor #quillEditor').within(() => {
  //     cy.get('.ql-editor').type(`What is your Test Question ?`)
  //   })

  //   cy.get('#optionEditor input').clear().type('Option of question')

  //   cy.get('#saveAndExit').click()
  //   cy.location('pathname', { timeout: 60000 }).should('include', '/sections')
  // })

  it('Verify if add test page contains 3 tabs', () => {
    cy.visit('/sign-in')
    cy.get('#email')
      .clear()
      .type('careers@copods.co')
      .should('have.value', cypress.email)
    cy.get('#password')
      .clear()
      .type('kQuiz@copods')
      .should('have.value', cypress.password)
    cy.findByRole('button').click()

    cy.get('a', { timeout: 6000 })
      .find('#Tests')
      .should('have.text', testsConstants.Tests)
      .click()
    cy.location('pathname', { timeout: 60000 }).should('include', '/tests')
    cy.get('#addTest').click()
    cy.location('pathname', { timeout: 60000 }).should(
      'include',
      '/tests/add-test'
    )

    cy.get('#0').find('.mb-1').should('have.text', cypress.step1)
    cy.get('#1').find('.mb-1').should('have.text', cypress.step2)
    cy.get('#2').find('.mb-1').should('have.text', cypress.step3)
    cy.get('#0').find('.text-gray-500').should('have.text', cypress.testDetails)
    cy.get('#1')
      .find('.text-gray-500')
      .should('have.text', cypress.selectSections)
    cy.get('#2').find('.text-gray-500').should('have.text', cypress.preview)
  })

  it('Verify if next button is disabled if user do not provide name and description', () => {
    cy.visit('/sign-in')
    cy.get('#email')
      .clear()
      .type('careers@copods.co')
      .should('have.value', cypress.email)
    cy.get('#password')
      .clear()
      .type('kQuiz@copods')
      .should('have.value', cypress.password)
    cy.findByRole('button').click()

    cy.get('a', { timeout: 6000 })
      .find('#Tests')
      .should('have.text', testsConstants.Tests)
      .click()
    cy.location('pathname', { timeout: 60000 }).should('include', '/tests')
    cy.get('#addTest').click()
    cy.location('pathname', { timeout: 60000 }).should(
      'include',
      '/tests/add-test'
    )

    cy.get('button#nextButton')
      .should('have.text', 'Next')
      .should('have.disabled', true)
  })

  it('Verify if user able to navigate to Step 2 by clicking next button if user provide name and description', () => {
    cy.visit('/sign-in')
    cy.get('#email')
      .clear()
      .type('careers@copods.co')
      .should('have.value', cypress.email)
    cy.get('#password')
      .clear()
      .type('kQuiz@copods')
      .should('have.value', cypress.password)
    cy.findByRole('button').click()

    cy.get('a', { timeout: 6000 })
      .find('#Tests')
      .should('have.text', testsConstants.Tests)
      .click()
    cy.location('pathname', { timeout: 60000 }).should('include', '/tests')
    cy.get('#addTest').click()
    cy.location('pathname', { timeout: 60000 }).should(
      'include',
      '/tests/add-test'
    )

    cy.get('#name').clear().type(`Test - ${new Date().getTime()}`)
    cy.get('#quillEditor').within(() => {
      cy.get('.ql-editor').type(`Test Description`)
    })

    cy.get('button#nextButton').should('have.text', cypress.next).click()
    cy.get('#0').find('hr').should('have.class', 'bg-primary')
    cy.get('#1').find('hr').should('have.class', 'bg-primary')
  })

  it('Verify on clicking back button on step 2 user navigate back to step 2', () => {
    cy.visit('/sign-in')
    cy.get('#email')
      .clear()
      .type('careers@copods.co')
      .should('have.value', cypress.email)
    cy.get('#password')
      .clear()
      .type('kQuiz@copods')
      .should('have.value', cypress.password)
    cy.findByRole('button').click()

    cy.get('a', { timeout: 6000 })
      .find('#Tests')
      .should('have.text', testsConstants.Tests)
      .click()
    cy.location('pathname', { timeout: 60000 }).should('include', '/tests')
    cy.get('#addTest').click()
    cy.location('pathname', { timeout: 60000 }).should(
      'include',
      '/tests/add-test'
    )

    cy.get('#name').clear().type(`Test - ${new Date().getTime()}`)
    cy.get('#quillEditor').within(() => {
      cy.get('.ql-editor').type(`Test Description`)
    })

    cy.get('#1').click()
    cy.get('#0').find('hr').should('have.class', 'bg-primary')
    cy.get('#1').find('hr').should('have.class', 'bg-primary')

    cy.get('button#backButton').should('have.text', cypress.back).click()

    cy.get('#0').find('hr').should('have.class', 'bg-primary')
    cy.get('#1').find('hr').should('have.class', 'bg-gray-200')
  })

  it('Verify if user able to add section and able to input total questions and time', () => {
    cy.visit('/sign-in')
    cy.get('#email')
      .clear()
      .type('careers@copods.co')
      .should('have.value', cypress.email)
    cy.get('#password')
      .clear()
      .type('kQuiz@copods')
      .should('have.value', cypress.password)
    cy.findByRole('button').click()

    cy.get('a', { timeout: 6000 })
      .find('#Tests')
      .should('have.text', testsConstants.Tests)
      .click()
    cy.location('pathname', { timeout: 60000 }).should('include', '/tests')
    cy.get('#addTest').click()
    cy.location('pathname', { timeout: 60000 }).should(
      'include',
      '/tests/add-test'
    )

    cy.get('#name').clear().type(`Test - ${new Date().getTime()}`)
    cy.get('#quillEditor').within(() => {
      cy.get('.ql-editor').type(`Test Description`)
    })
    cy.get('button#nextButton').should('have.text', cypress.next).click()
    cy.get('#0').find('hr').should('have.class', 'bg-primary')
    cy.get('#1').find('hr').should('have.class', 'bg-primary')
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
    cy.visit('/sign-in')
    cy.get('#email')
      .clear()
      .type('careers@copods.co')
      .should('have.value', cypress.email)
    cy.get('#password')
      .clear()
      .type('kQuiz@copods')
      .should('have.value', cypress.password)
    cy.findByRole('button').click()

    cy.get('a', { timeout: 6000 })
      .find('#Tests')
      .should('have.text', testsConstants.Tests)
      .click()
    cy.location('pathname', { timeout: 60000 }).should('include', '/tests')
    cy.get('#addTest').click()
    cy.location('pathname', { timeout: 60000 }).should(
      'include',
      '/tests/add-test'
    )

    cy.get('#name').clear().type(`Test - ${new Date().getTime()}`)
    cy.get('#quillEditor').within(() => {
      cy.get('.ql-editor').type(`Test Description`)
    })

    cy.get('button#nextButton').should('have.text', cypress.next).click()
    cy.get('#0').find('hr').should('have.class', 'bg-primary')
    cy.get('#1').find('hr').should('have.class', 'bg-primary')
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
    cy.visit('/sign-in')
    cy.get('#email')
      .clear()
      .type('careers@copods.co')
      .should('have.value', cypress.email)
    cy.get('#password')
      .clear()
      .type('kQuiz@copods')
      .should('have.value', cypress.password)
    cy.findByRole('button').click()

    cy.get('a', { timeout: 6000 })
      .find('#Tests')
      .should('have.text', testsConstants.Tests)
      .click()
    cy.location('pathname', { timeout: 60000 }).should('include', '/tests')
    cy.get('#addTest').click()
    cy.location('pathname', { timeout: 60000 }).should(
      'include',
      '/tests/add-test'
    )

    cy.get('#name').clear().type(`Test - ${new Date().getTime()}`)
    cy.get('#quillEditor').within(() => {
      cy.get('.ql-editor').type(`Test Description`)
    })

    cy.get('button#nextButton').should('have.text', cypress.next).click()
    cy.get('#0').find('hr').should('have.class', 'bg-primary')
    cy.get('#1').find('hr').should('have.class', 'bg-primary')
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
    cy.get('#0').find('hr').should('have.class', 'bg-primary')
    cy.get('#1').find('hr').should('have.class', 'bg-primary')
    cy.get('#2').find('hr').should('have.class', 'bg-primary')
  })

  it('Verify if user able create the test and navigate to test list page', () => {
    cy.visit('/sign-in')
    cy.get('#email')
      .clear()
      .type('careers@copods.co')
      .should('have.value', cypress.email)
    cy.get('#password')
      .clear()
      .type('kQuiz@copods')
      .should('have.value', cypress.password)
    cy.findByRole('button').click()

    cy.get('a', { timeout: 6000 })
      .find('#Tests')
      .should('have.text', testsConstants.Tests)
      .click()
    cy.location('pathname', { timeout: 60000 }).should('include', '/tests')
    cy.get('#addTest').click()
    cy.location('pathname', { timeout: 60000 }).should(
      'include',
      '/tests/add-test'
    )

    cy.get('#name').clear().type(`Test - ${new Date().getTime()}`)
    cy.get('#quillEditor').within(() => {
      cy.get('.ql-editor').type(`Test Description`)
    })

    cy.get('button#nextButton').should('have.text', cypress.next).click()
    cy.get('#0').find('hr').should('have.class', 'bg-primary')
    cy.get('#1').find('hr').should('have.class', 'bg-primary')
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
    cy.get('#0').find('hr').should('have.class', 'bg-primary')
    cy.get('#1').find('hr').should('have.class', 'bg-primary')
    cy.get('#2').find('hr').should('have.class', 'bg-primary')

    cy.get('button#submitButton').should('have.text', cypress.submit).click()

    cy.location('pathname', { timeout: 60000 }).should('include', '/tests')
  })
  let testName: any
  it('Verify if user is able to create a test and navigates to Tests Page where can see added test', () => {
    cy.visit('/sign-in')
    cy.get('#email')
      .clear()
      .type('careers@copods.co')
      .should('have.value', cypress.email)
    cy.get('#password', { timeout: 6000 })
      .clear()
      .type('kQuiz@copods')
      .should('have.value', cypress.password)
    cy.findByRole('button', { timeout: 6000 }).click()

    cy.get('a', { timeout: 10000 })
      .find('#Tests', { timeout: 10000 })
      .should('have.text', testsConstants.Tests)
      .click()
    cy.location('pathname', { timeout: 60000 }).should('include', '/tests')
    cy.get('#addTest', { timeout: 10000 }).click()
    cy.location('pathname', { timeout: 100000 }).should(
      'include',
      '/tests/add-test'
    )
    testName = `Test - ${new Date().getTime()}`
    cy.get('#name', { timeout: 6000 }).clear().type(testName)
    cy.get('#quillEditor').within(() => {
      cy.get('.ql-editor').type(`Test Description`)
    })
    cy.get('button#nextButton').should('have.text', 'Next').click()
    cy.get('#0').find('hr').should('have.class', 'bg-primary')
    cy.get('#1').find('hr').should('have.class', 'bg-primary')
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
    cy.get('#0').find('hr').should('have.class', 'bg-primary')
    cy.get('#1').find('hr').should('have.class', 'bg-primary')
    cy.get('#2').find('hr').should('have.class', 'bg-primary')
    cy.get('button#submitButton', { timeout: 6000 })
      .should('have.text', 'Submit', { timeout: 6000 })
      .click()
    cy.location('pathname', { timeout: 60000 }).should('include', '/tests')
    cy.get('a', { timeout: 10000 })
      .find('#Tests', { timeout: 10000 })
      .should('have.text', testsConstants.Tests)
      .click()
    cy.location('pathname', { timeout: 60000 }).should('include', '/tests')
    cy.get('#sort-filter-body').get('#ascend', { timeout: 6000 }).click()
    cy.get('#test-list', { timeout: 6000 }).should('be.visible')
    cy.get('#test-list', { timeout: 6000 })
      .get('#test-name-navigation')
      .last()
      .should('have.text', testName)
  })
})
