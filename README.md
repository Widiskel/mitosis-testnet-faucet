# Mitosis Faucet Claimer

The Mitosis Faucet Claimer is a Node.js application designed to automate the process of claiming assets from the Mitosis faucet. It supports scheduling subsequent claims and handling specific errors by reattempting the claim process under certain conditions.

## Prerequisites

Before running the Mitosis Faucet Claimer, ensure you have the following installed on your system:

- Node.js (v12.x or higher recommended)

## Installation

To get started with the Mitosis Faucet Claimer, follow these steps:

1. Clone the repository;.

2. Navigate into the cloned repository:

```bash
cd <PROJECT DIR>
```

3. Install the required npm packages:

```bash
npm install
```

## Usage

To use the Mitosis Faucet Claimer, run the following command in the terminal:

```bash
npm run claim
```

Follow the prompts to enter your address. The application will then attempt to claim from the faucet. Depending on the response from the faucet, it might schedule retry attempts.

### Handling Errors

The application is designed to handle specific errors:

- If the faucet has already been claimed for the day, it schedules another attempt in 24 hours.
- If the address is not integrated with a Twitter account, it prompts the user to do so.
- For any other errors, it displays an "Unknown error" message.
