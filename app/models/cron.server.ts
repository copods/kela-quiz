import * as cron from "node-cron"

export function emailCronCaller() {
  cron.schedule("*/2 * * * * *", function () {
    console.log("Cron Called", new Date().getTime() / 60)
  })
}
