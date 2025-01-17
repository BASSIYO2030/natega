import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './AdminLogin.css'; // إضافة ملف CSS

const AdminLogin = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/"; 

  const handleLogin = () => {
    if (password === 'admin') {
      onLogin();
      setError('');
      navigate(from); 
    } else {
      setError('كلمة المرور غير صحيحة');
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>تسجيل الدخول</h2>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="أدخل كلمة المرور"
          className="input-field"
        />
        <button onClick={handleLogin} className="login-button">تسجيل الدخول</button>
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
};

export default AdminLogin;


