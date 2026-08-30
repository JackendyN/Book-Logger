const logOutButton = document.getElementById("log-out");
logOutButton?.addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = "index.html";
})

document.getElementById("view-books")?.addEventListener("click", () => {
    window.location.href = "books.html";
})

document.getElementById("book-wishlist")?.addEventListener("click", () => {
    window.location.href = "wishlist.html";
})

document.getElementById("add-book")?.addEventListener("click", () => {
    window.location.href = "newbook.html";
})

if(logOutButton && sessionStorage.getItem("guest") === "true") {
    logOutButton.style.display = "none";
}