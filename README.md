# Bangladesh Map Coverage

A full stack JS project based on the MERN stack of Bangladesh Map that can be used easily within organization and teams to keep track of employees/users and how much of the country they've travelled.

#### Website Demo (Desktop View)

![Website Desktop Image](https://i.imgur.com/27bPILg.png)

#### Website Demo (Mobile View)

![Website Mobile Image](https://i.imgur.com/I9B7YJ4.png)

#### Technology used

-   React on the front end
-   Express web framework
-   NodeJS web server
-   MongoDB as database
-   Amazon S3 Bucket for remote image hosting
-   Material UI as UI Kit and styling

## Folder Structure

frontend / client

<pre>
.
├── assets
|   ├── custom.scss
|   ├── favicon
|   └── Loading.gif
|   └── Logo.png
├── components
|   ├── All Compononents in individual folders
|   |   ├── index.js
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
|   └── messagesController.js
├── middleware
|   └── errorMiddleware.js
├── util
|   ├── common.js
|   ├── customErrors.js
|   └── routes.js
└── index.js
</pre>

Most of which is familiar through the course. In addition there are the files in the root.

## root files

#### .eslintrc

`Eslint` checks for styles. This file makes it use airbnb rules with some modifications. Feel free to custom to your liking or even remove. Use eslint plugin for vscode to get information.

The .eslintignore file contains some folders / files that we don't want to be stylechecked.

Consider using `prettier`!

#### babel.config.js

"Use next generation JavaScript, today." https://babeljs.io/

You've used `babel` since the beginning. Check [here](https://reactjs.org/docs/react-without-jsx.html) for more information. This config file basically tells it that we want to do React.

#### index.html

This is the template that will be turned to the html loaded by the browser first. You can throw in whatever you want, like google analytics scripts or meta tags such as this mobile friendly one:

```html
<meta name="viewport" content="width=device-width, initial-scale=1" />
```

#### index.js

This is the entrypoint when starting the application.

It has `dotenv` so you can use .env file in the root to hide your environment variables (.env is in the .gitignore)

It has `express-async-errors` so you can just let the error middleware catch errors. See server/controllers/messagesController.js for example with a custom error.

The backend lives in /api

`Chokidar` is for watching changes in backend files. Using nodemon would lead to webpack rebuilding frontend every time we make a change to a controller. The project uses nodemon to restart the server when files in the root change and restart may be required (see package.json).

Other requests than /api will go to the frontend

When not in production we want to use webpack dev & hot loading middlewares. They make it so that changes to frontend code are seen without refreshing the page.

In production it just serves the static files.

#### jsconfig.json

The boilerplate is using `module-alias` to help with requires in backend and `webpack` to help with imports in frontend. jsconfig.json helps visual studio code to understand what the imports are.

For frontend see webpack.config.js and, for example, client/index.js for examples with the requires (Components/...)

For backend see package.json and, for example, server/index.js for examples with the requires (@util/...)

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

### What are the common.js files?

config/common.js is for project wide common stuff. Such as "Are we in production or not" boolean inProduction. This is imported and exported by both client and server common.js.

client/util/common.js is for frontend wide common stuff, used with "Utilities/common" (includes everything from config/common.js)

server/util/common.js is for backend wide common stuff, used with "@util/common" (includes everything from config/common.js)

### What is custom.scss

Write your frontend custom styles there. https://stackoverflow.com/questions/46400443/what-is-the-difference-between-css-and-scss

## Stuff left out on purpose

Redux, GraphQL, database solution and css frameworks. You decide.
