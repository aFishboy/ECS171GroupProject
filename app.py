from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/calculate_sum', methods=['POST'])
def calculate_sum():
    try:
        # Get input values from the JSON request
        data = request.get_json()
        input1 = float(data['input1'])
        input2 = float(data['input2'])

        # Calculate the sum
        sum_result = input1 + input2

        # Return the result as JSON
        return jsonify(result=sum_result)

    except ValueError:
        return jsonify(error='Invalid input. Please enter valid numbers.')

if __name__ == '__main__':
    app.run(debug=True)
