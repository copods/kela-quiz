import * as cron from "node-cron"

import { remindCandidate } from "./candidate.server"

export function cronInitiator() {
  cron.schedule("* */1 * * *", async function () {
    remindCandidate()
  })
}
