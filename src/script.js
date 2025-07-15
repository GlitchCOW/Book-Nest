// Genre search button
document.getElementById("genreSearchBtn").addEventListener("click", () => {
  const genre = document.getElementById("genreSelect").value;
  const resultsSection = document.getElementById("results");

  resultsSection.innerHTML = ""; // Clear previous results

  if (!genre) {
    resultsSection.innerHTML = "<p>Please select a genre 📚</p>";
    return;
  }

  const url = `https://www.googleapis.com/books/v1/volumes?q=subject:${genre}&maxResults=8`;

  axios.get(url)
    .then(response => {
      const books = response.data.items;
      if (!books || books.length === 0) {
        resultsSection.innerHTML = "<p>No books found for this genre 😢</p>";
        return;
      }

      books.forEach(book => {
        const info = book.volumeInfo;
        const title = info.title || "No title";
        const author = info.authors ? info.authors.join(", ") : "Unknown author";
        const thumbnail = info.imageLinks?.thumbnail || "";

        const card = document.createElement("div");
        card.className = "book-card";
        card.innerHTML = `
          <img src="${thumbnail}" alt="${title} cover" />
          <h3>${title}</h3>
          <p><em>${author}</em></p>
          <button class="add-to-shelf-btn">Add to Shelf</button>
        `;

        // Add book to localStorage on button click
        card.querySelector(".add-to-shelf-btn").addEventListener("click", () => {
          const bookData = {
            title: title,
            author: author,
            thumbnail: thumbnail
          };

          // Get current shelf or create new one
          const existingShelf = JSON.parse(localStorage.getItem("wantToRead")) || [];

          // Check for duplicates
          const isDuplicate = existingShelf.some(
            (b) => b.title === bookData.title && b.author === bookData.author
          );

          if (!isDuplicate) {
            existingShelf.push(bookData);
            localStorage.setItem("wantToRead", JSON.stringify(existingShelf));
            alert(`📖 "${title}" added to your Want to Read shelf!`);
          } else {
            alert(`⚠️ "${title}" is already in your shelf!`);
          }
        });

        resultsSection.appendChild(card);
      });
    })
    .catch(error => {
      console.error("Error fetching books:", error);
      resultsSection.innerHTML = "<p>Oops! Something went wrong 😓</p>";
    });
});

