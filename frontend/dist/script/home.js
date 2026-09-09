import { getBooks } from "./booklog.js";
const logOutButton = document.getElementById("log-out");
logOutButton?.addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = "index.html";
});
if (logOutButton && sessionStorage.getItem("guest") === "true") {
    logOutButton.style.display = "none";
}
document.getElementById("view-books")?.addEventListener("click", () => {
    window.location.href = "books.html";
});
document.getElementById("book-wishlist")?.addEventListener("click", () => {
    window.location.href = "wishlist.html";
});
document.getElementById("add-book")?.addEventListener("click", () => {
    window.location.href = "newbook.html";
});
document.addEventListener("DOMContentLoaded", () => {
    const bookContainer = document.getElementById("book-container");
    if (!bookContainer)
        return;
    const currentBooks = getBooks().filter((book) => book.reading);
    bookContainer.innerHTML = currentBooks.length > 1 ?
        "<h2>Current Book(s):</h2>"
        : "<h2>Current Book:</h2>";
    currentBooks.forEach((book) => {
        const bookListing = document.createElement("div");
        bookListing.className = "book";
        if (book.cover) {
            bookListing.innerHTML += `
                <img class="book-cover" 
                src="${book.cover}"
                alt="Book Cover">
            `;
        }
        bookListing.innerHTML += `
            <h3><span class="bold">${book["book-name"]}</span></h3>
            <h4>by <span class="bold">${book["author-name"]}</span></h4>
        `;
        if (book.obtained === "borrowed" && book["date-due"]) {
            bookListing.innerHTML += `
                <h3><span class="bold">Due Date:
                ${book["date-due"].getMonth() + 1}/${book["date-due"].getUTCDate()}/${book["date-due"].getFullYear()}
                </span></h3>
            `;
        }
        bookListing.innerHTML += "<hr>";
        bookContainer.appendChild(bookListing);
    });
});
