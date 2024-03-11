import axios from "axios";
import { CronJob } from "cron";
import { twisters } from './claim.js';

export const claimFaucet = async (address) => {
  try {
    const { data } = await axios({
      method: "GET",
      url: `https://api.expedition.mitosis.org/v1/faucet/${address}`,
    });
    if (data.result && data.result.message === "ok") {
      twisters.put("log", {
        active: false,
        text: `
        Claim successful. Will try again in 24 hours.
    `,
      });
      const job = new CronJob(
        "0 0 * * *",
        () => {
          twisters.put("log", {
            active: false,
            text: `
            Retrying ...
        `,
          });
          claimFaucet(address);
        },
        null,
        true
      );
      job.start();
    }
  } catch (error) {
    const errorMessage = error.response
      ? error.response.data.message
      : error.message;
    twisters.put("log", {
      active: false,
      text: `
      Error : ${errorMessage}
  `,
    });

    if (errorMessage === "Already received asset today") {
      twisters.put("log", {
        active: false,
        text: `
        Already received asset today retry after 1 hour.
    `,
      });
      const job = new CronJob(
        "0 0 * * * *",
        () => {
          twisters.put("log", {
            active: false,
            text: `
            Retrying ...
        `,
          });
          claimFaucet(address);
        },
        null,
        true
      );
      job.start();
    } else if (errorMessage.includes("is not integrated to the address")) {
      twisters.put("log", {
        active: false,
        text: `
        Twitter not linked. Please link your Twitter account.
    `,
      });
    } else {
      twisters.put("log", {
        active: false,
        text: `
        Unknown error.
    `,
      });
    }
  }
};