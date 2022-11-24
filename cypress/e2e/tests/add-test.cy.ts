import {
  cypress,
  testsConstants,
  commonConstants,
} from '~/constants/common.constants'

const test1 = `Aptitude - assessment1`
const test = `Aptitude - section`
const addAssessmentPageTitle = 'Add Assessment'
const addTestPageButtons = {
  next: 'Next',
  back: 'Back',
  submit: 'Submit',
}
describe('Creating assessments', () => {
  beforeEach('sign-in', () => {
    cy.login()

    cy.customVisit('/members')
  })

  it('Visiting Add Assessment Page', () => {
    cy.get('a')
      .find('#tests')
      .should('have.text', testsConstants.assessments)
      .click()
    cy.get('#add-test', { timeout: 6000 })
      .should('have.text', `+ ${testsConstants.addAssessmentbutton}`)
      .click()
    cy.location('pathname').should('include', '/assessments/add-assessment')
  })
  it('Verify if add assessment page contains 3 tabs', () => {
    cy.get('a')
      .find('#tests')
      .should('have.text', testsConstants.assessments)
      .click()
    cy.get('#add-test', { timeout: 6000 })
      .should('have.text', `+ ${testsConstants.addAssessmentbutton}`)
      .click()
    cy.location('pathname', { timeout: 60000 }).should(
      'include',
      '/assessments/add-assessment'
    )
    cy.get('.stepsTab').each(($el) => {
      cy.wrap($el).within((el) => {
        if (
          el[0].getElementsByClassName('stepsName')[0].innerHTML ===
          cypress.step1
        ) {
          cy.get('.stepsName').should('have.text', cypress.step1)
        } else if (
          el[0].getElementsByClassName('stepsName')[0].innerHTML ===
          cypress.step2
        ) {
          cy.get('.stepsName').should('have.text', cypress.step2)
        } else if (
          el[0].getElementsByClassName('stepsName')[0].innerHTML ===
          cypress.step3
        ) {
          cy.get('.stepsName').should('have.text', cypress.step3)
        }
      })
    })
    cy.get('#0')
      .find('.text-gray-500')
      .should('have.text', cypress.assessmentDetails)
    cy.get('#1')
      .find('.text-gray-500')
      .should('have.text', cypress.selectSections)
    cy.get('#2').find('.text-gray-500').should('have.text', cypress.preview)
  })
  it('Checks add assessment page title text', () => {
    cy.get('a')
      .find('#tests')
      .should('have.text', testsConstants.assessments)
      .click()
    cy.get('#add-test', { timeout: 6000 })
      .should('have.text', `+ ${testsConstants.addAssessmentbutton}`)
      .click()
    cy.get('#add-assessment-page-title').should(
      'have.text',
      addAssessmentPageTitle
    )
  })
  it('Checks add assessment page title text font weight', () => {
    cy.get('a')
      .find('#tests')
      .should('have.text', testsConstants.assessments)
      .click()
    cy.get('#add-test', { timeout: 6000 })
      .should('have.text', `+ ${testsConstants.addAssessmentbutton}`)
      .click()
    cy.get('#add-assessment-page-title').should(
      'have.css',
      'font-weight',
      '700'
    )
  })
  it('Checks add assessment page title text font size', () => {
    cy.get('a')
      .find('#tests')
      .should('have.text', testsConstants.assessments)
      .click()
    cy.get('#add-test', { timeout: 6000 })
      .should('have.text', `+ ${testsConstants.addAssessmentbutton}`)
      .click()
    cy.get('#add-assessment-page-title').should('have.css', 'font-size', '30px')
  })
  //next button
  it('Checks next button text', () => {
    cy.get('a')
      .find('#tests')
      .should('have.text', testsConstants.assessments)
      .click()
    cy.get('#add-test', { timeout: 6000 })
      .should('have.text', `+ ${testsConstants.addAssessmentbutton}`)
      .click()
    cy.get('#next-button').should('have.text', addTestPageButtons.next)
  })
  it('Checks next button color', () => {
    cy.get('a')
      .find('#tests')
      .should('have.text', testsConstants.assessments)
      .click()
    cy.get('#add-test', { timeout: 6000 })
      .should('have.text', `+ ${testsConstants.addAssessmentbutton}`)
      .click()
    cy.get('#next-button').should('have.css', 'color', 'rgb(249, 250, 251)')
  })
  it('Checks next button font size', () => {
    cy.get('a')
      .find('#tests')
      .should('have.text', testsConstants.assessments)
      .click()
    cy.get('#add-test', { timeout: 6000 })
      .should('have.text', `+ ${testsConstants.addAssessmentbutton}`)
      .click()
    cy.get('#next-button').should('have.css', 'font-size', '12px')
  })
  it('Checks next button font-weight', () => {
    cy.get('a')
      .find('#tests')
      .should('have.text', testsConstants.assessments)
      .click()
    cy.get('#add-test', { timeout: 6000 })
      .should('have.text', `+ ${testsConstants.addAssessmentbutton}`)
      .click()
    cy.get('#next-button').should('have.css', 'font-weight', '500')
  })
  it('Checks next button background color', () => {
    cy.get('a')
      .find('#tests')
      .should('have.text', testsConstants.assessments)
      .click()
    cy.get('#add-test', { timeout: 6000 })
      .should('have.text', `+ ${testsConstants.addAssessmentbutton}`)
      .click()
    cy.get('#next-button').should(
      'have.css',
      'background-color',
      'rgb(162, 164, 214)'
    )
  })
  it('Checks next button padding', () => {
    cy.get('a')
      .find('#tests')
      .should('have.text', testsConstants.assessments)
      .click()
    cy.get('#add-test', { timeout: 6000 })
      .should('have.text', `+ ${testsConstants.addAssessmentbutton}`)
      .click()
    cy.get('#next-button').should('have.css', 'padding', '10px 28px')
  })

  // back button
  it('Checks back button text', () => {
    cy.get('a')
      .find('#tests')
      .should('have.text', testsConstants.assessments)
      .click()
    cy.get('#add-test', { timeout: 6000 })
      .should('have.text', `+ ${testsConstants.addAssessmentbutton}`)
      .click()
    cy.get('#back-button').should('have.text', addTestPageButtons.back)
  })
  it('Checks back button color', () => {
    cy.get('a')
      .find('#tests')
      .should('have.text', testsConstants.assessments)
      .click()
    cy.get('#add-test', { timeout: 6000 })
      .should('have.text', `+ ${testsConstants.addAssessmentbutton}`)
      .click()
    cy.get('#back-button').should('have.css', 'color', 'rgb(249, 250, 251)')
  })
  it('Checks back button font size', () => {
    cy.get('a')
      .find('#tests')
      .should('have.text', testsConstants.assessments)
      .click()
    cy.get('#add-test', { timeout: 6000 })
      .should('have.text', `+ ${testsConstants.addAssessmentbutton}`)
      .click()
    cy.get('#back-button').should('have.css', 'font-size', '12px')
  })
  it('Checks back button font-weight', () => {
    cy.get('a')
      .find('#tests')
      .should('have.text', testsConstants.assessments)
      .click()
    cy.get('#add-test', { timeout: 6000 })
      .should('have.text', `+ ${testsConstants.addAssessmentbutton}`)
      .click()
    cy.get('#back-button').should('have.css', 'font-weight', '500')
  })
  it('Checks back button background color', () => {
    cy.get('a')
      .find('#tests')
      .should('have.text', testsConstants.assessments)
      .click()
    cy.get('#add-test', { timeout: 6000 })
      .should('have.text', `+ ${testsConstants.addAssessmentbutton}`)
      .click()
    cy.get('#back-button').should(
      'have.css',
      'background-color',
      'rgb(162, 164, 214)'
    )
  })
  it('Checks back button padding', () => {
    cy.get('a')
      .find('#tests')
      .should('have.text', testsConstants.assessments)
      .click()
    cy.get('#add-test', { timeout: 6000 })
      .should('have.text', `+ ${testsConstants.addAssessmentbutton}`)
      .click()
    cy.get('#next-button').should('have.css', 'padding', '10px 28px')
  })

  // submit button
  it('Checks submit button text', () => {
    cy.get('a')
      .find('#tests')
      .should('have.text', testsConstants.assessments)
      .click()
    cy.get('#add-test', { timeout: 6000 })
      .should('have.text', `+ ${testsConstants.addAssessmentbutton}`)
      .click()

    cy.get('input[placeholder="Enter assessment name"]', { timeout: 6000 })
      .clear()
      .type(test)
    cy.get('#quill-editor').within(() => {
      cy.get('.ql-editor').type(`Test Description`)
    })
    cy.get('#next-button').click()
    cy.get('div#section', { timeout: 60000 }).each((el) => {
      cy.wrap(el).within(() => {
        if (el.find('.count')[0].innerText != '0') {
          cy.get('button').should('have.text', commonConstants.add).click()
          cy.get('input#no-of-qu').clear().type('1')
          cy.get('input#time').clear().type('1')
        }
      })
    })
    cy.get('#next-button').click()
    cy.get('#submit-button').should('have.text', addTestPageButtons.submit)
  })
  it('Checks submit button color', () => {
    cy.get('a')
      .find('#tests')
      .should('have.text', testsConstants.assessments)
      .click()
    cy.get('#add-test', { timeout: 6000 })
      .should('have.text', `+ ${testsConstants.addAssessmentbutton}`)
      .click()

    cy.get('input[placeholder="Enter assessment name"]', { timeout: 6000 })
      .clear()
      .type(test)
    cy.get('#quill-editor').within(() => {
      cy.get('.ql-editor').type(`Test Description`)
    })
    cy.get('#next-button').click()
    cy.get('div#section', { timeout: 60000 }).each((el) => {
      cy.wrap(el).within(() => {
        if (el.find('.count')[0].innerText != '0') {
          cy.get('button').should('have.text', commonConstants.add).click()
          cy.get('input#no-of-qu').clear().type('1')
          cy.get('input#time').clear().type('1')
        }
      })
    })
    cy.get('#next-button').click()
    cy.get('#submit-button').should('have.css', 'color', 'rgb(249, 250, 251)')
  })
  it('Checks submit button font size', () => {
    cy.get('a')
      .find('#tests')
      .should('have.text', testsConstants.assessments)
      .click()
    cy.get('#add-test', { timeout: 6000 })
      .should('have.text', `+ ${testsConstants.addAssessmentbutton}`)
      .click()
    cy.get('input[placeholder="Enter assessment name"]', { timeout: 6000 })
      .clear()
      .type(test)
    cy.get('#quill-editor').within(() => {
      cy.get('.ql-editor').type(`Test Description`)
    })
    cy.get('#next-button').click()
    cy.get('div#section', { timeout: 60000 }).each((el) => {
      cy.wrap(el).within(() => {
        if (el.find('.count')[0].innerText != '0') {
          cy.get('button').should('have.text', commonConstants.add).click()
          cy.get('input#no-of-qu').clear().type('1')
          cy.get('input#time').clear().type('1')
        }
      })
    })
    cy.get('#next-button').click()
    cy.get('#submit-button').should('have.css', 'font-size', '12px')
  })
  it('Checks submit button font-weight', () => {
    cy.get('a')
      .find('#tests')
      .should('have.text', testsConstants.assessments)
      .click()
    cy.get('#add-test', { timeout: 6000 })
      .should('have.text', `+ ${testsConstants.addAssessmentbutton}`)
      .click()
    cy.get('input[placeholder="Enter assessment name"]', { timeout: 6000 })
      .clear()
      .type(test)
    cy.get('#quill-editor').within(() => {
      cy.get('.ql-editor').type(`Test Description`)
    })
    cy.get('#next-button').click()
    cy.get('div#section', { timeout: 60000 }).each((el) => {
      cy.wrap(el).within(() => {
        if (el.find('.count')[0].innerText != '0') {
          cy.get('button').should('have.text', commonConstants.add).click()
          cy.get('input#no-of-qu').clear().type('1')
          cy.get('input#time').clear().type('1')
        }
      })
    })
    cy.get('#next-button').click()
    cy.get('#submit-button').should('have.css', 'font-weight', '500')
  })
  it('Checks submit button background color', () => {
    cy.get('a')
      .find('#tests')
      .should('have.text', testsConstants.assessments)
      .click()
    cy.get('#add-test', { timeout: 6000 })
      .should('have.text', `+ ${testsConstants.addAssessmentbutton}`)
      .click()
    cy.get('input[placeholder="Enter assessment name"]', { timeout: 6000 })
      .clear()
      .type(test)
    cy.get('#quill-editor').within(() => {
      cy.get('.ql-editor').type(`Test Description`)
    })
    cy.get('#next-button').click()
    cy.get('div#section', { timeout: 60000 }).each((el) => {
      cy.wrap(el).within(() => {
        if (el.find('.count')[0].innerText != '0') {
          cy.get('button').should('have.text', commonConstants.add).click()
          cy.get('input#no-of-qu').clear().type('1')
          cy.get('input#time').clear().type('1')
        }
      })
    })
    cy.get('#next-button').click()
    cy.get('#submit-button').should(
      'have.css',
      'background-color',
      'rgb(53, 57, 136)'
    )
  })
  it('Checks submit button padding', () => {
    cy.get('a')
      .find('#tests')
      .should('have.text', testsConstants.assessments)
      .click()
    cy.get('#add-test', { timeout: 6000 })
      .should('have.text', `+ ${testsConstants.addAssessmentbutton}`)
      .click()
    cy.get('input[placeholder="Enter assessment name"]', { timeout: 6000 })
      .clear()
      .type(test)
    cy.get('#quill-editor').within(() => {
      cy.get('.ql-editor').type(`Test Description`)
    })
    cy.get('#next-button').click()
    cy.get('div#section', { timeout: 60000 }).each((el) => {
      cy.wrap(el).within(() => {
        if (el.find('.count')[0].innerText != '0') {
          cy.get('button').should('have.text', commonConstants.add).click()
          cy.get('input#no-of-qu').clear().type('1')
          cy.get('input#time').clear().type('1')
        }
      })
    })
    cy.get('#next-button').click()
    cy.get('#submit-button').should('have.css', 'padding', '10px 28px')
  })
  it('Verify if next button is disabled if user do not provide name and description', () => {
    cy.get('a')
      .find('#tests')
      .should('have.text', testsConstants.assessments)
      .click()
    cy.get('#add-test', { timeout: 6000 })
      .should('have.text', `+ ${testsConstants.addAssessmentbutton}`)
      .click()
    cy.location('pathname', { timeout: 60000 }).should(
      'include',
      '/assessments/add-assessment'
    )
    cy.get('button#next-button')
      .should('have.text', 'Next')
      .should('have.disabled', true)
  })
  it('Verify if user able to navigate to Step 2 by clicking next button if user provide name and description', () => {
    cy.get('a')
      .find('#tests')
      .should('have.text', testsConstants.assessments)
      .click()
    cy.get('#add-test', { timeout: 6000 })
      .should('have.text', `+ ${testsConstants.addAssessmentbutton}`)
      .click()
    cy.location('pathname', { timeout: 60000 }).should(
      'include',
      '/assessments/add-assessment'
    )
    cy.get('input[placeholder="Enter assessment name"]', { timeout: 6000 })
      .clear()
      .type(test)
    cy.get('#quill-editor').within(() => {
      cy.get('.ql-editor').type(`Test Description`)
    })

    cy.get('button#next-button').should('have.text', cypress.next).click()
    cy.get('.stepsTab').each(($el) => {
      cy.wrap($el).within((el) => {
        if (
          el[0].getElementsByClassName('stepsName')[0].innerHTML ===
          cypress.step1
        ) {
          cy.get('.stepsName').should('have.text', cypress.step1)
        } else if (
          el[0].getElementsByClassName('stepsName')[0].innerHTML ===
          cypress.step2
        ) {
          cy.get('.stepsName').should('have.text', cypress.step2)
        }
      })
    })
  })

  it('Verify on clicking back button on step 2 user navigate back to step 2', () => {
    cy.get('a')
      .find('#tests')
      .should('have.text', testsConstants.assessments)
      .click()
    cy.get('#add-test', { timeout: 6000 })
      .should('have.text', `+ ${testsConstants.addAssessmentbutton}`)
      .click()
    cy.location('pathname').should('include', '/assessments/add-assessment')
    cy.get('input[placeholder="Enter assessment name"]', { timeout: 6000 })
      .clear()
      .type(test)
    cy.get('#quill-editor').within(() => {
      cy.get('.ql-editor').type(`Test Description`)
    })
    cy.get('.stepsTab').each(($el) => {
      cy.wrap($el).within((el) => {
        if (
          el[0].getElementsByClassName('stepsName')[0].innerHTML ===
          cypress.step2
        ) {
          cy.get('.stepsName').should('have.text', cypress.step2).click()
        }
      })
    })
    cy.get('button#back-button').should('have.text', cypress.back).click()
  })

  it('Verify if user able to add section and able to input total questions and time', () => {
    cy.get('a')
      .find('#tests')
      .should('have.text', testsConstants.assessments)
      .click()
    cy.get('#add-test', { timeout: 6000 })
      .should('have.text', `+ ${testsConstants.addAssessmentbutton}`)
      .click()
    cy.location('pathname', { timeout: 60000 }).should(
      'include',
      '/assessments/add-assessment'
    )
    cy.get('input[placeholder="Enter assessment name"]', { timeout: 6000 })
      .clear()
      .type(test)
    cy.get('#quill-editor').within(() => {
      cy.get('.ql-editor').type(`Test Description`)
    })
    cy.get('button#next-button').should('have.text', cypress.next).click()
    cy.get('.stepsTab').each(($el) => {
      cy.wrap($el).within((el) => {
        if (
          el[0].getElementsByClassName('stepsName')[0].innerHTML ===
          cypress.step2
        ) {
          cy.get('.stepsName').should('have.text', cypress.step2).click()
        }
      })
    })
    // user reached to step 2

    cy.get('div#section', { timeout: 60000 }).each((el) => {
      cy.wrap(el).within(() => {
        if (el.find('.count')[0].innerText != '0') {
          cy.get('input#no-of-qu').should('have.disabled', true)
          cy.get('input#time').should('have.disabled', true)
          cy.get('button').should('have.text', commonConstants.add).click()
          cy.get('button').should('have.text', cypress.remove)
          cy.get('input#no-of-qu').clear().type('1')
          cy.get('input#time').clear().type('1')
          cy.get('input#no-of-qu').should('have.value', '1')
          cy.get('input#time').should('have.value', '1')
        }
      })
    })
  })

  it('Verify if user able to remove added section and able to input total questions and time', () => {
    cy.get('a')
      .find('#tests')
      .should('have.text', testsConstants.assessments)
      .click()
    cy.get('#add-test', { timeout: 6000 })
      .should('have.text', `+ ${testsConstants.addAssessmentbutton}`)
      .click()
    cy.location('pathname', { timeout: 60000 }).should(
      'include',
      '/assessments/add-assessment'
    )
    cy.get('input[placeholder="Enter assessment name"]', { timeout: 6000 })
      .clear()
      .type(test)
    cy.get('#quill-editor').within(() => {
      cy.get('.ql-editor').type(`Test Description`)
    })
    cy.get('button#next-button').should('have.text', cypress.next).click()

    // user reached to step 2

    cy.get('div#section', { timeout: 60000 }).each((el) => {
      cy.wrap(el).within(() => {
        if (el.find('.count')[0].innerText != '0') {
          cy.get('input#no-of-qu').should('have.disabled', true)
          cy.get('input#time').should('have.disabled', true)
          cy.get('button').should('have.text', commonConstants.add).click()
          cy.get('button').should('have.text', cypress.remove)
          cy.get('input#no-of-qu').clear().type('1')
          cy.get('input#time').clear().type('1')
          cy.get('input#no-of-qu').should('have.value', '1')
          cy.get('input#time').should('have.value', '1')
        }
      })
    })
  })

  it('Verify if user able to move to preview tab after selecting sections', () => {
    cy.get('a')
      .find('#tests')
      .should('have.text', testsConstants.assessments)
      .click()
    cy.get('#add-test', { timeout: 6000 })
      .should('have.text', `+ ${testsConstants.addAssessmentbutton}`)
      .click()
    cy.location('pathname', { timeout: 60000 }).should(
      'include',
      '/assessments/add-assessment'
    )
    cy.get('input[placeholder="Enter assessment name"]', { timeout: 6000 })
      .clear()
      .type(test)
    cy.get('#quill-editor').within(() => {
      cy.get('.ql-editor').type(`Test Description`)
    })

    cy.get('button#next-button').should('have.text', cypress.next).click()

    // user reached to step 2

    cy.get('div#section', { timeout: 60000 }).each((el) => {
      cy.wrap(el).within(() => {
        if (el.find('.count')[0].innerText != '0') {
          cy.get('input#no-of-qu').should('have.disabled', true)
          cy.get('input#time').should('have.disabled', true)
          cy.get('button').should('have.text', commonConstants.add).click()
          cy.get('button').should('have.text', cypress.remove)
          cy.get('input#no-of-qu').clear().type('1')
          cy.get('input#time').clear().type('1')
          cy.get('input#no-of-qu').should('have.value', '1')
          cy.get('input#time').should('have.value', '1')
        }
      })
    })
    cy.get('button#next-button').should('have.text', cypress.next).click()
    cy.get('.stepsTab').each(($el) => {
      cy.wrap($el).within((el) => {
        if (
          el[0].getElementsByClassName('stepsName')[0].innerHTML ===
          cypress.step1
        ) {
          cy.get('.stepsName').should('have.text', cypress.step1)
        } else if (
          el[0].getElementsByClassName('stepsName')[0].innerHTML ===
          cypress.step2
        ) {
          cy.get('.stepsName').should('have.text', cypress.step2)
        } else if (
          el[0].getElementsByClassName('stepsName')[0].innerHTML ===
          cypress.step3
        ) {
          cy.get('.stepsName').should('have.text', cypress.step3)
        }
      })
    })
  })

  it('Verify if user is able to create a assessment and navigates to Tests Page where can see added test', () => {
    cy.get('a')
      .find('#tests')
      .should('have.text', testsConstants.assessments)
      .click()
    cy.location('pathname', { timeout: 60000 }).should(
      'include',
      '/assessments'
    )
    cy.get('#sort-filter-body').get('#descend', { timeout: 8000 }).click()

    cy.get('.test-table-list', { timeout: 6000 }).each(($el) => {
      cy.wrap($el).within((el) => {
        if (
          el[0].getElementsByClassName('test-name-navigation')[0].innerHTML ===
          test1
        ) {
          cy.get('.test-name-navigation').should('have.text', test1)
        }
      })
    })
  })
})
