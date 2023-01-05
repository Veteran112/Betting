# Finresi Frontend

This website is for use by real estate and financial business entities and is not intended for individual consumers or customers.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Rules
### `variable naming rule`
Variables should be lower camel case. \
for ex- loanDetails, pricingLoan
### `CSS Class naming rule`
class names should be linked with '-' \
for ex- .pricing-details {}
### `Others`
functions' names should be lower camel case. \
components' names should be upper camel case. \
API Request body variables should be upper camel case. ``ex- Citizenship, not citizenship``
### `API Service`
All Restful API calls should use getAPIService from ``services\apiSeervices``
