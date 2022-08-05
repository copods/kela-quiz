/// <reference types="Cypress">
describe('Test for Section', () => {
  it('Visit Section page', () => {
    cy.visit('/sign-in')
    cy.get('#email')
      .clear()
      .type('careers@copods.co')
      .should('have.value', 'careers@copods.co')
    cy.get('#password')
      .clear()
      .type('kQuiz@copods')
      .should('have.value', 'kQuiz@copods')
    cy.findByRole('button').click()
    cy.get('a').find('#Sections').should('have.text', 'Sections').click()
    cy.location('pathname', { timeout: 60000 }).should('include', '/sections')
  })

  it('Create Section', () => {
    cy.visit('/sign-in')
    cy.get('#email')
      .clear()
      .type('careers@copods.co')
      .should('have.value', 'careers@copods.co')
    cy.get('#password')
      .clear()
      .type('kQuiz@copods')
      .should('have.value', 'kQuiz@copods')
    cy.findByRole('button').click()

    cy.get('a').find('#Sections').should('have.text', 'Sections').click()
    cy.location('pathname', { timeout: 60000 }).should('include', '/sections')
    cy.get('#add-section').click()
    const sectionName = `Aptitude - ${new Date().getTime()}`
    cy.get('form > div', { timeout: 10000 })
      .should('be.visible')
      .within((el) => {
        cy.get('input').type(sectionName)
        cy.get('textarea').type('Aptitude')
        cy.get("button[type='submit']", { timeout: 10000 }).click()
      })
  })

  it('cancel Add section', () => {
    cy.visit('/sign-in')
    cy.get('#email')
      .clear()
      .type('careers@copods.co')
      .should('have.value', 'careers@copods.co')
    cy.get('#password')
      .clear()
      .type('kQuiz@copods')
      .should('have.value', 'kQuiz@copods')
    cy.findByRole('button').click()
    cy.get('a').find('#Sections').should('have.text', 'Sections').click()
    cy.location('pathname', { timeout: 60000 }).should('include', '/sections')
    cy.get('#add-section').click()
    cy.get('form > div', { timeout: 10000 })
      .should('be.visible')
      .within(() => {
        cy.get("button[type='button']", { timeout: 10000 }).click()
      })
  })

  it('Check Active State of Section', () => {
    cy.visit('/sign-in')
    cy.get('#email')
      .clear()
      .type('careers@copods.co')
      .should('have.value', 'careers@copods.co')
    cy.get('#password')
      .clear()
      .type('kQuiz@copods')
      .should('have.value', 'kQuiz@copods')
    cy.findByRole('button').click()
    cy.get('a').find('#Sections').should('have.text', 'Sections').click()
    cy.location().then((loc) => {
      cy.location('search').should('include', loc.search)
    })
  })

  it('SortBy Name or created Date', () => {
    cy.visit('/sign-in')
    cy.get('#email')
      .clear()
      .type('careers@copods.co')
      .should('have.value', 'careers@copods.co')
    cy.get('#password')
      .clear()
      .type('kQuiz@copods')
      .should('have.value', 'kQuiz@copods')
    cy.findByRole('button').click()
    cy.get('a').find('#Sections').should('have.text', 'Sections').click()
    cy.location().then((loc) => {
      cy.location('search').should('include', loc.search)
    })
    cy.get('.w-96').within(() => {
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
