import React from 'react';

const courses = [
  {
    title: 'Data Structures and Algorithms',
    description: 'Comprehensive coverage of fundamental data structures and algorithms, including sorting, searching, and dynamic programming.',
    provider: 'Coursera - UC San Diego & National Research University Higher School of Economics',
    courseUrl: 'https://www.coursera.org/specializations/data-structures-algorithms',
  },
  {
    title: 'Computer Science for Artificial Intelligence',
    description: 'Introduction to computer science concepts with a focus on AI, including search algorithms and machine learning.',
    provider: 'edX - Harvard University',
    courseUrl: 'https://cs50.harvard.edu/ai/',
  },
  {
    title: 'Full-Stack Web Development with React',
    description: 'Covers front-end and back-end development, including React, Node.js, Express, and MongoDB.',
    provider: 'Coursera - The Hong Kong University of Science and Technology',
    courseUrl: 'https://www.coursera.org/specializations/full-stack-react',
  },
  {
    title: 'Machine Learning',
    description: 'Covers supervised and unsupervised learning techniques, neural networks, and deep learning concepts.',
    provider: 'Coursera - Stanford University (Andrew Ng)',
    courseUrl: 'https://www.coursera.org/learn/machine-learning',
  },
  {
    title: 'Operating Systems and Systems Programming',
    description: 'Explores OS concepts like process scheduling, memory management, and file systems.',
    provider: 'Udacity',
    courseUrl: 'https://www.udacity.com/course/intro-to-operating-systems--ud923',
  },
  {
    title: 'Introduction to Cybersecurity',
    description: 'Covers cybersecurity fundamentals, cryptography, network security, and risk management.',
    provider: 'edX - University of Washington',
    courseUrl: 'https://www.edx.org/course/introduction-to-cybersecurity',
  },
  {
    title: 'SQL for Data Science',
    description: 'Learn SQL basics, data manipulation, and advanced querying techniques.',
    provider: 'Coursera - University of California, Davis',
    courseUrl: 'https://www.coursera.org/learn/sql-for-data-science',
  },
  {
    title: 'Computer Networking',
    description: 'Detailed study of network protocols, TCP/IP, HTTP, and network security.',
    provider: 'Coursera - University of Washington',
    courseUrl: 'https://www.coursera.org/learn/computer-networking',
  },
  {
    title: 'Python for Everybody',
    description: 'Beginner-friendly Python course covering data structures, APIs, and databases.',
    provider: 'Coursera - University of Michigan',
    courseUrl: 'https://www.coursera.org/specializations/python',
  },
  {
    title: 'Cloud Computing Specialization',
    description: 'Introduction to cloud computing concepts, AWS, Google Cloud, and Azure services.',
    provider: 'Coursera - University of Illinois',
    courseUrl: 'https://www.coursera.org/specializations/cloud-computing',
  },
  {
    title: 'Kubernetes for Developers',
    description: 'Covers container orchestration, Kubernetes architecture, and deployment techniques.',
    provider: 'Udemy',
    courseUrl: 'https://www.udemy.com/course/kubernetes-for-developers/',
  },
  {
    title: 'Blockchain Basics',
    description: 'Introduction to blockchain technology, smart contracts, and decentralized applications.',
    provider: 'Coursera - University at Buffalo',
    courseUrl: 'https://www.coursera.org/learn/blockchain-basics',
  },
];

const TechCourses = () => {
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Tech Courses</h2>
      <ul>
        {courses.map((course, index) => (
          <li key={index} className="mb-4 p-4 border rounded shadow-md">
            <h3 className="text-xl font-semibold">{course.title}</h3>
            <p className="text-gray-700">{course.description}</p>
            <p className="text-sm text-gray-500">Provider: {course.provider}</p>
            <a href={course.courseUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
              View Course
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TechCourses;
