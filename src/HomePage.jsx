import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-page">
      <h1>اختيار الملف للعمل عليه</h1>
      <ul className="course-list">
        <li><Link to="/edit/BIS1">الفرقة الاولي نظم</Link></li>
        <li><Link to="/edit/BIS2">الفرقة الثانية نظم</Link></li>
        <li><Link to="/edit/BIS3">الفرقة الثالثة نظم</Link></li>
        <li><Link to="/edit/BIS4">الفرقة الرابعة نظم</Link></li>
        <li><Link to="/edit/Accounting1">الفرقة الاولي محاسبة</Link></li>
        <li><Link to="/edit/Accounting2">الفرقة الثانية محاسبة</Link></li>
        <li><Link to="/edit/Accounting3">الفرقة الثالثة محاسبة</Link></li>
        <li><Link to="/edit/Accounting4">الفرقة الرابعة محاسبة</Link></li>
        <li><Link to="/edit/marketing3">الفرقة الثالثة تسويق</Link></li>
        <li><Link to="/edit/marketing4">الفرقة الرابعة تسويق</Link></li>
      </ul>
    </div>
  );
};

export default HomePage;
