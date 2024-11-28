import {
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    Title,
    Tooltip,
    ChartOptions,
    ChartData,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Title, Legend);

interface BarChartProps {
    data: number[];
    labels: string[];
    onBarClick: (category: string) => void;
}

const BarChart = ({ data, labels, onBarClick }: BarChartProps) => {
    const chartOptions: ChartOptions<'bar'> = {
        responsive: true,
        indexAxis:'y',
        plugins: {
            legend: {
                display: true,
            },
            tooltip: {
                mode: 'nearest',
            },
        },
        onClick: (_, elements) => {
            if (elements.length > 0) {
                const index = elements[0].index;
                const clickedCategory = labels[index];
                onBarClick(clickedCategory);
            }
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Categories',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Total Time Spent',
                },
            },
        },
    };

    const chartData: ChartData<'bar'> = {
        labels,
        datasets: [
            {
                label: 'Time Spent',
                data,
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    };

    return (
        <div className="p-4 border w-[40rem] h-96 border-gray-300 rounded-lg shadow-sm bg-white">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Bar Chart</h3>
            <Bar data={chartData} options={chartOptions} />
        </div>
    );
};

export default BarChart;
