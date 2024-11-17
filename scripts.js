console.log("scripts.js is loaded and running!");

// Helper function to create a unique order ID
function generateUniqueId(orderNumber) {
    const nzDate = new Date().toLocaleString("en-NZ", { timeZone: "Pacific/Auckland" });
    return `Order-${orderNumber}-${nzDate}`;
}

// Function to handle form submission
function buyPlan(planName) {
    console.log(`Buying plan: ${planName}`);

    // Get the form associated with the plan
    const formId = `${planName.toLowerCase()}-form`;
    const form = document.getElementById(formId);

    if (!form) {
        console.error(`Form with ID '${formId}' not found.`);
        return;
    }

    // Prevent default form submission
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        // Collect form values
        const ign = this.querySelector("[name='ign']").value;
        const location = this.querySelector("[name='location']").value;
        const thorns = this.querySelector("[name='thorns']")?.value || "N/A";
        const knockback = this.querySelector("[name='knockback']")?.value || "N/A";
        const fireaspect = this.querySelector("[name='fireaspect']")?.value || "N/A";

        // Load existing orders or initialize an empty array
        const orders = JSON.parse(localStorage.getItem("orders")) || [];
        const orderNumber = orders.length + 1;
        const uniqueId = generateUniqueId(orderNumber);

        // Create a new order object
        const newOrder = {
            uniqueId,
            ign,
            location,
            plan: planName,
            thorns,
            knockback,
            fireaspect,
            orderNumber,
            date: new Date().toISOString(),
        };

        // Save the order
        orders.push(newOrder);
        localStorage.setItem("orders", JSON.stringify(orders));

        console.log("New order stored:", newOrder);
        alert(`Order placed successfully! Your unique ID is: ${uniqueId}`);
        form.reset();
    });
}

// Attach event listeners to all forms
function initializeForms() {
    const planNames = ["Wood", "Iron", "Diamond", "Netherite"];

    planNames.forEach(planName => {
        const formId = `${planName.toLowerCase()}-form`;
        const form = document.getElementById(formId);

        if (!form) {
            console.warn(`Form with ID '${formId}' not found. Skipping.`);
            return;
        }

        form.addEventListener("submit", function (event) {
            event.preventDefault();
            buyPlan(planName);
        });
    });
}

// Initialize on DOMContentLoaded
document.addEventListener("DOMContentLoaded", initializeForms);

