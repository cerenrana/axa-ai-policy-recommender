
import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [form, setForm] = useState({
    Age: '',
    Profession: '',
    City: '',
    PreviousInsurance: ''
  });
  const [result, setResult] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const professions = ['Engineer', 'Doctor', 'Teacher', 'Retired'];
    const cities = ['Istanbul', 'Ankara', 'Izmir', 'Bursa', 'Antalya'];
    const insurances = ['Health', 'Car', 'Home', 'Life'];

    const encodedData = {
      Age: Number(form.Age)
    };

    professions.forEach(p => encodedData[`Profession_${p}`] = form.Profession === p ? 1 : 0);
    cities.forEach(c => encodedData[`City_${c}`] = form.City === c ? 1 : 0);
    insurances.forEach(i => encodedData[`PreviousInsurance_${i}`] = form.PreviousInsurance === i ? 1 : 0);

    console.log("Encoded data to send:", encodedData); // 🔍 Debug çıktısı

    try {
      const res = await axios.post('https://axa-backend-apii.onrender.com/predict', encodedData);
      setResult(res.data.recommended_policy);
    } catch (error) {
      console.error(error);
      setResult("API error");
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>AI-Based Insurance Policy Recommender</h2>
      <form onSubmit={handleSubmit}>
        <input type="number" name="Age" placeholder="Age" value={form.Age} onChange={handleChange} required /><br />
        <select name="Profession" value={form.Profession} onChange={handleChange} required>
          <option value="">Select Profession</option>
          <option value="Engineer">Engineer</option>
          <option value="Doctor">Doctor</option>
          <option value="Teacher">Teacher</option>
          <option value="Retired">Retired</option>
        </select><br />
        <select name="City" value={form.City} onChange={handleChange} required>
          <option value="">Select City</option>
          <option value="Istanbul">Istanbul</option>
          <option value="Ankara">Ankara</option>
          <option value="Izmir">Izmir</option>
          <option value="Bursa">Bursa</option>
          <option value="Antalya">Antalya</option>
        </select><br />
        <select name="PreviousInsurance" value={form.PreviousInsurance} onChange={handleChange} required>
          <option value="">Select Previous Insurance</option>
          <option value="Health">Health</option>
          <option value="Car">Car</option>
          <option value="Home">Home</option>
          <option value="Life">Life</option>
        </select><br />
        <button type="submit">Get Recommendation</button>
      </form>
      {result && <p><strong>Recommended Policy:</strong> {result}</p>}
    </div>
  );
}

export default App;
