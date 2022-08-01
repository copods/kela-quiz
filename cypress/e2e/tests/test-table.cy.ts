describe('Visiting Tests', () => {
  it('Visiting Test Page', () => {
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
  it('Total Count of Test of Table', () => {
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
  it('sort by name in ascending order ', () => {
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
        }
      })
  })
  it('sort by name in descending order ', () => {
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
    cy.get('#sort-filter-body').get('#ascend').click()
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
        }
      })
  })
  it('sort by created date in ascending order ', () => {
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
          cy.wait(1000)
          cy.get('.border-b')
            .get('.pr-4')
            .then(($elements) => {
              var strings = [...$elements].map(($el) => $el.innerText)
              expect(strings).to.deep.equal([...strings])
            })
        }
      })
  })
  it('sort by created date in descending order', () => {
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
          cy.wait(1000)
          cy.get('.border-b')
            .get('.pr-4')
            .then(($elements) => {
              var strings = [...$elements].map(($el) => $el.innerText)

              expect(strings).to.deep.equal([...strings])
            })
        }
      })
  })

  it('By Clicking test name it should navigate to test details page', () => {
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
  it('By Clicking count in sections it should open menu with all sections', () => {
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
    cy.get('#section-count-button').click()
    cy.get('#section-count-button').then((el) => {
      cy.get('.section-menu').then(($elements) => {
        var strings = [...$elements].map(($el) => {
          return $el.innerText
        })
        expect(strings).to.deep.equal([...strings])
      })
    })
  })
})
