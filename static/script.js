function callModelBoxes() {

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
    requestModel(inputValues);    
}

function callModelCSV() {
    // Additional handling for CSV input
    var csvInputValue = document.getElementById("csvInput").value.trim();

    if (csvInputValue !== "") {
        // Split the CSV input into an array of strings
        var csvValues = csvInputValue.split(',');

        // Define an array of keys in the desired order
        var keys = [
            "inputYear", "inputBpm", "inputNrgy", "inputDnce",
            "inputDB", "inputLive", "inputVal", "inputDur",
            "inputAcous", "inputSpch", "inputPop"
        ];

        // Create a dictionary to store the values
        var csvDictionary = {};

        // Iterate through the keys array and assign values to the corresponding keys
        for (var i = 0; i < keys.length; i++) {
            // Trim the whitespace from each value
            var trimmedValue = csvValues[i] ? csvValues[i].trim() : '';

            // Convert the trimmed value to a float
            var floatValue = parseFloat(trimmedValue);

            // Check if the conversion was successful
            if (!isNaN(floatValue)) {
                // Store the float value in the dictionary with the specified key
                csvDictionary[keys[i]] = floatValue;
            } else {
                console.error("Invalid numeric value:", trimmedValue);
                // Handle the case where the value is not a valid float
                // You may choose to set a default value, skip the key, or handle it as appropriate for your use case
            }
        }


        console.log(csvDictionary);
        requestModel(csvDictionary);
        // If you want to store this dictionary for further use, you can assign it to a global variable
        // Assuming 'csvDictionary' is a global variable
        // csvDictionary = csvDictionary;
    }
}

function requestModel(inputDictionary) {
    // Make a POST request to the Python backend
    fetch('/call_model', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        
        body: JSON.stringify(inputDictionary), // Pass the inputValues object directly
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

