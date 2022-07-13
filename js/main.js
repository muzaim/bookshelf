document.addEventListener("DOMContentLoaded", function () {
  renderBookList();
  const submitForm = document.getElementById("inputBook");
  submitForm.addEventListener("submit", function (event) {
    location.reload();
    addTodo();
    renderBookList();
  });
});
