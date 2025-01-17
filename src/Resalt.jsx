import React, { useState } from "react";
import "./ResultsPage.css";

const Resalt = () => {
  const [stage, setStage] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [result, setResult] = useState(null);
  const [noResult, setNoResult] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleStageChange = (e) => setStage(e.target.value);
  const handleSpecializationChange = (e) => setSpecialization(e.target.value);
  const handleRollNumberChange = (e) => setRollNumber(e.target.value);

  const handleSearch = async () => {
    setLoading(true);
    setNoResult(false);
    setResult(null);

    try {
      const response = await fetch("http://localhost:5000/get-result", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stage, specialization, rollNumber }),
      });
      const data = await response.json();
      if (!data.student) {
        setNoResult(true);
      } else {
        setResult(data.student);

      }
    } catch (error) {
      console.error("حدث خطأ:", error);
      setNoResult(true);
    } finally {
      setLoading(false);
    }
  };

  const subjects = result
    ? Object.entries(result).filter(
        ([key]) =>
          ![
            "name",
            "GPA",
            "rollNumber",
            "stage",
            "type",
            "states",
            "pay",
          ].includes(key.trim())
      )
    : [];

  return (
    <div className="resalt" dir="rtl">
      <div className="results-page">
        <h1>البحث عن نتائج الطلاب</h1>
        <div className="search-form">
          <label>
            اختر المستوى:
            <select value={stage} onChange={handleStageChange}>
              <option value="">اختر المستوى</option>
              <option value="BIS1">الأول</option>
              <option value="BIS2">الثاني</option>
              <option value="BIS3">الثالث</option>
              <option value="BIS4">الرابع</option>
            </select>
          </label>

          {stage && (
            <label>
              اختر التخصص:
              <select
                value={specialization}
                onChange={handleSpecializationChange}
              >
                <option value="">اختر التخصص</option>
                <option value="نظم">نظم معلومات الأعمال</option>
                <option value="محاسبة">المحاسبة والمراجعة</option>
                {stage === "BIS3" || stage === "BIS4" ? (
                  <option value="تسويق">التسويق والتجارة الإلكترونية</option>
                ) : null}
              </select>
            </label>
          )}

          <label>
            أدخل رقم الجلوس:
            <input
              type="text"
              value={rollNumber}
              onChange={handleRollNumberChange}
              placeholder="أدخل رقم الجلوس"
            />
          </label>
          <button className="bty button-33" onClick={handleSearch} disabled={loading}>
            {loading ? "جاري التحميل..." : "ابحث"}
          </button>
          {noResult && <p className="no-result">لم يتم العثور على النتيجة</p>}
        </div>

        {result && result.pay === "yes" ? (
          <div className="result-table">
            <h2>النتيجة</h2>
            <div className="result-info">
              <p>
                <strong>اسم الطالب:</strong> {result.name}
              </p>
              <p>
                <strong>المعدل التراكمي (GPA):</strong>{" "}
                {parseFloat(result.GPA).toFixed(2)}
              </p>
              <p>
                <strong>رقم الجلوس:</strong> {result.rollNumber}
              </p>
            </div>
            <table>
              <thead>
                <tr>
                  <th>المادة</th>
                  <th>التقدير</th>
                </tr>
              </thead>
              <tbody>
                {subjects.map(([subject, grade], index) => (
                  <tr key={index}>
                    <td>{subject}</td>
                    <td>{grade}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : result && result.pay === "no" ? (
          <p className="no-result">النتيجة محجوبة بسبب عدم سداد الرسوم.</p>
        ) : null}
      </div>
    </div>
  );
};

export default Resalt;
