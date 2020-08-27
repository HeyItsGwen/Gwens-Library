let library = document.getElementById("library");
let form = document.getElementById('book-form')
let addBookButton = document.getElementById('add-book-button');
let cancelButton = document.getElementById('cancel-button');
let removeButtonDOM = document.getElementById('remove-button');
let submitButton = document.getElementById('submit-button');
let loginButton = document.getElementById('login');
let logoutButton = document.getElementById('logout');

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBD5pe1KLgX7E3mfWEPFIgOzjYEcwExt4s",
    authDomain: "gwens-library.firebaseapp.com",
    databaseURL: "https://gwens-library.firebaseio.com",
    projectId: "gwens-library",
    storageBucket: "gwens-library.appspot.com",
    messagingSenderId: "896544782577",
    appId: "1:896544782577:web:23127a4242ebd128311150",
    measurementId: "G-Y1VCJEV1YJ"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var database = firebase.database();
var ref = database.ref("index");
var indexRef = ref.child('books-holder');
var booksRef = indexRef.child('books');

var provider = new firebase.auth.GoogleAuthProvider();

let books = {};

document.getElementById('read-input').checked = false;

class Book {
    constructor(title,author,pages,read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
}

const addBook = (title,author,pages,read) => {
    let newBook = new Book(title,author,pages,read);
    books[title] = newBook;
    indexRef.set({
        books
    });
}

const render = () => {
    library.textContent = '';
    for (book in books){
        //create div
        let containerDiv = document.createElement('div');
        //append div to library
        library.appendChild(containerDiv);
        //give div a bootstrap class card
        containerDiv.classList.add('card');
        containerDiv.classList.add('bookCard');

        //create title
        let bookTitle = document.createElement('h2');
        //append title to div
        containerDiv.appendChild(bookTitle);
        //give title class card-title
        bookTitle.classList.add('card-title');
        //give title text
        bookTitle.textContent = books[book].title;

        //create author
        let author = document.createElement('p');
        //append author to div
        containerDiv.appendChild(author);
        //give author class card-subtitle
        author.classList.add('card-subtitle');
        //give author text
        author.textContent = 'By ' + books[book].author;

        //create page count
        let pageCount = document.createElement('p');
        //append page count to div
        containerDiv.appendChild(pageCount);
        //give page count class
        pageCount.classList.add('pageCount');
        //give page count text
        pageCount.textContent = books[book].pages + ' pages.';
        
        //create read status
        let read = document.createElement('p');
        //append read to div
        containerDiv.appendChild(read);
        //give read status class
        read.classList.add('readStatus');
        //give read status text
        read.textContent = books[book].read ? 'You\'ve read this book.' : 'You haven\'t read this book';

        //create remove book button
        let removeButton = document.createElement('button');
        //append to div
        containerDiv.appendChild(removeButton);
        //give button class btn btn-danger
        removeButton.classList.add('btn');
        removeButton.classList.add('btn-danger');
        removeButton.setAttribute('id','remove-button')
        //give button text
        removeButton.textContent = 'remove';
        //give button book array data
        removeButton.setAttribute('data-arrayLoc', book);
        removeButton.setAttribute('onCLick','removeBook(this)');
    }
}


booksRef.on('value', function(snapshot) {
    //console.log(snapshot.val());
    let stuff = snapshot.val();
    for (book in stuff){
        let title = stuff[book].title;
        books[title] = stuff[book];
        console.log(stuff[book]);
    }
    render();
    }, function(errorObject){
        console.log('The read failed: ' + errorObject.code);
    }
);

const removeDNone = () => {
    form.classList.add('d-flex');
    form.classList.remove('d-none');
    addBookButton.classList.add('d-none');
}

const addDNone = () => {
    form.classList.add('d-none');
    form.classList.remove('d-flex');
    addBookButton.classList.remove('d-none');
}

const removeBook = (element) => {
    let location = element.getAttribute('data-arrayLoc');
    delete books[location];
    var indexRef = ref.child('books-holder');
    indexRef.set({
        books
    });
    render();
}

submitButton.addEventListener('click', () => {
    let title = document.getElementById('title-input').value;
    let author = document.getElementById('author-input').value;
    let pages = document.getElementById('page-input').value;
    let read = document.getElementById('read-input').checked ? true : false;

    if (title == '' || author == '' || pages == ''){
        console.log('warning');
    } else {
        let newBook = addBook(title,author,pages,read);
        form.reset();
        addDNone();
        render();
    }
});

const loginRedirect = () => {
    firebase.auth().signInWithRedirect(provider);
    console.log('hello');
}

loginButton.addEventListener('click', loginRedirect)

firebase.auth().getRedirectResult().then(function(result) {
    if (result.credential) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      console.log(token);
    }
    // The signed-in user info.
    var user = result.user;
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
  
const logout = () => {
    firebase.auth().signOut().then(function() {
        // Sign-out successful.
      }).catch(function(error) {
        // An error happened.
      });
      
}

logoutButton.addEventListener('click',logout);

render();
addBookButton.addEventListener("click", removeDNone);
cancelButton.addEventListener('click',addDNone);