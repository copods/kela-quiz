describe('Test for Section Details', () => {
  it('login and redirect to section page', () => {
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
  })

  let time = new Date().getTime()

  it('Visiting Add Question Page', () => {
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
    cy.get('.px-5').click()
    cy.get('.addSectionDilog', { timeout: 10000 }).should('be.visible')
    cy.get('input#sectionName').type(`Aptitude - ${time}`)
    cy.get('textarea#sectionDescription').type(`Aptitude - ${time} Description`)
    cy.get('button#submitButton').should('have.text', 'Add').click()
    cy.get('#section-card').first().click()
    cy.get('#addQuestion').click()
    cy.location('pathname', { timeout: 60000 }).should(
      'include',
      '/add-question'
    )
  })
  it('Visiting Sections after Reaching Add Question Page', () => {
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

    cy.get('#section-cards').each((item) => {
      cy.contains(`Aptitude - ${time}`).click()
    })
  })
  // it('Visiting Sections after Reaching Add Question Page', () => {
  //   cy.visit('/sign-in')
  //   cy.get('#email')
  //     .clear()
  //     .type('careers@copods.co')
  //     .should('have.value', 'careers@copods.co')
  //   cy.get('#password')
  //     .clear()
  //     .type('kQuiz@copods')
  //     .should('have.value', 'kQuiz@copods')
  //   cy.findByRole('button').click()

  //   cy.get('a').find('#Sections').should('have.text', 'Sections').click()
  //   cy.location('pathname', { timeout: 60000 }).should('include', '/sections')

  //   cy.get('#section-cards').each((item) => {
  //     cy.contains(`Aptitude - ${time}`)
  //       .contains('#sectionDate')

  //   })
  // })
})
