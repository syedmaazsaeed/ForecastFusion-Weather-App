import { useState, useEffect } from 'react';
import { useStateContext } from '../Context';
import MiniCard from './MiniCard';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const HourlyForecast = () => {
    const { values } = useStateContext();
    const [hourlyData, setHourlyData] = useState([]);
    const [selectedRange, setSelectedRange] = useState(24);

    useEffect(() => {
        if (values.length) {
            setHourlyData(values.slice(0, selectedRange));
        }
    }, [values, selectedRange]);

    const chartData = {
        labels: hourlyData.map(hour => new Date(hour.datetime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })),
        datasets: [{
            label: 'Temperature (°C)',
            data: hourlyData.map(hour => hour.temp),
            borderColor: '#FFD700',
            backgroundColor: 'rgba(255, 111, 97, 0.2)',
            fill: true,
        }],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: { display: false },
            title: {
                display: true,
                text: 'Temperature Trend',
                color: 'red',
                font: {
                    size: 20,
                    weight: 'bold',
                },
            },
            tooltip: {
                backgroundColor: '#333333',
                titleColor: '#FFFFFF',
                bodyColor: '#FFFFFF',
            },
        },
        scales: {
            x: {
                ticks: {
                    color: '#FFFFFF',
                },
                grid: {
                    color: 'rgba(255, 255, 255, 0.1)',
                },
            },
            y: {
                ticks: {
                    color: '#FFFFFF',
                },
                grid: {
                    color: 'rgba(255, 255, 255, 0.1)',
                },
            },
        },
        elements: {
            line: {
                borderColor: '#FFD700',
            },
            point: {
                backgroundColor: '#FFD700',
            },
        },
    };

    return (
        <div className='w-full p-4'>
            <h2 className='text-3xl font-bold text-red-700'>Hourly Forecast</h2>
            <p className='text-lg text-gray-300 mb-2'>
                This section shows the detailed weather forecast for each hour over the next 24 hours.
                You can view the expected temperature and weather conditions throughout the day.
            </p>
            <div className='mb-4'>
                <label className='text-amber-400 font-bold text-2xl mr-2'>Select Time Range:</label>
                <select
                    className='p-2 bg-black text-white rounded'
                    value={selectedRange}
                    onChange={(e) => setSelectedRange(Number(e.target.value))}
                >
                    <option value={24}>Next 24 Hours</option>
                    <option value={12}>Next 12 Hours</option>
                    <option value={6}>Next 6 Hours</option>
                </select>
            </div>
            <div className='mb-4 bg-black p-4 rounded-lg'>
                <Line data={chartData} options={chartOptions} />
            </div>
            <div className='w-full p-4'>
                <h3 className='text-4xl font-bold mb-2 text-sky-300'>Hourly Forecast Summary</h3>
                <p className='text-amber-700 font-bold text-2xl'>
                    Average Temperature: {hourlyData.length ? (hourlyData.reduce((sum, hour) => sum + hour.temp, 0) / hourlyData.length).toFixed(1) + ' °C' : 'N/A'}
                </p>
                <p className='text-blue-500 font-bold text-3xl'>
                    Conditions: {hourlyData.length ? hourlyData[0].conditions : 'N/A'}
                </p>
            </div>
            <div className='flex flex-wrap gap-4'>
                {hourlyData.map((hour) => (
                    <MiniCard
                        key={hour.datetime}
                        time={hour.datetime}
                        temp={hour.temp}
                        iconString={hour.conditions}
                        tooltipText={`Temperature: ${hour.temp} °C\nConditions: ${hour.conditions}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default HourlyForecast;
