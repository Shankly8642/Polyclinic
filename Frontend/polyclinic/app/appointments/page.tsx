"use client";

import { Button, Flex } from "antd";
import { Appointments } from "../components/Appointment";
import { useEffect, useState } from "react";
import {
  createAppointment,
  deleteAppointment,
  getAllAppointments,
  AppointmentRequest,
  updateAppointment,
} from "../services/appointments";
import dayjs from "dayjs";
import { getAllPatients } from "../services/patients";
import { getAllDoctors } from "../services/doctors";
import Title from "antd/es/typography/Title";
import { CreateUpdateAppointment, Mode } from "../components/CreateUpdateAppointment";
import { token } from "../autorization/page";
import { useRouter } from "next/navigation";
import { utils, writeFile } from "xlsx";
import { Doctors } from "../components/Doctor";

export default function AppointmentPage() {
  const router = useRouter();
  const defaultValues = {
    dateTime: dayjs().toDate(),
    patientTurnOut: "",
    result: "",
    patient_Id: "",
    patientSNP: "",
    doctor_Id: "",
    doctorSNP: "",
  } as Appointment;

  const [values, setValues] = useState<Appointment>(defaultValues);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mode, setMode] = useState(Mode.Create);
  const [patientsArray, setPatientsValues] = useState<Patient[]>([]);
  const [doctorsArray, setDoctorsValues] = useState<Doctor[]>([]);

  useEffect(() => {
    const getAppointments = async () => {
      const appointments = await getAllAppointments();
      setLoading(false);
      setAppointments(appointments);
      console.log(appointments);
    };

    getAppointments();

    const getPatients = async () => {
      const patients = await getAllPatients();
      setPatientsValues(patients);
    };

    getPatients();

    const getDoctors = async () => {
        const doctors = await getAllDoctors();
        setDoctorsValues(doctors);
    };
    
    getDoctors();
    }, []);

  const handleCreateAppointment = async (request: AppointmentRequest) => {
    await createAppointment(request);
    closeModal();

    const appointments = await getAllAppointments();
    setAppointments(appointments);
  };

  const handleUpdateAppointment = async (id: string, request: AppointmentRequest) => {
    await updateAppointment(id, request);
    closeModal();

    const appointments = await getAllAppointments();
    setAppointments(appointments);
  };

  const handleDeleteAppointment = async (id: string) => {
    await deleteAppointment(id);
    closeModal();

    const appointments = await getAllAppointments();
    setAppointments(appointments);
  };

  const openModal = () => {
    setValues(defaultValues);
    setMode(Mode.Create);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setValues(defaultValues);
    setIsModalOpen(false);
  };

  const openEditModal = (appointment: Appointment) => {
    setMode(Mode.Update);
    setValues(appointment);
    console.log(appointment);
    setIsModalOpen(true);
  };

  const updateData = async () => {
    const appointments = await getAllAppointments();
    setAppointments(appointments);
  };

  const exportData = async () => {
    
    updateData();

    let tableData: any[] = [];
    appointments.map((appointment: Appointment) =>
      tableData.push({
        Дата_приёма: dayjs(appointment.dateTime).format("DD.MM.YYYY"),
        Явка_пациента: appointment.patientTurnOut,
        Итог_приёма: appointment.result,
        Пациент: appointment.patientSNP,
        Доктор: appointment.doctorSNP,
      })
    );
    var wb = utils.book_new(),
      ws = utils.json_to_sheet(tableData);
    utils.book_append_sheet(wb, ws, "Приемы");
    writeFile(wb, "Приемы.xlsx");
  };

  return (
    <div>
      <div style={{ margin: "2vh", display:"flex", flexDirection:"row",  float:"right"}}>
        <Button
          style={{ display: "inline", fontWeight: 500, float:"right", backgroundColor:"black", marginRight:"15px", height:"40px", fontSize:"18px"}}
          type="primary"
          onClick={() => openModal()}
        >
          Добавить
        </Button>

        <Button
          onClick={() => exportData()}
          style={{display: "inline", fontWeight: 500, float:"right", color: "white", backgroundColor: "green", height:"40px", fontSize:"18px"}}
        >
          Экспорт
        </Button>
      </div>

      <CreateUpdateAppointment
        mode={mode}
        values={values}
        isModalOpen={isModalOpen}
        handleCreate={handleCreateAppointment}
        handleUpdate={handleUpdateAppointment}
        handleCancel={closeModal}
        patientsArray={patientsArray}
        doctorsArray={doctorsArray}
      />

      {loading ? (
        <Title>Loading</Title>
      ) : (
        <Appointments
          appointments={appointments}
          handleDelete={handleDeleteAppointment}
          handleOpen={openEditModal}
        />
      )}
    </div>
  );
}