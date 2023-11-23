function calculateSum() {
    // Get input values
    var input1 = document.getElementById("input1").value;
    var input2 = document.getElementById("input2").value;

    // Convert input values to numbers
    input1 = parseFloat(input1);
    input2 = parseFloat(input2);

    // Check if the inputs are valid numbers
    if (isNaN(input1) || isNaN(input2)) {
        alert("Please enter valid numbers");
        return;
    }

    // Make a POST request to the Python backend
    fetch('/calculate_sum', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ input1: input1, input2: input2 }),
    })
    .then(response => response.json())
    .then(data => {
        // Display the result
        document.getElementById("result").innerText = "Result: " + data.result;
    })
    .catch(error => {
        alert("An error occurred. Please try again.");
        console.error('Error:', error);
    });
}
