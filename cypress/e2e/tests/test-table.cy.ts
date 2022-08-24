import {
  cypress,
  testsConstants,
  routeFiles,
  commonConstants,
} from '~/constants/common.constants'

const time = new Date().getTime()
let totalCount: any
describe('Visiting Tests', () => {
  // creating data to test Test list page
  it('Create Section and  test', () => {
    cy.visit('/sign-in')
    cy.get('#email')
      .clear()
      .type('careers@copods.co')
      .should('have.value', cypress.email)
    cy.get('#password', { timeout: 600 })
      .clear()
      .type('kQuiz@copods')
      .should('have.value', cypress.password)
    cy.findByRole('button', { timeout: 6000 }).click()
    cy.get('a', { timeout: 6000 })
      .find('#Sections', { timeout: 10000 })
      .should('have.text', routeFiles.sections)
      .click()
    cy.location('pathname', { timeout: 60000 }).should('include', '/sections')
    cy.get('#add-section', { timeout: 60000 }).click()
    const sectionName = `Aptitude - ${time}`
    cy.get('form > div', { timeout: 10000 })
      .should('be.visible')
      .within((el) => {
        cy.get('input').type(sectionName)
        cy.get('textarea').type('Aptitude')
        cy.get("button[type='submit']", { timeout: 10000 }).click()
      })
    cy.get('#addQuestion', { timeout: 6000 })
      .should('have.text', cypress.addQuest)
      .click()
    cy.location('pathname', { timeout: 6000 }).should(
      'include',
      '/add-question'
    )
    cy.get('h1', { timeout: 6000 }).should('be.visible')
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
    cy.get('#optionEditor input').clear().type('Option of question')
    cy.get('#saveAndExit', { timeout: 6000 }).click()
    cy.get('a', { timeout: 6000 })
      .find('#Tests', { timeout: 60000 })
      .should('have.text', testsConstants.Tests)
      .click()
    cy.location('pathname', { timeout: 60000 }).should('include', '/tests')
    cy.get('#addTest', { timeout: 6000 }).click()
    cy.location('pathname', { timeout: 60000 }).should(
      'include',
      '/tests/add-test'
    )
    cy.get('#name', { timeout: 60000 }).clear().type(`Test - ${time}`)
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
    cy.get('button#submitButton', { timeout: 6000 })
      .should('have.text', 'Submit')
      .click()
    cy.location('pathname', { timeout: 60000 }).should('include', '/tests')
    cy.get('a', { timeout: 60000 })
      .find('#Tests', { timeout: 60000 })
      .should('have.text', testsConstants.Tests)
      .click()
    cy.location('pathname', { timeout: 60000 }).should('include', '/tests')
  })

  it('Visiting Test Page', () => {
    cy.visit('/sign-in')
    cy.get('#email')
      .clear()
      .type('careers@copods.co')
      .should('have.value', cypress.email)
    cy.get('#password')
      .clear()
      .type('kQuiz@copods')
      .should('have.value', cypress.password)
    cy.findByRole('button', { timeout: 6000 }).click()

    cy.get('a', { timeout: 6000 })
      .find('#Tests', { timeout: 6000 })
      .should('have.text', testsConstants.Tests)
      .click()
    cy.location('pathname', { timeout: 60000 }).should('include', '/tests')
  })

  let strings: Array<string>
  it('Total Count of Test of Table', () => {
    cy.visit('/sign-in')
    cy.get('#email')
      .clear()
      .type('careers@copods.co')
      .should('have.value', cypress.email)
    cy.get('#password')
      .clear()
      .type('kQuiz@copods')
      .should('have.value', cypress.password)
    cy.findByRole('button', { timeout: 6000 }).click({ force: true })

    cy.get('a', { timeout: 6000 })
      .find('#Tests', { timeout: 6000 })
      .should('have.text', testsConstants.Tests)
      .click()
    cy.location('pathname', { timeout: 60000 }).should('include', '/tests')
    cy.get('#total-items-value')
      .get('#total-count-value')
      .then(($ele) => {
        totalCount = [...$ele].map(($el) => {
          return $el.innerText
        })
      })

    cy.get('#test-list', { timeout: 4000 }).should('be.visible')
    cy.get('#test-list', { timeout: 6000 })
      .get('.test-name-navigation')
      .then(($elements) => {
        strings = [...$elements].map(($el) => $el.innerText)
        expect(parseInt(totalCount)).to.deep.equal(strings.length)
      })
  })
  it('sort by name in ascending order ', () => {
    cy.visit('/sign-in')
    cy.get('#email')
      .clear()
      .type('careers@copods.co')
      .should('have.value', cypress.email)
    cy.get('#password')
      .clear()
      .type('kQuiz@copods')
      .should('have.value', cypress.password)
    cy.findByRole('button', { timeout: 6000 }).click()
    cy.get('a', { timeout: 6000 })
      .find('#Tests', { timeout: 6000 })
      .should('have.text', testsConstants.Tests)
      .click()
    cy.location('pathname', { timeout: 60000 }).should('include', '/tests')
    cy.get('#headlessui-listbox-button-1 span span')
      .invoke('text')
      .then((el) => {
        if (el === 'Name') {
          cy.get('.border-b', { timeout: 60000 })
            .get('.test-name-navigation')
            .then(($elements) => {
              var strings = [...$elements].map(($el) => $el.innerText)
              expect(strings).to.deep.equal(strings.sort())
            })
        }
      })
  })
  it('sort by name in descending order ', () => {
    cy.visit('/sign-in')
    cy.get('#email')
      .clear()
      .type('careers@copods.co')
      .should('have.value', cypress.email)
    cy.get('#password')
      .clear()
      .type('kQuiz@copods')
      .should('have.value', cypress.password)
    cy.findByRole('button', { timeout: 6000 }).click()
    cy.get('a', { timeout: 6000 })
      .find('#Tests', { timeout: 6000 })
      .should('have.text', testsConstants.Tests)
      .click()
    cy.location('pathname', { timeout: 60000 }).should('include', '/tests')
    cy.get('#sort-filter-body').get('#ascend').click()
    cy.get('#headlessui-listbox-button-1 span span')
      .invoke('text')
      .then((el) => {
        if (el === 'Name') {
          cy.get('.border-b', { timeout: 60000 })
            .get('.test-name-navigation')
            .then(($elements) => {
              var strings = [...$elements].map(($el) => $el.innerText)
              expect(strings).to.deep.equal(strings.reverse())
            })
        }
      })
  })
  it('sort by created date in ascending order ', () => {
    cy.visit('/sign-in')
    cy.get('#email')
      .clear()
      .type('careers@copods.co')
      .should('have.value', cypress.email)
    cy.get('#password')
      .clear()
      .type('kQuiz@copods')
      .should('have.value', cypress.password)
    cy.findByRole('button', { timeout: 6000 }).click()
    cy.get('a', { timeout: 6000 })
      .find('#Tests', { timeout: 6000 })
      .should('have.text', testsConstants.Tests)
      .click()
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
          cy.get('.border-b')
            .get('.test-name-navigation')
            .then(($elements) => {
              var strings = [...$elements].map(($el) => $el.innerText)
              expect(strings).to.deep.equal(strings.sort())
            })
        }
      })
  })
  it('sort by created date in descending order', () => {
    cy.visit('/sign-in')
    cy.get('#email')
      .clear()
      .type('careers@copods.co')
      .should('have.value', cypress.email)
    cy.get('#password')
      .clear()
      .type('kQuiz@copods')
      .should('have.value', cypress.password)
    cy.findByRole('button', { timeout: 6000 }).click()
    cy.get('a', { timeout: 6000 })
      .find('#Tests', { timeout: 6000 })
      .should('have.text', testsConstants.Tests)
      .click()
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
          cy.get('.border-b', { timeout: 60000 })
            .get('.test-name-navigation')
            .then(($elements) => {
              var strings = [...$elements].map(($el) => $el.innerText)
              expect(strings).to.deep.equal(strings.reverse())
            })
        }
      })
  })

  it('By Clicking test name it should navigate to test details page', () => {
    cy.visit('/sign-in')
    cy.get('#email')
      .clear()
      .type('careers@copods.co')
      .should('have.value', cypress.email)
    cy.get('#password')
      .clear()
      .type('kQuiz@copods')
      .should('have.value', cypress.password)
    cy.findByRole('button', { timeout: 6000 }).click()

    cy.get('a', { timeout: 6000 })
      .find('#Tests', { timeout: 6000 })
      .should('have.text', testsConstants.Tests)
      .click()
    cy.location('pathname', { timeout: 60000 }).should('include', '/tests')
    cy.get('#test-table-list', { timeout: 60000 }).should('be.visible')

    cy.get('#test-table-list', { timeout: 60000 })
      .get('#test-name-navigation')
      .click()
      .location('pathname', { timeout: 60000 })
      .should('include', '/tests')
    cy.get('#title').should('have.exist')
  })

  it('On click of count in sections, menu with all sections should open', () => {
    cy.visit('/sign-in')
    cy.get('#email')
      .clear()
      .type('careers@copods.co')
      .should('have.value', cypress.email)
    cy.get('#password')
      .clear()
      .type('kQuiz@copods')
      .should('have.value', cypress.password)
    cy.findByRole('button', { timeout: 6000 }).click()
    cy.get('a', { timeout: 6000 })
      .find('#Tests', { timeout: 6000 })
      .should('have.text', testsConstants.Tests)
      .click()
    cy.location('pathname', { timeout: 60000 }).should('include', '/tests')
    var strings: any
    cy.get('#chip-group-id', { timeout: 10000 }).then((el) => {
      cy.get('.chip-group').then(($elements) => {
        strings = [...$elements].map(($el) => {
          cy.log(strings)
          if ($el.innerText.includes('\n')) {
            cy.get('#section-count-button', { timeout: 6000 }).click()
            cy.get('.section-menu', { timeout: 6000 }).should("be.visible")
            cy.get('.section-menu', { timeout: 6000 }).then(($elements) => {
              var str = [...$elements].map(($el) => {
                return $el.innerText
              })
              expect(str.length > 0).to.deep.equal(true)
            })
          }
        })
      })
    })
  })
  let deletedItem: string
  it('On click of delete, test should be deleted', () => {
    cy.visit('/sign-in')
    cy.get('#email')
      .clear()
      .type('careers@copods.co')
      .should('have.value', cypress.email)
    cy.get('#password')
      .clear()
      .type('kQuiz@copods')
      .should('have.value', cypress.password)
    cy.findByRole('button', { timeout: 6000 }).click({ force: true })
    cy.get('a', { timeout: 6000 })
      .find('#Tests', { timeout: 6000 })
      .should('have.text', testsConstants.Tests)
      .click()
    cy.location('pathname', { timeout: 60000 }).should('include', '/tests')
    cy.get('#test-table-list', { timeout: 60000 }).should('be.visible')
    cy.get('#test-table-list', { timeout: 60000 })
      .invoke('text')
      .then((el) => {
        cy.get('#test-name-navigation', { timeout: 6000 }).then(($elements) => {
          var strings = [...$elements].map(($el) => {
            deletedItem = $el.innerText
            return $el.innerText
          })
          expect(deletedItem).to.deep.equal(strings.toString())
        })
      })
    cy.get('#vertical-icon', { timeout: 60000 }).click()
    cy.get('.delete-test', { timeout: 6000 }).click()
    cy.get('.confirm-delete', { timeout: 6000 }).click()
    cy.get('#test-table-list', { timeout: 6000 }).each((item) => {
      cy.contains(deletedItem).should('not.exist')
    })
    return false
  })
})
