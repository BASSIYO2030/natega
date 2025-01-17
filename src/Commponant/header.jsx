import "./header.css";
import logo from "./2.png";
import logoo from "./1.png";
import { Link } from "react-router-dom";

export default function Header({ isLoggedIn, onLogout }) {
  return (
    <div className="header">
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <img src={logo} alt="شعار المعهد" />
          </div>

          {!isLoggedIn && (
            <>
              <div className="di">
            
                <h1  className="h-title">المعهد العالي للعلوم التجارية</h1>
                <h1  className="h-title" style={{color:'#f1bb1c'}}>بالمحلة الكبري</h1>
              </div>
            </>
          )}

          <div className="header-buttons">
            {isLoggedIn && (
              <>
                <Link to="/" className="header-button">
                  الصفحة الرئيسية
                </Link>

                <Link to="/homejson" className="header-button">
                  الصفحة الرئيسية للبيانات
                </Link>
                <Link to="/upload" className="header-button">
                  رفع الملفات
                </Link>
                <Link to="/edit/BIS1" className="header-button">
                  تعديل البيانات
                </Link>
                <button
                  className="header-button logout-button"
                  onClick={onLogout}
                >
                  تسجيل الخروج
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
