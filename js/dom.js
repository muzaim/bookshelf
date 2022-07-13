// NEXT TODO IS
// id di tiap tiap buku ditambah

const INCOMPLETED_READ = "incompleteBookshelfList";
const COMPLETED_READ = "completeBookshelfList";
const localStorageKey = "DATA_BUKU";
let boko = [];

function checkRead() {
  const inputBookIsComplete = document.getElementById("inputBookIsComplete");
  const spanSubmit = document.getElementById("spanSubmit");
  if (inputBookIsComplete.checked) {
    spanSubmit.innerText = "Selesai dibaca";
  } else {
    spanSubmit.innerText = "Belum Selesai dibaca";
  }
}

function createButtonTemplate(buttonType, text, eventListener) {
  const button = document.createElement("button");
  button.classList.add(buttonType);
  button.innerText = text;
  button.addEventListener("click", function (event) {
    eventListener(event);
  });
  return button;
}

function createDeleteButton() {
  return createButtonTemplate("red", "Hapus", function (event) {
    removeTask(event.target.parentElement.parentElement);
  });
}
function createUnCompleteButton() {
  return createButtonTemplate("green", "Selesai dibaca", function (event) {
    selesaiDibaca(event.target.parentElement.parentElement);
    removeTask(event.target.parentElement.parentElement);
  });
}

function createCompleteButton() {
  return createButtonTemplate(
    "green",
    "Belum Selesai dibaca",
    function (event) {
      belumSelesaiDibaca(event.target.parentElement.parentElement);
      removeTask(event.target.parentElement.parentElement);
    }
  );
}

function addTodo() {
  const incompletedTODOList = document.getElementById(INCOMPLETED_READ);
  const completedTODOList = document.getElementById(COMPLETED_READ);
  var angkaTambahan = Math.floor(Math.random() * 1000);
  const date = new Date();
  var id = Date.parse(date);
  id += angkaTambahan;
  const title = document.getElementById("inputBookTitle").value;
  const author = document.getElementById("inputBookAuthor").value;
  const year = parseInt(document.getElementById("inputBookYear").value);
  var isComplete = false;

  const inputBookIsComplete = document.getElementById("inputBookIsComplete");
  if (inputBookIsComplete.checked) {
    isComplete = true;
  }
  const arrTodo = { id, title, author, year, isComplete };
  const jsonTodo = JSON.stringify(arrTodo);
  const newBookData = {
    id,
    title,
    author,
    year,
    isComplete,
  };
  putBookList(newBookData);
  if (isComplete) {
    const todo = makeTodoComplete(title, author, year, isComplete);
    completedTODOList.append(todo);
  } else {
    const todo = makeTodoInComplete(title, author, year, isComplete);
    incompletedTODOList.append(todo);
  }
}

function makeTodoInComplete(title, author, year, isComplete) {
  const bookTitle = document.createElement("h3");
  bookTitle.innerText = title;

  const bookAuthor = document.createElement("p");
  bookAuthor.innerText = author;

  const bookYear = document.createElement("p");
  bookYear.innerText = year;

  const buttonIsComplete = createUnCompleteButton();
  const buttonDelete = createDeleteButton();

  const actionDiv = document.createElement("div");
  actionDiv.classList.add("action");
  actionDiv.append(buttonIsComplete, buttonDelete);

  const article = document.createElement("article");
  article.classList.add("book_item");
  article.append(bookTitle, bookAuthor, bookYear, actionDiv);

  return article;
}

function makeTodoComplete(title, author, year, isComplete) {
  const bookTitle = document.createElement("h3");
  bookTitle.innerText = title;

  const bookAuthor = document.createElement("p");
  bookAuthor.innerText = author;

  const bookYear = document.createElement("p");
  bookYear.innerText = year;

  const buttonIsComplete = createCompleteButton();
  const buttonDelete = createDeleteButton();

  const actionDiv = document.createElement("div");
  actionDiv.classList.add("action");
  actionDiv.append(buttonIsComplete, buttonDelete);

  const article = document.createElement("article");
  article.classList.add("book_item");
  article.append(bookTitle, bookAuthor, bookYear, actionDiv);

  return article;
}

function removeTask(taskElement) {
  taskElement.remove();
}

function selesaiDibaca(taskElement) {
  const completedTODOList = document.getElementById(COMPLETED_READ);
  const bookTitle = taskElement.querySelector(".book_item > h3").innerText;
  const bookAuthor =
    taskElement.querySelectorAll(".book_item > p")[0].innerText;
  const bookYear = taskElement.querySelectorAll(".book_item > p")[1].innerText;
  const isComplete = true;
  const todo = makeTodoComplete(bookTitle, bookAuthor, bookYear, isComplete);
  completedTODOList.append(todo);
  taskElement.remove();
}

function belumSelesaiDibaca(taskElement) {
  const unCompletedTODOList = document.getElementById(INCOMPLETED_READ);
  const bookTitle = taskElement.querySelector(".book_item > h3").innerText;
  const bookAuthor =
    taskElement.querySelectorAll(".book_item > p")[0].innerText;
  const bookYear = taskElement.querySelectorAll(".book_item > p")[1].innerText;
  const isComplete = false;
  const todo = makeTodoInComplete(bookTitle, bookAuthor, bookYear, isComplete);
  unCompletedTODOList.append(todo);
  taskElement.remove();
}

function checkForStorage() {
  return typeof Storage !== "undefined";
}

function putBookList(data) {
  if (checkForStorage()) {
    let dataBuku = [];
    if (localStorage.getItem(localStorageKey) === null) {
      dataBuku = [];
    } else {
      dataBuku = JSON.parse(localStorage.getItem(localStorageKey));
    }
    dataBuku.unshift(data);
    localStorage.setItem(localStorageKey, JSON.stringify(dataBuku));
  }
}

function getBookList() {
  if (checkForStorage()) {
    return JSON.parse(localStorage.getItem(localStorageKey)) || [];
  } else {
    return [];
  }
}

function renderBookList() {
  const bookData = getBookList();

  const bukuSelesai = document.querySelector("#completeBookshelfList");
  const bukuBelumSelesai = document.querySelector("#incompleteBookshelfList");
  bukuSelesai.innerHTML = "";
  bukuBelumSelesai.innerHTML = "";

  for (let book of bookData) {
    const selesai = book.isComplete;
    if (book.isComplete == true) {
      const action = document.createElement("div");
      action.classList.add("action");
      action.innerHTML += `<button class="green" onClick="moveToSelesaiDibaca(${book.id})">Belum selesai dibaca</button>`;
      action.innerHTML += `<button class="red" onClick="hapusBuku(${book.id})">Hapus</button>`;
      let item = document.createElement("div");
      item.classList.add("book_item");
      item.innerHTML += `<input type="hidden" value="${book.id}">`;
      item.innerHTML += `<h3>${book.title}</h3>`;
      item.innerHTML += `<p>${book.author}</p>`;
      item.innerHTML += `<p>${book.year}</p>`;
      item.append(action);

      bukuSelesai.appendChild(item);
    } else {
      const action = document.createElement("div");
      action.classList.add("action");
      action.innerHTML += `<button class="green" onClick="moveToBelumSelesaiDibaca(${book.id})">Selesai dibaca</button>`;
      action.innerHTML += `<button class="red" onClick="hapusBuku(${book.id})">Hapus</button>`;
      let item = document.createElement("div");
      item.classList.add("book_item");
      item.innerHTML += `<input type="hidden" value="${book.id}">`;
      item.innerHTML += `<h3>${book.title}</h3>`;
      item.innerHTML += `<p>${book.author}</p>`;
      item.innerHTML += `<p>${book.year}</p>`;
      item.append(action);

      bukuBelumSelesai.appendChild(item);
    }
  }
}

function hapusBuku(id) {
  alert("Buku berhasil dihapus");
  const coba = localStorage.getItem(localStorageKey);
  findIndexOfBuku(id);
}

function findIndexOfBuku(idnya) {
  const coba = localStorage.getItem(localStorageKey);
  const cobaJson = JSON.parse(coba);
  const index = cobaJson.findIndex((object) => {
    return object.id === idnya;
  });

  cobaJson.splice(index, 1);
  localStorage.setItem(localStorageKey, JSON.stringify(cobaJson));
  renderBookList();
}

function moveToSelesaiDibaca(idnya) {
  alert("Buku berhasil dipindah ke rak Selesai Dibaca");
  var coba = localStorage.getItem(localStorageKey);
  var cobaJson = JSON.parse(coba);
  var index = cobaJson.findIndex((object) => {
    return object.id === idnya;
  });

  cobaJson[index].isComplete = false;

  localStorage.setItem(localStorageKey, JSON.stringify(cobaJson));
  renderBookList();
}

function moveToBelumSelesaiDibaca(idnya) {
  alert("Buku berhasil dipindah ke rak Belum Selesai Dibaca");
  var coba = localStorage.getItem(localStorageKey);
  var cobaJson = JSON.parse(coba);
  var index = cobaJson.findIndex((object) => {
    return object.id === idnya;
  });

  cobaJson[index].isComplete = true;

  localStorage.setItem(localStorageKey, JSON.stringify(cobaJson));
  renderBookList();
}

function cari() {
  event.preventDefault();
  const incompletedTODOList = document.getElementById(INCOMPLETED_READ);
  const completedTODOList = document.getElementById(COMPLETED_READ);

  incompletedTODOList.parentNode.removeChild(incompletedTODOList);
  completedTODOList.parentNode.removeChild(completedTODOList);
  getJuduldanIsComplete();
}

function getJuduldanIsComplete() {
  const judul = document.getElementById("searchBookTitle").value;
  let daftarBuku = JSON.parse(localStorage.getItem(localStorageKey));
  let arrayBukuTrue = [];
  let arrayBukuFalse = [];
  if (judul == " ") {
    alert("masukkan kata pencarian terlebih dahulu!");
    location.reload();
  } else {
    for (let i = 0; i < daftarBuku.length; i++) {
      if (judul == daftarBuku[i].title) {
        if (daftarBuku[i].isComplete) {
          arrayBukuTrue.push(daftarBuku[i]);
          cariTrue(arrayBukuTrue);
        } else {
          arrayBukuFalse.push(daftarBuku[i]);
          cariFalse(arrayBukuFalse);
        }
      }
    }
  }

  document.getElementById("searchBookTitle").value = " ";
}

function cariTrue(book) {
  for (let index = 0; index < book.length; index++) {
    const section = document.getElementById("sectioncompleteBookshelfList");
    const bukuSelesai = document.createElement("div");
    bukuSelesai.classList.add("book_list");
    section.append(bukuSelesai);
    // const bukuSelesai = document.querySelector("#completeBookshelfList");
    const action = document.createElement("div");
    action.classList.add("action");
    action.innerHTML += `<button class="green" onClick="moveToSelesaiDibaca(${book[index].id})">Belum selesai dibaca</button>`;
    action.innerHTML += `<button class="red" onClick="hapusBuku(${book[index].id})">Hapus</button>`;
    let item = document.createElement("div");
    item.classList.add("book_item");
    item.innerHTML += `<input type="hidden" value="${book[index].id}">`;
    item.innerHTML += `<h3>${book[index].title}</h3>`;
    item.innerHTML += `<p>${book[index].author}</p>`;
    item.innerHTML += `<p>${book[index].year}</p>`;
    item.append(action);

    bukuSelesai.appendChild(item);
  }
}

function cariFalse(book) {
  for (let index = 0; index < book.length; index++) {
    const section = document.getElementById("sectionincompleteBookshelfList");
    const bukuSelesai = document.createElement("div");
    bukuSelesai.classList.add("book_list");
    section.append(bukuSelesai);
    // const bukuSelesai = document.querySelector("#completeBookshelfList");
    const action = document.createElement("div");
    action.classList.add("action");
    action.innerHTML += `<button class="green" onClick="moveToBelumSelesaiDibaca(${book[index].id})">Selesai dibaca</button>`;
    action.innerHTML += `<button class="red" onClick="hapusBuku(${book[index].id})">Hapus</button>`;
    let item = document.createElement("div");
    item.classList.add("book_item");
    item.innerHTML += `<input type="hidden" value="${book[index].id}">`;
    item.innerHTML += `<h3>${book[index].title}</h3>`;
    item.innerHTML += `<p>${book[index].author}</p>`;
    item.innerHTML += `<p>${book[index].year}</p>`;
    item.append(action);

    bukuSelesai.appendChild(item);
  }
}
