import * as cron from "node-cron"

import { remindCandidate } from "./candidate.server"

export function cronInitiator() {
  cron.schedule("0 * * * *", async function () {
    remindCandidate()
  })
}
