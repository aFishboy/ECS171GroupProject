function callModel() {

    // Object to store names and values
    var inputValues = {};

    // Array of input element IDs
    var inputIds = [
        "inputYear", "inputBpm", "inputNrgy", "inputDnce", 
        "inputDB", "inputLive", "inputVal", "inputDur", 
        "inputAcous", "inputSpch", "inputPop"
    ];

    // Loop through input IDs, retrieve values, and store in the object
    for (var inputName of inputIds) {
        var inputValue = document.getElementById(inputName).value;
        var numericValue = parseFloat(inputValue);

        // Check if the conversion is successful
        if (!isNaN(numericValue)) {
            inputValues[inputName] = numericValue;
        } else {
            alert("Please enter valid numbers for " + inputName);
            return;
        }
    }

    // Now, inputValues contains names and corresponding numeric values
    console.log(inputValues);


    // Make a POST request to the Python backend
    fetch('/call_model', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        
        body: JSON.stringify(inputValues), // Pass the inputValues object directly
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
