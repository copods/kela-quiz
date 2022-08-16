describe('Visiting group by test of results page', () => {
  // creating data to test Test list page

  xit('Create Section', () => {
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
    cy.wait(1600)
    cy.get('#section-card').click()
    cy.get('#add-section').click()
    const secondSectionName = `Aptitude - ${new Date().getTime()}`
    cy.get('form > div', { timeout: 10000 })
      .should('be.visible')
      .within((el) => {
        cy.get('input').type(secondSectionName)
        cy.get('textarea').type('Aptitude')
        cy.get("button[type='submit']", { timeout: 10000 }).click()
      })
  })

  xit('Verify if user able create the test and navigate to group test results page', () => {
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
  it('Check if that test is coming on group by test page or not', () => {
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

    cy.get('a')
      .find('#Group_By_Tests', { timeout: 6000 })
      .should('have.text', 'Group By Tests')
      .click()
    cy.location('pathname', { timeout: 60000 }).should('include', '/results')
  })
  it('Check  that if list of candidate is coming after clicking a test in group byt test in results page ', () => {
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

    cy.get('a')
      .find('#Group_By_Tests', { timeout: 6000 })
      .should('have.text', 'Group By Tests')
      .click()
    cy.location('pathname', { timeout: 60000 }).should('include', '/results')
    cy.get('#group-by-test-container')
      .get('#group-by-items-container')
      .get('#group-by-item-test')
      .click()
  })
  it('Check  that if list of attended candidate is coming after clicking a test in group byt test in results page ', () => {
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

    cy.get('a')
      .find('#Group_By_Tests', { timeout: 6000 })
      .should('have.text', 'Group By Tests')
      .click()
    cy.location('pathname', { timeout: 60000 }).should('include', '/results')
    cy.get('#group-by-test-container')
      .get('#group-by-items-container')
      .get('#group-by-item-test')
      .click()
    cy.get('#results-test-candidate-list-tab')
      .get('#tab-title')
      .invoke('text')
      .then((el) => {
        if (el === 'attending') {
          console.log(el, 'el')
        }
      })
  })
})
