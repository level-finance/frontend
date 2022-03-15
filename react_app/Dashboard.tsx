/* Sorry for this */
import React from 'react'

import "./styles.css";
import {
  ResponsiveContainer,
  AreaChart,
  XAxis,
  YAxis,
  Area,
} from "recharts";
import Protovol from './Protovol';
import Volume from './Volume';
import Investments from './Investments';
import MCapTVLRatio from './MCapTVLRatio';
import PriceChart from './PriceChart';

const data = [
  {
    key: "Mon",
    value: 5
  },
  {
    key: "Tue",
    value: 25
  },
  {
    key: "Wed",
    value: 45
  },
  {
    key: "Thu",
    value: 65
  },
  {
    key: "Fri",
    value: 18
  },
  {
    key: "Sat",
    value: 38
  },
  {
    key: "Sun",
    value: 58
  }
];

const pieData = [
  {
    name: "USDC",
    value: 62.5,
    fill: "#6DE3AA"
  },
  {
    name: "ETH",
    value: 62.5,
    fill: "#50AC80"
  },
  {
    name: "BIT",
    value: 125,
    fill: "#FE9900"
  },
  {
    name: "FUSE",
    value: 62.5,
    fill: "#FFBA52"
  },
  {
    name: "BNB",
    value: 187.5,
    fill: "#60D09A"
  }
];

const protovolData = [
  {
    name: "STATIK Fees",
    value: 125,
    fill: "#6DE3AA"
  },
  {
    name: "DEX Fees",
    value: 93,
    fill: "#50AC80"
  },
  {
    name: "Curve aTriCrypto",
    value: 49,
    fill: "#FE9900"
  },
  {
    name: "STATIK Revenue",
    value: 45.061,
    fill: "#FFBA52"
  },
  {
    name: "Others",
    value: 34.6,
    fill: "#60D09A"
  }
];

export default function Dashboard() {
  return (
    <div className="dashboard-page">
      <div className="dashboard-grid">
        <div className="dashboard-widget indicators">
          <h2>
            indicators level
          </h2>
          <div style={{ display: 'flex', marginTop: '20px' }}>
            <div className="dashboard-widget holders">
              <h3>
                Holders <span>+1254</span>
              </h3>
              <ResponsiveContainer width={600} height={160}>
                <AreaChart
                  width={600}
                  height={160}
                  data={data}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <XAxis axisLine={false} tickLine={false} dataKey="key" />
                  <YAxis axisLine={false} tickLine={false} tickCount={4} width={20}/>
                  <Area
                    type="linear"
                    dataKey="value"
                    stroke="#60D09A"
                    fill="rgba(96, 208, 154, 0.3)"
                    strokeWidth="2px"
                    dot={{ stroke: "#FE9900", fill: "#ffffff", strokeWidth: 2, r: 4 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        <Investments data={pieData} />
        <PriceChart />
        <div className="dashboard-widget pending-rewards">
          <h2>Pending rewards</h2>
          <h3 style={{ marginTop: '20px' }}>$345.618</h3>
        </div>
        <Volume
          data={new Array(30).fill(null).map((o, i) => ({ value: Math.random(), name: i }))}
        />
        <MCapTVLRatio />
        <Protovol data={pieData} />
      </div>
    </div>
  );
}

