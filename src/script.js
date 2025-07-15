//search button event//
document.getElementById("genreSearchBtn").addEventListener("click", () =>{
    let genre = document.getElementById("genreSelect").value;
    let resultsSection = document.getElementById("results");
    //When clicked, it gets the value from the dropdown (e.g. "fantasy").

    // clear previous results//
    resultsSection.innerHTML = "";
    if(!genre){
        resultsSection.innerHTML = "<p>Please select a genre</p>";
        return;
    }

    //This line creates a URL for the Google Books API.
    let url = `https://www.googleapis.com/books/v1/volumes?q=subject:${genre}&maxResults=8`;
     
    //axious api//
    axios.get(url).then(response =>  {
        let books = response.data.items;
        if(!books || books.length === 0){
            resultsSection.innerHTML = "<p>No books found for this genre</p>";
            return;
        }
        books.forEach(book => {
        const info = book.volumeInfo;
        const title = info.title || "No title";
        const author = info.authors ? info.authors.join(", ") : "Unknown author";
        const thumbnail = info.imageLinks?.thumbnail || "";


        //We create a div for each book.
        const card = document.createElement("div");
        card.className = "book-card";
        card.innerHTML = `
          <img src="${thumbnail}" alt="${title} cover" />
          <h3>${title}</h3>
          <p><em>${author}</em></p>
        `;
        resultsSection.appendChild(card);
      });
    })
    .catch(error => {
      console.error("Error fetching books:", error);
      resultsSection.innerHTML = "<p>Oops! Something went wrong 😓</p>";
    });
});