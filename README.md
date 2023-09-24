<img src="./src/assets/images/HE-Bank-logo-color.png" width="200" height="200" />

# HE-Bank: Coding Exercise

Notice: This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## TL;DR
1. Install the app with `npm install`
2. Run the app with `npm start`
3. Login with any of the users listed below

## Available Scripts

In the project directory, you can run:


### `npm install`

Installs the NPM dependencies.

### `npm start`

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.

---
## Available Users
| Last Name | Pin |
| -------- | ------- |
| **Cruz** | **9012** |
| **Smith** | **1025** |
| **Skeletor** | **1983** |

## Goals
- Provide login/logout app functionality for the users listed above.
- Demonstrate initial form validation and error handling.
- Display account balance for each user, and keep balance up to date with session transactions.
- Provide interface for making "Deposits" and "Withdrawls" within certain constraints, such as a daily withdrawal limits that are configured at the account level.
 
## Adding a user
- Users are added in the [userMock.js](src/mocks/userMock.js) file
 -- To set Balance and Daily Withdrawal Amounts for the new user, a corresponding entry should be made in the [userAccountsMock.js](src/mocks/userAccountsMock.js) file


## App Directory Structure
```
├── README.md - This file
└── src
    ├── App.css
    ├── App.js
    ├── assets
    │   └── images
    │       ├── HE-Bank-logo-color.png
    │       └── HE-Bank-logo-white.png
    ├── components
    │   ├── actionForms
    │   │   ├── deposit.js
    │   │   └── withdrawal.js
    │   ├── ccard
    │   │   ├── card.css
    │   │   └── creditCard.js: Credit card component (inspired by Codepen Snippet - https://codepen.io/FilipVitas/pen/ddLVZx)
    │   ├── dashboard
    │   │   ├── dashboard.js
    │   │   └── dashboardLayout.js
    │   └── login
    │       ├── login.css
    │       └── login.js
    ├── contexts
    │   └── userContext.js
    ├── index.css
    ├── index.js
    ├── logo.svg
    ├── mocks
    │   ├── transactionsMock.js: Transaction util. Create random list of transactions to populate transaction list for user
    │   ├── userAccountsMock.js: User account details. Sets initial balance and withdrawl limit for mocked users
    │   └── userMock.js: User list. Last Names and Pins
```