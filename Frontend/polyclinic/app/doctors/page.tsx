"use client";

import { Button, Flex } from "antd";
import { Doctors } from "../components/Doctor";
import { useEffect, useState } from "react";
import {
  createDoctor,
  deleteDoctor,
  getAllDoctors,
  DoctorRequest,
  updateDoctor,
} from "../services/doctors";
import { getAllRegions } from "../services/regions";
import { getAllDepartments } from "../services/departments";
import Title from "antd/es/typography/Title";
import { CreateUpdateDoctor, Mode } from "../components/CreateUpdateDoctor";
import { token } from "../autorization/page";
import { useRouter } from "next/navigation";
import { utils, writeFile } from "xlsx";

export default function DoctorPage() {
  const defaultValues = {
    surname: "",
    name: "",
    patronymic: "",
    receptionHours: "",
    region_Id: "",
    titleRegion: "",
    department_Id: "",
    titleDepartment: "",
  } as Doctor;

  const [values, setValues] = useState<Doctor>(defaultValues);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mode, setMode] = useState(Mode.Create);
  const [regionsArray, setRegionsValues] = useState<Region[]>([]);
  const [departmentsArray, setDepartmentsValues] = useState<Department[]>([]);

  useEffect(() => {

    const getDoctors = async () => {
      const doctors = await getAllDoctors();
      setLoading(false);
      setDoctors(doctors);
      console.log(doctors);
    };

    getDoctors();

    const getRegions = async () => {
      const regions = await getAllRegions();
      setRegionsValues(regions);
    };

    getRegions();
    
    const getDepartments = async () => {
        const departments = await getAllDepartments();
        setDepartmentsValues(departments);
      };
  
    getDepartments();

    }, []);

  const handleCreateDoctor = async (request: DoctorRequest) => {
    await createDoctor(request);
    closeModal();
    console.log(request.surname);
    console.log(request.name);
    console.log(request.patronymic);
    console.log(request.receptionHours);
    console.log(request.region_Id);
    console.log(request.titleRegion);
    console.log(request.department_Id);
    console.log(request.titleDepartment);
    const doctors = await getAllDoctors();
    setDoctors(doctors);
  };

  const handleUpdateDoctor = async (id: string, request: DoctorRequest) => {
    await updateDoctor(id, request);
    closeModal();

    const doctors = await getAllDoctors();
    setDoctors(doctors);
  };

  const handleDeleteDoctor = async (id: string) => {
    await deleteDoctor(id);
    closeModal();

    const doctors = await getAllDoctors();
    setDoctors(doctors);
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

  const openEditModal = (doctor: Doctor) => {
    setMode(Mode.Update);
    setValues(doctor);
    console.log(doctor);
    setIsModalOpen(true);
  };

  const updateData = async () => {
    const doctors = await getAllDoctors();
    setDoctors(doctors);
  };

  const exportData = async () => {
    
    updateData();

    let tableData: any[] = [];
    doctors.map((doctor: Doctor) =>
      tableData.push({
        Фамилия: doctor.surname,
        Имя: doctor.name,
        Отчество: doctor.patronymic,
        Часы_приёма: doctor.receptionHours,
        Участок: doctor.titleRegion,
        Отделение: doctor.titleDepartment,
      })
    );
    var wb = utils.book_new(),
      ws = utils.json_to_sheet(tableData);
    utils.book_append_sheet(wb, ws, "Доктора");
    writeFile(wb, "Доктора.xlsx");
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

      <CreateUpdateDoctor
        mode={mode}
        values={values}
        isModalOpen={isModalOpen}
        handleCreate={handleCreateDoctor}
        handleUpdate={handleUpdateDoctor}
        handleCancel={closeModal}
        regionsArray={regionsArray}
        departmentsArray={departmentsArray}
      />

      {loading ? (
        <Title>Loading</Title>
      ) : (
        <Doctors
          doctors={doctors}
          handleDelete={handleDeleteDoctor}
          handleOpen={openEditModal}
        />
      )}
    </div>
  );
}