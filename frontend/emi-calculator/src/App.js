import React, { useState } from 'react';
import './App.css';

function App(){
  const[principal, setprincipal]=useState('');
  const[rate, setrate]=useState('');
  const[time, settime]=useState('');
  const [emi, setemi] = useState(null);

  const calculatEmi=()=>{
    const P=parseFloat(principal);
    const R=parseFloat(rate)/12/100;
    const T=parseFloat(time);

    const calemi= (P*R*Math.pow((1+R),T))/(Math.pow((1+R),T)-1);
    setemi(calemi.toFixed(2));

  };
  return(
    <>
    <nav className="navbar">
        <div className="logo">Financial Time Machine</div>
        <ul className="nav-links">
          <a href="/index.html">Home</a> |
          <a href="/emi">EMI Calculator</a> |
          <a href="/insights.html">Spending Insights</a> |
          <a href="/advisor.html">AI Advisor</a> |
          <a href="/faq.html">FAQ</a>
        </ul>
      </nav><br />
  <div className="calci"style={{ padding: '20px' }}>
      <h2>Loan EMI Calculator</h2>
      <input
        type="number"
        placeholder="Principal Amount"
        value={principal}
        onChange={(e) => setprincipal(e.target.value)}
      /><br/><br/>
      <input
        type="number"
        placeholder="Annual Interest Rate (%)"
        value={rate}
        onChange={(e) => setrate(e.target.value)}
      /><br/><br/>
      <input
        type="number"
        placeholder="Time (in months)"
        value={time}
        onChange={(e) => settime(e.target.value)}
      /><br/><br/>
      <button onClick={calculatEmi} className="butt">Calculate EMI</button>
      {emi && (
        <h3>Your EMI is: ₹{emi}</h3>
      )}
    </div>
    </>
  );
}

export default App;
