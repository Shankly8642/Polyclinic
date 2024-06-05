"use client";

import Title from "antd/es/typography/Title";
import { getAllAppointments } from "../services/appointments";

import { Chart } from "../components/Chart";

import { useEffect, useState } from "react";

export default function Home() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getAppointments = async () => {
      const appointments = await getAllAppointments();
      setLoading(false);
      setAppointments(appointments);
      console.log(appointments);
    };

    getAppointments();

  }, []);
  return <div style={{}}>{loading ? <Title>Loading</Title> : <Chart appointments={appointments}></Chart>}</div>;
}