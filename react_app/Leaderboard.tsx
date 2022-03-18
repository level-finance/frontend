import React from "react";

const screeners = ['turtle', 'shark', 'shark', 'whale', 'shark', 'whale'];
const screenersMap = {
    turtle: require('@/assets/images/screeners/turtle.svg'),
    shark: require('@/assets/images/screeners/shark.svg'),
    whale: require('@/assets/images/screeners/whale.svg'),
};

export default function Leaderboard () {
    return (
        <div className="dashboard-widget leaderboard">
          <h2>Leaderboard</h2>
          <div className="leaderboard-table">
            <div style={{ display: 'contents', fontSize: '16px' }}>  
                <div style={{ paddingLeft: '30px' }}>Place</div>
                <div style={{ justifyContent: 'center' }}>Name</div>
                <div style={{ justifyContent: 'center' }}>Screener</div>
                <div>Pools liquidity</div>
                <div>Volume 24h</div>
                <div style={{ paddingRight: '30px' }}>APR</div>
            </div>
            <div style={{ display: 'contents', fontSize: '20px' }} >
                <div style={{ display: 'contents' }} >
                    <div style={{ backgroundColor: 'rgb(255, 255, 255, 0.6)', paddingLeft: '30px' }}>№ 648</div>
                    <div style={{ backgroundColor: 'rgb(255, 255, 255, 0.6)', justifyContent: 'center' }}>0x23...c70cB</div>
                    <div style={{ backgroundColor: 'rgb(255, 255, 255, 0.6)', justifyContent: 'center' }}><img width={43} src={screenersMap[screeners[0]]} /></div>
                    <div style={{ backgroundColor: 'rgb(255, 255, 255, 0.6)' }}>100.678$</div>
                    <div style={{ backgroundColor: 'rgb(255, 255, 255, 0.6)' }}>1.09$</div>
                    <div style={{ backgroundColor: 'rgb(255, 255, 255, 0.6)', paddingRight: '30px' }}>37.9%</div>
                </div>
                {
                new Array(5).fill(null).map((_, i) => (
                    <div key={i} style={{ display: 'contents' }}>
                        <div style={{ marginTop: '-6px', paddingLeft: '30px' }}>№ {i + 1}</div>
                        <div style={{ marginTop: '-6px', justifyContent: 'center' }}>0x23...c70cB</div>
                        <div style={{ marginTop: '-6px', justifyContent: 'center' }}><img width={43} src={screenersMap[screeners[i + 1]]} /></div>
                        <div style={{ marginTop: '-6px', }}>100.678.000$</div>
                        <div style={{ marginTop: '-6px', }}>1000.09$</div>
                        <div style={{ marginTop: '-6px', paddingRight: '30px' }}>37.9%</div>
                    </div>
                ))
                }
            </div>
          </div>
          <div className="load-more">Load more</div>
        </div>
    );
}
