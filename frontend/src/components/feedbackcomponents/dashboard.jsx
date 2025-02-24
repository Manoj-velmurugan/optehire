import React from 'react';

const Dashboard = ({ metrics }) => {
  // Parse percentage strings to numbers, default to 0 if undefined
  const grammarScore = metrics?.grammar ? parseInt(metrics.grammar) : 0;
  const hiringProbability = metrics?.hiring ? parseInt(metrics.hiring) : 0;
  const skillCoverage = metrics?.skillsCoverage ? parseInt(metrics.skillsCoverage) : 0;
  const atsCompatibility = metrics?.atsCompatibility ? parseInt(metrics.atsCompatibility) : 0;

  return (
    <div className="bg-white bg-opacity-40 p-5 rounded-lg w-96">
      <h4 className="text-md font-semibold text-gray-800 mb-4">Resume Stats</h4>
      <div className="space-y-4">
        {/* Grammar Score */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <p className="text-sm text-gray-700">Grammar Score</p>
            <span className="text-sm font-semibold text-gray-800">{grammarScore}%</span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-black rounded-full transition-all duration-1500 ease-in-out"
              style={{ width: `${grammarScore}%` }}
            ></div>
          </div>
        </div>

        {/* Hiring Probability */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <p className="text-sm text-gray-700">Hiring Probability</p>
            <span className="text-sm font-semibold text-gray-800">{hiringProbability}%</span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-black rounded-full transition-all duration-1500 ease-in-out"
              style={{ width: `${hiringProbability}%` }}
            ></div>
          </div>
        </div>

        {/* Skill Coverage */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <p className="text-sm text-gray-700">Skill Coverage</p>
            <span className="text-sm font-semibold text-gray-800">{skillCoverage}%</span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-black rounded-full transition-all duration-1500 ease-in-out"
              style={{ width: `${skillCoverage}%` }}
            ></div>
          </div>
        </div>

        {/* ATS Compatibility */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <p className="text-sm text-gray-700">ATS Compatibility</p>
            <span className="text-sm font-semibold text-gray-800">{atsCompatibility}%</span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-black rounded-full transition-all duration-1500 ease-in-out"
              style={{ width: `${atsCompatibility}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;