import React, { useState } from 'react';

const UploadSection = ({ onUpload }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      setFile(selectedFile);
      onUpload(selectedFile);
    } else {
      alert('Please upload a .docx file');
    }
  };

  return (
    <div className="bg-white bg-opacity-40 p-5 rounded-lg w-96 h-40 flex flex-col gap-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">Upload Resume</h3>
      <input
        type="file"
        accept=".docx"
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
      />
    </div>
  );
};

export default UploadSection;