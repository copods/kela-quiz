describe('Test for Candidate assessment Registration', () => {
  const emailId = Math.random()
  let examLink = ''
  it('Check candidate is in correct exam link', () => {
    cy.viewport(1280, 720)
    cy.login()
    cy.customVisit('/members')
    cy.get('#group-by-tests').click()
    cy.get('a').find('#tests').click()
    cy.get('#invite-popup-open0').click()
    cy.get('.inviteInput').type(`ki${emailId}@copds.co`)
    cy.get('[data-cy="submit"]').click()
    cy.get('#group-by-tests').click()
    cy.get('.groupByItemTest').eq(0).click()
    cy.get('#vertical-icon', { timeout: 8000 }).click()
    cy.get('[data-cy="copy-link"]').should('be.visible').click()
    cy.window()
      .its('navigator.clipboard')
      .invoke('readText')
      .then((text) => {
        examLink = text
        cy.visit(text)
      })
  })

  it('Checks, register heading should be visible', () => {
    cy.visit(examLink)
    cy.get('h1').should('be.visible')
  })

  it('Checks, First and Last Name field of the page and button should be disable', () => {
    cy.visit(examLink)
    cy.get('#firstName')
      .should('be.visible')
      .should('have.attr', 'placeholder', 'Enter first name')

    cy.get('#lastName')
      .should('be.visible')
      .should('have.attr', 'placeholder', 'Enter last name')

    cy.get("[data-cy='submit-button']").should('be.disabled')
  })

  it('Checks, button color when it is disabled', () => {
    cy.visit(examLink)
    cy.get("[data-cy='submit-button']").should(
      'have.css',
      'background-color',
      'rgb(162, 164, 214)'
    )
  })

  it('Checks, first name is empty button should be disabled', () => {
    cy.visit(examLink)
    cy.get('#firstName').should('be.visible').should('be.empty')
    cy.get('#lastName').should('be.visible').type('jain')
    cy.get("[data-cy='submit-button']").should('be.disabled')
  })

  it('Checks, last name is empty submit buttom should be disabled', () => {
    cy.visit(examLink)
    cy.get('#firstName').should('be.visible').type('ayushi')
    cy.get('#lastName').should('be.visible').should('be.empty')
    cy.get("[data-cy='submit-button']").should('be.disabled')
  })

  it('Checks, submitting the registeration form', () => {
    cy.visit(examLink)
    cy.get('#firstName').type('aa')
    cy.get('#lastName').type('Jain')
    cy.get("[data-cy='submit-button']")
      .should('be.visible')
      .should('have.css', 'background-color', 'rgb(53, 57, 136)')
      .click()
    cy.url().should('eq', `${examLink}/com`)
  })
})
