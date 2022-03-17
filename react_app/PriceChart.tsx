import React, { useState } from "react";
import { ResponsiveContainer, BarChart, Bar, CartesianGrid, XAxis, YAxis, LineChart, Line, Tooltip } from "recharts";

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
            points={`${x}, ${y - 10} ${x + width / 2}, ${y - 4} ${x + width}, ${
              y - 10
            }`}
            fill="#FF5C5C"
          />
        )}
        {greenFlag && (
          <polygon
            points={`${x}, ${y + 10 + height} ${x + width / 2}, ${
              y + 4 + height
            } ${x + width}, ${y + 10 + height}`}
            fill="#60D09A"
          />
        )}
      </g>
    );
};

const CandlesChart = ({ data }) => {
    return <ResponsiveContainer width="100%" height={400}>
        <BarChart
            width={500}
            height={300}
            data={data}
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
};


const SmoothChart = ({ data }) => {
    return <ResponsiveContainer width="100%" height={400}>
        <LineChart
            width={500}
            height={300}
            data={data}
            margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5
            }}
        >
            <Tooltip
                cursor={{ stroke: 'url(#linear)', strokeWidth: 2 }}
                content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="custom-tooltip">
                            <svg>
                            <defs>
                                <linearGradient id="linear" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%"   stop-color="#05a"/>
                                    <stop offset="100%" stop-color="#0a5"/>
                                </linearGradient>
                            </defs>
                            </svg>
                            {`${label}.03.2022`}
                        </div>
                      );
                    }
                    return null;
                }}
            />
            <XAxis axisLine={false} tickLine={false} dataKey="name" />
            <Line
                dataKey="value"
                stroke="#60D09A"
                strokeWidth="2px"
                activeDot={{ stroke: '#000', fill: '#000', r: 4 }}
                dot={false}
            />
        </LineChart>
    </ResponsiveContainer>
};

const PriceChart = ({ data, ticker, tickers }) => {
    const [ isCandles, setIsCandles ] = useState(false)
    return (
        <div className="dashboard-widget price-chart">
            <h2>Price Chart</h2>
            <h3>{ ticker }</h3>
            <h3>$48,437</h3>
            <div onClick={() => setIsCandles(!isCandles)}>
                { isCandles ? <CandlesChart data={data} /> : <SmoothChart data={data.map(({ value, ...rest }) => ({ ...rest, value: (value[0] + value[1]) / 2 }))} /> }
            </div>
            <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
                {
                    tickers.map((t) => (
                        <div key={t}>{t}</div>
                    ))
                }
            </div>
        </div>
    )
};

export default PriceChart;