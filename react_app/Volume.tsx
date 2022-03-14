import React from "react";
import { ResponsiveContainer, Bar, BarChart, XAxis } from "recharts";

const CustomBar = (props) => {
    const { fill, x, y, width, height } = props;
  
    return (
      <g>
        <rect x={x} y={y} width={width} height={2} stroke="none" fill="#60D09A" />
        <rect
          x={x}
          y={4 + y}
          width={width}
          height={height - 4}
          stroke="none"
          fill={fill}
        />
      </g>
    );
  };
  

const Volume = ({ data }) => {
    return (
        <div className="dashboard-widget volume">
            <h2>Volume 24h</h2>
            <h3>$76.96m</h3>
            <ResponsiveContainer width="100%" height={180}>
                <BarChart
                    width={500}
                    height={300}
                    data={new Array(30)
                    .fill()
                    .map((o, i) => ({ value: Math.random(), name: i }))}
                    margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5
                    }}
                >
                    <XAxis axisLine={false} tickLine={false} dataKey="name" />
                    <Bar
                        dataKey="value"
                        fill="rgba(96, 208, 154, 0.3)"
                        shape={<CustomBar />}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default Volume;
