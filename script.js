import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";

import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";

import {
  getFirestore,
  doc,
  getDocs,
  getDoc,
  setDoc,
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  deleteField,
} from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-auth-domain",
  projectId: "your-project-id",
  storageBucket: "your-storage-bucket",
  messagingSenderId: "your-messaging-sender-id",
  appId: "your-app-id",
  measurementId: "your-measurement-id",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();
const db = getFirestore();

const signInButton = document.getElementById("signInButton");
const signOutButton = document.getElementById("signOutButton");
const message = document.getElementById("message");
const userName = document.getElementById("userName");
const userEmail = document.getElementById("userEmail");

signOutButton.style.display = "none";
message.style.display = "none";

const userSignIn = async () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      console.log(user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
};

const userSignOut = async () => {
  signOut(auth)
    .then(() => {
      alert("You have signed out successfully!");
    })
    .catch((error) => {});
};

onAuthStateChanged(auth, (user) => {
  if (user) {
    signOutButton.style.display = "block";
    signInButton.style.display = "none";
    content.style.display = "block";
    message.style.display = "block";
    userName.innerHTML = user.displayName;
    userEmail.innerHTML = user.email;

    // Fetch the user's data after sign-in
    FetchAllDocumentsForUser();
  } else {
    signInButton.style.display = "block";
    signOutButton.style.display = "none";
    content.style.display = "none";
    message.style.display = "none";
  }
});

// References
let docID = document.getElementById("docID");
let nameBox = document.getElementById("nameBox");
let surnameBox = document.getElementById("surnameBox");
let genderBox = document.getElementById("genderBox");

let insertButton = document.getElementById("insertButton");
let selectButton = document.getElementById("selectButton");
let updateButton = document.getElementById("updateButton");
let deleteButton = document.getElementById("deleteButton");

// Add Doc
async function AddDocument_AutoID() {
  showSpinner();

  const user = auth.currentUser;
  var ref = collection(db, "TestListData");

  const docRef = await addDoc(ref, {
    Name: nameBox.value,
    Surname: surnameBox.value,
    Gender: genderBox.value,
    userId: user.uid,
  })
    .then(() => {
      alert("Data Added Successfully");
    })
    .catch((error) => {
      alert("Something went wrong: " + error);
    })
    .finally(() => {
      hideSpinner();
    });
}

async function AddDocument_CustomID() {
  showSpinner();

  const user = auth.currentUser;
  var ref = doc(db, "CustomIDTest", docID.value);

  await setDoc(ref, {
    DocID: docID.value,
    Name: nameBox.value,
    Surname: surnameBox.value,
    Gender: genderBox.value,
    userId: user.uid,
  })
    .then(() => {
      alert("Data Added Successfully");
    })
    .catch((error) => {
      alert("Something went wrong: " + error);
    })
    .finally(() => {
      hideSpinner();
    });
}

// Fetch Doc
async function GetADocument() {
  var ref = doc(db, "CustomIDTest", docID.value);
  const docSnap = await getDoc(ref);

  if (docSnap.exists()) {
    docID.value = docSnap.data().DocID;
    nameBox.value = docSnap.data().Name;
    surnameBox.value = docSnap.data().Surname;
    genderBox.value = docSnap.data().Gender;
  } else {
    alert("No Such Document Found");
  }
}

// Update Field In A Doc
async function UpdateFieldInDoc() {
  var ref = doc(db, "CustomIDTest", docID.value);

  await updateDoc(ref, {
    Name: nameBox.value,
    Surname: surnameBox.value,
    Gender: genderBox.value,
  })
    .then(() => {
      alert("Data Updated Successfully");
    })
    .catch((error) => {
      alert("Something went wrong: " + error);
    });
}

// Delete Doc
async function DeleteDocument() {
  var ref = doc(db, "CustomIDTest", docID.value);
  const docSnap = await getDoc(ref);

  if (!docSnap.exists()) {
    alert("Document Does Not Exist");
    return;
  }
  await deleteDoc(ref)
    .then(() => {
      alert("Data Deleted Successfully");
    })
    .catch((error) => {
      alert("Unexpected Error: " + error);
    });
}

// Event listener for the button click
document
  .getElementById("fetchDataButton")
  .addEventListener("click", FetchAllDocumentsForUser);

// Fetch all documents for the logged-in user
async function FetchAllDocumentsForUser() {
  showSpinner();

  const user = auth.currentUser;
  const querySnapshot = await getDocs(collection(db, "TestListData"));

  let tableBody = "";
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    if (data.userId === user.uid) {
      // Check if the userId matches the logged-in user
      tableBody += `<tr>
                      <td>${data.DocID}</td>
                      <td>${data.Name}</td>
                      <td>${data.Surname}</td>
                      <td>${data.Gender}</td>
                    </tr>`;
    }
  });

  // Display the data in a table
  document.getElementById("dataTableBody").innerHTML = tableBody;
  hideSpinner();
}

// Show Spinner On Load
function showSpinner() {
  document.getElementById("loadingSpinner").style.display = "block";
}

// Hide Spinner
function hideSpinner() {
  document.getElementById("loadingSpinner").style.display = "none";
}

// Event listeners
insertButton.addEventListener("click", AddDocument_AutoID);
selectButton.addEventListener("click", GetADocument);
updateButton.addEventListener("click", UpdateFieldInDoc);
deleteButton.addEventListener("click", DeleteDocument);

signInButton.addEventListener("click", userSignIn);
signOutButton.addEventListener("click", userSignOut);
