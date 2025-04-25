
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
    input_df = pd.DataFrame([user_data])

    # Eksik sütunları sıfırla ve sırayı düzelt
    expected_columns = X.columns
    for col in expected_columns:
        if col not in input_df.columns:
            input_df[col] = 0
    input_df = input_df[expected_columns]

    prediction = model.predict(input_df)
    return jsonify({'recommended_policy': prediction[0]})

if __name__ == '__main__':
    import os
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)
