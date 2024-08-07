import { useState, useEffect } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Loader2 } from 'lucide-react';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Statistics() {
  const [stats, setStats] = useState(null);
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('https://sweatdiary-server.onrender.com/api/stats', {
          headers: { 'Authorization': `Bearer ${user.token}` },
        });
        const json = await response.json();
        if (response.ok) {
          setStats(json);
        }
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    if (user) {
      fetchStats();
    }
  }, [user]);

  if (!stats) return <div className="flex justify-center items-center h-96"><Loader2 className="animate-spin h-10 w-10 text-blue-500" /></div>;

  const chartData = {
    labels: stats.categoryCounts?.map(c => c._id) || [],
    datasets: [{
      data: stats.categoryCounts?.map(c => c.count) || [],
      backgroundColor: [
        'rgba(255, 99, 132, 0.8)',
        'rgba(54, 162, 235, 0.8)',
        'rgba(255, 206, 86, 0.8)',
        'rgba(75, 192, 192, 0.8)',
        'rgba(153, 102, 255, 0.8)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
      ],
      borderWidth: 1,
    }]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          font: {
            size: 14
          }
        }
      },
      title: {
        display: true,
        text: 'Workout Categories',
        font: {
          size: 18
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            let label = context.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed !== null) {
              label += context.parsed + ' workouts';
            }
            return label;
          }
        }
      }
    },
    cutout: '60%',
  };

  return (
    <div className="statistics p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Your Workout Statistics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-semibold mb-2">Total Workouts</h3>
          <p className="text-3xl font-bold">{stats.totalWorkouts}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-semibold mb-2">Total Duration</h3>
          <p className="text-3xl font-bold">{stats.totalDuration} minutes</p>
        </div>
      </div>
      <div className="bg-white p-4 rounded shadow">
        <div className="h-[400px]">
          {stats.categoryCounts && stats.categoryCounts.length > 0 ? (
            <Doughnut data={chartData} options={options} />
          ) : (
            <p>No category data available</p>
          )}
        </div>
      </div>
    </div>
  );
}