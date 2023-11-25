from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

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

        # Calculate the sum
        sum_result = 0

        for value in data.values():
            sum_result += value

        # Return the result as JSON
        return jsonify(result=sum_result)

    except ValueError:
        return jsonify(error='Invalid input. Please enter valid numbers.')

if __name__ == '__main__':
    app.run(debug=True)
