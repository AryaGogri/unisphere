import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export function AttendanceChart() {
  const data = [
    { week: 'W1', DBMS: 90, COA: 85, TCS: 92 },
    { week: 'W2', DBMS: 85, COA: 88, TCS: 90 },
    { week: 'W3', DBMS: 88, COA: 92, TCS: 85 },
    { week: 'W4', DBMS: 92, COA: 90, TCS: 88 },
    { week: 'W5', DBMS: 95, COA: 94, TCS: 91 }
  ];

  return (
    <div className="w-full h-48 my-2">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="dbmsGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="coaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#14b8a6" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <XAxis dataKey="week" stroke="#64748b" tick={{ fontSize: 11 }} />
          <YAxis stroke="#64748b" domain={[60, 100]} tick={{ fontSize: 11 }} />
          <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }} />
          <Area type="monotone" dataKey="DBMS" stroke="#f59e0b" fillOpacity={1} fill="url(#dbmsGrad)" />
          <Area type="monotone" dataKey="COA" stroke="#14b8a6" fillOpacity={1} fill="url(#coaGrad)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
