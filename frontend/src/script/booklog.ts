import { BoughtBook, BorrowedBook, AnyBook } from "./bookinterfaces";

const compareDates = (bookA: AnyBook, bookB: AnyBook) => {
    let dateA: Date;
    if(bookA.obtained === "borrowed") {
        dateA = bookA["date-borrowed"];
    } else if (bookA.obtained === "bought") {
        dateA = bookA["date-bought"];
    } else {
        return 0;
    }
    let dateB: Date;
    if(bookB.obtained === "borrowed") {
        dateB = bookB["date-borrowed"];
    } else if (bookB.obtained === "bought") {
        dateB = bookB["date-bought"];
    } else {
        return 0;
    }

    if(dateA > dateB) return -1;
    if(dateB > dateA) return 1;
    return 0;
}

const renderBooks = (
    books: AnyBook[], 
    month: Number = 0,
    year: Number = 0,
    obtained: string = "",
    author: string = ""
) => {
    const bookContainer = document.getElementById("book-container");
    if(!bookContainer) return;
    bookContainer.innerHTML = "";
    let bookYears: Number[] = [];
    books.forEach((book) => {
        const bookYear = book.obtained === "borrowed" ? 
            book["date-borrowed"].getFullYear() : book["date-bought"].getFullYear();
        if(!bookYears.includes(bookYear)) {
            bookYears.push(bookYear);
            const yearHeading = document.createElement("h2");
            const line = document.createElement("hr");
            yearHeading.className = "listing-year";
            yearHeading.innerHTML = `<span class="bold">${bookYear}: </span>`
            bookContainer.appendChild(yearHeading);
            bookContainer.appendChild(line);
        }

        const listing = document.createElement("div");
        listing.className = "book-listing";
        if(book.cover) {
            listing.innerHTML += `
                <img class="book-cover" 
                src="${book.cover}"
                alt="Book Cover"
                tabindex="0">
            `;
        } else {
            listing.style.gridTemplateColumns = "1fr 1fr";
        }
        listing.innerHTML += `
            <div class="book-info">
                <h3><span class="bold">${book["book-name"]}</span></h3>
                <h4>by <span class="bold">${book["author-name"]}</span></h4>
            </div>
        `;
        if(book.obtained === "borrowed") {
            listing.innerHTML += `
                <div class="when-obtained">
                    <h3><span class="bold">Borrowed On:</span></h3>
                    <h3>${book["date-borrowed"].getMonth() + 1}/${book["date-borrowed"].getDay() + 1}/${book["date-borrowed"].getFullYear()}</h3>
                </div>
            `;
        } else {
            listing.innerHTML += `
                <div class="when-obtained">
                    <h3><span class="bold">Obtained On:</span></h3>
                    <h3>
                    ${book["date-bought"].getMonth() + 1}/${book["date-bought"].getDay() + 1}/${book["date-bought"].getFullYear()}</h3>
                </div>
            `;
        }

        bookContainer.appendChild(listing);

    });
}

document.addEventListener("DOMContentLoaded", () => {
    const books = localStorage.getItem("local-books");
    if(!books) return;
    const bookArray: AnyBook[] = JSON.parse(books) || [];
    
    // Converting date objects
    bookArray.forEach((book: AnyBook) => {
        if (book.obtained === "bought") {
            book["date-bought"] = new Date(book["date-bought"]);
        } else {
            book["date-borrowed"] = new Date(book["date-borrowed"]);

            if (book["date-returned"]) {
                book["date-returned"] = new Date(book["date-returned"]);
            }
        }
    });

    bookArray.sort(compareDates);
    renderBooks(bookArray);
    const bookCovers = Array.from(document.querySelectorAll<HTMLImageElement>(".book-cover"));
    bookCovers.forEach((cover) => cover.addEventListener("click", () => {
        window.location.href = "updatebook.html";
    }));

});
