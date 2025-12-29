const API_URL = "http://localhost:8081/api/books";

/* Load all books */
function loadBooks() {
    fetch(API_URL)
        .then(res => res.json())
        .then(data => {
            const table = document.getElementById("bookTable");
            table.innerHTML = "";

            data.forEach(book => {
                table.innerHTML += `
                    <tr>
                        <td>${book.id}</td>
                        <td>${book.title}</td>
                        <td>${book.author}</td>
                        <td>${book.copies}</td>
                        <td>
                            <button class="delete-btn" onclick="deleteBook(${book.id})">
                                Delete
                            </button>
                        </td>
                    </tr>
                `;
            });
        })
        .catch(err => console.error("Error loading books:", err));
}

/* Add new book */
function addBook() {
    const book = {
        title: document.getElementById("title").value,
        author: document.getElementById("author").value,
        copies: document.getElementById("copies").value
    };

    fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(book)
    })
    .then(res => {
        if (!res.ok) {
            throw new Error("Failed to add book");
        }
        loadBooks();
        document.querySelectorAll("input").forEach(i => i.value = "");
    })
    .catch(err => console.error("Error adding book:", err));
}

/* Delete book */
function deleteBook(id) {
    fetch(`${API_URL}/${id}`, {
        method: "DELETE"
    })
    .then(() => loadBooks())
    .catch(err => console.error("Error deleting book:", err));
}

/* Load books on page load */
loadBooks();
