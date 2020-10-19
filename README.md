This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Running the project
Before cloning the project make sure you have created a firebase project on
[Firebase Console](http://console.firebase.google.com)

To clone this repository run:

```sh
$ git clone https://github.com/Kushagraw12/React-Chat-App.git
```

Head inside the cloned folder and install the dependencies using NPM

```sh
$ cd React-Chat-App
$ yarn / npm install
```

Next create a .env file in the root of the project directory, this is where you
will put all your firebase config keys Go to Firebase console and select the
project you just created, Select Add App and select Web, follow the on-screen
instructions until Firebase provides you with a config object, take each
property of the provided object and put it inside of the .env file like this:

```
REACT_APP_API_KEY=
REACT_APP_AUTH_DOMAIN=
REACT_APP_DB_URL=
REACT_APP_PROJECT_ID=
REACT_APP_STORAGE_BUCKET=
REACT_APP_SENDER_ID=
REACT_APP_APP_ID=
REACT_APP_MEAS_ID=
```
Start the project:

```
yarn start / npm install
```

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.
