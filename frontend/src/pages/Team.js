import React from 'react';
import TeamMemberCard from '../components/TeamMemberCard';
import './Team.css';

function Team() {
  const teamMembers = [
    { name: 'John Doe', role: 'CEO', bio: 'Visionary leader with 20+ years in IT.', image: 'placeholder_male1.jpg' },
    { name: 'Jane Smith', role: 'CTO', bio: 'Cloud architecture expert, driving innovation.', image: 'placeholder_female1.jpg' },
    { name: 'Michael Johnson', role: 'Lead Cloud Architect', bio: 'Specialist in GCP and AWS solutions.', image: 'placeholder_male2.jpg' },
    { name: 'Emily White', role: 'Senior Software Engineer', bio: 'Full-stack developer with a passion for clean code.', image: 'placeholder_female2.jpg' },
    { name: 'David Brown', role: 'DevOps Engineer', bio: 'Automating deployments and infrastructure.', image: 'placeholder_male3.jpg' },
    { name: 'Sarah Green', role: 'Project Manager', bio: 'Ensuring projects are delivered on time and budget.', image: 'placeholder_female3.jpg' },
    { name: 'Chris Black', role: 'Cloud Security Specialist', bio: 'Protecting our clients\' data in the cloud.', image: 'placeholder_male4.jpg' },
    { name: 'Anna Lee', role: 'UI/UX Designer', bio: 'Crafting intuitive and engaging user experiences.', image: 'placeholder_female4.jpg' },
    { name: 'Robert King', role: 'Data Engineer', bio: 'Building robust data pipelines and analytics solutions.', image: 'placeholder_male5.jpg' },
    { name: 'Laura Taylor', role: 'Business Analyst', bio: 'Bridging the gap between business and technology.', image: 'placeholder_female5.jpg' },
    { name: 'James Wilson', role: 'Backend Developer', bio: 'Expert in Node.js and microservices.', image: 'placeholder_male6.jpg' },
    { name: 'Sophia Miller', role: 'Frontend Developer', bio: 'Specializing in React and modern web development.', image: 'placeholder_female6.jpg' },
    { name: 'Daniel Clark', role: 'Cloud Consultant', bio: 'Advising clients on their cloud strategy.', image: 'placeholder_male7.jpg' },
    { name: 'Olivia Hall', role: 'QA Engineer', bio: 'Ensuring the quality and reliability of our software.', image: 'placeholder_female7.jpg' },
    { name: 'Matthew Wright', role: 'Network Engineer', bio: 'Designing and implementing secure cloud networks.', image: 'placeholder_male8.jpg' },
    { name: 'Grace Moore', role: 'Technical Writer', bio: 'Documenting our solutions clearly and precisely.', image: 'placeholder_female8.jpg' },
    { name: 'Joseph Baker', role: 'Database Administrator', bio: 'Managing and optimizing cloud databases.', image: 'placeholder_male9.jpg' },
    { name: 'Chloe Adams', role: 'HR Manager', bio: 'Building a talented and vibrant team.', image: 'placeholder_female9.jpg' },
    { name: 'Benjamin Carter', role: 'Sales & Marketing', bio: 'Connecting clients with our innovative solutions.', image: 'placeholder_male10.jpg' },
    { name: 'Isabella Rodriguez', role: 'Customer Success', bio: 'Ensuring client satisfaction and long-term partnerships.', image: 'placeholder_female10.jpg' },
  ];

  return (
    <div className="team-page container">
      <div className="team-header">
        <h1>Meet Our Talented Team</h1>
        <p>AJFS Innovations Pvt Ltd is powered by a diverse group of highly skilled and passionate professionals dedicated to delivering excellence.</p>
      </div>
      <div className="team-grid">
        {teamMembers.map((member, index) => (
          <TeamMemberCard key={index} {...member} />
        ))}
      </div>
    </div>
  );
}

export default Team;
