import moment from "moment"

import * as cron from "node-cron"

import { getAllCandidates } from "./candidate.server"
import { sendTestInviteMail } from "./sendgrid.servers"

export function emailCronCaller() {
  cron.schedule("0 */23 * * *", async function () {
    const candidates = await getAllCandidates()

    candidates.forEach((candidate) => {
      const invitedAtTime = moment(candidate.createdAt).fromNow()

      if (invitedAtTime.includes("23")) {
        sendTestInviteMail(candidate.candidate.email, candidate.link as string)
      }
    })
  })
}
