# Bangladesh Map Coverage

A full stack JS project based on the MERN stack of Bangladesh Map that can be used easily within organization and teams to keep track of employees/users and how much of the country they've travelled.

## Live Website

```http
  http://fierce-refuge-94530.herokuapp.com/
```

#### Testing Credentials

Username
```
  Hagrid
```
Password
```
  333
```

## Demo

#### Desktop View

![Website Desktop Image](https://i.imgur.com/27bPILg.png)

#### Mobile View

![Website Mobile Image](https://i.imgur.com/I9B7YJ4.png)

#### Video of Features

[![BD Map Coverage](https://i.imgur.com/k8EMukl.png)](https://www.youtube.com/watch?v=AA_GDKjWJAs "BD Map Coverage")

## Tech Stack

**Client:** React, Material UI

**Server:** Node, Express

**Database:** MongoDB

**Image Hosting:** Amazon S3

## Features

-   All districts of Bangladesh in SVG path
-   Employees can be selected from easy select menu
-   Images uploaded to Amazon S3 bucket
-   Instant coloring of map based on number of times district visited
-   Counters and visit stats are updated realtime
-   Desktop and Mobile View ready

## Installation

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

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`AWS_ACCESS_KEY_ID` - Your AWS access key

`AWS_SECRET_ACCESS_KEY` - - Your AWS secret access key

`MONGODB_URI` - Your URL to the production MongoDB

`MONGODB_URI_TEST` - Your URL to the development MongoDB

`SECRET` - Your string for JWT token.

## API Reference

#### Get all district paths and visit count

```http
  GET /api/districts
```

#### Get Image Upload URL

```http
  GET /api/imageupload
```

| Header  | Type     | Description                              |
| :------ | :------- | :--------------------------------------- |
| `token` | `string` | **Required**. login token to verify user |

#### Get all Users

```http
  GET /api/users
```

#### Get all completed visits

```http
  GET /api/visit
```

| Header  | Type     | Description                              |
| :------ | :------- | :--------------------------------------- |
| `token` | `string` | **Required**. login token to verify user |

#### District update

```http
  PUT /api/districts/:id
```

| Parameter | Type     | Description                                           |
| :-------- | :------- | :---------------------------------------------------- |
| `id`      | `string` | **Required**. id of district that needs to be updated |

#### User Login

```http
  POST /api/login
```

#### Add Visit

```http
  POST /api/visit
```

## Deployment

To deploy this project run

```bash
  npm run build
  npm run start
```

## Acknowledgements

-   [Full-Stack Open](https://fullstackopen.com/en/) from the University of Helsinki provided a lot of the foundation this is based on.
-   The project was based on this [boilerplate](https://github.com/fullstack-hy2020/create-app) code and structure.

## License

[ISC](https://choosealicense.com/licenses/isc/)

## Authors

-   [@Ishmam156](https://github.com/Ishmam156)

## Contributing

Contributions are always welcome!

Kindly generate a `pull request` with your contribution.

## Feedback

If you have any feedback, please reach out to me at ishmam156@gmail.com
