import {
  getBackButton,
  getGroupByItemTest,
  getGroupByTestId,
  getTitle,
} from "support/common-function"

describe("Visiting group by test of results page", () => {
  const test1 = `Aptitude - assessment1`

  it("Checks,elements in candidate list", () => {
    cy.login()
    cy.customVisit("/members")

    getGroupByTestId().click()
    getGroupByItemTest().contains(test1).click()

    // checks title of candidate list should be visible and have css properties
    getTitle()
      .should("be.visible")
      .should("have.class", "text-3xl font-semibold text-gray-900")

    //checks button should be visible and after clicking it back to the result page
    getBackButton().should("be.visible").click()
    cy.location("pathname").should("include", "/results")
  })
})
