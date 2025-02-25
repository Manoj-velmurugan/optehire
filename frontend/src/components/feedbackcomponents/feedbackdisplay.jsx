import React from 'react';

const FeedbackDisplay = ({ feedback, swotAnalysis }) => {
  return (
    <div className="bg-white bg-opacity-40 p-5 rounded-lg w-full h-auto max-h-96 overflow-y-auto">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">Feedback</h3>
      {feedback && (
        <ul className="list-disc pl-5 text-gray-700">
          {feedback.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      )}
      {swotAnalysis && (
        <div className="mt-4">
          <h4 className="text-md font-semibold text-gray-800">SWOT Analysis</h4>
          <pre className="text-gray-700 whitespace-pre-wrap break-words">
            {JSON.stringify(swotAnalysis, null, 2)}
          </pre>
        </div>
      )}
      {!feedback && !swotAnalysis && (
        <p className="text-gray-600">No feedback available. Upload a resume and submit a role to see results.</p>
      )}
    </div>
  );
};

export default FeedbackDisplay;
