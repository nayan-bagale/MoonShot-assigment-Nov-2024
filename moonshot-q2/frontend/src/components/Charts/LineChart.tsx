import {
    CategoryScale,
    Chart as ChartJS,
    ChartOptions,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    TimeScale,
    Title,
    Tooltip,
} from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';
import { useRef } from 'react';
import { Line } from 'react-chartjs-2';

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Title, Legend, TimeScale, zoomPlugin);

interface LineChartProps {
    data: number[];
    labels: string[];
}

const LineChart = ({ data, labels }: LineChartProps) => {
    const chartRef = useRef(null);

    const handleResetZoom = () => {
        if (chartRef.current) {
            (chartRef.current as any).resetZoom();
        }
    };

    const chartOptions: ChartOptions<'line'> = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
            },
            tooltip: {
                mode: 'nearest',
            },
            zoom: {
                zoom: {
                    wheel: {
                        enabled: true, // Allow zooming with mouse wheel
                    },
                    pinch: {
                        enabled: true, // Allow zooming with touch gestures
                    },
                    mode: 'x', // Zoom along the x-axis
                },
            },
        },
    };

    const chartData = {
        labels,
        datasets: [
            {
                label: 'Dataset',
                data,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true,
            },
        ],
    };

    return (

        <div className="p-4 border w-[40rem] h-96 border-gray-300 rounded-lg shadow-sm bg-white">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Line Chart</h3>
            <Line ref={chartRef} data={chartData} options={chartOptions} />
            <button onClick={handleResetZoom}>Reset Zoom</button>
        </div>

    );
};

export default LineChart;
