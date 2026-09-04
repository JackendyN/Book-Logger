import { BoughtBook, BorrowedBook, AnyBook } from "./bookinterfaces";

let bookArray: AnyBook[] = [];
const getBooks = (): AnyBook[] => {
    const books = localStorage.getItem("local-books");
    if (!books) return [];
    const parsedBooks = JSON.parse(books) || [];

    // Converting date objects
    parsedBooks.forEach((book: AnyBook) => {
        if (book.obtained === "bought") {
            book["date-bought"] = new Date(book["date-bought"]);
        } else {
            book["date-borrowed"] = new Date(book["date-borrowed"]);

            if (book["date-returned"]) {
                book["date-returned"] = new Date(book["date-returned"]);
            }
        }
    });

    return parsedBooks;
}

document.addEventListener("DOMContentLoaded", () => {
    bookArray = getBooks();
    renderBooks(bookArray);
});

// Comparing dates for chronological sorting
const compareDates = (bookA: AnyBook, bookB: AnyBook) => {
    let dateA: Date;
    if (bookA.obtained === "borrowed") {
        dateA = bookA["date-borrowed"];
    } else if (bookA.obtained === "bought") {
        dateA = bookA["date-bought"];
    } else {
        return 0;
    }
    let dateB: Date;
    if (bookB.obtained === "borrowed") {
        dateB = bookB["date-borrowed"];
    } else if (bookB.obtained === "bought") {
        dateB = bookB["date-bought"];
    } else {
        return 0;
    }

    return dateB.getTime() - dateA.getTime();
};

// Comparing the first letter of book names for alphabetical sorting
const compareLetters = (bookA: AnyBook, bookB: AnyBook) => {
    return (
        bookA["book-name"].toLowerCase().charCodeAt(0) -
        bookB["book-name"].toLowerCase().charCodeAt(0)
    );
};

let currentFilters: {
    month?: number,
    year?: number,
    borrowed: boolean,
    owned: boolean,
    author?: string
} = {
    borrowed: true,
    owned: true
};

const applyFilters = (books: AnyBook[]) => {
    let newBooks: AnyBook[] = books;
    if(Object.hasOwn(currentFilters, "year")) {
        newBooks = newBooks.filter((book) => {
            if (book.obtained === "borrowed") {
                return Object.hasOwn(currentFilters, "month")
                    ? book["date-borrowed"].getFullYear() === currentFilters.year 
                    && book["date-borrowed"].getMonth() + 1 === currentFilters.month
                    : book["date-borrowed"].getFullYear() === currentFilters.year;
            } else {
                return Object.hasOwn(currentFilters, "month")
                    ? book["date-bought"].getFullYear() === currentFilters.year
                    && book["date-bought"].getMonth() + 1 === currentFilters.month
                    : book["date-bought"].getFullYear() === currentFilters.year;
            }
        })
    }
    if(currentFilters.borrowed && !currentFilters.owned) {
        newBooks = newBooks.filter((book) => book.obtained === "borrowed")
    } else if(currentFilters.owned && !currentFilters.borrowed) {
        newBooks = newBooks.filter((book) => book.obtained === "bought")
    }
    if(Object.hasOwn(currentFilters, "author") && currentFilters.author) {
        const authorExp = new RegExp(currentFilters.author, "i");
        newBooks = newBooks.filter((book) => authorExp.test(book["author-name"]));
    }

    return newBooks;
}

const search = document.getElementById("search") as HTMLInputElement;
if (search)
    search.addEventListener("input", () => {
        const value = search.value;
        const termRegex: RegExp = new RegExp(value, "i");
        const filteredArray = bookArray.filter((book) => termRegex.test(book["book-name"]));
        renderBooks(filteredArray);
    });

let chronologicalButton = document.getElementById("chronological") as HTMLInputElement;

const changeSortMethod = () => {
    let newMethod = chronologicalButton.checked
        ? "chronological"
        : "alphabetical";
    sortMethod = newMethod;
    renderBooks(bookArray);
};

chronologicalButton?.addEventListener("input", changeSortMethod);
document.getElementById("alphabetical")
    ?.addEventListener("input", changeSortMethod);

const dateFilterForm = document.getElementById("date-filter-form") as HTMLFormElement;
dateFilterForm?.addEventListener("submit", (e: Event) => {
    e.preventDefault();
    const dateData = new FormData(dateFilterForm);
    const month = Number(dateData.get("month"));
    const year = Number(dateData.get("year"));
    if(month !== 0) {
        currentFilters["month"] = month;
    }
    currentFilters["year"] = year;
    search.value = "";
    renderBooks(bookArray);
});

const obtainedFilterForm = document.getElementById("obtain-filter-form") as HTMLFormElement;
obtainedFilterForm?.addEventListener("submit", (e: Event) => {
    e.preventDefault();
    const data = new FormData(obtainedFilterForm);
    currentFilters.borrowed = Boolean(data.get("borrowed"));
    currentFilters.owned = Boolean(data.get("owned"));
    search.value = "";
    renderBooks(bookArray);
});

(document.getElementById("author-filter-form") as HTMLFormElement)
    .addEventListener("submit", (e: Event) => {
        e.preventDefault();
        const authorInput = document.getElementById("author-filter-input") as HTMLInputElement;
        if(authorInput.value.trim().length > 0) {
            currentFilters.author = authorInput.value;
            search.value = "";
            renderBooks(bookArray);
        }
    });

document.getElementById("reset-filters")
    ?.addEventListener("click", () => {
        currentFilters = {
            borrowed: true,
            owned: true
        };
        search.value = "";
        renderBooks(bookArray);
    });

let sortMethod = "chronological";
const renderBooks = (books: AnyBook[]) => {
    books = applyFilters(books);
    books.sort(sortMethod === "chronological" ? compareDates : compareLetters);
    const bookContainer = document.getElementById("book-container");
    if (!bookContainer) return;
    bookContainer.innerHTML = "";

    let bookYears: Number[] = [];
    books.forEach((book) => {
        if (sortMethod === "chronological") {
            const bookYear =
                book.obtained === "borrowed"
                    ? book["date-borrowed"].getFullYear()
                    : book["date-bought"].getFullYear();
            if (!bookYears.includes(bookYear)) {
                bookYears.push(bookYear);
                const yearHeading = document.createElement("h2");
                const line = document.createElement("hr");
                yearHeading.className = "listing-year";
                yearHeading.innerHTML = `<span class="bold">${bookYear}:</span>`;
                bookContainer.appendChild(yearHeading);
                bookContainer.appendChild(line);
            }
        }

        const listing = document.createElement("div");
        listing.className = "book-listing";
        if (book.cover) {
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
                <h3><span class="bold book-name">${book["book-name"]}</span></h3>
                <h4>by <span class="bold">${book["author-name"]}</span></h4>
            </div>
        `;
        if (book.obtained === "borrowed") {
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
        const bookCovers = Array.from(
            document.querySelectorAll(".book-cover, .book-name"),
        );
        bookCovers.forEach((cover) =>
            cover.addEventListener("click", () => {
                window.location.href = "updatebook.html";
            }),
        );
    });
};