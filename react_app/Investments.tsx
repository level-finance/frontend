import React from "react";
import { ResponsiveContainer, PieChart, Pie } from "recharts";

const RADIAN = Math.PI / 180;

const PieLabel = ({
  cx,
  cy,
  name,
  innerRadius,
  outerRadius,
  midAngle
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.9;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return (
    <foreignObject
      x={x - radius * 0.5}
      y={y - radius / 6}
      width={radius}
      height="2em"
    >
      <div xmlns="http://www.w3.org/1999/xhtml" className="pieLabel">
        {name}
        <span style={{ color: "#2EB67D" }}>/LVL</span>
      </div>
    </foreignObject>
  );
};

const Investments = ({ data }) => {
  const sum = data.reduce((s, o) => s + o.value, 0);
  return (    
      <div className="dashboard-widget investments">
        <h2>my investments</h2>
        <ResponsiveContainer width="100%" height={260}>
          <PieChart width={400} height={260}>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              blendStroke
              labelLine={false}
              label={PieLabel}
            />
          </PieChart>
        </ResponsiveContainer>
        <table className="pieLegend">
          {
            data.map(({ name, value, fill }) => {
              return (
                <tr key={name}>
                  <td>
                    <span className="circle" style={{ backgroundColor: fill }} />
                    <span>{name}/LVL</span>
                  </td>  
                  <td>${value.toFixed(3)}</td>
                  <td style={{ color: '#2EB67D' }}>({(value/sum*100).toLocaleString('en-US', { maximumFractionDigits: 1 })}%)</td>
                </tr>
              );
            })
          }
        </table>
      </div>
  );
}

export default Investments;