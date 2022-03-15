import React from "react";
import { ResponsiveContainer, BarChart, Bar, CartesianGrid, XAxis, YAxis } from "recharts";

const CandleBar = (props) => {
    const { x, y, width, height, rise, redFlag, greenFlag } = props;
  
    return (
      <g>
        <rect x={x} y={y} width={width} height={2} stroke="none" fill="#60D09A" />
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          stroke={rise ? "#219564" : "#C0485D"}
          fill={rise ? "#60D09A" : "#FF5C5C"}
        />
        {redFlag && (
          <polygon
            points={`${x}, ${y - 10} ${x + width / 2}, ${y - 5} ${x + width}, ${
              y - 10
            }`}
            fill="#FF5C5C"
          />
        )}
        {greenFlag && (
          <polygon
            points={`${x}, ${y + 10 + height} ${x + width / 2}, ${
              y + 5 + height
            } ${x + width}, ${y + 10 + height}`}
            fill="#60D09A"
          />
        )}
      </g>
    );
};

const PriceChart = () => {
    return (
        <div className="dashboard-widget price-chart">
            <h2>Price Chart</h2>
            <h3>$48,437</h3>
            <ResponsiveContainer width="100%" height={400}>
            <BarChart
                width={500}
                height={300}
                data={new Array(30)
                .fill()
                .map((o, i) => ({
                    value: [Math.random(), Math.random()].sort(),
                    name: i,
                    rise: Math.random() > 0.5,
                    redFlag: Math.random() > 0.9,
                    greenFlag: Math.random() > 0.9
                }))}
                margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5
                }}
            >
                <CartesianGrid vertical={false} />
                <XAxis axisLine={false} tickLine={false} dataKey="name" />
                <YAxis axisLine={false} tickLine={false} dataKey="value" />
                <Bar
                dataKey="value"
                fill="rgba(96, 208, 154, 0.3)"
                shape={<CandleBar />}
                />
            </BarChart>
            </ResponsiveContainer>
        </div>
    )
};

export default PriceChart;