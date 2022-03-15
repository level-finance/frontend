import React from "react";
import { ResponsiveContainer, PieChart, Pie } from "recharts";

const Protovol = ({ data }) => {
    const sum = data.reduce((s, o) => s + o.value, 0);
    return (
        <div className="dashboard-widget protovol">
            <h2>Protovol Earnings</h2>
            <h2>${sum.toFixed(3)}</h2>
            <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                <ResponsiveContainer width="50%" height={400}>
                    <PieChart width={400} height={260}>
                        <Pie
                            data={data}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            innerRadius={50}
                            outerRadius={128}
                            fill="#8884d8"
                            blendStroke
                        />
                    </PieChart>
                </ResponsiveContainer>
                <div>
                    {
                        data.map(({ name, value, fill }) => {
                            return (
                                <div key={name} style={{ display: 'flex', marginTop: '28px', alignItems: 'center', fontWeight: 700 }}>
                                    <div style={{ backgroundColor: fill, width: '35px', height: '35px', borderRadius: '35px', marginRight: '27px' }} className='circle'/>
                                    <div>
                                        <div style={{ textAlign: 'initial' }}>{name}</div>
                                        <div style={{ display: 'flex' }}>
                                            <div>${value.toFixed(3)}</div>
                                            <div style={{ color: '#60D09A', marginLeft: '15px' }}>({value / sum * 100}%)</div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        </div>
    );
}

export default Protovol;