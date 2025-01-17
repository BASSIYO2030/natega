import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; 
import "./EditPage.css";

const EditPage = () => {
  const { stage } = useParams(); 
  const [rollNumber, setRollNumber] = useState("");
  const [student, setStudent] = useState(null);
  const [name, setName] = useState(""); 
  const [GPA, setGPA] = useState(""); 
  const [type, setType] = useState(""); 
  const [pay, setPay] = useState(""); 
  const [subjects, setSubjects] = useState([]); 
  const [message, setMessage] = useState(""); 

  useEffect(() => {
    const fetchStudentData = async () => {
      if (!rollNumber || !stage) return;

      try {
        const response = await fetch(`${process.env.PUBLIC_URL}/JSON/${stage}.json`);
        if (!response.ok) throw new Error("فشل تحميل البيانات");

        const data = await response.json();
        if (Array.isArray(data.resalt)) {
          const foundStudent = data.resalt.find(
            (s) => s.rollNumber && s.rollNumber.toString() === rollNumber
          );

          if (foundStudent) {
            setStudent(foundStudent);
            setName(foundStudent.name);
            setGPA(foundStudent.GPA);
            setType(foundStudent.type);
            setPay(foundStudent.pay);
            setSubjects(
              Object.keys(foundStudent)
                .filter(
                  (key) =>
                    !["name", "GPA", "rollNumber", "stage", "type", "pay"].includes(key)
                )
                .map((subject) => ({
                  name: subject,
                  grade: foundStudent[subject],
                }))
            );
            setMessage("");
          } else {
            setStudent(null);
            setMessage("لم يتم العثور على الطالب");
          }
        } else {
          setMessage("البيانات المحمّلة غير صالحة.");
        }
      } catch (error) {
        setMessage("حدث خطأ في تحميل البيانات.");
      }
    };

    fetchStudentData();
  }, [rollNumber, stage]);

  const handleChange = (e, index) => {
    const { name, value } = e.target;

    if (name === "pay") {
      setPay(value);
    } else if (name === "GPA") {
      if (value < 0 || value > 4.0) {
        setMessage("يجب أن يكون المعدل التراكمي (GBA) بين 0 و 4.0");
      } else {
        setGPA(value);
        setMessage(""); // 
      }
    } else if (index !== undefined) {
      const updatedSubjects = [...subjects];
      updatedSubjects[index].grade = value;
      setSubjects(updatedSubjects);
    }
  };

  const handleSave = async () => {
    if (!name || !GPA || !type || !pay || subjects.some((subject) => !subject.grade)) {
      setMessage("من فضلك تأكد من تعبئة جميع الحقول");
      return;
    }

    const updatedStudent = {
      ...student,
      name,
      GPA,
      type,
      pay,
      ...subjects.reduce((acc, subject) => {
        acc[subject.name] = subject.grade;
        return acc;
      }, {}),
    };

    try {
      const response = await fetch("http://localhost:5000/update-student", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          stage,
          rollNumber,
          updatedStudent,
        }),
      });

      const data = await response.json();
      setMessage(response.ok ? data.message : "حدث خطأ أثناء حفظ البيانات.");
    } catch {
      setMessage("حدث خطأ أثناء الاتصال بالخادم.");
    }
  };

  return (
    <div className="edit-page" dir="rtl">
      <h1>تعديل بيانات الطالب</h1>

      <div className="edit-form">
        <label>
          أدخل رقم الجلوس:
          <input
            type="text"
            value={rollNumber}
            onChange={(e) => setRollNumber(e.target.value)}
            placeholder="أدخل رقم الجلوس"
          />
        </label>
      </div>

      {student && (
        <div className="student-details">
          <h2>بيانات الطالب</h2>
          <div className="form-group">
            <label>اسم الطالب:</label>
            <input type="text" value={name} disabled />
          </div>
          <div className="form-group">
            <label>المعدل التراكمي (GBA):</label>
            <input type="text" name="GPA" onChange={handleChange} value={GPA} />
          </div>
          <div className="form-group">
            <label>الشعبة:</label>
            <input type="text" value={type} disabled />
          </div>
          <div className="form-group">
            <label>حالة الدفع:</label>
            <select value={pay} onChange={(e) => handleChange(e)} name="pay">
              <option value="yes">نعم</option>
              <option value="no">لا</option>
            </select>
          </div>
          <div className="form-group">
            <h3>الدرجات</h3>
            {subjects.map((subject, index) => (
              <div key={index}>
                <label>{subject.name}:</label>
                <input
                  type="text"
                  value={subject.grade}
                  onChange={(e) => handleChange(e, index)}
                  placeholder="أدخل تقدير المادة"
                />
              </div>
            ))}
          </div>
          <button onClick={handleSave}>حفظ التعديلات</button>
        </div>
      )}

      {message && <div className="message">{message}</div>}
    </div>
  );
};

export default EditPage;
