"use client";

import { Button, Flex } from "antd";
import { Patients } from "../components/Patient";
import { useEffect, useState } from "react";
import {
  createPatient,
  deletePatient,
  getAllPatients,
  PatientRequest,
  updatePatient,
} from "../services/patients";
import dayjs from "dayjs";
import { getAllRegions } from "../services/regions";
import Title from "antd/es/typography/Title";
import { CreateUpdatePatient, Mode } from "../components/CreateUpdatePatient";
import { token } from "../autorization/page";
import { useRouter } from "next/navigation";
import { utils, writeFile } from "xlsx";

export default function PatientPage() {
  const defaultValues = {
    surname: "",
    name: "",
    patronymic: "",
    dateBirth: dayjs().toDate(),
    region_Id: "",
    titleRegion: "",
  } as Patient;

  const [values, setValues] = useState<Patient>(defaultValues);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mode, setMode] = useState(Mode.Create);
  const [regionsArray, setRegionsValues] = useState<Region[]>([]);

  useEffect(() => {
    const getPatients = async () => {
      const patietns = await getAllPatients();
      setLoading(false);
      setPatients(patietns);
      console.log(patietns);
    };

    getPatients();

    const getRegions = async () => {
      const regions = await getAllRegions();
      setRegionsValues(regions);
    };
    getRegions();
    }, []);

  const handleCreatePatient = async (request: PatientRequest) => {
    await createPatient(request);
    closeModal();
    console.log(request.surname);
    console.log(request.name);
    console.log(request.name);
    console.log(request.patronymic);
    console.log(request.dateBirth);
    console.log(request.region_Id);
    console.log(request.titleRegion);
    const patients = await getAllPatients();
    setPatients(patients);
  };

  const handleUpdatePatient = async (id: string, request: PatientRequest) => {
    await updatePatient(id, request);
    closeModal();

    const patients = await getAllPatients();
    setPatients(patients);
  };

  const handleDeletePatient = async (id: string) => {
    await deletePatient(id);
    closeModal();

    const patients = await getAllPatients();
    setPatients(patients);
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

  const openEditModal = (patient: Patient) => {
    setMode(Mode.Update);
    setValues(patient);
    console.log(patient);
    setIsModalOpen(true);
  };

  const updateData = async () => {
    const patients = await getAllPatients();
    setPatients(patients);
  };

  const exportData = async () => {
    
    updateData();

    let tableData: any[] = [];
    patients.map((patient: Patient) =>
      tableData.push({
        Фамилия: patient.surname,
        Имя: patient.name,
        Отчество: patient.patronymic,
        Дата_рождения: dayjs(patient.dateBirth).format("DD.MM.YYYY"),
        Участок: patient.titleRegion,
      })
    );
    var wb = utils.book_new(),
      ws = utils.json_to_sheet(tableData);
    utils.book_append_sheet(wb, ws, "Пациенты");
    writeFile(wb, "Пациенты.xlsx");
  };

  return (
    <div>
      <div style={{ margin: "2vh", display:"flex", flexDirection:"row",  float:"right"}}>
        <Button
          style={{ display: "inline", fontWeight: 500, float:"right", backgroundColor:"black", marginRight:"15px", height:"40px", fontSize:"18px"}}
          type="primary"
          onClick={() => openModal()}
        >
          Добавить пациента
        </Button>

        <Button
          onClick={() => exportData()}
          style={{display: "inline", fontWeight: 500, float:"right", color: "white", backgroundColor: "green", height:"40px", fontSize:"18px"}}
        >
          Экспорт
        </Button>
      </div>

      <CreateUpdatePatient
        mode={mode}
        values={values}
        isModalOpen={isModalOpen}
        handleCreate={handleCreatePatient}
        handleUpdate={handleUpdatePatient}
        handleCancel={closeModal}
        regionsArray={regionsArray}
      />

      {loading ? (
        <Title>Loading</Title>
      ) : (
        <Patients
          patients={patients}
          handleDelete={handleDeletePatient}
          handleOpen={openEditModal}
        />
      )}
    </div>
  );
}