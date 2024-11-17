// Helper function to create unique order IDs
function generateUniqueId(orderNumber) {
    const nzDate = new Date().toLocaleString("en-NZ", { timeZone: "Pacific/Auckland" });
    return `Order-${orderNumber}-${nzDate}`;
}

// Function to handle form submission
function handleFormSubmission(formId, planName) {
    const form = document.getElementById(formId);

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        // Get form values
        const ign = this.querySelector("[name='ign']").value;
        const location = this.querySelector("[name='location']").value;

        // Generate a unique order ID
        const orders = JSON.parse(localStorage.getItem("orders")) || [];
        const orderNumber = orders.length + 1;
        const uniqueId = generateUniqueId(orderNumber);

        // Create a new order object
        const newOrder = { uniqueId, ign, location, plan: planName, orderNumber, date: new Date().toISOString() };
        orders.push(newOrder);

        // Store the orders in localStorage
        localStorage.setItem("orders", JSON.stringify(orders));

        // Notify the user
        alert(`Order placed successfully! Your unique ID is: ${uniqueId}`);
        form.reset();
    });
}

// Initialize event listeners for all forms
function initializeForms() {
    handleFormSubmission("wood-form", "Wood");
    handleFormSubmission("iron-form", "Iron");
    handleFormSubmission("diamond-form", "Diamond");
    handleFormSubmission("netherite-form", "Netherite");
}
document.addEventListener("DOMContentLoaded", function () {
    try {
        // Test localStorage
        localStorage.setItem("test", "test");
        localStorage.removeItem("test");
        console.log("localStorage is accessible.");
    } catch (error) {
        console.error("localStorage is not accessible:", error);
        alert("localStorage is disabled or inaccessible. Please enable it in your browser.");
        return;
    }

    // Initialize forms
    initializeForms();
});


// Run the initialization on page load
document.addEventListener("DOMContentLoaded", initializeForms);
