document.querySelector("#guest")?.addEventListener("click", (e) => {
    e.preventDefault();
    sessionStorage.setItem("guest", "true");
    window.location.href = "home.html";
});

const loginButtons = Array.from(
    document.querySelectorAll<HTMLButtonElement>(
        '#login-form button:not(#login-form button[id="guest"])'))
loginButtons.forEach((button: HTMLButtonElement) => {
    button.addEventListener("click", (e) => e.preventDefault());
})

document.addEventListener("DOMContentLoaded", () => {
    const sampleBooks = [
    {
        "book-name": "The Hobbit",
        "author-name": "J.R.R. Tolkien",
        reading: true,
        cover: "https://covers.openlibrary.org/b/isbn/9780345339683-L.jpg",
        obtained: "bought",
        "date-bought": new Date("2025-08-12"),
        "bought-from": "Barnes & Noble"
    },
    {
        "book-name": "1984",
        "author-name": "George Orwell",
        reading: false,
        cover: "https://covers.openlibrary.org/b/isbn/9780451524935-L.jpg",
        obtained: "borrowed",
        "date-borrowed": new Date("2026-07-18"),
        returned: true,
        "date-returned": new Date("2026-08-02"),
        "borrowed-from": "City Library"
    },
    {
        "book-name": "Dune",
        "author-name": "Frank Herbert",
        reading: false,
        cover: "https://covers.openlibrary.org/b/isbn/9780441172719-L.jpg",
        obtained: "bought",
        "date-bought": new Date("2026-08-20"),
        "bought-from": "Amazon"
    },
    {
        "book-name": "The Great Gatsby",
        "author-name": "F. Scott Fitzgerald",
        reading: true,
        cover: "https://covers.openlibrary.org/b/isbn/9780743273565-L.jpg",
        obtained: "borrowed",
        "date-borrowed": new Date("2025-06-10"),
        returned: true,
        "date-due": new Date("2025-06-25"),
        "borrowed-from": "Emily"
    },
    {
        "book-name": "To Kill a Mockingbird",
        "author-name": "Harper Lee",
        reading: false,
        cover: "https://covers.openlibrary.org/b/isbn/9780061120084-L.jpg",
        obtained: "bought",
        "date-bought": new Date("2024-05-14"),
        "bought-from": "Books-A-Million"
    },
    {
        "book-name": "Pride and Prejudice",
        "author-name": "Jane Austen",
        reading: false,
        cover: "https://covers.openlibrary.org/b/isbn/9780141330167-L.jpg",
        obtained: "borrowed",
        "date-borrowed": new Date("2024-08-05"),
        returned: false,
        "borrowed-from": "Sarah"
    },
    {
        "book-name": "Fahrenheit 451",
        "author-name": "Ray Bradbury",
        reading: true,
        obtained: "bought",
        "date-bought": new Date("2026-04-22"),
        "bought-from": "Local Bookstore"
    },
    {
        "book-name": "The Catcher in the Rye",
        "author-name": "J.D. Salinger",
        reading: false,
        obtained: "borrowed",
        "date-borrowed": new Date("2026-05-30"),
        returned: true,
        "date-returned": new Date("2026-06-14"),
        "borrowed-from": "James"
    },
    {
        "book-name": "The Name of the Wind",
        "author-name": "Patrick Rothfuss",
        reading: false,
        obtained: "bought",
        "date-bought": new Date("2026-08-01"),
        "bought-from": "Barnes & Noble"
    },
    {
        "book-name": "The Book Thief",
        "author-name": "Markus Zusak",
        reading: false,
        obtained: "borrowed",
        "date-borrowed": new Date("2025-07-03"),
        returned: true,
        "date-returned": new Date("2025-07-27"),
        "borrowed-from": "School Library"
    },
    {
        "book-name": "The Martian",
        "author-name": "Andy Weir",
        reading: false,
        cover: "https://img.drz.lazcdn.com/static/pk/p/eff7aa7e6e0658a8ff46c6e7dd06a1cb.png_720x720q80.png",
        obtained: "bought",
        "date-bought": new Date("2026-08-15"),
        "bought-from": "Target"
    },
    {
        "book-name": "Mistborn: The Final Empire",
        "author-name": "Brandon Sanderson",
        reading: false,
        obtained: "borrowed",
        "date-borrowed": new Date("2026-06-21"),
        returned: false,
        "borrowed-from": "Michael"
    },
    {
        "book-name": "The Fellowship of the Ring",
        "author-name": "J.R.R. Tolkien",
        reading: false,
        cover: "https://www.nationalshrineshops.com/media/catalog/product/cache/21ca1cbe1b1df6a18fc1723f7f5d64c0/1/9/1922-9780547928210.jpg",
        obtained: "bought",
        "date-bought": new Date("2026-03-11"),
        "bought-from": "Half Price Books"
    },
    {
        "book-name": "Jane Eyre",
        "author-name": "Charlotte Brontë",
        reading: false,
        obtained: "borrowed",
        "date-borrowed": new Date("2026-08-10"),
        returned: false,
        "borrowed-from": "Anna"
    },
    {
        "book-name": "The Picture of Dorian Gray",
        "author-name": "Oscar Wilde",
        reading: false,
        obtained: "bought",
        "date-bought": new Date("2026-02-17"),
        "bought-from": "ThriftBooks"
    }
    ];
    const futureBooks = [
    {
        "book-name": "The Silmarillion",
        "author-name": "J.R.R. Tolkien",
        cover: "https://covers.openlibrary.org/b/isbn/9780618391110-L.jpg",
        obtaining: "owning",
        location: "Barnes & Noble"
    },
    {
        "book-name": "The Way of Kings",
        "author-name": "Brandon Sanderson",
        cover: "https://covers.openlibrary.org/b/isbn/9780765326355-L.jpg",
        obtaining: "borrowing",
        location: "City Library"
    },
    {
        "book-name": "Neuromancer",
        "author-name": "William Gibson",
        cover: "https://covers.openlibrary.org/b/isbn/9780441569595-L.jpg",
        obtaining: "owning",
        location: "Amazon"
    },
    {
        "book-name": "The Once and Future King",
        "author-name": "T.H. White",
        cover: "https://covers.openlibrary.org/b/isbn/9780441627401-L.jpg",
        obtaining: "borrowing",
        location: "School Library"
    },
    {
        "book-name": "The Count of Monte Cristo",
        "author-name": "Alexandre Dumas",
        cover: "https://covers.openlibrary.org/b/isbn/9780553897845-L.jpg",
        obtaining: "owning",
        location: "Half Price Books"
    },
    {
        "book-name": "The Left Hand of Darkness",
        "author-name": "Ursula K. Le Guin",
        cover: "https://covers.openlibrary.org/b/isbn/9780441478125-L.jpg",
        obtaining: "borrowing",
        location: "Jordan"
    },
    {
        "book-name": "The Brothers Karamazov",
        "author-name": "Fyodor Dostoevsky",
        obtaining: "owning"
    },
    {
        "book-name": "The Ocean at the End of the Lane",
        "author-name": "Neil Gaiman",
        cover: "https://covers.openlibrary.org/b/isbn/9780062459367-L.jpg",
        obtaining: "borrowing",
        location: "Emily"
    },
    {
        "book-name": "The Priory of the Orange Tree",
        "author-name": "Samantha Shannon",
        cover: "https://covers.openlibrary.org/b/isbn/9781635570298-L.jpg",
        obtaining: "owning",
        location: "Local Bookstore"
    },
    {
        "book-name": "Good Omens",
        "author-name": "Neil Gaiman and Terry Pratchett",
        cover: "https://covers.openlibrary.org/b/isbn/9780060853983-L.jpg",
        obtaining: "borrowing",
        location: "Sam"
    },
    {
        "book-name": "The Invisible Life of Addie LaRue",
        "author-name": "V.E. Schwab",
        cover: "https://covers.openlibrary.org/b/isbn/9780765387561-L.jpg",
        obtaining: "owning",
        location: "Target"
    },
    {
        "book-name": "A Wizard of Earthsea",
        "author-name": "Ursula K. Le Guin",
        cover: "https://covers.openlibrary.org/b/isbn/9780547722023-L.jpg",
        obtaining: "borrowing",
        location: "City Library"
    },
    {
        "book-name": "The Name of the Rose",
        "author-name": "Umberto Eco",
        obtaining: "owning",
        location: "ThriftBooks"
    },
    {
        "book-name": "The Shadow of the Wind",
        "author-name": "Carlos Ruiz Zafón",
        cover: "https://covers.openlibrary.org/b/isbn/9780143034902-L.jpg",
        obtaining: "borrowing",
        location: "Alex"
    },
    {
        "book-name": "The Lies of Locke Lamora",
        "author-name": "Scott Lynch",
        cover: "https://covers.openlibrary.org/b/isbn/9780553588941-L.jpg",
        obtaining: "owning",
        location: "Barnes & Noble"
    }
    ];
    window.localStorage.setItem("local-books", JSON.stringify(sampleBooks));
    window.localStorage.setItem("future-local-books", JSON.stringify(futureBooks));
})