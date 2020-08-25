let library = document.getElementById("library");

let books = [];

class Book {
    constructor(title,author,pages,read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
        this.isRead = this.read ? 'read it.' : 'not read it.';
    }
}

const addBook = (title,author,pages,read) => {
    let newBook = new Book(title,author,pages,read);
    books.push(newBook);
}

const render = () => {
    library.innerHtml = '';
    for (book in books){
        //create div
        let containerDiv = document.createElement('div');
        //append div to library
        library.appendChild(containerDiv);
        //give div a bootstrap class card
        containerDiv.classList.add('card');
        containerDiv.classList.add('bookCard');

        //create title
        let bookTitle = document.createElement('h3');
        //append title to div
        containerDiv.appendChild(bookTitle);
        //give title class card-title
        bookTitle.classList.add('card-title');
        //give title text
        bookTitle.textContent = books[book].title;

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

    }
}

let thisbook = addBook('Book1','me',44,true);
let thatbook = addBook('Book2','you',65,false);
let anotherbook = addBook('Book3','someone',99,false);
let fourhtbook= addBook('Book4','a person',4,true);

document.addEventListener("DOMContentLoaded", render);