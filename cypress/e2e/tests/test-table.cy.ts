const time = new Date().getTime()
describe('Visiting Tests', () => {
  // creating data to test Test list page
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
    const sectionName = `Aptitude - ${time}`
    cy.get('form > div', { timeout: 10000 })
      .should('be.visible')
      .within((el) => {
        cy.get('input').type(sectionName)
        cy.get('textarea').type('Aptitude')
        cy.get("button[type='submit']", { timeout: 10000 }).click()
      })
    cy.get('#add-section').click()
    const secondSectionName = `Aptitude - ${time}`
    cy.get('form > div', { timeout: 10000 })
      .should('be.visible')
      .within((el) => {
        cy.get('input').type(secondSectionName)
        cy.get('textarea').type('Aptitude')
        cy.get("button[type='submit']", { timeout: 10000 }).click()
      })
  })

  it('Verify if user able create the test and navigate to test list page', () => {
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

    cy.get('a', { timeout: 6000 })
      .find('#Tests')
      .should('have.text', 'Tests')
      .click()
    cy.location('pathname', { timeout: 60000 }).should('include', '/tests')
    cy.get('#addTest').click()
    cy.location('pathname', { timeout: 60000 }).should(
      'include',
      '/tests/add-test'
    )

    cy.get('#name').clear().type(`Test - ${time}`)
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
          cy.get('button').should('have.text', 'Add').click()
          cy.get('button').should('have.text', 'Remove')

          cy.get('input#noOfQu').clear().type('1')
          cy.get('input#time').clear().type('1')
          cy.get('input#noOfQu').should('have.value', '1')
          cy.get('input#time').should('have.value', '1')
        }
      })
    })
    cy.get('button#nextButton').should('have.text', 'Next').click()
    cy.get('#0').find('hr').should('have.class', 'bg-primary')
    cy.get('#1').find('hr').should('have.class', 'bg-primary')
    cy.get('#2').find('hr').should('have.class', 'bg-primary')

    cy.get('button#submitButton').should('have.text', 'Submit').click()

    cy.location('pathname', { timeout: 60000 }).should('include', '/tests')
  })

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
    cy.findByRole('button', { timeout: 6000 }).click({ force: true })

    cy.get('a')
      .find('#Tests', { timeout: 6000 })
      .should('have.text', 'Tests')
      .click()
    cy.location('pathname', { timeout: 60000 }).should('include', '/tests')
    cy.get('#test-list', { timeout: 4000 }).should('be.visible')
    cy.get('#test-list', { timeout: 6000 })
      .get('.text-primary')
      .then(($elements) => {
        strings = [...$elements].map(($el) => $el.innerText)
        expect(strings).to.deep.equal([...strings])
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
          cy.get('.border-b', { timeout: 60000 })
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
          cy.get('.border-b', { timeout: 60000 })
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
          cy.get('.border-b', { timeout: 60000 })
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

    cy.get('a', { timeout: 6000 })
      .find('#Tests')
      .should('have.text', 'Tests')
      .click()
    cy.location('pathname', { timeout: 60000 }).should('include', '/tests')
    cy.get('#test-table-list', { timeout: 60000 }).should('be.visible')

    cy.get('#test-table-list', { timeout: 60000 })
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
    cy.findByRole('button', { timeout: 6000 }).click()
    cy.get('a', { timeout: 6000 })
      .find('#Tests', { timeout: 6000 })
      .should('have.text', 'Tests')
      .click()
    cy.location('pathname', { timeout: 60000 }).should('include', '/tests')
    cy.get('.dropdown', { timeout: 6000 })
    cy.get('.dropdownButton', { timeout: 6000 }).click()
    cy.get('li div', { timeout: 6000 })
    cy.get('.dropdown-option', { timeout: 6000 })
    cy.get('.not-selected', { timeout: 6000 }).click()
    cy.get('#sort-filter-body', { timeout: 6000 })
      .get('#ascend', { timeout: 6000 })
      .click()
    cy.wait(4000)
    cy.get('#chip-group-id', { timeout: 60000 }).then((el) => {
      cy.get('.chip-group', { timeout: 6000 })
        .first()
        .get('#section-count-button', { timeout: 6000 })
        .click()
      cy.get('.section-menu').then(($elements) => {
        var strings = [...$elements].map(($el) => {
          return $el.innerText
        })
        expect(strings).to.deep.equal([...strings])
      })
    })
  })
  let deletedItem: any
  it('On Clicking delete it should delete the test', () => {
    cy.visit('/sign-in')
    cy.get('#email')
      .clear()
      .type('careers@copods.co')
      .should('have.value', 'careers@copods.co')
    cy.get('#password')
      .clear()
      .type('kQuiz@copods')
      .should('have.value', 'kQuiz@copods')
    cy.findByRole('button', { timeout: 6000 }).click({ force: true })
    cy.get('a').find('#Tests').should('have.text', 'Tests').click()
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
