// Load notes when the page opens
window.onload = function () {
    loadNotes();
};

// Save a new note
async function saveNote() {

    const noteInput = document.getElementById("note");
    const note = noteInput.value.trim();

    if (note === "") {
        alert("Please write a note before saving.");
        return;
    }

    try {
        const response = await fetch("/add_note", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                note: note
            })
        });

        const data = await response.json();

        alert(data.message);

        // Clear the textarea
        noteInput.value = "";

        // Reload notes
        loadNotes();

    } catch (error) {
        console.error(error);
        alert("Something went wrong!");
    }
}

// Load all notes
async function loadNotes() {

    try {

        const response = await fetch("/get_notes");
        const notes = await response.json();

        const notesContainer = document.getElementById("notes");

        notesContainer.innerHTML = "";

        if (notes.length === 0) {

            notesContainer.innerHTML = `
                <p style="text-align:center;color:gray;">
                    No notes available.
                </p>
            `;

            return;
        }

        notes.forEach(function(note) {

            const noteCard = document.createElement("div");
            noteCard.className = "note";

            noteCard.innerHTML = `
                <p>${note[1]}</p>
            `;

            notesContainer.appendChild(noteCard);

        });

    } catch (error) {

        console.error(error);

    }
}