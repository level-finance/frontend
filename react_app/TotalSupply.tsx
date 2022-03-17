import React from "react";
import ProgressBar from "./ProgressBar";

const data = [
    { name: 'ETH', value: 60 },
    { name: 'USDC', value: 50 },
    { name: 'DAI', value: 25 },
    { name: 'BIT', value: 42 },
    { name: 'BIT', value: 41 },
];

const TotalSupply = () => {
    return (
        <div className="dashboard-widget total-supply">
            <h2>Total supply</h2>
            <div style={{ color: '#777', fontSize: '18px', textAlign: 'left', fontWeight: 'bold', lineHeight: '21px' }}>
                <p style={{ color: '#FF5C5C' }}>{-0.84}%</p>
                <p>Top 5 Markets</p>
                {
                    data.map(({ name, value }) => (
                        <div>
                            <div style={{ margin: '20px 0 9px' }}>{name}</div>
                            <ProgressBar value={value} />
                        </div>
                    ))
                }
                <p>24h Supply Volume</p>
                <p>-{92987737.28.toLocaleString('en-US', { maximumFractionDigits: 2, style: 'currency', currency: 'USD' })}</p>
                <p># of suppliers</p>
                <p>{299731}</p>
            </div>
        </div>
    );
};

export default TotalSupply;
