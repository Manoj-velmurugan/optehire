//Code for search only action
// // import React, { useState } from "react";
// import JobCard from "./jobcard";
// import SearchBar from "./exploresb"; // Import SearchBar component

// const JobList = () => {
//   // Sample job data (Replace with API data later)
//   const jobs = [
//     {
//       title: "Software Engineer",
//       company: "Google",
//       location: "Bangalore, India",
//       jobType: "Full-time",
//       posted: "2 days ago",
//       salary: "₹15-20 LPA",
//       applyLink: "https://careers.google.com/",
//     },
//     {
//       title: "Frontend Developer",
//       company: "Amazon",
//       location: "Remote",
//       jobType: "Contract",
//       posted: "5 days ago",
//       salary: "₹10-15 LPA",
//       applyLink: "https://www.amazon.jobs/",
//     },
//     {
//       title: "Data Scientist",
//       company: "Microsoft",
//       location: "Hyderabad, India",
//       jobType: "Full-time",
//       posted: "1 week ago",
//       salary: "₹18-25 LPA",
//       applyLink: "https://careers.microsoft.com/",
//     },
//   ];

//   // State for search query
//   const [searchQuery, setSearchQuery] = useState("");

//   // Function to filter jobs based on search
//   const filteredJobs = jobs.filter((job) =>
//     job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     job.location.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <section className="py-16 bg-transparent min-h-screen">
//       <div className="container mx-auto px-6">
//         {/* Search Bar Component */}
//         <SearchBar onSearch={setSearchQuery} />

//         {/* Job Listings */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
//           {filteredJobs.length > 0 ? (
//             filteredJobs.map((job, index) => <JobCard key={index} {...job} />)
//           ) : (
//             <p className="text-center text-gray-500 col-span-full">No jobs found.</p>
//           )}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default JobList;

// Code dynamic seacrh and filter
import React, { useState } from "react";
import JobCard from "./jobcard";
import SearchBar from "./exploresb"; // Import SearchBar component

const JobList = () => {
  // Sample job data (Replace with API data later)
  const jobs = [
    {
      title: "Software Engineer",
      company: "Google",
      location: "Bangalore, India",
      jobType: "Full-time",
      posted: "2 days ago",
      salary: "₹15-20 LPA",
      applyLink: "https://careers.google.com/",
    },
    {
      title: "Frontend Developer",
      company: "Amazon",
      location: "Remote",
      jobType: "Contract",
      posted: "5 days ago",
      salary: "₹10-15 LPA",
      applyLink: "https://www.amazon.jobs/",
    },
    {
      title: "Data Scientist",
      company: "Microsoft",
      location: "Hyderabad, India",
      jobType: "Full-time",
      posted: "1 week ago",
      salary: "₹18-25 LPA",
      applyLink: "https://careers.microsoft.com/",
    },
    {
        title: "Frontend Developer",
        company: "Amazon",
        location: "Remote",
        jobType: "Contract",
        posted: "5 days ago",
        salary: "₹10-15 LPA",
        applyLink: "https://www.amazon.jobs/",
      },
      {
        title: "Software Engineer",
        company: "Google",
        location: "Bangalore, India",
        jobType: "Full-Time",
        posted: "2 days ago",
        salary: "₹20-30 LPA",
        applyLink: "https://careers.google.com/",
      },
      {
        title: "Backend Developer",
        company: "Microsoft",
        location: "Hyderabad, India",
        jobType: "Full-Time",
        posted: "1 week ago",
        salary: "₹15-25 LPA",
        applyLink: "https://careers.microsoft.com/",
      },
      {
        title: "UI/UX Designer",
        company: "Flipkart",
        location: "Bangalore, India",
        jobType: "Full-Time",
        posted: "3 days ago",
        salary: "₹8-12 LPA",
        applyLink: "https://www.flipkartcareers.com/",
      },
      {
        title: "Data Scientist",
        company: "Netflix",
        location: "Remote",
        jobType: "Contract",
        posted: "6 days ago",
        salary: "₹18-28 LPA",
        applyLink: "https://jobs.netflix.com/",
      },
      {
        title: "DevOps Engineer",
        company: "Paytm",
        location: "Noida, India",
        jobType: "Full-Time",
        posted: "4 days ago",
        salary: "₹12-18 LPA",
        applyLink: "https://paytm.com/careers/",
      },
      {
        title: "Mobile App Developer",
        company: "Zomato",
        location: "Gurgaon, India",
        jobType: "Internship",
        posted: "1 week ago",
        salary: "₹25-50k/month",
        applyLink: "https://careers.zomato.com/",
      },
      {
        title: "AI/ML Engineer",
        company: "Tesla",
        location: "Remote",
        jobType: "Full-Time",
        posted: "2 weeks ago",
        salary: "₹30-40 LPA",
        applyLink: "https://www.tesla.com/careers",
      },
      {
        title: "Full Stack Developer",
        company: "TCS",
        location: "Mumbai, India",
        jobType: "Full-Time",
        posted: "5 days ago",
        salary: "₹10-20 LPA",
        applyLink: "https://www.tcs.com/careers",
      },
      {
        title: "Cyber Security Analyst",
        company: "IBM",
        location: "Pune, India",
        jobType: "Full-Time",
        posted: "1 week ago",
        salary: "₹15-22 LPA",
        applyLink: "https://www.ibm.com/employment/",
      },
      {
        title: "Digital Marketing Analyst",
        company: "Joy Technologies",
        location: "Chennai, India",
        jobType: "Full-Time",
        posted: "1 week ago",
        salary: "₹6-8 LPA",
        applyLink: "https://www.ibm.com/employment/",
      },
      
  ];

  // State for search query
  const [searchQuery, setSearchQuery] = useState("");

  // Function to filter jobs based on search
  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="py-16 bg-transparent min-h-screen pt-10">
      <div className="container mx-auto px-6">
        {/* Search Bar Component */}
        <SearchBar onSearch={setSearchQuery} />

        {/* Job Listings */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 pt-10">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job, index) => <JobCard key={index} {...job} />)
          ) : (
            <p className="text-center text-gray-500 col-span-full">No jobs found.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default JobList;

