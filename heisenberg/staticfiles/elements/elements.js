document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll('.element');
    let activeButton = null;
    let elementData = null;

    // Fetch the JSON data when the page loads
    fetch("../static/elements/elements.json")
        .then((response) => response.json())
        .then((data) => {
            elementData = data.elements;
        })
        .catch((error) => {
            console.error("Error fetching element data:", error);
        });

    buttons.forEach(button => {
        button.addEventListener('click', function () {
            if (activeButton === this) {
                // If the same button is clicked again, remove the active state
                this.classList.remove('active');
                activeButton = null;
            } else if (activeButton === null) {
                // If no button is currently active, activate this one
                this.classList.add('active');
                activeButton = this;
            }
        });
    });

    // Function to update element info
    function updateElementInfo(symbol) {
        const elementInfo = document.getElementById("element-info");
        const data = elementData.find(el => el.symbol === symbol);

        if (data) {
            elementInfo.innerHTML = `
                <div class="stats">
                    <strong>${data.name}</strong><br>
                    Atomic Number: ${data.number}<br>
                    Atomic Mass: ${data.atomic_mass}
                <div>
    
                <div class="container">
                    <div class="selected-element">
                        <span class="selected-number">${data.number}</span><br/>
                        <br>
                        <span class="selected-letter">${data.symbol}</span><br/>
                        <br>
                        <span class="selected-name" style="text-align: left;">${data.name}</span>
                    </div>
                    <div class="model">
                        <model-viewer src="${data.bohr_model_3d}" shadow-intensity="1" camera-controls touch-action="pan-y"></model-viewer>
                    </div>
                </div>
    
                <div class="content">
                
                    <h1>Appearance</h1>
                    ${data.appearance}
    
                    <h1>Uses</h1>
                    ${data.uses}
    
                    <h1>Biological Role</h1>
                    ${data.role}
                    
                    <h1>Natural Abundance</h1>
                    ${data.abundance}
    
                    <h1>History</h1>
                    ${data.history}
                    
                </div>
                <br>
                <br>
                <p> Data provided by <a href="${data.url}" target="_blank" rel="noopener noreferrer">The Royal Society of Chemistry</a></p>
            `;
        }
    }

    // Function to enable hover feature
    function enableHover() {
        clickedSymbol = null;
    }

    const elements = document.querySelectorAll(".element");
    let clickedSymbol = null; // To keep track of the clicked symbol

    // Add a click event listener to each element
    elements.forEach(function (element) {
        element.addEventListener("click", function () {
            // Get the element's symbol (e.g., "H", "He")
            const symbol = element.querySelector(".letter").textContent;
            const isMobile = window.matchMedia("(max-width: 1024px)").matches;

            // If the same element is clicked again, enable hover and return
            if (clickedSymbol === symbol) {
                enableHover();
                return;
            }

            if (isMobile || clickedSymbol === null) {
                // Update the element info and store the clicked symbol
                updateElementInfo(symbol);
                clickedSymbol = symbol;
            }
        });
    });

    // Add a mouseover event listener to each element
    elements.forEach(function (element) {
        element.addEventListener("mouseover", function () {
            // If an element is already clicked, do nothing
            if (clickedSymbol) {
                return;
            }

            // Get the element's symbol (e.g., "H", "He")
            const symbol = element.querySelector(".letter").textContent;

            // Display the element's data in the #element-info div
            updateElementInfo(symbol);
        });
    });

    // Get all elements with the "more" class
    const moreButtons = document.querySelectorAll(".more");

    // Add a click event listener to each "more" button
    moreButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            // Get all rows with data-hidden="true" within the same table
            const hiddenRows = document.querySelectorAll("tr[data-hidden='true']");

            // Toggle the display property for each hidden row
            hiddenRows.forEach(function (row) {
                if (row.style.display === "none" || row.style.display === "") {
                    row.style.display = "table-row";
                } else {
                    row.style.display = "none";
                }
            });
        });
    });
});
