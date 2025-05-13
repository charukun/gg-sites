import React from 'react';
import TherapistList from '../components/TherapistList';

function Tokyo() {
  const tokyoTherapists = [
    {
      name: 'セラピストC',
      description: '東京エリアのセラピストCです。'
    },
    {
      name: 'セラピストD',
      description: '東京エリアのセラピストDです。'
    }
  ];

  return (
    <div className="page">
      <h1>東京エリア</h1>
      <TherapistList therapists={tokyoTherapists} />
    </div>
  );
}

export default Tokyo;