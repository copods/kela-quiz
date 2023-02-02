import {
  getDialogCloseIcon,
  getAddSectionBtn,
  getCancelButton,
  getSectionCardByClass,
  getSectionName,
  getSections,
  getSubmitBtn,
  getTestHeading,
  getDialogHeader,
  getTestNameInput,
  getTextArea,
  getActiveSectionCard,
  getSubmitButtonById,
  getSectionDetailsHeading,
  getSectionSearch,
  getQuestionCardWrapper,
  getOptionWrapper,
  getQuestionType,
  getAddEditSectionTitleError,
  addEditSectionDescError,
  duplicateTitleError,
} from 'support/common-function'

const section1 = `Aptitude - section1`
const nameIsReq = 'Name is required'
const descIsReq = 'Description is required'
const duplicate = 'Duplicate Title'
// const deleteSection = `Aptitude - delete-Section`

/// <reference types="Cypress">
describe('Test for Tests', () => {
  beforeEach('sign-in', () => {
    cy.login()
    cy.customVisit('/members')
  })

  it('Checks, Active State of Tests', () => {
    getSections().should('have.text', 'Tests').click()
    cy.location().then((loc) => {
      cy.location('search').should('include', loc.search)
    })
  })

  it('checks, Tests page have heading and should be visible,correct text and attribute', () => {
    getSections().should('have.text', 'Tests').click()
    getTestHeading()
      .should('be.visible')
      .should('have.text', 'Tests')
      .should('have.class', 'text-3xl font-bold text-black')
      .should('have.attr', 'tabindex', '0')
      .click()
      .should('have.focus')
  })
  it('checks, Add test button should be visible, have correct text and cancel functionality', () => {
    getSections().should('have.text', 'Tests').click()
    getAddSectionBtn()
      .should('be.visible')
      .should('have.text', '+ Add Test')
      .click()
    cy.get('form > div')
      .should('be.visible')
      .within(() => {
        getCancelButton().click()
      })
  })

  it('checks, add test popup heading and close icon should be visible and contain correct attributes', () => {
    getSections().should('have.text', 'Tests').click()
    getAddSectionBtn().should('have.text', '+ Add Test').click()
    getDialogHeader()
      .should('be.visible')
      .should('have.text', 'Add Test')
      .should('have.attr', 'tabindex', '0')
      .should('have.attr', 'aria-label', 'Add Test')
      .click()
      .should('have.focus')
    getDialogCloseIcon()
      .should('be.visible')
      .should('have.attr', 'tabindex', '0')
      .should('have.attr', 'role', 'img')
  })
  it('Checks, Add and cancel button should be visible and have correct attributes', () => {
    getSections().should('have.text', 'Tests').click()
    getAddSectionBtn().should('have.text', '+ Add Test').click()
    getSubmitButtonById()
      .should('be.visible')
      .should('have.text', 'Add')
      .should('have.attr', 'tabindex', '0')
    getCancelButton()
      .should('have.text', 'Cancel')
      .should('have.attr', 'tabindex', '0')
  })

  it('checks, enter test name input field and description area should be visible and have correct attributes', () => {
    getSections().should('have.text', 'Tests').click()
    getAddSectionBtn().should('have.text', '+ Add Test').click()
    cy.get('form > div')
      .should('be.visible')
      .within((el) => {
        getTestNameInput()
          .type(`${section1} ${new Date().getTime()}`)
          .should('be.visible')
          .should('have.attr', 'tabindex', '0')
          .click()
          .should('have.focus')
        cy.wait(500)
        getTextArea()
          .should('be.visible')
          .should('have.attr', 'tabindex', '0')
          .click()
          .should('be.focus')
      })
  })
  it('checks,active Tests should have correct attributes and vertical dots for action menu', () => {
    getSections().should('have.text', 'Tests').click()
    cy.wait(1000)
    getActiveSectionCard()
      .should('have.attr', 'role', 'button')
      .should('have.attr', 'tabindex', '0')
      .children()
      .should('have.css', 'background-color', 'rgb(255, 255, 255)')
      .get('.verticalDots')
      .should('be.visible')
  })

  it('checks,Tests details heading should be visible and correct attributes', () => {
    getSections().should('have.text', 'Tests').click()
    cy.wait(1500)
    getSectionCardByClass().each(($el) => {
      cy.wrap($el).within((el) => {
        if (
          el[0].getElementsByClassName('sectionName')[0].innerHTML === section1
        ) {
          getSectionName().should('have.text', section1)
        }
      })
    })
    getSectionName().contains(section1).click()
    cy.wait(500)
    getSectionDetailsHeading()
      .should('be.visible')
      .should('have.class', 'inline-block text-2xl font-semibold text-gray-700')
      .should('have.attr', 'tabindex', '0')
      .click()
      .should('have.focus')
  })

  it('checks,Tests details search bar should be visible and have correct attributes', () => {
    getSections().should('have.text', 'Tests').click()
    cy.wait(1500)
    getSectionCardByClass().each(($el) => {
      cy.wrap($el).within((el) => {
        if (
          el[0].getElementsByClassName('sectionName')[0].innerHTML === section1
        ) {
          getSectionName().should('have.text', section1)
        }
      })
    })
    getSectionName().contains(section1).click()
    getSectionSearch()
      .should('be.visible')
      .should('have.attr', 'tabindex', '0')
      .click()
      .should('have.focus')
  })
  it('Checks,Question card should be visible and correct attributes', () => {
    getSections().should('have.text', 'Tests').click()
    cy.wait(1500)
    getSectionCardByClass().each(($el) => {
      cy.wrap($el).within((el) => {
        if (
          el[0].getElementsByClassName('sectionName')[0].innerHTML === section1
        ) {
          getSectionName().should('have.text', section1)
        }
      })
    })
    getSectionName().contains(section1).click()
    getQuestionCardWrapper()
      .should('be.visible')
      .should('have.attr', 'tabindex', '0')
      .should('have.attr', 'aria-label', 'Expand')
  })

  it('Checks,initially option card should have max height 0 and expand after clicking on question card', () => {
    getSections().should('have.text', 'Tests').click()
    cy.wait(1500)
    getSectionCardByClass().each(($el) => {
      cy.wrap($el).within((el) => {
        if (
          el[0].getElementsByClassName('sectionName')[0].innerHTML === section1
        ) {
          getSectionName().should('have.text', section1)
        }
      })
    })
    getSectionName().contains(section1).click()
    getOptionWrapper().should('have.css', 'max-height', '0px')
    getQuestionCardWrapper().should('be.visible').click()
    getOptionWrapper().should(
      'have.class',
      'overflow-scroll text-base text-gray-600 transition-all h-full'
    )
  })

  it('Checks,question type chip should be visible', () => {
    getSections().should('have.text', 'Tests').click()
    cy.wait(1500)
    getSectionCardByClass().each(($el) => {
      cy.wrap($el).within((el) => {
        if (
          el[0].getElementsByClassName('sectionName')[0].innerHTML === section1
        ) {
          getSectionName().should('have.text', section1)
        }
      })
    })
    getSectionName().contains(section1).click()
    getQuestionCardWrapper().should('be.visible').click()
    cy.wait(500)
    getQuestionType().should('be.visible')
  })

  it('Test for valid error message while adding new Tests without Title or description and duplicate title', () => {
    getSections().should('have.text', 'Tests').click()
    cy.wait(1500)
    getSectionCardByClass().each(($el) => {
      cy.wrap($el).within((el) => {
        if (
          el[0].getElementsByClassName('sectionName')[0].innerHTML === section1
        ) {
          getSectionName().should('have.text', section1)
        }
      })
    })
    getSectionName().contains(section1).click()
    getAddSectionBtn().should('have.text', '+ Add Test').click()
    cy.get('form > div')
      .should('be.visible')
      .within((el) => {
        getSubmitBtn().click()
      })
    getAddEditSectionTitleError().should('have.text', nameIsReq)
    getTestNameInput().type(`${section1} ${new Date().getTime()}`)
    getSubmitButtonById().click()
    addEditSectionDescError().should('have.text', descIsReq)
    cy.wait(500)
    cy.get('form > div')
      .should('be.visible')
      .within((el) => {
        getTestNameInput().clear().type(section1)
        getTextArea().clear().type('Aptitude')
        getSubmitButtonById().click()
      })
    duplicateTitleError().should('have.text', duplicate)
  })

  it('SortBy Name or created Date', () => {
    getSections().should('have.text', 'Tests').click()
    cy.wait(1500)
    getSectionCardByClass().each(($el) => {
      cy.wrap($el).within((el) => {
        if (
          el[0].getElementsByClassName('sectionName')[0].innerHTML === section1
        ) {
          getSectionName().should('have.text', section1)
        }
      })
    })
    getSectionName().contains(section1).click()
    cy.wait(1500)
    cy.get('.sectionLSWrapper').within(() => {
      cy.get('#section-cards')
        .get('#section-link')
        .then((listing) => {
          const listingCount = Cypress.$(listing).length
          expect(listing).to.have.length(listingCount)
          cy.get('.dropdownButton span span', { timeout: 6000 })
            .invoke('text')
            .then((el) => {
              if (el === 'Name') {
                cy.get('h2').then(($elements) => {
                  let strings = [...$elements].map(($el) => $el.innerText)
                  expect(strings).to.deep.equal([...strings].sort())
                })
              } else if (el === 'Created Date') {
                cy.get('.created-by-date').then(($elements) => {
                  let strings = [...$elements].map(($el) => {
                    return new Date($el.innerText).toLocaleDateString
                  })
                  expect(strings).to.deep.equal([...strings].sort())
                })
              }
            })
        })
    })
  })
})
