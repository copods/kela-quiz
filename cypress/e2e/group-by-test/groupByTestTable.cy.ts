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
    cy.get('a').find('#Results').should('have.text', cypress.results).click()
    cy.location('pathname', { timeout: 60000 }).should('include', '/results')
  })
  const time = new Date().getTime()
  it('Create Section and  test', () => {
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
    cy.get('a').find('#Sections').should('have.text', cypress.Sections).click()
    cy.location('pathname', { timeout: 60000 }).should('include', '/sections')
    cy.get('#add-section', { timeout: 60000 }).click()
    const sectionName = `Aptitude - ${time}`
    cy.get('form > div', { timeout: 10000 })
      .should('be.visible')
      .within((el) => {
        cy.get('input').type(sectionName)
        cy.get('textarea').type('Aptitude')
        cy.get(`button[type=${cypress.submit}]`, { timeout: 10000 }).click()
      })
    cy.get('#addQuestion').should('have.text', cypress.addQuest).click()
    cy.location('pathname').should('include', '/add-question')
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
    cy.get('#saveAndExit').click()
    cy.get('a').find('#Tests').should('have.text', cypress.Tests).click()
    cy.location('pathname', { timeout: 60000 }).should('include', '/tests')
    cy.get('#addTest', { timeout: 6000 }).click()
    cy.location('pathname', { timeout: 60000 }).should(
      'include',
      '/tests/add-test'
    )
    cy.get('#name', { timeout: 60000 }).clear().type(`Test - ${time}`)
    cy.get('#quillEditor').within(() => {
      cy.get('.ql-editor').type(`Test ${cypress.description}`)
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
          cy.get('button').should('have.text', cypress.Add).click()
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
    cy.get('a').find('#Results').should('have.text', cypress.results).click()
    cy.location('pathname', { timeout: 60000 }).should('include', '/results')
  })
  let value: string
  let strings: string[]
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
    cy.get('a').find('#Results').should('have.text', cypress.results).click()
    cy.location('pathname', { timeout: 60000 }).should('include', '/results')
    cy.get('#sort-filter')
      .get('#total-items-value')
      .get('.pr-3')
      .then(($ele) => {
        value = $ele[0].innerText.split(':')[1]
      })
    cy.get('#GroupByTestItems').each(($el) => {
      cy.wrap($el)
        .children()
        .children()
        .within((el) => {
          cy.get('.border-t').then(($elements) => {
            strings = [...$elements].map(($el) => $el.innerText)
            expect(strings).to.deep.equal([...strings])
            expect(strings.length).to.deep.equal(parseInt(value))
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
    cy.get('a').find('#Results').should('have.text', cypress.results).click()
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
                cy.get('.border-t').then(($elements) => {
                  strings = [...$elements].map(($el) => $el.innerText)
                  expect(strings).to.deep.equal([...strings])
                  expect(strings.length).to.deep.equal(parseInt(value))
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
    cy.get('a').find('#Results').should('have.text', cypress.results).click()
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
                cy.get('.border-t').then(($elements) => {
                  strings = [...$elements].map(($el) => $el.innerText)
                  expect(strings).to.deep.equal([...strings])
                  expect(strings.length).to.deep.equal(parseInt(value))
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
    cy.get('a').find('#Results').should('have.text', cypress.results).click()
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
                cy.get('.border-t').then(($elements) => {
                  strings = [...$elements].map(($el) => $el.innerText)
                  expect(strings).to.deep.equal([...strings])
                  expect(strings.length).to.deep.equal(parseInt(value))
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
    cy.get('a').find('#Results').should('have.text', cypress.results).click()
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
                cy.get('.border-t').then(($elements) => {
                  strings = [...$elements].map(($el) => $el.innerText)
                  expect(strings).to.deep.equal([...strings])
                  expect(strings.length).to.deep.equal(parseInt(value))
                })
              })
          })
        }
      })
  })
})
