import React from 'react';

function TherapistList({ therapists }) {
  return (
    <div className="therapist-list">
      <h2>セラピスト一覧</h2>
      <ul>
        {therapists.map((therapist, index) => (
          <li key={index} className="therapist-item">
            <h3>{therapist.name}</h3>
            <p>{therapist.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TherapistList;