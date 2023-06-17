# Google Oauth

## About

<br>

This is Google Oauth Backend if any Node.js developer wants to add in own project so they can easily use this repo.

<br>

## Clone Repository

```
git clone https://github.com/Amanmandal-M/GoogleOauth.git
```

<br>

## Installation

```
npm install
```

<strong>Note : </strong> Don't need to install packages if you only use this command all the packages automatically install if you want to add more packages then you have to write this command `npm install <your package name>`.

## Start the Backend server 

```
npm run start

npm run server

node index.js

nodemon start

nodemon index.js
```

<strong>Note : </strong> You can use any of them .

<br>

##  MVC Structure

```
├── index.js
├── configs
|    └── authDb.js
├── models
|    └── authModel.js
├── routes
|    └── authRoute.js
```

<strong>Note : </strong> 

- Before doing anything first create `.env` file and put :
    - `PORT = <Your PORT Number>`
    - `MONGO_URI            = <Your MONGO URI>`
    - `GOOGLE_CLIENT_ID     = <Your GOOGLE Client ID>`
    - `GOOGLE_CLIENT_SECRET = <Your GOOGLE Client Key Secret>` 
    - `CLIENT_URL           = <${Your Base URL where your server is running , e.g. http://localhost:8080}/auth/google/callback`>
    - `SESSION_KEY          =  <Your Session key e.g. anything` >`

<br>

## Schema Design

<br>

<h3><strong>User Schema</strong><h3>

```
{
  GoogleId: String,
  Name: String,
  Email: String,
  ProfileUrl: String,
  isVerifiedEmail: Boolean,
}
```

- It is only for storing data of authenticated user.

<br/>

## To generate your own client ID, client secret, and callback URL for Google OAuth, you'll need to follow the steps below:

<br>

- Go to the Google Cloud Console: Visit the Google Cloud Console at https://console.cloud.google.com/ and sign in with your Google account.

- Create a new project or select an existing one: If you don't have a project yet, create a new one by clicking the project dropdown in the top navigation bar and selecting "New Project." If you have an existing project, select it from the dropdown.

- Enable the necessary APIs: In the Google Cloud Console, navigate to your project's dashboard and click on "APIs & Services" > "Library" in the left sidebar. Search for "Google+ API" and "Google Identity Toolkit API" and enable them for your project.

- Configure the OAuth consent screen: In the Google Cloud Console, go to "APIs & Services" > "OAuth consent screen" in the left sidebar. Select the user type you want to create the consent screen for (e.g., Internal or External) and provide the necessary information, such as the application name and authorized domains. Save the changes.

- Create OAuth credentials: In the Google Cloud Console, go to "APIs & Services" > "Credentials" in the left sidebar. Click on the "Create Credentials" button and select "OAuth client ID" from the dropdown.

- Configure the OAuth client ID:

    - Choose the application type: Select "Web application" or the appropriate option for your project.
    - Authorized JavaScript origins: Enter the base URL of your Node.js application (e.g., http://localhost:8080).
    - Authorized redirect URIs: Specify the callback URL where Google will redirect the user after authentication (e.g., http://localhost:8080/auth/google/callback).
    - Click on the "Create" button.
    - Obtain the generated credentials:

- After creating the OAuth client ID, you will see a modal window with your client ID and client secret.
- Copy the generated client ID and client secret and replace the placeholders 'YOUR_CLIENT_ID' and 'YOUR_CLIENT_SECRET' in your Node.js code.
- Set the callback URL:

- Replace 'YOUR_CALLBACK_URL' in your Node.js code with the actual callback URL you configured in the Google Cloud Console (e.g., http://localhost:3000/auth/google/callback).

By following these steps, you will generate your own client ID, client secret, and callback URL for Google OAuth, which you can then use in your Node.js project. Remember to keep your client secret secure and avoid sharing it publicly.