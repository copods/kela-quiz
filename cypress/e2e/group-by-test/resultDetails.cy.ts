import {
  getBackButtonByDataCy,
  getCandidateByDataCy,
  getChipTag,
  getCorrectAnswer,
  getGivenAnswer,
  getGroupByItemTest,
  getGroupByTestId,
  getHr,
  getListItem,
  getResultDetails,
  getSkippedContainer,
  geth1,
} from "support/common-function"

describe("result details", () => {
  beforeEach("sign-in", () => {
    cy.login()
    cy.customVisit("/members")
  })
  it("result details", () => {
    getGroupByTestId().click()
    cy.wait(1000)
    cy.get(".tableRow", { timeout: 6000 }).each(($el) => {
      cy.wrap($el).within((el) => {
        if (
          el[0].getElementsByClassName("groupByItemTest")[0].innerHTML ===
          "Quantitative - assessment1"
        ) {
          cy.contains("Quantitative - assessment1")
        }
      })
    })
    getGroupByItemTest().contains("Quantitative - assessment1").click()
    cy.wait(1000)

    getCandidateByDataCy().first().click()
    cy.wait(1000)
    getResultDetails().eq(0).should("have.text", "View Details").click()

    //checks title have candidate name and their classes
    geth1()
      .eq(0)
      .should("be.visible")
      .should("have.class", "text-3xl font-semibold text-gray-900")
      .should("have.text", "joy Jain")

    //checks title have test name and their classes
    geth1()
      .eq(1)
      .should("be.visible")
      .should("have.text", "Quantitive - section1")
      .should("have.class", "text-3xl font-semibold text-gray-900")

    //checks divider should be visible
    getHr().should("be.visible").should("have.class", "w-full bg-gray-300")

    //checks chip-tag class
    getChipTag()
      .eq(0)
      .should(
        "have.class",
        "rounded-full px-3 py-1 text-xs font-medium border border-black text-grey-800"
      )

    //checks question have correct text and classes
    cy.get(".question")
      .should("be.visible")
      .should("have.class", "question flex-1 flex-row")
      .should("have.text", "What is useRef() ?")

    //checks list item
    getListItem()
      .should("be.visible")
      .should("have.class", "list-item text-xs font-semibold text-gray-800")
      .should("have.text", "Unordered")

    //checks given answer text
    getGivenAnswer()
      .should("be.visible")
      .should("have.class", "text-xl font-medium text-gray-800")
      .should("have.text", "Given Answers")
      .parent()
      .within(() => {
        getChipTag().should(
          "have.class",
          "rounded-full px-3 py-1 text-xs font-medium border border-yellow-100 bg-yellow-100 text-yellow-800"
        )
      })

    //checks skiped container
    getSkippedContainer()
      .should("be.visible")
      .should(
        "have.class",
        "break-normal rounded-lg border border-solid border-gray-300 bg-gray-50 p-4 text-base font-normal text-gray-600"
      )
      .contains("-")

    //checks back button
    getBackButtonByDataCy().should("be.visible").click()

    //checks view detail button and click
    getResultDetails().eq(1).should("have.text", "View Details").click()

    //checks correct answer chip class
    getGivenAnswer()
      .first()
      .should("be.visible")
      .should("have.class", "text-xl font-medium text-gray-800")
      .should("have.text", "Given Answer")
      .parent()
      .within(() => {
        getChipTag().should(
          "have.class",
          "rounded-full px-3 py-1 text-xs font-medium border border-green-100 bg-green-100 text-green-800"
        )
      })

    //checks wrong answer chip class
    getGivenAnswer()
      .eq(1)
      .should("be.visible")
      .should("have.class", "text-xl font-medium text-gray-800")
      .should("have.text", "Given Answers")
      .parent()
      .within(() => {
        getChipTag().should(
          "have.class",
          "rounded-full px-3 py-1 text-xs font-medium border border-red-100 bg-red-100 text-red-800"
        )
      })

    //checks correct answer text
    getCorrectAnswer()
      .should("be.visible")
      .should("have.class", "text-xl font-medium text-gray-800")
      .should("have.text", "Correct Answer")
  })
})
