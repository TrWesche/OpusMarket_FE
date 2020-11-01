# OpusMarket

## Tech Stack:
### Frontend:
- React
  - Routing - react-router-dom
- Redux
  - React integration - react-redux
  - Persistence (Reduce Resource Loads & Handle Anonymous Carts) - redux-persist
  - Asynchronous Calls - redux-thunk
- Styling: MaterialUI or Standard Bootstrap (not Reactstrap)
- API Calls: Axios

### Backend:
- Node.js
- Express.js
- Postgres.sql

## Focus:
Elements of Front-end and Back-end work with a front-end bias.
- Back End:
  - Source & Potentially modify an ecommerce site dataset (data must have a “creator” column at a minimum)
  - Build Architecture for “Creator Pages”
- Front End:
  - Create UX which handles standard eCommerce flows / jobs to be done.  Full Structure to be defined via mapping user-flows.
  - Example User Flow: 
    - User Navigates to Site Homepage
      - Components: Homepage, Search Bar, Hero/Ad Space, Popular Items - 1
    - User Navigates to Registration
      - Components: User Registration Form
    - User Completes Form and is Redirected back to Site Homepage
      - Components: Homepage – Sub-components: Search bar, Hero/Ad Space, Recently Viewed - 1
    - User Navigates to Products Home Page
      - Components: Products Home – Sub-components: Search bar, Hero/Ad Space, Popular Items – 1
    - User Searches for a Product
      - Components: Products List – Sub-Components: Product Card
    - User Selects a Product
      - Components: Product Hero, Reviews, Add-to-Cart, About The Creator / Company Brief
    - User Navigates to About the Creator Details
      - Components: Creator Hero, Creator Upcoming Events, Products List, Product Quick View
    - User Adds Creator Product(s) to Cart
      - -- Update Navbar Cart
    - User Navigates to Cart
      - Components: Products List, Cart Summary, Checkout
    - User Proceeds to Checkout
      - Components: Billing Details, Shipping Details
    - User Completes Purchase
      - Components: Order Summary, Thank You Card

## Application Type:
Responsive Website

## Project Goal:
The eCommerce website will help individual artists and creators sell their products and develop connections with prospective buyers by providing both a comprehensive eCommerce store experience as well as unique functionalities enabling them to interact with their customers and build a community around their brand via personal landing pages, Live AMA and collaboration sessions hosted through their personal page, and more.

## User Demographics:
Niche online shoppers looking for unique, hand built pieces.  LIkely to be less cost sensitive and to value developing emotional connections with brands/creators.

## Data Source:
Product and User data will be hosted locally and accessed through custom built APIs. The intent is to populate the product database with publicly available data fitted to the project need.

### Additional APIs include:
- Stripe / Square – eCommerce / Payment Processing Functionality (will be setup with faked out data to mimic the appearance of full operability)  
  - https://developer.squareup.com/us/en
  - https://stripe.com/docs/api
- Discord / Slack / Twitch: For low latency text & voice chat
  - https://discord.com/developers/docs/intro 
- Azure Cognitive Services - Cognitive / Intelligent Search (Potential - Bing Entity Search, Bing Autosuggest)
  - https://azure.microsoft.com/en-us/services/cognitive-services/#api 
  
## Project Approach:
### High Level DB Schema:
- Products Table:
  - Id, Name, Category, Description, Image URL, Price, Rating, Brand/Creator Id
- Product Reviews Table:
  - Id, Product Id, Reviewer Id, Rating, Review Text
- Brand/Creators Table:
  - Id, BrandName, Logo Image URL, emailAddress, Location, Description
- Events Table:
  - Id, Creator Id, Event Type, Event URL
- User Table
  - Id, First Name, Last Name, Email, BrandId
- Billing Information
  - Id, UserId, Payment Type, Payment Number, Exp Date
- Shipping Information
  - Id, UserId, Street Address, City, State, Country, Postal Code
- Orders Table
  - Id, Destination Address, Method of Payment, Total Cost, Shipping Notes
- Order-Products
  - Id, Order ID, Product ID, Quantity

### Potential API issues
- Inconsistent Entries in the Product Fields, especially with entries in Category and Image urls.
- Appropriately securing the critical channels for payments.

### Sensitive Information
- User Personally Identifiable information and Critical Billing data needs to be secured (User Table, Billing Information, Shipping Information).

### App Functionalities
- App will include:
  - Full end-to-end eCommerce capabilities
    - Product Browse/Search
    - Shopping Cart
    - Ordering
    - Payment Processing
  -  The ability for Brands/Creators to interact with their audience
    - Personal brand pages
    - Event Listings
    - Web based text/voice/video event streams (stretch)

### User Flow
- See sample user flow above

### Features & Stretch Goals
- Stretch Goals:
  - Voice & Video Chat Integration
  - Bing Cognitive Search Integration
- Features:
  - eCommerce Store w/ Shopping Cart & Payment Processing
  - Creator Pages
  - Events / Social Options


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
