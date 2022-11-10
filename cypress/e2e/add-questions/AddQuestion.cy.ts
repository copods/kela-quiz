import { cypress, addQuestion, routeFiles } from '~/constants/common.constants'
import { routes } from '~/constants/route.constants'
const section1 = `Aptitude - section1`

describe('Test for section-details', () => {
  beforeEach('sign-in', () => {
    cy.login()

    cy.customVisit('/sections')
  })

  it('Verifying MCQ to have Check Box in options', () => {
    cy.get('a')
      .find('#sections')
      .should('have.text', routeFiles.sections)
      .click()
    cy.location('pathname', { timeout: 60000 }).should(
      'include',
      routes.sections
    )
    cy.get('#section-card', { timeout: 8000 }).each(($el) => {
      cy.wrap($el).within((el) => {
        if (
          el[0].getElementsByClassName('sectionName')[0].innerHTML === section1
        ) {
          cy.get('.sectionName').should('have.text', section1).click()
          cy.get('#add-question')
            .should('have.text', `+ ${addQuestion.addQuestion}`)
            .click()
          cy.location('pathname', { timeout: 60000 }).should(
            'include',
            routes.addQuestion
          )
          cy.get('h1', { timeout: 6000 }).should('be.visible')
          cy.get('#Question').get('#dropdown-container').click()
          let flag = ''
          cy.get('ul[role="listbox"]').within(() => {
            cy.get('li').within(() => {
              cy.get('div').then((el) => {
                ;[...el].map((el) => {
                  if (el.innerText === 'Multiple Choice') {
                    flag = 'CheckBox'
                    el.click()
                  } else if (el.innerText === 'Single Choice') {
                    flag = 'RadioButton'
                  } else if (el.innerText === 'Text') {
                    flag = 'TextArea'
                  }
                  return null
                })
              })
            })
          })
          if (flag === 'CheckBox') {
            cy.get('input[type="checkbox"]').should('have.class', 'checkBox')
          }
        }
      })
    })
  })

  it('Verifying Single Choice to have Radio Button in options', () => {
    cy.get('a')
      .find('#sections')
      .should('have.text', routeFiles.sections)
      .click()
    cy.location('pathname', { timeout: 60000 }).should('include', '/sections')
    cy.get('#section-card', { timeout: 8000 }).each(($el) => {
      cy.wrap($el).within((el) => {
        if (
          el[0].getElementsByClassName('sectionName')[0].innerHTML === section1
        ) {
          cy.get('.sectionName').should('have.text', section1).click()
          cy.get('#add-question')
            .should('have.text', `+ ${addQuestion.addQuestion}`)
            .click()
          cy.location('pathname', { timeout: 60000 }).should(
            'include',
            '/add-question'
          )
          cy.get('h1', { timeout: 6000 }).should('be.visible')
          cy.get('#Question').get('#dropdown-container').click()
          let flag = ''
          cy.get('ul').within(() => {
            cy.get('li').within(() => {
              cy.get('div').then((el) => {
                ;[...el].map((el) => {
                  if (el.innerText === 'Multiple Choice') {
                    flag = 'CheckBox'
                  } else if (el.innerText === 'Single Choice') {
                    flag = 'RadioButton'
                    el.click()
                  } else if (el.innerText === 'Text') {
                    flag = 'TextArea'
                  }
                  return null
                })
              })
            })
          })
          if (flag === 'RadioButton') {
            cy.get('input').should('have.class', 'radioButton')
          }
        }
      })
    })
  })

  it('Verifying Text to have Textarea in options', () => {
    cy.get('a')
      .find('#sections')
      .should('have.text', routeFiles.sections)
      .click()
    cy.location('pathname', { timeout: 60000 }).should('include', '/sections')
    cy.get('#section-card', { timeout: 10000 }).each(($el) => {
      cy.wrap($el).within((el) => {
        if (
          el[0].getElementsByClassName('sectionName')[0].innerHTML === section1
        ) {
          cy.get('.sectionName').should('have.text', section1).click()
          cy.get('#add-question')
            .should('have.text', `+ ${addQuestion.addQuestion}`)
            .click()
          cy.location('pathname', { timeout: 60000 }).should(
            'include',
            '/add-question'
          )
          cy.get('h1', { timeout: 6000 }).should('be.visible')
          cy.get('#Question').get('#dropdown-container').click()
          let flag = ''
          cy.get('ul').within(() => {
            cy.get('li').within(() => {
              cy.get('div').then((el) => {
                ;[...el].map((el) => {
                  if (el.innerText === 'Multiple Choice') {
                    flag = 'CheckBox'
                  } else if (el.innerText === 'Single Choice') {
                    flag = 'RadioButton'
                  } else if (el.innerText === 'Text') {
                    flag = 'TextArea'
                    el.click()
                  }
                  return null
                })
              })
            })
          })
          if (flag === 'TextArea') {
            cy.get('input[type="textarea"]').should('have.class', 'textOption')
          }
        }
      })
    })
  })
  let lengthBefore: number
  it('Verifying if Add Option functionality Working on Options', () => {
    cy.get('a')
      .find('#sections')
      .should('have.text', routeFiles.sections)
      .click()
    cy.location('pathname', { timeout: 60000 }).should('include', '/sections')
    cy.get('#section-card', { timeout: 8000 }).each(($el) => {
      cy.wrap($el).within((el) => {
        if (
          el[0].getElementsByClassName('sectionName')[0].innerHTML === section1
        ) {
          cy.get('.sectionName').should('have.text', section1).click()
          cy.get('#add-question')
            .should('have.text', `+ ${addQuestion.addQuestion}`)
            .click()
          cy.location('pathname', { timeout: 60000 }).should(
            'include',
            '/add-question'
          )
          cy.get('h1', { timeout: 6000 }).should('be.visible')
          cy.get('#Question').get('#dropdown-container').click()

          cy.get('ul').within(() => {
            cy.get('li').within(() => {
              cy.get('div').then((el) => {
                ;[...el].forEach((el) => {
                  if (el.innerText === 'Multiple Choice') {
                    el.click()
                  }
                })
              })
            })
          })
          cy.get('.h-40 > .gap-6').within(() => {
            cy.get('#quill-editor')
              .its('length')
              .then((len) => {
                lengthBefore = len
              })
            cy.get('button#add-option')
              .should('have.text', '+ Add Options')
              .click()
            cy.get('#quill-editor')
              .its('length')
              .then((len) => {
                expect(lengthBefore + 1).to.equal(len)
              })
          })
        }
      })
    })
  })

  it('Verifying if Delete functionality Working on Options', () => {
    cy.get('a')
      .find('#sections')
      .should('have.text', routeFiles.sections)
      .click()
    cy.location('pathname', { timeout: 60000 }).should('include', '/sections')
    cy.get('#section-card', { timeout: 8000 }).each(($el) => {
      cy.wrap($el).within((el) => {
        if (
          el[0].getElementsByClassName('sectionName')[0].innerHTML === section1
        ) {
          cy.get('.sectionName').should('have.text', section1).click()
          cy.get('#add-question')
            .should('have.text', `+ ${addQuestion.addQuestion}`)
            .click()
          cy.location('pathname', { timeout: 60000 }).should(
            'include',
            '/add-question'
          )
          cy.get('h1', { timeout: 6000 }).should('be.visible')
          cy.get('#Question').get('#dropdown-container').click()
          cy.get('ul').within(() => {
            cy.get('li').within(() => {
              cy.get('div').then((el) => {
                ;[...el].forEach((el) => {
                  if (el.innerText === 'Multiple Choice') {
                    el.click()
                  }
                })
              })
            })
          })
          cy.get('.h-40 > .gap-6').within(() => {
            cy.get('#quill-editor')
              .its('length')
              .then((len) => {
                lengthBefore = len
              })
            cy.get('svg.h-6').first().click()
            cy.get('#quill-editor')
              .its('length')
              .then((len) => {
                expect(lengthBefore - 1).to.equal(len)
              })
          })
        }
      })
    })
  })
  it('On Save and Add More visit the Add Question Page', () => {
    cy.get('a')
      .find('#sections')
      .should('have.text', routeFiles.sections)
      .click()
    cy.location('pathname', { timeout: 60000 }).should('include', '/sections')
    cy.get('#section-card', { timeout: 8000 }).each(($el) => {
      cy.wrap($el).within((el) => {
        if (
          el[0].getElementsByClassName('sectionName')[0].innerHTML === section1
        ) {
          cy.get('.sectionName').should('have.text', section1).click()
          cy.get('#add-question')
            .should('have.text', `+ ${addQuestion.addQuestion}`)
            .click()
          cy.location('pathname', { timeout: 60000 }).should(
            'include',
            '/add-question'
          )
          cy.get('h1', { timeout: 6000 }).should('be.visible')
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
          cy.get('#question-editor #quill-editor').within(() => {
            cy.get('.ql-editor').type(cypress.useRef)
          })
          cy.get('#optionEditor input').clear().type(cypress.useRefAns)
          cy.get('#save-and-add-more').click()
          cy.location('pathname', { timeout: 60000 }).should(
            'include',
            '/add-question'
          )
        }
      })
    })
  })
  it('On Save and Continue visit the Sections Page', () => {
    cy.get('a')
      .find('#sections')
      .should('have.text', routeFiles.sections)
      .click()
    cy.location('pathname', { timeout: 60000 }).should('include', '/sections')
    cy.get('#section-card', { timeout: 8000 }).each(($el) => {
      cy.wrap($el).within((el) => {
        if (
          el[0].getElementsByClassName('sectionName')[0].innerHTML === section1
        ) {
          cy.get('.sectionName').should('have.text', section1).click()
          cy.get('#add-question')
            .should('have.text', `+ ${addQuestion.addQuestion}`)
            .click()
          cy.location('pathname', { timeout: 60000 }).should(
            'include',
            '/add-question'
          )
          cy.get('h1', { timeout: 6000 }).should('be.visible')
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
          cy.get('#question-editor #quill-editor').within(() => {
            cy.get('.ql-editor').type(cypress.useMemo)
          })
          cy.get('#optionEditor input').clear().type(cypress.useMemoAns)
          cy.get('#save-and-exit').click()
          cy.location('pathname', { timeout: 60000 }).should(
            'include',
            '/sections'
          )
        }
      })
    })
  })
  it('Verifying if Question is Empty or not', () => {
    cy.get('a')
      .find('#sections')
      .should('have.text', routeFiles.sections)
      .click()
    cy.location('pathname', { timeout: 60000 }).should('include', '/sections')
    cy.get('#section-card', { timeout: 8000 }).each(($el) => {
      cy.wrap($el).within((el) => {
        if (
          el[0].getElementsByClassName('sectionName')[0].innerHTML === section1
        ) {
          cy.get('.sectionName').should('have.text', section1).click()
        }
      })
    })
    cy.get('#add-question')
      .should('have.text', `+ ${addQuestion.addQuestion}`)
      .click()
    cy.location('pathname', { timeout: 60000 }).should(
      'include',
      '/add-question'
    )
    cy.get('#question-editor > .rounded-lg > .ql-container > .ql-editor')
      .type('{backspace}')
      .should('have.value', '')

    cy.get('#save-and-add-more', { timeout: 6000 })
      .should('have.text', cypress.saveAndAddMore)
      .click()
    cy.get('.Toastify__toast').should('have.text', 'Enter the Question')
  })
  it('Verifying if any Option is empty or not', () => {
    cy.get('a')
      .find('#sections')
      .should('have.text', routeFiles.sections)
      .click()
    cy.location('pathname', { timeout: 60000 }).should(
      'include',
      routes.sections
    )
    cy.get('#section-card', { timeout: 8000 }).each(($el) => {
      cy.wrap($el).within((el) => {
        if (
          el[0].getElementsByClassName('sectionName')[0].innerHTML === section1
        ) {
          cy.get('.sectionName').should('have.text', section1).click()
        }
      })
    })
    cy.get('#add-question')
      .should('have.text', `+ ${addQuestion.addQuestion}`)
      .click()
    cy.location('pathname', { timeout: 60000 }).should(
      'include',
      routes.addQuestion
    )
    cy.get('h1', { timeout: 6000 }).should('be.visible')
    let flag = 0
    cy.get('#Question').get('#dropdown-container').click()
    cy.get('ul').within(() => {
      cy.get('li').within(() => {
        cy.get('div').then((el) => {
          ;[...el].forEach((el) => {
            if (el.innerText === 'Multiple Choice') {
              el.click()
            }
          })
        })
      })
    })
    cy.get('.h-40 > .gap-6 > .flex-col').within(() => {
      cy.get(' #quill-editor ').then((el) => {
        ;[...el].forEach((element) => {
          if (element.innerText === '') {
            flag = 1
          }
        })
      })
    })
    if (flag == 1) {
      cy.get('#save-and-add-more')
        .should('have.text', cypress.saveAndAddMore)
        .click()
      cy.get('.Toastify__toast').should('have.text', '')
    }
  })
})
