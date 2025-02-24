import React, { useState } from 'react';
import backgroundImage from '../assets/back.jpg';
import UploadSection from '../components/feedbackcomponents/uploadresume';
import Dashboard from '../components/feedbackcomponents/dashboard';
import FeedbackDisplay from '../components/feedbackcomponents/feedbackdisplay';
import JobListingButton from '../components/feedbackcomponents/joblisting';
import CommonNavbar from '../components/CommonNavbar';

const Feedback = () => {
  const [file, setFile] = useState(null);
  const [metrics, setMetrics] = useState(null);
  const [feedback, setFeedback] = useState(null);

  const handleUpload = async (uploadedFile) => {
    setFile(uploadedFile);

    // Mock response (to be replaced with backend later)
    const mockMetrics = { grammar: '85%', hiring: '70%', skillsCoverage: '60%', atsCompatibility: '90%' };
    const mockFeedback = [
      'Consider adding more action verbs.',
      'Experience section could use more detail.',
      'Great use of keywords!',
      'Experience section could use more detail Experience section could use more detail. Experience section could use more detail. Experience section could use more detail. Experience section could use more detail..',
      'Experience section could use more detail.',
      'Experience section could use more detail.',
      'Experience section could use more detail.',
      'Experience section could use more detail.',
      'Experience section could use more detail.',
      'Experience section could use more detail.',
      'Experience section could use more detail.',
      'Experience section could use more detail.',
      'Experience section could use more detail.',
      'Experience section could use more detail.',
      'Experience section could use more detail.',
      'Experience section could use more detail.',
      'Experience section could use more detail.',
      'Experience section could use more detail.',
      'Experience section could use more detail.',
      'Experience section could use more detail.',
      'Experience section could use more detail.',
      'Experience section could use more detail.',
      'Experience section could use more detail.',
      'Experience section could use more detail.',
      'Experience section could use more detail.',
      'Experience section could use more detail.',
      'Experience section could use more detail.',
      'Experience section could use more detail.',
      'Experience section could use more detail.',
    ];

    setMetrics(mockMetrics);
    setFeedback(mockFeedback);
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat flex flex-col"
      style={{ backgroundImage: `url(${backgroundImage})`, backgroundAttachment: 'fixed' }}
    >
      <CommonNavbar />
      {/* Heading outside centered content */}
      <h1 className="text-3xl text-black font-bold mt-6 ml-12 pl-7">Generate Feedback</h1>

      {/* Centered container for components */}
      <div className="flex w-full h-full justify-center">
        {/* Left Section */}
        <div className="w-2/6 flex flex-col gap-4 mt-10">
          <UploadSection onUpload={handleUpload} />
          <Dashboard metrics={metrics} />
        </div>

        {/* Right Section */}
        <div className="w-1/2 flex flex-col gap-4 mt-10">
          <FeedbackDisplay feedback={feedback} />
          <JobListingButton />
        </div>
      </div>
    </div>
  );
};

export default Feedback;