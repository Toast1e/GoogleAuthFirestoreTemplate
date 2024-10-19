# Google Authentication and Firestore Template

### This is a simple template using GoogleAuth and Firestore Database

This project demonstrates a simple integration of Google Authentication with Firebase Firestore.
It allows users to sign in via Google, insert, update, delete, and fetch data from Firestore.
The application is built using HTML, JavaScript (with Firebase SDK)

## Features

- Google Sign-In Authentication
- CRUD operations (Create, Read, Update, Delete) on Firestore documents
- Displays user-specific data in a table format
- Loading spinner to indicate data fetch/update process

## Steps to Run the Project

1. Clone the repository
   git clone [https://github.com/Toast1e/GoogleAuthFirestoreTemplate.git](https://github.com/Toast1e/GoogleAuthFirestoreTemplate.git)

2. Set up Firebase Project
   Go to the Firebase Console and create a new Firebase project.
   Navigate to Authentication in the left menu, and click Set up sign-in method.
   Enable Google as a sign-in provider and set up the necessary credentials.
   Navigate to Firestore Database under Build and click Create Database to initialize Firestore in your project.
3. Add Firebase SDK to Your Project
   The Firebase SDK has already been included in this project.
   Ensure you have added your Firebase configuration to the firebaseConfig in script.js:

```sh
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-auth-domain",
  projectId: "your-project-id",
  storageBucket: "your-storage-bucket",
  messagingSenderId: "your-messaging-sender-id",
  appId: "your-app-id",
  measurementId: "your-measurement-id"
};
```

Replace the values with those from your Firebase project's Settings

#### Explanation

| Part         | Explained                                                                                            |
| ------------ | ---------------------------------------------------------------------------------------------------- |
| CustomIDTest | This will store documents with custom IDs.                                                           |
| TestListData | This will store documents with auto-generated IDs. Each document should contain the following fields |
| DocID        | A string (optional for auto-ID docs)                                                                 |
| Name         | A string (user’s name)                                                                               |
| Surname      | A string (user’s surname)                                                                            |
| Gender       | A string (user’s gender)                                                                             |
| userId       | A string (storing the user’s unique Firebase ID)                                                     |

4. Open the Project
   Open the index.html file in a browser to see the Google Sign-In button and the Firestore-connected table. Sign in using a Google account, and start testing the features (insert, update, delete, and fetch data).

## Project Structure

```sh
index.html: The main page with the Google Sign-In button and input form for Firestore operations.
script.js: The JavaScript file handling Firebase Authentication, Firestore interactions, and DOM updates.
styles.css: Optional styling for the UI.
```

#### Key JavaScript Methods

```sh
userSignIn(): Initiates Google Sign-In and retrieves the user's Google profile.
userSignOut(): Signs out the current user.
AddDocument_AutoID(): Adds a new document to the TestListData collection with an auto-generated ID.
AddDocument_CustomID(): Adds a document to the CustomIDTest collection with a custom ID.
GetADocument(): Retrieves a specific document from Firestore based on the user-provided document ID.
UpdateFieldInDoc(): Updates a document in the CustomIDTest collection.
DeleteDocument(): Deletes a document from the CustomIDTest collection.
FetchAllDocumentsForUser(): Fetches all documents associated with the current user's userId from Firestore and displays them in the table.
```

#### Firestore Setup

Enable Firestore Database in the Firebase Console.
Ensure the Firestore security rules allow authenticated users to read/write their own data.
Example security rules for Firestore:

```sh
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

## License

MIT

**Free Software, Hell Yeah!**
