// Data source for product options
const products = [
  {
    id: "fc-1888",
    name: "Flux Capacitor",
    averagerating: 4.5
  },
  {
    id: "fc-2050",
    name: "Power Laces",
    averagerating: 4.7
  },
  {
    id: "fs-1987",
    name: "Time Circuits",
    averagerating: 3.5
  },
  {
    id: "ac-2000",
    name: "Low Voltage Reactor",
    averagerating: 3.9
  },
  {
    id: "jj-1969",
    name: "Warp Equalizer",
    averagerating: 5.0
  }
];

// Wait for the DOM to be fully loaded before running the script
document.addEventListener('DOMContentLoaded', () => {
    const productSelect = document.getElementById('productName');

    // Populate the select element with products from the array
    products.forEach(product => {
        const option = document.createElement('option');
        // The value attribute should be a unique identifier, like the product ID
        option.value = product.id; 
        // The text content is what the user sees
        option.textContent = product.name;
        productSelect.appendChild(option);
    });
});