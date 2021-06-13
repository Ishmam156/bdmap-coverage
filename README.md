# Bangladesh Map Coverage

A full stack JS project based on the MERN stack of Bangladesh Map that can be used easily within organization and teams to keep track of employees/users and how much of the country they've travelled.

### Website Demo (Desktop View)

![Website Desktop Image](https://i.imgur.com/27bPILg.png)

### Website Demo (Mobile View)

![Website Mobile Image](https://i.imgur.com/I9B7YJ4.png)

## Technology used

-   React on the front end
-   Express web framework
-   NodeJS web server
-   MongoDB as database
-   Amazon S3 Bucket for remote image hosting
-   Material UI as UI Kit and styling

## Set-up Instructions

-   For development, make sure to set up .env file with the appropriate information. The keys have been provided and the values need to be populated there. In most production solutions, the environment variables should be easy to provide globally.
-   It might be wise to set up 2 databases, one for development and one for production. The server side has been programmed to check the environment variable, and based on that it will either choose the production DB or the development DB.
-   The app currently is based on MongoDB. To start a boilerplate version of the app, a mongoDB Atlas account will be needed and the mongoose.js file can be used to set up the districts in the DB as well as the Employees in the DB. Further details are provided in the mongoose.js file.
-   Change the title of the website at the root level index.html file
-   The website uses JSON Web Token as a method of logging in user and maintaining tokens. Set up a secret key in the .env file which can be equal to any string you want.
-   Set up AWS S3 bucket to enable remote image uploading and add the access information in the .env file. This [video](https://www.youtube.com/watch?v=yGYeYJpRWPM) was of great help.
-   Change the global colors in `client/assets/custom.scss` to style the map accordingly. A main color is provided for the overall website as well as 3 color shades for the map ranging from 0 visits to 2 and more visits each district.
-   Change the global palette colors in `client/components/theme.js` to style the website accordingly. This can be done to ensure your organization or team's preferred color is used everywhere in the website.
-   Change the global long and short title of website in `client/util/common.js` to ensure website has the appropriate navbar title on desktop and mobile view.
-   Change the logo, favicon and loading gif in `client/assets` to ensure website has the common images that you want.
-   You can check out the `client/services` directory to see how the API URLs are set up. Ideally, the routes should work out of the box.
-   The project opts for useContext hook of React instead of implementing a solution with Redux. Looking into the MapContext file can provide a view of the globally accessible state and its values.

## Folder Structure

frontend / client

<pre>
.
├── assets
|   └── custom.scss
|   └── favicon
|   └── Loading.gif
|   └── Logo.png
├── components
|   ├── All Components in individual folders
|   |   └── index.js
|   └── App.js
|   └── ErrorBoundary.js
|   └── MapContext.js
|   └── Router.js
|   └── theme.js
├── hooks
|   └── useField.js
|   └── useScript.js
├── services
|   └── district.js
|   └── image.js
|   └── login.js
|   └── users.js
|   └── visit.js
├── util
|   └── common.js
|   └── district.js
└── index.js
</pre>

backend / server

<pre>
.
├── controllers
|   └── districtController.js
|   └── imageController.js
|   └── loginController.js
|   └── userController.js
|   └── visitController.js
├── middleware
|   └── errorMiddleware.js
├── models
|   └── districts.js
|   └── index.js
|   └── users.js
|   └── visits.js
├── requests
|   ├── login.rest
|   ├── visit.rest
├── util
|   ├── common.js
|   ├── customErrors.js
|   └── routes.js
└── index.js
</pre>

data / starter data

<pre>
.
└── bdDistrict.js
└── EmployeeList.js
</pre>

In addition to the above, these are the files in the root.

### root files

#### .eslintrc

`Eslint` checks for styles. This file makes it use airbnb rules with some modifications. Feel free to custom to your liking or even remove. Use eslint plugin for vscode to get information.

The .eslintignore file contains some folders / files that we don't want to be stylechecked.

#### babel.config.js

This config file basically tells it that we want to do React.

#### index.html

This is the template that will be turned to the html loaded by the browser first. You can throw in whatever you want, like google analytics scripts or meta tags such as this mobile friendly one. Make sure to change the `title` tag here based on your websites title.

#### index.js

This is the entrypoint when starting the application.

It has `dotenv` so you can use .env file in the root to hide your environment variables (.env is in the .gitignore)

It has `express-async-errors` so you can just let the error middleware catch errors.

The backend lives in `/api` route

Other requests than `/api` will go to the frontend

#### jsconfig.json

The project is using `module-alias` to help with requires in backend and `webpack` to help with imports in frontend. jsconfig.json helps visual studio code to understand what the imports are.

For frontend see webpack.config.js and, for example, client/index.js for examples with the requires (Components/...)

For backend see package.json and, for example, server/index.js for examples with the requires (@util/...)

#### mongoose.js

The file will allow the user to populate the backend database with data while running it through the command line like `node mongoose.js <password>`. You will need to provide the MongoDB URL inside the file and then initially run the District creation and then set up the Employee creation. Kindly look at the Employee Data file inside `data` directory to see how the database is expecting the values.

#### webpack.config.js

Webpack stuff.
From top to bottom:

-   Uses hot loading when in development mode
-   Has the aliases for frontend
-   Uses babel-loader for js files,
-   Uses style-loader, css-loader and sass-loader for the style file (custom.scss)
-   Uses file-loader for other files
-   You have process.env.NODE_ENV available in frontend code, (process.env.BUILT_AT has been useful as well, so it's available)
-   Use the index.html as a template and set up favicon from the assets.

#### common.js

config/common.js is for project wide common stuff. Such as "Are we in production or not" boolean inProduction. This is imported and exported by both client and server common.js.

client/util/common.js is for frontend wide common stuff, used with "Utilities/common" (includes everything from config/common.js)

server/util/common.js is for backend wide common stuff, used with "@util/common" (includes everything from config/common.js)

## Special Mentions

-   Full-Stack Open [course](https://fullstackopen.com/en/) from the University of Helsinki provided a lot of the foundation this is based on.
-   The project was based on this [boilerplate](https://github.com/fullstack-hy2020/create-app) code and structure.
