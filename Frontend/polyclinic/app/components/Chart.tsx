import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface Props {
  appointments: Appointment[];
}

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Количество приемов у каждого врача",

    },
  },
};

export const Chart = ({ appointments }: Props) => {
  const labels = Array.from(new Set(appointments.map((appointment) => appointment.doctorSNP)));
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Количество проведенных приемов",
        data: labels.map((label) =>
          appointments.filter((appointment) => appointment.doctorSNP === label)
        .filter((appointment) => appointment.patientTurnOut =="Присутствовал").reduce((count) => count + 1, 0)
        
        ),
        backgroundColor: "gray",
      },
    ],
  };

  return (
    <div style={{ margin:"20px auto",width: "60%", height: "650px" }}>
      <Bar  options={options} data={data}/>
    </div>
  );
};