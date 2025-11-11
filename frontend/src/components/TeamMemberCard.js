import React from 'react';
import './TeamMemberCard.css';

function TeamMemberCard({ name, role, bio, image }) {
  return (
    <div className="team-member-card">
      <div className="member-image-wrapper">
        <img src={`/images/${image}`} alt={name} className="member-image" />
      </div>
      <h3>{name}</h3>
      <p className="role">{role}</p>
      <p className="bio">{bio}</p>
    </div>
  );
}

export default TeamMemberCard;
