import React from "react";
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis } from "recharts";

const arr = ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', '2022', 'Feb', 'Mar'];

const MCapTVLRatio = () => {
  return (    
    <div className="dashboard-widget mcap-tvl-ratio">
      <h2>mcap/tvl ratio</h2>
      <p><div className="circle" style={{ backgroundColor: '#60D09A' }} />SUM of MCap/TVL Ratio <span className="circle" style={{ backgroundColor: '#FE9900' }} />SUM of MCap/TVL Ratio (Fully Diluted)</p>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          width={500}
          height={300}
          data={new Array(10)
            .fill()
            .map((o, i) => ({
              value: Math.random() * 2,
              valueDiluted: Math.random() * 2,
              name: arr[i],
            }))}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5
          }}
        >
          <CartesianGrid horizontal={false} />
          <XAxis axisLine={false} tickLine={false} dataKey="name" />
          <YAxis axisLine={false} tickLine={false} dataKey="value" width={30} />
          <Line
            type="monotone"
            dataKey="value"
            strokeWidth="2px"
            stroke="#60D09A"
            dot={{ fill: "#60D09A" }}
          />
          <Line
            type="monotone"
            dataKey="valueDiluted"
            strokeWidth="2px"
            stroke="#FE9900"
            dot={{ fill: "#FE9900" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default MCapTVLRatio;