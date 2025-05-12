import React from 'react';
import TherapistList from '../components/TherapistList';

function Osaka() {
  const osakaTherapists = [
    {
      name: 'セラピストA',
      description: '大阪エリアのセラピストAです。'
    },
    {
      name: 'セラピストB',
      description: '大阪エリアのセラピストBです。'
    }
  ];

  return (
    <div className="page">
      <h1>大阪エリア</h1>
      <TherapistList therapists={osakaTherapists} />
    </div>
  );
}

export default Osaka;