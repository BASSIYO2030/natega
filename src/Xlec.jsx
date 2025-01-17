import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import './Xlec.css'; 

export default function Xlec() {
  const [jsonData, setJsonData] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const json = XLSX.utils.sheet_to_json(worksheet);
      setJsonData(json);
    };

    reader.readAsArrayBuffer(file);
  };

  const copyToClipboard = () => {
    if (jsonData) {
      const text = JSON.stringify(jsonData, null, 2);
      navigator.clipboard.writeText(text).then(() => {
        alert('Copied to clipboard!');
      }, (err) => {
        console.error('Failed to copy: ', err);
      });
    }
  };

  return (
    <div className="xlec-container">
      <div className="xlec-header">
        <h2>تحويل الدرجات الي قواعد بيانات</h2>
      </div>
      <div className="file-upload-section">
        <input
          type="file"
          accept=".xlsx, .xls"
          onChange={handleFileUpload}
          className="file-upload-input"
        />
      </div>
      {jsonData && (
        <div className="json-output">
          <h3>JSON Output:</h3>
          <pre>{JSON.stringify(jsonData, null, 2)}</pre>
          <button className="copy-btn" onClick={copyToClipboard}>
            Copy to Clipboard
          </button>
        </div>
      )}
    </div>
  );
}