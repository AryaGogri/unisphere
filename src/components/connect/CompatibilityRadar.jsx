import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';

export function CompatibilityRadar({ candidate, mode = 'study_buddy' }) {
  const data = [
    { subject: 'Study Hours', score: candidate?.compatibility > 80 ? 90 : 70 },
    { subject: 'Subjects', score: candidate?.compatibility > 85 ? 95 : 75 },
    { subject: 'Environment', score: 85 },
    { subject: 'Cleanliness', score: 80 },
    { subject: 'Goals', score: candidate?.compatibility > 90 ? 98 : 70 },
    { subject: 'Schedule', score: 88 }
  ];

  return (
    <div className="w-full h-44 my-2">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
          <PolarGrid stroke="rgba(255, 255, 255, 0.15)" />
          <PolarAngleAxis dataKey="subject" stroke="#94a3b8" tick={{ fill: '#94a3b8', fontSize: 10 }} />
          <Radar
            name="Compatibility"
            dataKey="score"
            stroke="#8b5cf6"
            fill="#8b5cf6"
            fillOpacity={0.35}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
