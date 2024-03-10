const readlineSync = require('readline-sync');
const claimFaucet = require('./claimFaucet');

twisters.put('title', {
    active: false,
    text: `
    Mitosis Faucet Claimer !
`,
  });
const address = readlineSync.question('Enter your address: ');

claimFaucet(address);
