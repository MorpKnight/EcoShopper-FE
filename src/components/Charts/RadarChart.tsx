import { Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { ratingBreakdown } from '../../pages/ProductDetailPage';

export default function RadarChart({
  title,
  data,
}: {
  title: string;
  data: ratingBreakdown;
}) {
  // Register components with Chart.js
  ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
  );

  // Dummy data
  const radarData = {
    labels: ['Rating', 'Rating', 'Rating', 'Rating', 'Rating'],
    datasets: [
      {
        label: title,
        data: [data.a, data.b, data.c, data.d, data.e],
        backgroundColor: 'rgba(136, 132, 216, 0.6)',
        borderColor: '#8884d8',
        borderWidth: 2,
      },
    ],
  };

  // Chart options
  const radarOptions = {
    responsive: true,
    scales: {
      r: {
        beginAtZero: true,
        angleLines: {
          display: true,
        },
        grid: {
          circular: true,
        },
        ticks: {
          display: true,
          stepSize: 20,
        },
      },
    },
  };
  return (
    <div className="flex h-full w-full items-center justify-center">
      <Radar data={radarData} options={radarOptions} />
    </div>
  );
}
