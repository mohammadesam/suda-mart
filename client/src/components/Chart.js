import React from "react";
import { Line } from "react-chartjs-2";

const options = {
  maintainAspectRatio: false,
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};

function Chart() {
  const data = {
    labels: [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "11",
      "12",
      "13",
      "14",
      "15",
    ],
    datasets: [
      {
        label: "# profit per week",
        data: [12, 19, 3, 5, 2, 3, 2, 2, 2, 2, 2, 2, 24, 9, 5],
        backgroundColor: ["rgba(255, 99, 132, 1)"],
        borderColor: ["rgba(0, 0, 0, 1)"],
        borderWidth: 1,
      },
    ],
  };
  return <Line options={options} height={300} data={data} />;
}

export default Chart;
