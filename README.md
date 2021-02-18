# OpusMarket - Frontend

## System Requirements:
- The OpusMarket Frontend is dependent on its partner backend project located at https://github.com/TrWesche/OpusMarket_BE.  Any deployment should include the backend server to provide data for the website to render on-screen.  All calls are handled via an API whose functionalities can be found under utils > apiOpusMarket.

## Deployment Instructions:
- The connection between the OpusMarket frontend and backend is secured via a Public/Private rsa key.  A key generator for these files has been included in the backend project (https://github.com/TrWesche/OpusMarket_BE) at keygen/key-gen.js.  Running this script will create two files: "id_rsa_priv.pem" and "id_rsa_pub.pem."  The public key should be copied into the "keys.example.js" file and that file renamed to keys.js to enable the frontend to decode encrypted cookies provided by the backend.
- The frontend is additionally dependent on 3 values contained in the ".env" of the frontend (note: These values cannot be updated live, any changes will require the React project to be recompiled).  
  - "REACT_APP_SQUARE_APP_ID" and "REACT_APP_SQUARE_LOC_ID" will require the user to create a api account with Square (https://developer.squareup.com/us/en) and duplicate their individual Application ID and Location ID to the applicable variable.
  - "REACT_APP_BASE_URL" is the root address for the connection with the API backend.  This should match the address of your deployment of the backend server.

## Sample Deployment:
- The OpusMarket Web Application is Currently Deployed at with Sample Data Loaded into the Backend: https://opusmarket.twesche.com/
  - Below are Sample Accounts for Purchasing and Merchant Users:
    - 6 Users Are Present - All with a password of "password"
      - cHylda@fakeprovider.com
      - bJonquil@fakeprovider.com
      - eMchumba@fakeprovider.com
      - sRasim@fakeprovider.com
      - aMarlies@fakeprovider.com
      - CAnita@fakeprovider.com
    - 20 Merchants Are Present - All with a password of "passwordpassword" (6 listed, see db.sql for full list)
      - support@graytable.com
      - support@bulbzy.com
      - support@glaazel.com
      - support@superlamp.com
      - support@techshoe.com
      - support@wearsly.com

## Tech Stack:
### Frontend:
- React
  - Routing - react-router-dom
- Redux
  - React integration - react-redux
  - Asynchronous Calls - redux-thunk
- Styling: MaterialUI
- API Calls: Axios
- Integrations: Square Payment Form

### Backend:
Link: https://github.com/TrWesche/OpusMarket_BE
- Node.js
- Express.js
- PostgreSQL
- Integrations: Square API

## About:
OpusMarket provides a fully functional eCommerce website experience split between two independent projects an API Served React Front-End and Express Webserver attached to a PostgreSQL Database.

### Application Functions:
- Public Access
  - Browse/Search Products
  - View Individual Products
  - Browse/Search Merchants
  - Add/Remove Products From Cart
- Merchant Users
  - Create/Update/Delete/Login/Logout Merchant Account
  - Create/Delete Products
    - Includes: Images, Product Name, Product Description, Product Pricing, Product Promotions, Product Coupons, Featured Products, Product Tags, Product Modifiers
  - Create Personal Web Store
    - Includes: Merchant Gatherings (Events), Featured Products, About Us Section
- Purchasing Users
  - Create/Update/Delete/Login/Logout Purchasing Account
  - Purchase Products via Square
  - View Previous Orders


### Sample Supported Purchase Flow & Generalized React Components:
  1. User Navigates to Site Homepage
  2. User Navigates to Registration
  3. User Completes Registration Form and is Redirected back to Site Homepage
  4. User Adds a Product from the Homepage Directly to Cart
  5. User Performs a Product Search from the Navbar and is returned relevant results
  6. User Opens Target Product Page, Selects Modifiers, and Adds to Cart
  7. User Performs a Merchant Search from the Navbar and is returned relevant results
  8. User Opens Merchant Store and Opens a Merchant's Featured Product
  9. User Adds Featured Product to Cart
  10. User Navigates to Cart and Applys Coupon to Product for which they have a coupon
  11. User Proceed to Checkout and Fills in their Credit Card Information
  12. Users Order is Processed and Payment Taken - Purchase Complete


### Implemented API(s):
- Square – eCommerce / Payment Processing Functionality (will be setup with faked out data to mimic the appearance of full operability)  
  - https://developer.squareup.com/us/en

### Future API(s) Integrations:
- Discord / Slack / Twitch: For low latency text & voice chat - Extend "Gathering" Functionality
  - https://discord.com/developers/docs/intro 
- Azure Cognitive Services - Cognitive / Intelligent Search (Potential - Bing Entity Search, Bing Autosuggest) - Improve Website Search Capability
  - https://azure.microsoft.com/en-us/services/cognitive-services/#api 



# This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
