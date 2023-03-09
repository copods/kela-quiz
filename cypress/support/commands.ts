/* eslint-disable @typescript-eslint/no-unused-vars */
import { faker } from "@faker-js/faker"

import {
  getBeginAssessmentButton,
  getCopyLinkId,
  getEmailInput,
  getFirstName,
  getGroupByItemTest,
  getGroupByTestId,
  getInstructionHeading,
  getInvitePopup,
  getLastName,
  getOTPFirstInputField,
  getOTPFourthInputField,
  getOTPSecondInputField,
  getOTPThirdInputField,
  getRegistrationButtonId,
  getSubmitBtn,
  getVeriticalIconId,
} from "./common-function"

import { logIn } from "~/constants/common.constants"

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Logs in function for cypress testing.
       */
      login: typeof Function

      /**
       * Deletes the current @user
       *
       * @returns {typeof cleanupUser}
       * @memberof Chainable
       * @example
       *    cy.cleanupUser()
       * @example
       *    cy.cleanupUser({ email: 'whatever@example.com' })
       */
      cleanupUser: typeof cleanupUser

      /**
       * Logs in function for cypress testing.
       */
      customVisit: typeof Function

      /**
       * candidate Registration for Cypress testing
       */

      candidateRegistration: typeof Function

      /**
       *  candidate Registration for Cypress testing
       */
      customVisitOnCandidateSide: typeof Function
      /**
       *  candidate Verification for Cypress Testing
       */
      candidateVerification: typeof Function
      /**
       * candidate Name for Cypress testing
       */
      checkCandidateName: typeof Function
      /**
       * assessment instruction for Cypress Testing
       */
      assessmentInstruction: typeof Function
    }
  }
}
let ExamLink = ""
let candidateName = "joy"

function login() {
  let formData = new FormData()

  // @TODO: Need to change this credentials with `careers.copods.demo@gmail.com`
  formData.append("email", Cypress.env("email"))
  formData.append("password", Cypress.env("password"))
  formData.append("redirectTo", "/dashboard")

  const __sessionExist = window.localStorage.getItem("__session")

  if (!__sessionExist)
    cy.request({
      method: "POST",
      url: "/sign-in?_data=routes%2Fsign-in",
      body: formData,
    }).then((resp) => {
      const { headers } = resp
      const __session =
        headers?.["set-cookie"] && headers?.["set-cookie"][0].split("=")[1]
      window.localStorage.setItem("__session", __session)
    })
}

function customVisit(path = "") {
  const headers = {
    Cookie: `__session=${window.localStorage.getItem("__session")}`,
  }
  cy.visit(`/${path}`, {
    method: "GET",
    headers,
  })
  cy.wait(1000)
}

function cleanupUser({ email }: { email?: string } = {}) {
  if (email) {
    deleteUserByEmail(email)
  } else {
    cy.get("@user").then((user) => {
      const email = (user as { email?: string }).email
      if (email) {
        deleteUserByEmail(email)
      }
    })
  }
  cy.clearCookie("__session")
}

function deleteUserByEmail(email: string) {
  cy.exec(
    `npx ts-node --require tsconfig-paths/register ./cypress/support/delete-user.ts "${email}"`
  )
  cy.clearCookie("__session")
}

const candidateRegistration = () => {
  const emailId = Math.random()
  cy.viewport(2000, 1000)
  cy.login()
  cy.customVisit("/members")
  getGroupByTestId().click()
  cy.get("a").find("#tests").click()
  getInvitePopup().click()
  getEmailInput().type(`ki${emailId}@copods.co`)
  getSubmitBtn().click()
  getGroupByTestId().click()
  getGroupByItemTest().each((el) => {
    const itemText = el.text()
    if (itemText === "Quantitative - assessment1") {
      cy.wrap(el).click()
    }
  })
  getVeriticalIconId().click()
  getCopyLinkId().should("be.visible").click()
  cy.wrap(
    Cypress.automation("remote:debugger:protocol", {
      command: "Browser.grantPermissions",
      params: {
        permissions: ["clipboardReadWrite", "clipboardSanitizedWrite"],
        origin: window.location.origin,
      },
    })
  )

  cy.window()
    .its("navigator.clipboard")
    .invoke("readText")
    .then((text) => {
      ExamLink = text.split("3000")[1]
      cy.visit(ExamLink)
      getFirstName().type(candidateName)
      getLastName().type("Jain")
      getRegistrationButtonId()
        .should("be.visible")
        .should("have.css", "background-color", "rgb(53, 57, 136)")
        .click()
      cy.url().should("include", `${ExamLink}/verification`)
    })
}

const customVisitOnCandidateSide = (path = "") => {
  ExamLink && cy.visit(`${ExamLink}/${path}`)
}
const candidateVerification = () => {
  cy.customVisitOnCandidateSide("verification")
  getOTPFirstInputField().type("0")
  getOTPSecondInputField().type("0")
  getOTPThirdInputField().type("0")
  getOTPFourthInputField().type("0")
  cy.url().should("include", "instructions")
}

const checkCandidateName = () => {
  getInstructionHeading()
    .should("be.visible")
    .should("have.text", `Welcome ${candidateName}`)
}

const assessmentInstruction = () => {
  getBeginAssessmentButton().should("be.visible")
  getBeginAssessmentButton().should("have.text", "Begin Assessment")
  getBeginAssessmentButton().click()
}

Cypress.Commands.add("login", login)
Cypress.Commands.add("cleanupUser", cleanupUser)
Cypress.Commands.add("customVisit", customVisit)
Cypress.Commands.add("candidateRegistration", candidateRegistration)
Cypress.Commands.add("customVisitOnCandidateSide", customVisitOnCandidateSide)
Cypress.Commands.add("candidateVerification", candidateVerification)
Cypress.Commands.add("checkCandidateName", checkCandidateName)
Cypress.Commands.add("assessmentInstruction", assessmentInstruction)

/*
eslint
  @typescript-eslint/no-namespace: "off",
*/
