const commonConstants = {
  test1: `Quantitative - assessment1`,
  add: 'Add',
  submit: 'Submit',
  section1: 'Quantitive - section1',
  section2: 'Quantitive - section2',
  addQuestion: 'Add Question',
  useRef: 'What is useRef() ?',
  useRefAns: 'It allows you to persist values between renders.',
  useMemo: 'What is useMemo() ?',
  useMemoAns:
    'The useMemo Hook can be used to keep expensive, resource intensive functions from needlessly running.',
  next: 'Next',
  remove: 'Remove',
}

describe('Creating new assessment', () => {
  // creating test data
  it('Adding two section', () => {
    cy.viewport(1280, 1000)
    cy.login()
    cy.customVisit('/members')
    cy.get('#sections', { timeout: 6000 }).click()
    cy.get('#add-section').click()
    cy.get('form > div').within((el) => {
      cy.get('input[placeholder="Enter Test Name*"]').type(
        commonConstants?.section1
      )
      cy.get('textarea').type('Aptitude')
      cy.get('[data-cy="submit"]').click()
    })
    cy.wait(1000)
    cy.get('#add-section').click()
    cy.get('form > div').within((el) => {
      cy.get(`input[placeholder='Enter Test Name*']`).type(
        commonConstants?.section2
      )
      cy.get('textarea').type('Aptitude')
      cy.get('[data-cy="submit"]').click()
    })
  })

  it('Add question to the first section', () => {
    cy.login()
    cy.customVisit('/members')
    cy.get('#sections', { timeout: 6000 }).should('have.text', 'Tests').click()
    cy.wait(1000)
    cy.get('.sectionName', { timeout: 6000 })
      .contains(commonConstants?.section1)
      .click()
    cy.wait(1000)
    cy.get('#add-question').click()
    cy.get('#Question').get('#dropdown-container').click()
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
    cy.get('#question-editor #quill-editor', { timeout: 6000 }).within(() => {
      cy.get('.ql-editor').type(commonConstants?.useRef)
    })
    cy.get('input[placeholder="Write your option here"]')
      .clear()
      .type(commonConstants?.useRefAns)
    cy.get('#save-and-exit').click()
  })

  it('Add questions to the second section', () => {
    cy.login()
    cy.customVisit('/members')
    cy.get('#sections', { timeout: 6000 }).click()
    cy.wait(1000)
    cy.get('.sectionName').contains(commonConstants?.section2).click()
    cy.get('#add-question')
      .should('have.text', `+ ${commonConstants?.addQuestion}`)
      .click()
    cy.get('h1', { timeout: 6000 }).should('be.visible')
    cy.get('#Question').get('#dropdown-container').click()
    cy.get('ul').within(() => {
      cy.get('li').within(() => {
        cy.get('div').then((el) => {
          ;[...el].map((el) => {
            if (el.innerText === 'Multiple Choice') {
              el.click()
            }
            return null
          })
        })
      })
    })
    cy.get('#question-editor #quill-editor', { timeout: 6000 }).within(() => {
      cy.get('.ql-editor').type(commonConstants?.useMemo)
    })
    cy.get('.ql-editor ').eq(1).clear().type(commonConstants?.useMemoAns)
    cy.get('.checkBox').eq(0).click()
    cy.get('.ql-editor ').eq(2).clear().type('secound option')
    cy.get('.ql-editor ').eq(3).clear().type('third option')
    cy.get('.ql-editor ').eq(4).clear().type('fourth option')
    cy.get('#save-and-add-more').click()
    cy.wait(2000)
    cy.get('#question-editor #quill-editor', { timeout: 6000 }).within(() => {
      cy.get('.ql-editor').type(commonConstants?.useMemo)
    })
    cy.get('.ql-editor ').eq(1).clear().type(commonConstants?.useMemoAns)
    cy.get('.checkBox').eq(0).click()
    cy.get('.ql-editor ').eq(2).clear().type('secound option')
    cy.get('.checkBox').eq(1).click()
    cy.get('.ql-editor ').eq(3).clear().type('third option')
    cy.get('.ql-editor ').eq(4).clear().type('fourth option')
    cy.get('#save-and-add-more').click()
  })

  it('creating assessment ', () => {
    cy.viewport(1280, 720)
    cy.login()
    cy.customVisit('/members')
    cy.get('#tests', { timeout: 6000 })
      .should('have.text', 'Assessments')
      .click()
    cy.get('#add-test', { timeout: 6000 }).click()
    cy.get('input[placeholder="Enter assessment name"]', { timeout: 6000 })
      .clear()
      .type(commonConstants.test1)
    cy.get('#quill-editor').within(() => {
      cy.get('.ql-editor').type(`Test Description`)
    })
    cy.get('#next-button', { timeout: 6000 }).should('be.visible')
    cy.get('#next-button').should('have.text', commonConstants?.next).click()

    // user reached to step 2
    cy.get('div#section').each((el) => {
      cy.wrap(el).within(() => {
        if (
          el.find("[data-cy='section-heading']")[0].innerText ===
            commonConstants.section1 ||
          el.find("[data-cy='section-heading']")[0].innerText ===
            commonConstants.section2
        ) {
          cy.get('button').should('have.text', commonConstants.add).click()
          cy.wait(2000)
          cy.get('button').should('have.text', commonConstants?.remove)
        }
      })
    })
    cy.get('button#next-button').click()
    cy.get('button#submit-button')
      .should('have.text', commonConstants.submit)
      .click()
  })
})
