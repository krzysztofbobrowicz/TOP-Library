let booksGrid = document.querySelector('#booksGrid');
let addNewBookBtn = document.querySelector('#addBookBtn');
let submitbtn = document.querySelector('#submitBtn');
let bookModal = document.querySelector('.modal');
let submitBookBtn = document.querySelector('#submitBtn');
let submitBookForm = document.querySelector('#addBookForm');
let emptyLibraryText = document.querySelector('#emptyLibraryText');
let modalBackdrop = document.querySelector('.modal-backdrop');

let myLibrary = [
  // Library arrary
];

class Book {
  constructor(title, author, releaseDate, pages, index) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.releaseDate = releaseDate;
    this.index = index;
  }
}

addNewBookBtn.addEventListener('click', function () {
  bookModal.classList.add('active');
  modalBackdrop.classList.add('show');
});

submitBookForm.addEventListener('submit', e => submitBookToLibrary(e));

function submitBookToLibrary(e) {
  e.preventDefault();
  bookModal.classList.toggle('active');
  modalBackdrop.classList.toggle('show');
  let title = document.querySelector('#title').value;
  let author = document.querySelector('#author').value;
  let releaseDate = document.querySelector('#releaseDate').value;
  let pages = document.querySelector('#pages').value;
  let index = myLibrary.length;

  const book = new Book(title, author, releaseDate, pages, index);
  myLibrary.push(book);
  document.querySelector('#title').value = '';
  document.querySelector('#author').value = '';
  document.querySelector('#releaseDate').value = '';
  document.querySelector('#pages').value = '';
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

  if (myLibrary.length <= 0) {
    emptyLibraryText.classList.add = 'gfdg';
    emptyLibraryText.hidden = false;
  } else {
    emptyLibraryText.hidden = true;
  }

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
      modalBackdrop.classList.remove('show');
      bookModal.classList.remove('active');
    }
  });
}

displayBooksOnThePage();
checkIfClickedOutside();
