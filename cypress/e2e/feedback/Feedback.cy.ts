import {
  getActionHeader,
  getCandidateEmailHeader,
  getCandidateNameHeader,
  getChipTag,
  getCloseButton,
  getDropdownOptions,
  getFeedback,
  getFeedbackCardsContainer,
  getFeedbackDetailsIcon,
  getFeedbackHeader,
  getFeedbackQuestion,
  getFeedbackTableHeader,
  getFeedbackTitle,
  getFeedbackTypeDropdown,
  getFeedbackTypeDropdownText,
  getFeedbackTypeHeader,
  getGivenOnHeader,
  getSortFilterDropdown,
  getSortFilterDropdownText,
  getTestNameHeader,
  getTestsFilterDropdown,
  getTestsFilterDropdownText,
} from "support/common-function"

describe("Tests for Feedback", () => {
  const feedback = "Feedback"
  const feedbackCardContent = [
    { heading: "Total Feedback", count: "1" },
    { heading: "Positive Feedback", count: "1" },
    { heading: "Negative Feedback", count: "0" },
    { heading: "Neutral Feedback", count: "0" },
  ]
  const testDropdownOptions = [
    "All Tests",
    "Aptitude - assessment2",
    "Aptitude - assessment1",
    "Quantitative - assessment1",
  ]

  const feedbackTypeOptions = [
    "All Feedbacks",
    "Positive",
    "Negative",
    "Neutral",
  ]

  const sortfilterDropdownOptions = ["Newer", "Older"]

  const tableTitles = {
    testName: "Test Name",
    candidateName: "Candidate Name",
    candidateEmail: "Candidate Email",
    feedbackType: "Feedback Type",
    givenOn: "Given On",
    actions: "Action",
  }

  const commonContants = {
    feedbackHeaderText: "Feedback-Quantitative - assessment1",
    close: "Close",
  }

  const feedbackQuestions = [
    "How do you like the experience of K-Quiz portal?",
    "How do you rate the difficulty level of the test?",
    "Please rate your overall experience",
    "Write your feedback",
  ]
  const feedbackOption = ["1", "2", "3", "4", "5"]
  it("Test to check feedback Functionality/styling", () => {
    cy.login()
    cy.customVisit("/members")

    // To check location and title
    getFeedback().should("have.text", feedback).click()
    cy.location("pathname").should("include", "/feedback")
    getFeedbackTitle().should("have.text", feedback)

    //To check card styling and content
    getFeedbackCardsContainer()
      .get(".col-span-1")
      .should("have.length", 4)
      .each((el, index) => {
        cy.wrap(el).within((element) => {
          element.hasClass(
            "col-span-1 flex gap-4 rounded-lg border border-gray-200 bg-white p-6 shadow-[0px_1px_10px_rgba(0,0,0,0.08)]"
          )
          element.has("img")
          element.has("div").hasClass("flex flex-col gap-2")
          element
            .has("div")
            .has("span")
            .each((i, card) => {
              cy.wrap(card).within((item) => {
                let string = item[0].innerText
                i === 0
                  ? expect(string).to.have.string(
                      feedbackCardContent[index].heading
                    )
                  : expect(string).to.have.string(
                      feedbackCardContent[index].count
                    )
              })
            })
        })
      })

    //To check the feedback table header styling/functionality
    getFeedbackTableHeader()
      .eq(0)
      .find("span")
      .eq(0)
      .should("have.text", feedback)
      .should("have.class", "text-xl")
    getFeedbackTableHeader()
      .eq(0)
      .find("span")
      .eq(1)
      .should("have.class", "h-4 w-[1px] border-r-[1px] border-gray-300")
    getFeedbackTableHeader()
      .eq(0)
      .find("span")
      .eq(2)
      .should("have.text", "Filters")
      .should("have.class", "text-xs text-gray-500")
    getTestsFilterDropdown().should(
      "have.class",
      "dropdownButton relative h-9 px-2 py-2.5 w-full cursor-pointer rounded-md border border-gray-200 bg-white text-left shadow-sm sm:text-sm"
    )

    //To check the test filter styling/functionality
    getTestsFilterDropdownText().should("have.text", testDropdownOptions[0])
    getTestsFilterDropdown().click()
    getDropdownOptions()
      .get("div div input")
      .should("have.attr", "placeholder", "Search...")
    getDropdownOptions()
      .get("div div li .dropdown-option")
      .each((el, index) => {
        const string = el[0].innerText
        expect(string).to.have.string(testDropdownOptions[index])
      })
    getDropdownOptions()
      .get("div div li")
      .eq(0)
      .should(
        "have.class",
        "bg-blue-50 relative z-20 cursor-pointer select-none py-3 px-4"
      )
    getTestsFilterDropdown().click()

    //To check the feedback Type filter styling/functionality
    getFeedbackTypeDropdownText().should("have.text", feedbackTypeOptions[0])
    getFeedbackTypeDropdown().click()
    getDropdownOptions()
      .get("div div li .dropdown-option")
      .each((el, index) => {
        const string = el[0].innerText
        expect(string).to.have.string(feedbackTypeOptions[index])
      })
    getDropdownOptions()
      .get("div div li")
      .eq(0)
      .should(
        "have.class",
        "bg-blue-50 relative z-20 cursor-pointer select-none py-3 px-4"
      )
    getFeedbackTypeDropdown().click()

    //To check the Sorting filter styling/functionality
    getSortFilterDropdownText().should(
      "have.text",
      sortfilterDropdownOptions[0]
    )
    getSortFilterDropdown().click()
    getDropdownOptions()
      .get("div div li .dropdown-option")
      .each((el, index) => {
        const string = el[0].innerText
        expect(string).to.have.string(sortfilterDropdownOptions[index])
      })
    getDropdownOptions()
      .get("div div li")
      .eq(0)
      .should(
        "have.class",
        "bg-blue-50 relative z-20 cursor-pointer select-none py-3 px-4"
      )
    getSortFilterDropdown().click()

    //To check the feedback table styling/functionality

    // To check table title - Sr.No
    getTestNameHeader()
      .should("have.text", tableTitles.testName)
      .should("have.css", "color", "rgb(107, 114, 128)")
      .should("have.css", "font-weight", "400")
      .should("have.css", "font-size", "14px")

    // To check table title - assessment
    getCandidateNameHeader()
      .should("have.text", tableTitles.candidateName)
      .should("have.css", "color", "rgb(107, 114, 128)")
      .should("have.css", "font-weight", "400")
      .should("have.css", "font-size", "14px")

    // To check table title - test
    getCandidateEmailHeader()
      .should("have.text", tableTitles.candidateEmail)
      .should("have.css", "color", "rgb(107, 114, 128)")
      .should("have.css", "font-weight", "400")
      .should("have.css", "font-size", "14px")

    // To check table title - Created on
    getFeedbackTypeHeader()
      .should("have.text", tableTitles.feedbackType)
      .should("have.css", "color", "rgb(107, 114, 128)")
      .should("have.css", "font-weight", "400")
      .should(
        "have.class",
        "flex flex-1 items-center border-b bg-tableBg px-4 text-sm text-gray-500"
      )

    // To check table title - Created By
    getGivenOnHeader()
      .should("have.text", tableTitles.givenOn)
      .should("have.css", "color", "rgb(107, 114, 128)")
      .should("have.css", "font-weight", "400")
      .should("have.css", "font-size", "14px")

    // To check table title - Actions
    getActionHeader()
      .should("have.text", tableTitles.actions)
      .should("have.css", "color", "rgb(107, 114, 128)")
      .should("have.css", "font-weight", "400")
      .should("have.css", "font-size", "14px")

    //To check chip colour and text
    getChipTag()
      .should(
        "have.class",
        "flex items-center justify-between rounded-full px-3 py-1 text-xs font-medium border border-green-100 bg-green-100 text-green-800"
      )
      .should("have.text", "Positive")
  })

  it("Test to check Candidate feedback details/styling", () => {
    cy.login()
    cy.customVisit("/members")
    getFeedback().click()
    getFeedbackDetailsIcon().click()
    // To check if  Attributes/Colors/Visibility/Texts of form
    getFeedbackHeader().should(
      "have.class",
      "flex w-full flex-col items-center border-b border-gray-200 py-6"
    )

    getFeedbackQuestion()
      .should("have.length", 4)
      .should("have.class", "flex flex-col gap-5 border-b border-gray-200 p-8")

    getFeedbackQuestion().each((el, index) => {
      cy.wrap(el).within(() => {
        el.find("span")
          .text(feedbackQuestions[index])
          .hasClass("text-lg font-medium text-gray-700")
        if (index === 3) {
          el.find("textarea").hasClass(
            "rounded-lg border border-gray-200 px-3.5 py-2.5"
          )
        } else {
          el.find("div").hasClass("flex w-fit flex-col justify-between gap-2")
          el.find("div").find("div").eq(0).hasClass("flex flex-row gap-4")
          el.find("div")
            .find("div")
            .eq(0)
            .find("label")
            .each((index, element) => {
              cy.wrap(element).within(() => {
                el.find("span")
                  .text(feedbackOption[index])
                  .hasClass(
                    "flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg bg-blue-50  hover:bg-blue-100"
                  )
                el.find("input").val(feedbackOption[index])
              })
            })
          el.find("div").find("div").eq(1).hasClass("flex justify-between")
          el.find("div")
            .find("div")
            .eq(1)
            .find("span")
            .eq(0)
            .text("Not Satisfied")
          el.find("div").find("div").eq(1).find("span").eq(0).text("Satisfied")
        }
      })
    })
    getCloseButton().should("have.text", commonContants.close).click()
  })
})
