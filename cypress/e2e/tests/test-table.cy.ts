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
    const sectionName = `Aptitude - ${new Date().getTime()}`
    cy.get('form > div', { timeout: 10000 })
      .should('be.visible')
      .within((el) => {
        cy.get('input').type(sectionName)
        cy.get('textarea').type('Aptitude')
        cy.get("button[type='submit']", { timeout: 10000 }).click()
      })
    cy.get('.border-l-8')
      .find('h2')
      .invoke('text')
      .should((someValue) => {
        expect(someValue).to.deep.equal(sectionName)
      })
    cy.get('#add-section').click()
    const secondSectionName = `Aptitude - ${new Date().getTime()}`
    cy.get('form > div', { timeout: 10000 })
      .should('be.visible')
      .within((el) => {
        cy.get('input').type(secondSectionName)
        cy.get('textarea').type('Aptitude')
        cy.get("button[type='submit']", { timeout: 10000 }).click()
      })
    cy.wait(1600)
    cy.get('.border-l-8')
      .find('h2')
      .invoke('text')
      .should((someValue) => {
        expect(someValue).to.deep.equal(secondSectionName)
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

    cy.get('a').find('#Tests').should('have.text', 'Tests').click()
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

    cy.get('button#nextButton').should('have.text', 'Next').click()
    cy.get('#0').find('hr').should('have.class', 'bg-primary')
    cy.get('#1').find('hr').should('have.class', 'bg-primary')
    // user reached to step 2

    cy.get('div#section')
      .first()
      .within(() => {
        cy.get('input#noOfQu').should('have.disabled', true)
        cy.get('input#time').should('have.disabled', true)
        cy.get('button').should('have.text', 'Add').click()
        cy.get('button').should('have.text', 'Remove')

        cy.get('input#noOfQu').clear().type('2')
        cy.get('input#time').clear().type('2')
      })
    cy.get('div#section')
      .last()
      .within(() => {
        cy.get('input#noOfQu').should('have.disabled', true)
        cy.get('input#time').should('have.disabled', true)
        cy.get('button').should('have.text', 'Add').click()
        cy.get('button').should('have.text', 'Remove')

        cy.get('input#noOfQu').clear().type('2')
        cy.get('input#time').clear().type('2')
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
    cy.get('#chip-group-id')
      .get('.chip-group')
      .get('#section-count-button')
      .click()
    cy.get('#chip-group-id')
      .get('.chip-group')
      .get('#section-count-button')
      .then((el) => {
        cy.get('.section-menu').then(($elements) => {
          var strings = [...$elements].map(($el) => {
            return $el.innerText
          })
          expect(strings).to.deep.equal([...strings])
        })
      })
  })
})
