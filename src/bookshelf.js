

window.addEventListener("DOMContentLoaded", () => {
  const wantToReadShelf = document.getElementById("wantToReadShelf");

  const savedBooks = JSON.parse(localStorage.getItem("wantToRead")) || [];

  savedBooks.forEach(book => {
    const card = document.createElement("div");
    card.className = "book-card";
    card.innerHTML = `
      <img src="${book.thumbnail}" alt="${book.title} cover" />
      <h3>${book.title}</h3>
      <p><em>${book.author}</em></p>
      <!-- You could add Move/Delete buttons here later -->
    `;

    wantToReadShelf.appendChild(card);
  });
});
