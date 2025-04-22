
from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
from sklearn.tree import DecisionTreeClassifier

app = Flask(__name__)
CORS(app)

# Eğitim verisi
data = {
    'Age': [25, 45, 35, 28, 60],
    'Profession': ['Engineer', 'Doctor', 'Teacher', 'Engineer', 'Retired'],
    'City': ['Istanbul', 'Ankara', 'Izmir', 'Bursa', 'Antalya'],
    'PreviousInsurance': ['Health', 'Car', 'Home', 'Health', 'Life'],
    'RecommendedPolicy': ['Car', 'Life', 'Home', 'Car', 'Health']
}

df = pd.DataFrame(data)
df_encoded = pd.get_dummies(df[['Profession', 'City', 'PreviousInsurance']])
X = pd.concat([df[['Age']], df_encoded], axis=1)
y = df['RecommendedPolicy']
model = DecisionTreeClassifier()
model.fit(X, y)

@app.route('/predict', methods=['POST'])
def predict():
    user_data = request.json
    input_data = pd.DataFrame([user_data])
    prediction = model.predict(input_data)
    return jsonify({'recommended_policy': prediction[0]})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=10000)

