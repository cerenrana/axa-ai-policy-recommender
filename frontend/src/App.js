
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

    console.log("Encoded data to send:", encodedData);

    try {
      const res = await axios.post('https://axa-backend-apii.onrender.com/predict', encodedData, { timeout: 10000 });
      setResult(res.data.recommended_policy);
    } catch (error) {
      console.error(error);
      setResult("API error");
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f5f5f7',
      padding: '20px',
      fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif'
    }}>
      <h2 style={{ marginBottom: '20px', fontSize: '28px', color: '#333' }}>AI-Based Insurance Policy Recommender</h2>

      <form onSubmit={handleSubmit} style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: '30px',
        borderRadius: '16px',
        boxShadow: '0px 10px 15px rgba(0, 0, 0, 0.05)',
        width: '320px'
      }}>
        <input type="number" name="Age" placeholder="Age" value={form.Age} onChange={handleChange} required style={{
          width: '100%',
          padding: '10px',
          borderRadius: '8px',
          border: '1px solid #ccc',
          fontSize: '16px'
        }} />
        <select name="Profession" value={form.Profession} onChange={handleChange} required style={{
          width: '100%',
          padding: '10px',
          borderRadius: '8px',
          border: '1px solid #ccc',
          fontSize: '16px'
        }}>
          <option value="">Select Profession</option>
          <option value="Engineer">Engineer</option>
          <option value="Doctor">Doctor</option>
          <option value="Teacher">Teacher</option>
          <option value="Retired">Retired</option>
        </select>
        <select name="City" value={form.City} onChange={handleChange} required style={{
          width: '100%',
          padding: '10px',
          borderRadius: '8px',
          border: '1px solid #ccc',
          fontSize: '16px'
        }}>
          <option value="">Select City</option>
          <option value="Istanbul">Istanbul</option>
          <option value="Ankara">Ankara</option>
          <option value="Izmir">Izmir</option>
          <option value="Bursa">Bursa</option>
          <option value="Antalya">Antalya</option>
        </select>
        <select name="PreviousInsurance" value={form.PreviousInsurance} onChange={handleChange} required style={{
          width: '100%',
          padding: '10px',
          borderRadius: '8px',
          border: '1px solid #ccc',
          fontSize: '16px'
        }}>
          <option value="">Select Previous Insurance</option>
          <option value="Health">Health</option>
          <option value="Car">Car</option>
          <option value="Home">Home</option>
          <option value="Life">Life</option>
        </select>
        <button type="submit" style={{
          marginTop: '10px',
          padding: '10px 20px',
          borderRadius: '8px',
          border: '1px solid #0071e3',
          backgroundColor: '#0071e3',
          color: 'white',
          fontSize: '16px',
          cursor: 'pointer'
        }}>Get Recommendation</button>
      </form>

      {result && (
        <div style={{
          marginTop: '30px',
          padding: '20px',
          borderRadius: '16px',
          backgroundColor: '#ffffff',
          boxShadow: '0px 10px 15px rgba(0,0,0,0.05)',
          textAlign: 'center',
          fontSize: '18px',
          color: '#333',
          width: '300px'
        }}>
          <h2>🎯 Recommended Policy</h2>
          <p style={{ fontWeight: 'bold', fontSize: '22px', color: '#0071e3' }}>{result}</p>
        </div>
      )}
    </div>
  );
}

export default App;
