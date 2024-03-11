import readlineSync from 'readline-sync';
import { claimFaucet } from './claimFaucet.js';
import { Twisters } from "twisters";


export const twisters = new Twisters();
twisters.put('title', {
    active: false,
    text: `
    Mitosis Faucet Claimer !
`,
  });

const address = readlineSync.question('Enter your address: ');

claimFaucet(address);
