document.addEventListener("DOMContentLoaded", function () {
    

    const buttons = document.querySelectorAll('.element');
    let activeButton = null;

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






    

    const elements = document.querySelectorAll(".element");
    let clickedSymbol = null; // To keep track of the clicked symbol

    // Function to update element info
    function updateElementInfo(symbol, data) {
        const elementInfo = document.getElementById("element-info");
        elementInfo.innerHTML = `
            <strong>${data.name}</strong><br>
            Atomic Number: ${data.number}<br>
            Atomic Mass: ${data.atomic_mass}
        `;
    }

    // Function to enable hover feature
    function enableHover() {
        clickedSymbol = null;
    }

    // Add a click event listener to each element
    elements.forEach(function (element) {
        element.addEventListener("click", function () {
            // Get the element's symbol (e.g., "H", "He")
            const symbol = element.querySelector(".letter").textContent;

            // If the same element is clicked again, enable hover and return
            if (clickedSymbol === symbol) {
                enableHover();
                return;
            }

            // Fetch data from the JSON file
            fetch("../static/elements/elements.json")
                .then((response) => response.json())
                .then((data) => {
                    // Find the element in the "elements" array by symbol
                    const elementData = data.elements.find((el) => el.symbol === symbol);

                    if (elementData) {
                        // Update the element info and store the clicked symbol
                        updateElementInfo(symbol, elementData);
                        clickedSymbol = symbol;
                    }
                })
                .catch((error) => {
                    console.error("Error fetching element data:", error);
                });
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

            // Fetch data from the JSON file
            fetch("../static/elements/elements.json")
                .then((response) => response.json())
                .then((data) => {
                    // Find the element in the "elements" array by symbol
                    const elementData = data.elements.find((el) => el.symbol === symbol);

                    if (elementData) {
                        // Display the element's data in the #element-info div
                        updateElementInfo(symbol, elementData);
                    }
                })
                .catch((error) => {
                    console.error("Error fetching element data:", error);
                });
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
