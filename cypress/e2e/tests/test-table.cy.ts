describe('Visiting Tests', () => {
  xit('Visiting Test Page', () => {
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

    cy.get('a').find('#Tests').should('have.text', 'Tests').click()
    cy.location('pathname', { timeout: 60000 }).should('include', '/tests')
  })

  let value: any
  let strings: any
  xit('Total Count of Test of Table', () => {
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

    cy.get('a').find('#Tests').should('have.text', 'Tests').click()
    cy.location('pathname', { timeout: 60000 }).should('include', '/tests')
    cy.get('#sort-filter')
      .get('#total-items-value')
      .get('.pr-3')
      .then(($ele) => {
        value = $ele[0].innerText.split(':')[1]
      })
    cy.get('#testList')
      .get('.border-b')
      .then(($elements) => {
        strings = [...$elements].map(($el) => $el.innerText)
        expect(strings).to.deep.equal([...strings])
        expect(strings.length).to.deep.equal(parseInt(value))
      })
  })
  it('sort by name and created date', () => {
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
    cy.get('a').find('#Tests').should('have.text', 'Tests').click()
    cy.location('pathname', { timeout: 60000 }).should('include', '/tests')
    cy.get('#headlessui-listbox-button-1 span span')
      .invoke('text')
      .then((el) => {
        if (el === 'Name') {
          cy.wait(1000)
          cy.get('.border-b')
            .get('.pr-4')
            .then(($elements) => {
              var strings = [...$elements].map(($el) => $el.innerText)

              expect(strings).to.deep.equal([...strings])
            })
        } else if (el === 'Created Date') {
          cy.wait(1000)

          cy.get('.border-b')
            .get('.pr-0')
            .then(($elements) => {
              var strings = [...$elements].map(($el) => {
                return $el.innerText
              })
              expect(strings).to.deep.equal([...strings])
            })
        }
      })
  })

  xit('By Clicking test name it should navigate to test details page', () => {
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

    cy.get('a').find('#Tests').should('have.text', 'Tests').click()
    cy.location('pathname', { timeout: 60000 }).should('include', '/tests')
    cy.get('#test-table-list')
      .get('#test-name-navigation')

      .click()
      .location('pathname', { timeout: 60000 })
      .should('include', '/tests')
  })
})
