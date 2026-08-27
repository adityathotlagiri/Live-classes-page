import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import type { EngagementTrendPoint } from '@/types/engagement';

interface EngagementTrendChartProps {
  data: EngagementTrendPoint[];
}

export default function EngagementTrendChart({ data }: EngagementTrendChartProps) {
  return (
    <div className="h-56 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
          <XAxis dataKey="label" stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
          <YAxis stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} domain={[0, 100]} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1e293b',
              border: '1px solid #334155',
              borderRadius: 8,
              fontSize: 12,
            }}
          />
          <Line
            type="monotone"
            dataKey="engagementScore"
            stroke="#42CE70"
            strokeWidth={2.5}
            dot={{ fill: '#238B45', r: 3 }}
            activeDot={{ r: 5 }}
            name="Engagement"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}