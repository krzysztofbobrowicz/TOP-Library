let booksGrid = document.querySelector('#booksGrid');
let addNewBookBtn = document.querySelector('#addBookBtn');
let submitbtn = document.querySelector('#submitBtn');
let bookModal = document.querySelector('.modal');
let submitBookBtn = document.querySelector('#submitBtn');
let submitBookForm = document.querySelector('#addBookForm');

let myLibrary = [
  // Library array
  {
    title: 'Buszujący w Zbożu',
    author: 'J.D. Salinger',
    releaseDate: 1963,
    pages: 500,
    index: 0,
  },
  {
    title: 'Harry Potter',
    author: 'J.K. Rowling',
    releaseDate: 1992,
    pages: 380,
    index: 1,
  },
  {
    title: 'Piraci z Karaibów',
    author: 'Tui T. Sutherland',
    releaseDate: 1967,
    pages: 300,
    index: 2,
  },
];

function Book(title, author, releaseDate, pages, index) {
  // Constructor
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.releaseDate = releaseDate;
  this.index = index;
}

addNewBookBtn.addEventListener('click', function () {
  bookModal.classList.add('active');
  document.querySelector('#title').value = '';
  document.querySelector('#author').value = '';
  document.querySelector('#releaseDate').value = '';
  document.querySelector('#pages').value = '';
});

submitBookForm.addEventListener('submit', e => submitBookToLibrary(e));

function submitBookToLibrary(e) {
  e.preventDefault();
  let title = document.querySelector('#title').value;
  let author = document.querySelector('#author').value;
  let releaseDate = document.querySelector('#releaseDate').value;
  let pages = document.querySelector('#pages').value;
  let index = myLibrary.length;
  const book = new Book(title, author, releaseDate, pages, index);
  myLibrary.push(book);
  displayBooksOnThePage();
}

function displayBooksOnThePage() {
  booksGrid.innerHTML = '';
  for (let i = 0; i < myLibrary.length; i++) {
    const newCard = document.createElement('div');
    newCard.classList = `book-card`;
    newCard.dataset.index = i;

    booksGrid.appendChild(newCard);

    const buttonElement = document.createElement('button');
    buttonElement.classList = 'remove_book_btn';
    buttonElement.innerText = 'x';
    newCard.appendChild(buttonElement);

    const titlePara = document.createElement('p');
    titlePara.innerHTML = `Title: ${myLibrary[i].title}`;
    newCard.appendChild(titlePara);

    const authorPara = document.createElement('p');
    authorPara.innerHTML = `Author: ${myLibrary[i].author}`;
    newCard.appendChild(authorPara);

    const releaseDatePara = document.createElement('p');
    releaseDatePara.innerHTML = `Release date: ${myLibrary[i].releaseDate}`;
    newCard.appendChild(releaseDatePara);

    const pagesPara = document.createElement('p');
    pagesPara.innerText = `Pages: ${myLibrary[i].pages}`;
    newCard.appendChild(pagesPara);
  }

  bookModal.classList.toggle('active');
  removeDesiredBook();
}

function removeDesiredBook() {
  let removeBookButtons = document.querySelectorAll('.remove_book_btn');
  removeBookButtons.forEach(button =>
    button.addEventListener('click', event => {
      for (let i = 0; i < myLibrary.length; i++) {
        const clickedIndex = parseInt(event.target.parentNode.dataset.index);
        event.target.parentNode.remove();
        myLibrary.splice(clickedIndex, 1);
        displayBooksOnThePage();
        return;
      }
    })
  );
}

function checkIfClickedOutside() {
  document.addEventListener('click', function (event) {
    const outsideClick = !bookModal.contains(event.target);
    if (outsideClick && !addNewBookBtn.contains(event.target)) {
      bookModal.classList.remove('active');
    }
  });
}

displayBooksOnThePage();
checkIfClickedOutside();
