import pickle
from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

# Load the trained model
with open('model.pkl', 'rb') as model_file:
    model = pickle.load(model_file)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/call_model', methods=['POST'])
def call_model():
    try:
        # Get JSON data from the request
        data = request.get_json()
        # Now, 'data' is a Python dictionary

        
        
        print(data)

        # Extract features from the data dictionary
        features = [
            data['inputYear'], 
            data['inputBpm'], 
            data['inputNrgy'], 
            data['inputDnce'],
            data['inputDB'],
            data['inputLive'],
            data['inputVal'],
            data['inputDur'],
            data['inputAcous'],
            data['inputSpch'],
            data['inputPop']
        ]

        # Perform prediction using the trained model
        prediction = model.predict([features])

        # Return the result as JSON
        return jsonify(result=prediction.tolist())

    except ValueError:
        return jsonify(error='Invalid input. Please enter valid numbers.')

if __name__ == '__main__':
    app.run(debug=True)
