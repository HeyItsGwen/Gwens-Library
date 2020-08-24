let library = [];

class Book {
    constructor(title,author,pages,read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
        this.isRead = this.read ? 'read it.' : 'not read it.';
    }
    info() {
        return this.title + ' by '+this.author+' is '+this.pages+' pages long, and i have '+this.isRead;
    };
}

const addBook = (title,author,pages,read) => {
    let newBook = new Book(title,author,pages,read);
    library.push(newBook);
}

const render = () => {
    
}

let thisbook = addBook('book1','me',44,true);
let thatbook = addBook('book2','you',65,false);
let anotherbook = addBook('book3','someone',99,false);
let fourhtbook= addBook('book4','a person',4,true);

