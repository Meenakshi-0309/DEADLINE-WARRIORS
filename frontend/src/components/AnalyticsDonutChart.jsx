import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function AnalyticsDonutChart({
  completed,
  pending,
  overdue,
}) {

  const data = [
    {
      name: "Completed",
      value: completed,
    },
    {
      name: "Pending",
      value: pending,
    },
    {
      name: "Overdue",
      value: overdue,
    },
  ];

  const COLORS = [
    "#10b981",
    "#f59e0b",
    "#ef4444",
  ];

  return (
    <div className="chart-card">

      <h2>Task Distribution</h2>

      <ResponsiveContainer
        width="100%"
        height={320}
      >
        <PieChart>

          <Pie
            data={data}
            innerRadius={70}
            outerRadius={110}
            dataKey="value"
            paddingAngle={5}
          >
            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={COLORS[index]}
              />
            ))}
          </Pie>

          <Tooltip />

          <Legend />

        </PieChart>
      </ResponsiveContainer>

    </div>
  );
}

export default AnalyticsDonutChart;