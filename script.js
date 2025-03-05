document.addEventListener("DOMContentLoaded", function () {
    // Display date and time
    function updateDateTime() {
        let now = new Date();
        let formattedDate = now.toLocaleString('en-US', {
            weekday: 'long', year: 'numeric', month: 'short', day: 'numeric',
            hour: '2-digit', minute: '2-digit', second: '2-digit'
        });
        document.getElementById("dateTime").textContent = formattedDate;
    }
    setInterval(updateDateTime, 1000);
    updateDateTime();
});

// Load JSON data and search for a director
async function searchDirector() {
    let searchInput = document.getElementById("searchInput").value.trim().toLowerCase();
    let resultDiv = document.getElementById("result");

    if (searchInput === "") {
        resultDiv.innerHTML = "<p>Please enter a director's name.</p>";
        return;
    }

    try {
        let response = await fetch("directors.json");
        let directors = await response.json();

        let director = directors.find(d => d.title.toLowerCase() === searchInput);
        
        if (director) {
            resultDiv.innerHTML = `
                <h2>${director.title}</h2>
                <p><strong>Number of Films:</strong> ${director["Number of films made"]}</p>
                <p><strong>Highest Collected Movie:</strong> ${director["highest collected movie"]}</p>
                <p><strong>Hit/Flop:</strong> ${director["hit/flop"]}</p>
                <p><strong>Awards Received:</strong> ${director.awards}</p>
                <p><strong>Upcoming Project:</strong> ${director["upcoming project"]}</p>
            `;
        } else {
            resultDiv.innerHTML = "<p>No results found.</p>";
        }
    } catch (error) {
        console.error("Error loading data:", error);
        resultDiv.innerHTML = "<p>Error loading data. Try again later.</p>";
    }
}
