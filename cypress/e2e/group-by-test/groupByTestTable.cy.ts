describe('Test for GroupByTestTable, Result', () => {
  it('Test for Routing and Active Tab for Results', () => {
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
    cy.get('a').find('#Results').should('have.text', 'Results').click()
    cy.location('pathname', { timeout: 60000 }).should('include', '/results')
  })
  let time = new Date().getTime()
  it('Create Section and  test', () => {
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
    cy.get('#addQuestion').should('have.text', '+ Add Question').click()
    cy.location('pathname', { timeout: 60000 }).should(
      'include',
      '/add-question'
    )
    cy.get('h1', { timeout: 2000 }).should('be.visible')
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
    cy.get('a').find('#Tests').should('have.text', 'Tests').click()
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
    cy.get('button#nextButton').should('have.text', 'Next').click()
    cy.get('#0').find('hr').should('have.class', 'bg-primary')
    cy.get('#1').find('hr').should('have.class', 'bg-primary')
    cy.get('#2').find('hr').should('have.class', 'bg-primary')
    cy.get('button#submitButton').should('have.text', 'Submit').click()
    cy.location('pathname', { timeout: 60000 }).should('include', '/tests')
    cy.get('a').find('#Results').should('have.text', 'Results').click()
    cy.location('pathname', { timeout: 60000 }).should('include', '/results')
  })
  let value: any
  let strings: any
  it('Total Count of Test of groupByTable', () => {
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
    cy.get('a').find('#Results').should('have.text', 'Results').click()
    cy.location('pathname', { timeout: 60000 }).should('include', '/results')
    cy.get('#sort-filter')
      .get('#total-items-value')
      .get('.pr-3')
      .then(($ele) => {
        value = $ele[0].innerText.split(':')[1]
      })
    cy.get('#GroupByTestItems')
      .get('.border-t')
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
    cy.get('a').find('#Results').should('have.text', 'Results').click()
    cy.location('pathname', { timeout: 60000 }).should('include', '/results')
    cy.get('#headlessui-listbox-button-1 span span')
      .invoke('text')
      .then((el) => {
        if (el === 'Name') {
          cy.get('.border-t')
            .get('.text-primary')
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
    cy.get('a').find('#Results').should('have.text', 'Results').click()
    cy.location('pathname', { timeout: 60000 }).should('include', '/results')
    cy.get('#sort-filter-body').get('#ascend').click()
    cy.get('#headlessui-listbox-button-1 span span')
      .invoke('text')
      .then((el) => {
        if (el === 'Name') {
          cy.get('.border-t')
            .get('.text-primary')
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
    cy.get('a').find('#Results').should('have.text', 'Results').click()
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
          cy.get('.border-t')
            .get('.text-primary')
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
    cy.get('a').find('#Results').should('have.text', 'Results').click()
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
          cy.get('.border-t')
            .get('.text-primary')
            .then(($elements) => {
              var strings = [...$elements].map(($el) => $el.innerText)

              expect(strings).to.deep.equal([...strings])
            })
        }
      })
  })
})
