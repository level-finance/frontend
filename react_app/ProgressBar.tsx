import React from "react";

const ProgressBar = ({ value, style = {} }) => (
    <div style={{ display: 'flex', borderRadius: '2px', height: '10px', width: '100%', overflow: 'hidden', ...style }}>
        <div style={{ backgroundColor: '#60D09A', width: `${value}%` }}></div>
        <div style={{ backgroundColor: 'rgba(96, 208, 154, 0.4)', width: `${100 - value}%` }}></div>
    </div>
);

export default ProgressBar;