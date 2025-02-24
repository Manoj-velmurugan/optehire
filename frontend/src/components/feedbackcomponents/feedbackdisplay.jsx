import React from 'react';

const FeedbackDisplay = ({ feedback }) => {
  return (
    <div className="bg-white bg-opacity-70 p-5 rounded-lg w-full min-h-40 max-h-96 overflow-y-auto">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">Feedback</h3>
      {feedback ? (
        <ul className="list-disc pl-5 text-sm text-gray-700">
          {feedback.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-gray-700">Upload a resume to see feedback.</p>
      )}
    </div>
  );
};

export default FeedbackDisplay;