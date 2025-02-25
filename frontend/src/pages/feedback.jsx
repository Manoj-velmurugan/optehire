import React, { useState } from 'react'; // Removed unused useEffect
import backgroundImage from '../assets/back.jpg';
import UploadSection from '../components/feedbackcomponents/uploadresume';
import Dashboard from '../components/feedbackcomponents/dashboard';
import FeedbackDisplay from '../components/feedbackcomponents/feedbackdisplay';
import JobListingButton from '../components/feedbackcomponents/joblisting';
import CommonNavbar from '../components/CommonNavbar';

const Feedback = () => {
  const [file, setFile] = useState(null);
  const [position, setPosition] = useState('');
  const [customPosition, setCustomPosition] = useState('');
  const [metrics, setMetrics] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [swotAnalysis, setSwotAnalysis] = useState(null);
  const [uploadId, setUploadId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Predefined positions
  const predefinedPositions = [
    'Software Engineering',
    'Data Science',
    'Web Development',
    'Product Management',
    'Other',
  ];

  // Handle file upload (POST to /upload)
  const handleUpload = async (uploadedFile) => {
    setFile(uploadedFile);
    setFeedback(null);
    setMetrics(null);
    setSwotAnalysis(null);
    setUploadId(null);
    setPosition('');
    setCustomPosition('');

    if (window.confirm('Uploading a new resume will start a new analysis. Continue?')) {
      const formData = new FormData();
      formData.append('resume', uploadedFile, uploadedFile.name); // Match Postman format

      setIsLoading(true);
      try {
        const response = await fetch('http://localhost:8000/upload', {
          method: 'POST',
          body: formData,
          mode: 'cors',
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error(`Failed to upload resume: ${response.statusText}`); // Fixed string interpolation
        }

        const result = await response.json();
        console.log('Upload response:', result);
        setUploadId(result.uploadId);
        setFeedback(['Resume uploaded successfully. Please select or enter the role you’re targeting below.']);
      } catch (error) {
        console.error('Error uploading file:', error);
        setFeedback([`Error: Could not upload resume. Please try again. Details: ${error.message}`]); // Fixed string interpolation
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Handle position submission (POST to /analyze/<uploadId>)
  const handlePositionSubmit = async (e) => {
    e.preventDefault();
    if (!uploadId) {
      setFeedback(['Error: Please upload a resume first.']);
      return;
    }

    const finalPosition = position === 'Other' ? customPosition.trim() : position;
    if (!finalPosition) {
      setFeedback(['Error: Please select a role or enter a custom one.']);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:8000/analyze/${uploadId}`, { // Fixed template literal
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ position: finalPosition }),
      });

      if (!response.ok) {
        throw new Error('Failed to analyze resume');
      }

      const result = await response.json();
      console.log('Analyze response:', result);
      setFeedback(['Role submitted successfully. Click "Get Feedback" to view the analysis.']);
    } catch (error) {
      console.error('Error analyzing resume:', error);
      setFeedback(['Error: Could not analyze resume for this role. Please try again.']);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch feedback (GET to /feedback/<uploadId>)
  const fetchFeedback = async () => {
    if (!uploadId) {
      setFeedback(['Error: Upload a resume and submit a role first.']);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:8000/feedback/${uploadId}`, { // Fixed template literal
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch feedback');
      }

      const result = await response.json();
      console.log('Feedback response:', result);
      
      // Set SWOT analysis and metrics, handling defaults
      setSwotAnalysis(result.swot || null);
      setMetrics(result.metrics || { grammar_score: 0, hiring_probability: 0, skill_coverage: 0, ats_compatibility: 0 });
      setFeedback(['Feedback retrieved successfully.']);
    } catch (error) {
      console.error('Error fetching feedback:', error);
      setFeedback(['Error: Could not retrieve feedback. Please try again.']);
      setMetrics({ grammar_score: 0, hiring_probability: 0, skill_coverage: 0, ats_compatibility: 0 });
      setSwotAnalysis(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat flex flex-col"
      style={{ backgroundImage: `url(${backgroundImage})`, backgroundAttachment: 'fixed' }} // Fixed syntax
    >
      <CommonNavbar />
      <h1 className="text-3xl text-black font-bold mt-6 ml-12 pl-7">Generate Feedback</h1>

      <div className="flex w-full h-full justify-center">
        {/* Left Section */}
        <div className="w-2/6 flex flex-col gap-4 mt-10">
          <UploadSection onUpload={handleUpload} />
          
          {uploadId && (
            <form onSubmit={handlePositionSubmit} className="bg-white bg-opacity-40 p-5 rounded-lg">
              <label className="block text-lg font-semibold text-gray-800 mb-2">
                What role are you applying for?
              </label>
              <select
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                className="w-full p-2 border rounded-md mb-4 text-gray-700"
              >
                <option value="">Select a role</option>
                {predefinedPositions.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>

              {position === 'Other' && (
                <input
                  type="text"
                  value={customPosition}
                  onChange={(e) => setCustomPosition(e.target.value)}
                  placeholder="Enter custom role (e.g., AI Engineer)"
                  className="w-full p-2 border rounded-md mb-4 text-gray-700"
                />
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400"
              >
                {isLoading ? 'Submitting...' : 'Submit Role'}
              </button>
            </form>
          )}
          
          <Dashboard metrics={metrics} />
        </div>

        {/* Right Section */}
        <div className="w-1/2 flex flex-col gap-4 mt-10">
          {uploadId && (
            <button
              onClick={fetchFeedback}
              disabled={isLoading}
              className="py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-gray-400"
            >
              {isLoading ? 'Fetching...' : 'Get Feedback'}
            </button>
          )}
          <FeedbackDisplay feedback={feedback} swotAnalysis={swotAnalysis} />
          <JobListingButton />
        </div>
      </div>
    </div>
  );
};

export default Feedback;