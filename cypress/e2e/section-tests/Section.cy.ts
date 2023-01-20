import {
  // commonConstants,
  statusCheck,
} from '~/constants/common.constants'
const section1 = `Aptitude - section1`
// const deleteSection = `Aptitude - delete-Section`

/// <reference types="Cypress">
describe('Test for Tests', () => {
  beforeEach('sign-in', () => {
    cy.login()

    cy.customVisit('/members')
  })

  it('Checks, Active State of Tests', () => {
    cy.get('#sections', { timeout: 8000 }).should('have.text', 'Tests').click()
    cy.location().then((loc) => {
      cy.location('search').should('include', loc.search)
    })
  })
  it('checks, Tests page have heading and should be visible', () => {
    cy.get('#sections', { timeout: 8000 }).should('have.text', 'Tests').click()
    cy.get('.sectionCard', { timeout: 40000 }).each(($el) => {
      cy.wrap($el).within((el) => {
        if (
          el[0].getElementsByClassName('sectionName')[0].innerHTML === section1
        ) {
          cy.get('.sectionName').should('have.text', section1)
        }
      })
    })
    cy.get('.sectionName').contains(section1).click()
    cy.wait(1000)
    cy.get('#tests-heading', { timeout: 60000 }).should('be.visible')
  })
  it('checks, Tests page have heading and should have correct test', () => {
    cy.get('#sections', { timeout: 8000 }).should('have.text', 'Tests').click()
    cy.get('.sectionCard', { timeout: 40000 }).each(($el) => {
      cy.wrap($el).within((el) => {
        if (
          el[0].getElementsByClassName('sectionName')[0].innerHTML === section1
        ) {
          cy.get('.sectionName').should('have.text', section1)
        }
      })
    })
    cy.get('.sectionName').contains(section1).click()
    cy.wait(1000)
    cy.get('#tests-heading', { timeout: 6000 }).should('have.text', 'Tests')
  })
  it('checks, Tests page have heading should have class', () => {
    cy.get('#sections', { timeout: 8000 }).should('have.text', 'Tests').click()
    cy.get('.sectionCard', { timeout: 40000 }).each(($el) => {
      cy.wrap($el).within((el) => {
        if (
          el[0].getElementsByClassName('sectionName')[0].innerHTML === section1
        ) {
          cy.get('.sectionName').should('have.text', section1)
        }
      })
    })
    cy.get('.sectionName').contains(section1).click()
    cy.wait(1000)
    cy.get('#tests-heading', { timeout: 6000 }).should(
      'have.class',
      'text-3xl font-bold text-black'
    )
  })
  it('checks, Tests page have heading should have tabIndex', () => {
    cy.get('#sections', { timeout: 8000 }).should('have.text', 'Tests').click()
    cy.get('.sectionCard', { timeout: 40000 }).each(($el) => {
      cy.wrap($el).within((el) => {
        if (
          el[0].getElementsByClassName('sectionName')[0].innerHTML === section1
        ) {
          cy.get('.sectionName').should('have.text', section1)
        }
      })
    })
    cy.get('.sectionName').contains(section1).click()
    cy.wait(1000)
    cy.get('#tests-heading', { timeout: 6000 }).should(
      'have.attr',
      'tabindex',
      '0'
    )
  })
  it('checks, Tests page have heading should have focus', () => {
    cy.get('#sections', { timeout: 8000 }).should('have.text', 'Tests').click()
    cy.get('.sectionCard', { timeout: 40000 }).each(($el) => {
      cy.wrap($el).within((el) => {
        if (
          el[0].getElementsByClassName('sectionName')[0].innerHTML === section1
        ) {
          cy.get('.sectionName').should('have.text', section1)
        }
      })
    })
    cy.get('.sectionName').contains(section1).click()
    cy.wait(1000)
    cy.get('#tests-heading', { timeout: 6000 })
      .should('have.attr', 'tabindex', '0')
      .click()
      .should('have.focus')
  })
  it('checks, Add test button should be visible', () => {
    cy.get('#sections', { timeout: 8000 }).should('have.text', 'Tests').click()
    cy.get('.sectionCard', { timeout: 40000 }).each(($el) => {
      cy.wrap($el).within((el) => {
        if (
          el[0].getElementsByClassName('sectionName')[0].innerHTML === section1
        ) {
          cy.get('.sectionName').should('have.text', section1)
        }
      })
    })
    cy.get('.sectionName').contains(section1).click()
    cy.wait(1000)
    cy.get('#add-section', { timeout: 6000 }).should('be.visible')
  })
  it('checks, Add test button should have correct text', () => {
    cy.get('#sections', { timeout: 8000 }).should('have.text', 'Tests').click()
    cy.get('.sectionCard', { timeout: 40000 }).each(($el) => {
      cy.wrap($el).within((el) => {
        if (
          el[0].getElementsByClassName('sectionName')[0].innerHTML === section1
        ) {
          cy.get('.sectionName').should('have.text', section1)
        }
      })
    })
    cy.get('.sectionName').contains(section1).click()
    cy.wait(1000)
    cy.get('#add-section', { timeout: 6000 }).should('have.text', '+ Add Test')
  })

  it('checks, add test popup heading should be visible', () => {
    cy.get('#sections', { timeout: 8000 }).should('have.text', 'Tests').click()
    cy.get('.sectionCard', { timeout: 40000 }).each(($el) => {
      cy.wrap($el).within((el) => {
        if (
          el[0].getElementsByClassName('sectionName')[0].innerHTML === section1
        ) {
          cy.get('.sectionName').should('have.text', section1)
        }
      })
    })
    cy.get('.sectionName').contains(section1).click()
    cy.wait(1000)
    cy.get('#add-section', { timeout: 6000 })
      .should('have.text', '+ Add Test')

      .click()
    cy.get('[data-cy="dialog-header"]').should('be.visible')
  })
  it('checks, add test popup heading should have correct text', () => {
    cy.get('#sections', { timeout: 8000 }).should('have.text', 'Tests').click()
    cy.get('.sectionCard', { timeout: 40000 }).each(($el) => {
      cy.wrap($el).within((el) => {
        if (
          el[0].getElementsByClassName('sectionName')[0].innerHTML === section1
        ) {
          cy.get('.sectionName').should('have.text', section1)
        }
      })
    })
    cy.get('.sectionName').contains(section1).click()
    cy.wait(1000)
    cy.get('#add-section', { timeout: 6000 })
      .should('have.text', '+ Add Test')

      .click()
    cy.get('[data-cy="dialog-header"]').should('have.text', 'Add Test')
  })
  it('checks, add test popup heading should have tabIndex', () => {
    cy.get('#sections', { timeout: 8000 }).should('have.text', 'Tests').click()
    cy.get('.sectionCard', { timeout: 40000 }).each(($el) => {
      cy.wrap($el).within((el) => {
        if (
          el[0].getElementsByClassName('sectionName')[0].innerHTML === section1
        ) {
          cy.get('.sectionName').should('have.text', section1)
        }
      })
    })
    cy.get('.sectionName').contains(section1).click()
    cy.wait(1000)
    cy.get('#add-section', { timeout: 6000 })
      .should('have.text', '+ Add Test')

      .click()
    cy.get('[data-cy="dialog-header"]').should('have.attr', 'tabindex', '0')
  })
  it('checks, add test popup heading should have aria label', () => {
    cy.get('#sections', { timeout: 8000 }).should('have.text', 'Tests').click()
    cy.get('.sectionCard', { timeout: 40000 }).each(($el) => {
      cy.wrap($el).within((el) => {
        if (
          el[0].getElementsByClassName('sectionName')[0].innerHTML === section1
        ) {
          cy.get('.sectionName').should('have.text', section1)
        }
      })
    })
    cy.get('.sectionName').contains(section1).click()
    cy.wait(1000)
    cy.get('#add-section', { timeout: 6000 })
      .should('have.text', '+ Add Test')

      .click()
    cy.get('[data-cy="dialog-header"]').should(
      'have.attr',
      'aria-label',
      'Add Test'
    )
  })
  it('checks, add test popup heading should have focus', () => {
    cy.get('#sections', { timeout: 8000 }).should('have.text', 'Tests').click()
    cy.get('.sectionCard', { timeout: 40000 }).each(($el) => {
      cy.wrap($el).within((el) => {
        if (
          el[0].getElementsByClassName('sectionName')[0].innerHTML === section1
        ) {
          cy.get('.sectionName').should('have.text', section1)
        }
      })
    })
    cy.get('.sectionName').contains(section1).click()
    cy.wait(1000)
    cy.get('#add-section', { timeout: 6000 })
      .should('have.text', '+ Add Test')

      .click()
    cy.get('[data-cy="dialog-header"]')
      .should('have.attr', 'aria-label', 'Add Test')
      .click()
      .should('have.focus')
  })
  it('Checks, Add button should be visible', () => {
    cy.get('#sections', { timeout: 8000 }).should('have.text', 'Tests').click()
    cy.get('.sectionCard', { timeout: 40000 }).each(($el) => {
      cy.wrap($el).within((el) => {
        if (
          el[0].getElementsByClassName('sectionName')[0].innerHTML === section1
        ) {
          cy.get('.sectionName').should('have.text', section1)
        }
      })
    })
    cy.get('.sectionName').contains(section1).click()
    cy.wait(1000)
    cy.get('#add-section', { timeout: 6000 })
      .should('have.text', '+ Add Test')
      .click()
    cy.get('#submit-button').should('be.visible')
  })
  it('Checks, Add button should have correct text', () => {
    cy.get('#sections', { timeout: 8000 }).should('have.text', 'Tests').click()
    cy.get('.sectionCard', { timeout: 40000 }).each(($el) => {
      cy.wrap($el).within((el) => {
        if (
          el[0].getElementsByClassName('sectionName')[0].innerHTML === section1
        ) {
          cy.get('.sectionName').should('have.text', section1)
        }
      })
    })
    cy.get('.sectionName').contains(section1).click()
    cy.wait(1000)
    cy.get('#add-section', { timeout: 6000 })
      .should('have.text', '+ Add Test')
      .click()
    cy.get('#submit-button').should('have.text', 'Add')
  })
  it('Checks, Add button should have tabindex', () => {
    cy.get('#sections', { timeout: 8000 }).should('have.text', 'Tests').click()
    cy.get('.sectionCard', { timeout: 40000 }).each(($el) => {
      cy.wrap($el).within((el) => {
        if (
          el[0].getElementsByClassName('sectionName')[0].innerHTML === section1
        ) {
          cy.get('.sectionName').should('have.text', section1)
        }
      })
    })
    cy.get('.sectionName').contains(section1).click()
    cy.wait(1000)
    cy.get('#add-section', { timeout: 6000 })
      .should('have.text', '+ Add Test')
      .click()
    cy.get('#submit-button').should('have.attr', 'tabindex', '0')
  })
  it('checks, cancel button should have correct text', () => {
    cy.get('#sections', { timeout: 8000 }).should('have.text', 'Tests').click()
    cy.get('.sectionCard', { timeout: 40000 }).each(($el) => {
      cy.wrap($el).within((el) => {
        if (
          el[0].getElementsByClassName('sectionName')[0].innerHTML === section1
        ) {
          cy.get('.sectionName').should('have.text', section1)
        }
      })
    })
    cy.get('.sectionName').contains(section1).click()
    cy.wait(1000)
    cy.get('#add-section', { timeout: 6000 })
      .should('have.text', '+ Add Test')
      .click()
    cy.get('form > div')
      .should('be.visible')
      .within(() => {
        cy.get('#cancel-button').should('have.text', 'Cancel')
      })
  })

  it('checks, cancel button should have tabindex', () => {
    cy.get('#sections', { timeout: 8000 }).should('have.text', 'Tests').click()
    cy.wait(1000)
    cy.get('#add-section', { timeout: 6000 })
      .should('have.text', '+ Add Test')
      .click()
    cy.get('form > div')
      .should('be.visible')
      .within(() => {
        cy.get('#cancel-button').should('have.attr', 'tabindex', '0')
      })
  })
  it('checks,cancel Add test button functionality', () => {
    cy.get('#sections', { timeout: 8000 }).should('have.text', 'Tests').click()
    cy.get('.sectionCard', { timeout: 40000 }).each(($el) => {
      cy.wrap($el).within((el) => {
        if (
          el[0].getElementsByClassName('sectionName')[0].innerHTML === section1
        ) {
          cy.get('.sectionName').should('have.text', section1)
        }
      })
    })
    cy.get('.sectionName').contains(section1).click()
    cy.get('#add-section').click()
    cy.get('form > div')
      .should('be.visible')
      .within(() => {
        cy.get('#cancel-button').click()
      })
  })

  it('checks, add test popup close icon should be visible', () => {
    cy.get('#sections', { timeout: 8000 }).should('have.text', 'Tests').click()
    cy.get('.sectionCard', { timeout: 40000 }).each(($el) => {
      cy.wrap($el).within((el) => {
        if (
          el[0].getElementsByClassName('sectionName')[0].innerHTML === section1
        ) {
          cy.get('.sectionName').should('have.text', section1)
        }
      })
    })
    cy.get('.sectionName').contains(section1).click()
    cy.wait(1000)
    cy.get('#add-section', { timeout: 6000 })
      .should('have.text', '+ Add Test')
      .click()
    cy.get('#dialog-close-icon').should('be.visible')
  })
  it('checks, add test popup close icon should have tabIndex', () => {
    cy.get('#sections', { timeout: 8000 }).should('have.text', 'Tests').click()
    cy.get('.sectionCard', { timeout: 40000 }).each(($el) => {
      cy.wrap($el).within((el) => {
        if (
          el[0].getElementsByClassName('sectionName')[0].innerHTML === section1
        ) {
          cy.get('.sectionName').should('have.text', section1)
        }
      })
    })
    cy.get('.sectionName').contains(section1).click()
    cy.wait(1000)
    cy.get('#add-section', { timeout: 6000 })
      .should('have.text', '+ Add Test')
      .click()
    cy.get('#dialog-close-icon').should('have.attr', 'tabindex', '0')
  })
  it('checks, add test popup close icon should have role image', () => {
    cy.get('#sections', { timeout: 8000 }).should('have.text', 'Tests').click()
    cy.get('.sectionCard', { timeout: 40000 }).each(($el) => {
      cy.wrap($el).within((el) => {
        if (
          el[0].getElementsByClassName('sectionName')[0].innerHTML === section1
        ) {
          cy.get('.sectionName').should('have.text', section1)
        }
      })
    })
    cy.get('.sectionName').contains(section1).click()
    cy.wait(1000)
    cy.get('#add-section', { timeout: 6000 })
      .should('have.text', '+ Add Test')
      .click()
    cy.get('#dialog-close-icon').should('have.attr', 'role', 'img')
  })
  it('checks, enter test name input field should be visible', () => {
    cy.get('#sections', { timeout: 8000 }).should('have.text', 'Tests').click()
    cy.get('.sectionCard', { timeout: 40000 }).each(($el) => {
      cy.wrap($el).within((el) => {
        if (
          el[0].getElementsByClassName('sectionName')[0].innerHTML === section1
        ) {
          cy.get('.sectionName').should('have.text', section1)
        }
      })
    })
    cy.get('.sectionName').contains(section1).click()
    cy.wait(1000)
    cy.get('#add-section', { timeout: 6000 })
      .should('have.text', '+ Add Test')
      .click()

    cy.get('form > div')
      .should('be.visible')
      .within((el) => {
        cy.get('input[placeholder="Enter Test Name*"]')
          .type(`${section1} ${new Date().getTime()}`)
          .should('be.visible')
      })
  })
  it('checks, enter test name input field should have tabIndex', () => {
    cy.get('#sections', { timeout: 8000 }).should('have.text', 'Tests').click()
    cy.get('.sectionCard', { timeout: 40000 }).each(($el) => {
      cy.wrap($el).within((el) => {
        if (
          el[0].getElementsByClassName('sectionName')[0].innerHTML === section1
        ) {
          cy.get('.sectionName').should('have.text', section1)
        }
      })
    })
    cy.get('.sectionName').contains(section1).click()
    cy.wait(1000)
    cy.get('#add-section', { timeout: 6000 })
      .should('have.text', '+ Add Test')
      .click()

    cy.get('form > div')
      .should('be.visible')
      .within((el) => {
        cy.get('input[placeholder="Enter Test Name*"]').should(
          'have.attr',
          'tabindex',
          '0'
        )
      })
  })
  it('checks, enter test name input field should have focus', () => {
    cy.get('#sections', { timeout: 8000 }).should('have.text', 'Tests').click()
    cy.get('.sectionCard', { timeout: 40000 }).each(($el) => {
      cy.wrap($el).within((el) => {
        if (
          el[0].getElementsByClassName('sectionName')[0].innerHTML === section1
        ) {
          cy.get('.sectionName').should('have.text', section1)
        }
      })
    })
    cy.get('.sectionName').contains(section1).click()
    cy.wait(1000)
    cy.get('#add-section', { timeout: 6000 })
      .should('have.text', '+ Add Test')
      .click()

    cy.get('form > div')
      .should('be.visible')
      .within((el) => {
        cy.get('input[placeholder="Enter Test Name*"]')
          .click()
          .should('have.focus')
      })
  })
  it('checks, enter test description test area should be visible', () => {
    cy.get('#sections', { timeout: 8000 }).should('have.text', 'Tests').click()
    cy.get('.sectionCard', { timeout: 40000 }).each(($el) => {
      cy.wrap($el).within((el) => {
        if (
          el[0].getElementsByClassName('sectionName')[0].innerHTML === section1
        ) {
          cy.get('.sectionName').should('have.text', section1)
        }
      })
    })
    cy.get('.sectionName').contains(section1).click()
    cy.wait(1000)
    cy.get('#add-section', { timeout: 6000 })
      .should('have.text', '+ Add Test')
      .click()
    cy.get('form > div')
      .should('be.visible')
      .within((el) => {
        cy.get('textarea').should('be.visible')
      })
  })
  it('checks, enter test description test area should be focus', () => {
    cy.get('#sections', { timeout: 8000 }).should('have.text', 'Tests').click()
    cy.get('.sectionCard', { timeout: 40000 }).each(($el) => {
      cy.wrap($el).within((el) => {
        if (
          el[0].getElementsByClassName('sectionName')[0].innerHTML === section1
        ) {
          cy.get('.sectionName').should('have.text', section1)
        }
      })
    })
    cy.get('.sectionName').contains(section1).click()
    cy.wait(1000)
    cy.get('#add-section', { timeout: 6000 })
      .should('have.text', '+ Add Test')
      .click()
    cy.get('form > div')
      .should('be.visible')
      .within((el) => {
        cy.get('textarea').click().should('be.focus')
      })
  })
  it('checks, enter test description test area should have tabindex', () => {
    cy.get('#sections', { timeout: 8000 }).should('have.text', 'Tests').click()
    cy.get('.sectionCard', { timeout: 40000 }).each(($el) => {
      cy.wrap($el).within((el) => {
        if (
          el[0].getElementsByClassName('sectionName')[0].innerHTML === section1
        ) {
          cy.get('.sectionName').should('have.text', section1)
        }
      })
    })
    cy.get('.sectionName').contains(section1).click()
    cy.wait(1000)
    cy.get('#add-section', { timeout: 6000 })
      .should('have.text', '+ Add Test')
      .click()
    cy.get('form > div')
      .should('be.visible')
      .within((el) => {
        cy.get('textarea').should('have.attr', 'tabindex', '0')
      })
  })
  it('checks,active Tests should have tabIndex', () => {
    cy.get('#sections', { timeout: 8000 }).should('have.text', 'Tests').click()
    cy.get('.sectionCard', { timeout: 40000 }).each(($el) => {
      cy.wrap($el).within((el) => {
        if (
          el[0].getElementsByClassName('sectionName')[0].innerHTML === section1
        ) {
          cy.get('.sectionName').should('have.text', section1)
        }
      })
    })
    cy.get('.sectionName').contains(section1).click()
    cy.wait(1000)
    cy.get('.activeSectionCard', { timeout: 6000 }).should(
      'have.attr',
      'tabindex',
      '0'
    )
  })
  it('checks,active Tests should have role button', () => {
    cy.get('#sections', { timeout: 8000 }).should('have.text', 'Tests').click()
    cy.get('.sectionCard', { timeout: 40000 }).each(($el) => {
      cy.wrap($el).within((el) => {
        if (
          el[0].getElementsByClassName('sectionName')[0].innerHTML === section1
        ) {
          cy.get('.sectionName').should('have.text', section1)
        }
      })
    })
    cy.get('.sectionName').contains(section1).click()
    cy.wait(1000)
    cy.get('.activeSectionCard', { timeout: 6000 }).should(
      'have.attr',
      'role',
      'button'
    )
  })
  it('checks,active Tests should have white background color', () => {
    cy.get('#sections', { timeout: 8000 }).should('have.text', 'Tests').click()
    cy.get('.sectionCard', { timeout: 40000 }).each(($el) => {
      cy.wrap($el).within((el) => {
        if (
          el[0].getElementsByClassName('sectionName')[0].innerHTML === section1
        ) {
          cy.get('.sectionName').should('have.text', section1)
        }
      })
    })
    cy.get('.sectionName').contains(section1).click()
    cy.wait(1000)
    cy.get('.activeSectionCard', { timeout: 6000 })
      .children()
      .should('have.css', 'background-color', 'rgb(255, 255, 255)')
  })
  it('checks,active Tests should have vertical dots for menu actions', () => {
    cy.get('#sections', { timeout: 8000 }).should('have.text', 'Tests').click()
    cy.get('.sectionCard', { timeout: 40000 }).each(($el) => {
      cy.wrap($el).within((el) => {
        if (
          el[0].getElementsByClassName('sectionName')[0].innerHTML === section1
        ) {
          cy.get('.sectionName').should('have.text', section1)
        }
      })
    })
    cy.get('.sectionName').contains(section1).click()
    cy.wait(1000)
    cy.get('.activeSectionCard', { timeout: 6000 })
      .children()
      .get('.verticalDots', { timeout: 8000 })
      .should('be.visible')
  })
  it('checks,Tests details heading should be visible', () => {
    cy.get('#sections', { timeout: 8000 }).should('have.text', 'Tests').click()
    cy.get('.sectionCard', { timeout: 40000 }).each(($el) => {
      cy.wrap($el).within((el) => {
        if (
          el[0].getElementsByClassName('sectionName')[0].innerHTML === section1
        ) {
          cy.get('.sectionName').should('have.text', section1)
        }
      })
    })
    cy.get('.sectionName').contains(section1).click()
    cy.wait(1000)
    cy.get('#section-details-heading', { timeout: 6000 }).should('be.visible')
  })
  it('checks,Tests details heading should have correct class', () => {
    cy.get('#sections', { timeout: 8000 }).should('have.text', 'Tests').click()
    cy.get('.sectionCard', { timeout: 40000 }).each(($el) => {
      cy.wrap($el).within((el) => {
        if (
          el[0].getElementsByClassName('sectionName')[0].innerHTML === section1
        ) {
          cy.get('.sectionName').should('have.text', section1)
        }
      })
    })
    cy.get('.sectionName').contains(section1).click()
    cy.wait(1000)
    cy.get('#section-details-heading', { timeout: 6000 }).should(
      'have.class',
      'inline-block text-2xl font-semibold text-gray-700'
    )
  })
  it('checks,Tests details heading should have tabIndex', () => {
    cy.get('#sections', { timeout: 8000 }).should('have.text', 'Tests').click()
    cy.get('.sectionCard', { timeout: 40000 }).each(($el) => {
      cy.wrap($el).within((el) => {
        if (
          el[0].getElementsByClassName('sectionName')[0].innerHTML === section1
        ) {
          cy.get('.sectionName').should('have.text', section1)
        }
      })
    })
    cy.get('.sectionName').contains(section1).click()
    cy.wait(1000)
    cy.get('#section-details-heading', { timeout: 6000 }).should(
      'have.attr',
      'tabindex',
      '0'
    )
  })
  it('checks,section details heading should have focus', () => {
    cy.get('#sections', { timeout: 8000 }).should('have.text', 'Tests').click()
    cy.get('.sectionCard', { timeout: 40000 }).each(($el) => {
      cy.wrap($el).within((el) => {
        if (
          el[0].getElementsByClassName('sectionName')[0].innerHTML === section1
        ) {
          cy.get('.sectionName').should('have.text', section1)
        }
      })
    })
    cy.get('.sectionName').contains(section1).click()
    cy.wait(1000)
    cy.get('#section-details-heading', { timeout: 6000 })
      .should('have.attr', 'tabindex', '0')
      .click()
      .should('have.focus')
  })
  it('checks,Tests details search bar should be visible', () => {
    cy.get('#sections', { timeout: 8000 }).should('have.text', 'Tests').click()
    cy.get('.sectionCard', { timeout: 40000 }).each(($el) => {
      cy.wrap($el).within((el) => {
        if (
          el[0].getElementsByClassName('sectionName')[0].innerHTML === section1
        ) {
          cy.get('.sectionName').should('have.text', section1)
        }
      })
    })
    cy.get('.sectionName').contains(section1).click()
    cy.wait(1000)
    cy.get('#section-search', { timeout: 6000 }).should('be.visible')
  })
  it('checks,Tests details search bar should have tabIndex', () => {
    cy.get('#sections', { timeout: 8000 }).should('have.text', 'Tests').click()
    cy.get('.sectionCard', { timeout: 40000 }).each(($el) => {
      cy.wrap($el).within((el) => {
        if (
          el[0].getElementsByClassName('sectionName')[0].innerHTML === section1
        ) {
          cy.get('.sectionName').should('have.text', section1)
        }
      })
    })
    cy.get('.sectionName').contains(section1).click()
    cy.wait(1000)
    cy.get('#section-search', { timeout: 6000 }).should(
      'have.attr',
      'tabindex',
      '0'
    )
  })
  it('checks,Tests details search bar should have focus', () => {
    cy.get('#sections', { timeout: 8000 }).should('have.text', 'Tests').click()
    cy.get('.sectionCard', { timeout: 40000 }).each(($el) => {
      cy.wrap($el).within((el) => {
        if (
          el[0].getElementsByClassName('sectionName')[0].innerHTML === section1
        ) {
          cy.get('.sectionName').should('have.text', section1)
        }
      })
    })
    cy.get('.sectionName').contains(section1).click()
    cy.wait(1000)
    cy.get('#section-search', { timeout: 6000 }).click().should('have.focus')
  })
  it('Checks,Question card should be visible', () => {
    cy.get('#sections', { timeout: 8000 }).should('have.text', 'Tests').click()
    cy.get('.sectionCard', { timeout: 40000 }).each(($el) => {
      cy.wrap($el).within((el) => {
        if (
          el[0].getElementsByClassName('sectionName')[0].innerHTML === section1
        ) {
          cy.get('.sectionName').should('have.text', section1)
        }
      })
    })
    cy.get('.sectionName').contains(section1).click()
    cy.wait(1000)
    cy.get('#question-card-wrapper', { timeout: 6000 }).should('be.visible')
  })
  it('Checks,Question card should have tabIndex', () => {
    cy.get('#sections', { timeout: 8000 }).should('have.text', 'Tests').click()
    cy.get('.sectionCard', { timeout: 40000 }).each(($el) => {
      cy.wrap($el).within((el) => {
        if (
          el[0].getElementsByClassName('sectionName')[0].innerHTML === section1
        ) {
          cy.get('.sectionName').should('have.text', section1)
        }
      })
    })
    cy.get('.sectionName').contains(section1).click()
    cy.wait(1000)
    cy.get('#question-card-wrapper', { timeout: 6000 }).should(
      'have.attr',
      'tabindex',
      '0'
    )
  })
  it('Checks,Question card should have aria-label', () => {
    cy.get('#sections', { timeout: 8000 }).should('have.text', 'Tests').click()
    cy.get('.sectionCard', { timeout: 40000 }).each(($el) => {
      cy.wrap($el).within((el) => {
        if (
          el[0].getElementsByClassName('sectionName')[0].innerHTML === section1
        ) {
          cy.get('.sectionName').should('have.text', section1)
        }
      })
    })
    cy.get('.sectionName').contains(section1).click()
    cy.wait(1000)
    cy.get('#question-card-wrapper', { timeout: 6000 }).should(
      'have.attr',
      'aria-label',
      'Expand'
    )
  })
  it('Checks,initially option card should have max height 0', () => {
    cy.get('#sections', { timeout: 8000 }).should('have.text', 'Tests').click()
    cy.get('.sectionCard', { timeout: 40000 }).each(($el) => {
      cy.wrap($el).within((el) => {
        if (
          el[0].getElementsByClassName('sectionName')[0].innerHTML === section1
        ) {
          cy.get('.sectionName').should('have.text', section1)
        }
      })
    })
    cy.get('.sectionName').contains(section1).click()
    cy.wait(1000)
    cy.get('#options-wrapper', { timeout: 6000 }).should(
      'have.css',
      'max-height',
      '0px'
    )
  })
  it('Checks,initially option card should have expand after clicking on question card', () => {
    cy.get('#sections', { timeout: 8000 }).should('have.text', 'Tests').click()
    cy.get('.sectionCard', { timeout: 40000 }).each(($el) => {
      cy.wrap($el).within((el) => {
        if (
          el[0].getElementsByClassName('sectionName')[0].innerHTML === section1
        ) {
          cy.get('.sectionName').should('have.text', section1)
        }
      })
    })
    cy.get('.sectionName').contains(section1).click()
    cy.wait(1000)
    cy.get('#question-card-wrapper', { timeout: 6000 })
      .should('be.visible')
      .click()
    cy.get('#options-wrapper', { timeout: 6000 }).should(
      'have.class',
      'overflow-scroll text-base text-gray-600 transition-all h-full'
    )
  })
  it('Checks,question type chip should be visible', () => {
    cy.get('#sections', { timeout: 8000 }).should('have.text', 'Tests').click()
    cy.get('.sectionCard', { timeout: 40000 }).each(($el) => {
      cy.wrap($el).within((el) => {
        if (
          el[0].getElementsByClassName('sectionName')[0].innerHTML === section1
        ) {
          cy.get('.sectionName').should('have.text', section1)
        }
      })
    })
    cy.get('.sectionName').contains(section1).click()
    cy.wait(1000)
    cy.get('#question-card-wrapper', { timeout: 6000 })
      .should('be.visible')
      .click()
    cy.wait(1000)
    cy.get('#question-type', { timeout: 6000 }).should('be.visible')
  })
  it('Test for valid error message while adding new Tests without Title', () => {
    cy.get('#sections', { timeout: 8000 }).should('have.text', 'Tests').click()
    cy.get('.sectionCard', { timeout: 40000 }).each(($el) => {
      cy.wrap($el).within((el) => {
        if (
          el[0].getElementsByClassName('sectionName')[0].innerHTML === section1
        ) {
          cy.get('.sectionName').should('have.text', section1)
        }
      })
    })
    cy.get('.sectionName').contains(section1).click()
    cy.wait(1000)
    cy.get('#add-section', { timeout: 6000 })
      .should('have.text', '+ Add Test')
      .click()
    cy.get('form > div')
      .should('be.visible')
      .within((el) => {
        cy.get('[data-cy="submit"]').click()
      })
    cy.get('#addEditSection-title-error').should(
      'have.text',
      statusCheck.nameIsReq
    )
  })
  it('Test for valid error message while adding new Tests without Title', () => {
    cy.get('#sections', { timeout: 8000 }).should('have.text', 'Tests').click()
    cy.get('.sectionCard', { timeout: 40000 }).each(($el) => {
      cy.wrap($el).within((el) => {
        if (
          el[0].getElementsByClassName('sectionName')[0].innerHTML === section1
        ) {
          cy.get('.sectionName').should('have.text', section1)
        }
      })
    })
    cy.get('.sectionName').contains(section1).click()
    cy.wait(1000)
    cy.get('#add-section', { timeout: 6000 })
      .should('have.text', '+ Add Test')
      .click()
    cy.get('form > div')
      .should('be.visible')
      .within((el) => {
        cy.get('[data-cy="submit"]').click()
      })
    cy.get('#addEditSection-title-error').should(
      'have.text',
      statusCheck.nameIsReq
    )
  })
  it('Test for valid error message while adding new Tests without Description', () => {
    cy.get('#sections', { timeout: 8000 }).should('have.text', 'Tests').click()
    cy.get('.sectionCard', { timeout: 40000 }).each(($el) => {
      cy.wrap($el).within((el) => {
        if (
          el[0].getElementsByClassName('sectionName')[0].innerHTML === section1
        ) {
          cy.get('.sectionName').should('have.text', section1)
        }
      })
    })
    cy.get('.sectionName').contains(section1).click()
    cy.wait(1000)
    cy.get('#add-section', { timeout: 6000 })
      .should('have.text', '+ Add Test')
      .click()
    cy.get('form > div')
      .should('be.visible')
      .within((el) => {
        cy.get('input[placeholder="Enter Test Name*"]').type(
          `${section1} ${new Date().getTime()}`
        )

        cy.get('[data-cy="submit"]').click()
      })
    cy.get('#addEditSection-description-error').should(
      'have.text',
      statusCheck.descIsReq
    )
  })
  it('Test for valid error message while adding new Tests with duplicate Title', () => {
    cy.get('#sections', { timeout: 8000 }).should('have.text', 'Tests').click()
    cy.get('.sectionCard', { timeout: 40000 }).each(($el) => {
      cy.wrap($el).within((el) => {
        if (
          el[0].getElementsByClassName('sectionName')[0].innerHTML === section1
        ) {
          cy.get('.sectionName').should('have.text', section1)
        }
      })
    })
    cy.get('.sectionName').contains(section1).click()
    cy.wait(1000)
    cy.get('#add-section', { timeout: 6000 })
      .should('have.text', '+ Add Test')
      .click()
    cy.get('form > div')
      .should('be.visible')
      .within((el) => {
        cy.get('input[placeholder="Enter Test Name*"]').type(section1)
        cy.get('textarea').type('Aptitude')
        cy.get('[data-cy="submit"]').click()
      })
    cy.get('#duplicete-title-error').should('have.text', statusCheck.duplicate)
  })
  it('SortBy Name or created Date', () => {
    cy.get('#sections', { timeout: 8000 }).should('have.text', 'Tests').click()
    cy.get('.sectionCard', { timeout: 40000 }).each(($el) => {
      cy.wrap($el).within((el) => {
        if (
          el[0].getElementsByClassName('sectionName')[0].innerHTML === section1
        ) {
          cy.get('.sectionName').should('have.text', section1)
        }
      })
    })
    cy.get('.sectionName').contains(section1).click()
    cy.wait(1000)
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

  //note:working on it .....finding a genuine sol

  // it('Test for deleting the Tests and check if it is deleted or not', () => {
  //   cy.get('#sections', { timeout: 8000 }).should('have.text', 'Tests').click()
  //   cy.get('.sectionCard', { timeout: 40000 }).each(($el) => {
  //     cy.wrap($el).within((el) => {
  //       if (
  //         el[0].getElementsByClassName('sectionName')[0].innerHTML === section1
  //       ) {
  //         cy.get('.sectionName').should('have.text', section1)
  //       }
  //     })
  //   })
  //   cy.get('.sectionName').contains(section1).click()
  //   cy.wait(1000)
  //   const sectionCards = cy.get('.section-card')
  //   sectionCards.each(($element) => {
  //     cy.wrap($element).within(($el) => {
  //       if (
  //         $el[0].getElementsByClassName('sectionName')[0].innerHTML ===
  //         deleteSection
  //       ) {
  //         const verticalDot = cy.get('.verticalDots')
  //         verticalDot.click()

  //         const deletBtn = cy.get('[data-cy="delete-section"]')
  //         deletBtn.click()
  //       }
  //     })
  //   })

  //   cy.get('#delete-dialog').should('be.visible')
  //   cy.get('#confirm-delete')
  //     .should('have.text', commonConstants.delete)
  //     .click()
  //   cy.location('pathname').should('include', '/tests')
  //   cy.get('#section-card', { timeout: 8000 }).each(($el) => {
  //     cy.wrap($el).within((el) => {
  //       if (
  //         el[0].getElementsByClassName('sectionName')[0].innerHTML ===
  //         deleteSection
  //       ) {
  //         cy.get('.sectionName')
  //           .should('have.text', deleteSection)
  //           .should('not.exist')
  //       }
  //     })
  //   })
  // })
})
