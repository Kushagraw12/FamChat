# FamChat
A Real-time Messaging app to chat and enjoy with your firends and family!

## Authentication
- Google Authentication
- Implemented using Firebase Google OAuth

## Chat
- Once the user is signed in, he will be able to view different groups, where he can go and connect with people.
- This application also enables people to create new rooms as per their requirement. They can ask people to come and talk in the same room. 
- To join an existing conversation, all they have to do and click on the room they want to join. The users can see the existing conversations and can continue to that.
- To create a new room, they are required to click on the plus sign and enter the room name of their choice, and boom a new room will be created.
- Along with text messages, they can also send emojis, which adds life to the conversation.
<br/>

## TECHSTACK

**FRONTEND** - ReactJS, Material UI

**BACKEND** - Firebase

## Running the project :sparkles:
- Before cloning the project make sure you have created a firebase project on
[Firebase Console](http://console.firebase.google.com)

- To clone this repository run:

```sh
$ git clone https://github.com/Kushagraw12/FamChat.git
```

- Head inside the cloned folder and install the dependencies using NPM

```sh
$ cd FamChat
$ yarn OR npm install
```

- Next create a .env file in the root of the project directory, this is where you
will put all your firebase config keys. 
- Go to Firebase console and select the
project you just created, Select Add App and select Web, follow the on-screen
instructions until Firebase provides you with a config object, take each
property of the provided object and fill these fields inside the ```.env``` file:

```
REACT_APP_API_KEY =
REACT_APP_AUTH_DOMAIN =
REACT_APP_DB_URL =
REACT_APP_PROJECT_ID =
REACT_APP_STORAGE_BUCKET =
REACT_APP_SENDER_ID =
REACT_APP_APP_ID =
REACT_APP_MEAS_ID =
```
### Start the project:

```
yarn start 
```
OR 
```
npm start
```

- This command runs the app in the development mode. 
- At [http://localhost:3000](http://localhost:3000)
- The page will auto-reload if you make changes in the code.
- Enjoy the app! :)

```python
print("Happy Codding!")
```
