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
import TotalSupply from './TotalSupply';
import ProgressBar from './ProgressBar';
import Leaderboard from './Leaderboard';

const holdersData = [
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

const priceData = new Array(30).fill().map((o, i) => ({
  value: [Math.random(), Math.random()].sort(),
  name: i,
  rise: Math.random() > 0.5,
  redFlag: Math.random() > 0.9,
  greenFlag: Math.random() > 0.9
}));

export default function Dashboard() {
  return (
    <div className="dashboard-page">
      <div className="dashboard-grid">
        <div className="dashboard-widget indicators">
          <h2>
            indicators level
          </h2>
          <div style={{ display: 'flex', marginTop: '20px', gap: '20px 30px', flexWrap: 'wrap' }}>
            <div className="dashboard-widget fdv">
              <h3 style={{ marginBottom: '15px' }}>
                FDV
              </h3>
              <h3 style={{ marginBottom: '22px' }}>
                1,20 AUD
              </h3>
              <h3 style={{ marginBottom: '2px', color: '#60D09A' }}>
                +0,035
              </h3>
              <h3>
                <span style={{ fontSize: '24px' }}>(2,85%)</span> <b style={{ color: '#60D09A' }}>▲</b>
              </h3>
            </div>
            <div className="dashboard-widget holders">
              <h3>
                Holders <span>+1254</span>
              </h3>
              <ResponsiveContainer width={600} height={160}>
                <AreaChart
                  width={600}
                  height={160}
                  data={holdersData}
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
            <div className="contract">
              <h3>Contract</h3>
              <div className="dashboard-widget">
                <ProgressBar value={12.13} style={{ height: '20px', borderRadius: '20px' }} />
                <h3 style={{ marginTop: '1em' }}>
                  12.13% out of 10m
                </h3>
              </div>
            </div>
            <div className="monthly-plan">
              <h3>LVL Monthly Plan</h3>
              <div className="dashboard-widget">
                <div>100/day</div>
                <div>700/week</div>
                <div>05.05.2022</div>
                <div style={{ marginLeft: '-3px' }}>80/day</div>
              </div>
            </div>
          </div>
        </div>
        <Investments data={pieData} />
        <PriceChart data={priceData} ticker="LVL" tickers={['LVL', 'ANC', 'MIR']}/>
        <div className="dashboard-widget pending-rewards">
          <h2>Pending rewards</h2>
          <h3 style={{ marginTop: '20px' }}>$345.618</h3>
        </div>
        <Volume
          data={new Array(30).fill(null).map((o, i) => ({ value: Math.random(), name: i }))}
        />
        <MCapTVLRatio />
        <Protovol data={protovolData} />
        <TotalSupply />
        <div className="dashboard-widget market-screener">
          <h2>Market screener</h2>
          <div className="screeners">
            <img src={require('@/assets/images/screeners/turtle.svg')} />
            <img src={require('@/assets/images/screeners/shark.svg')} />
            <img src={require('@/assets/images/screeners/whale.svg')} />
            {
              [0.6, 0.9, -0.9].map(value => (
                <div className="screener">
                  <div
                    className="screener-bar"
                    style={{ width: `${Math.abs(value) * 50}%`, ...(value > 0 ? { borderRadius: '0 10px 10px 0', left: '50%' } : { borderRadius: '10px 0 0 10px', right: '50%' }) }}
                  />
                </div>
              ))
            }
          </div>
        </div>
        <div className="dashboard-widget token-price">
          <h2>LVL Token Price</h2>
        </div>
        <Leaderboard />
        <div className="dashboard-widget trading-fees">
          <h2>Trading fees changes</h2>
        </div>
      </div>
    </div>
  );
}

