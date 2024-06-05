import Modal from "antd/es/modal/Modal";
import Input from "antd/es/input/Input";
import { ChangeEvent, useEffect, useState } from "react";
import { DatePicker, Select } from "antd";
import { DoctorRequest } from "../services/doctors";

interface Props {
  mode: Mode;
  values: Doctor;
  isModalOpen: boolean;
  handleCancel: () => void;
  handleCreate: (request: DoctorRequest) => void;
  handleUpdate: (id: string, request: DoctorRequest) => void;
  regionsArray: Region[];
  departmentsArray: Department[];
}

export enum Mode {
  Create,
  Update,
}

export const setRegionOptions = (regions: Region[]) => {
  let regionOptions: { label: string; value: string }[] = [];
  regions.map((region: Region) =>
    regionOptions.push({
      value: region.id,
      label: region.title,
    })
  );
  return regionOptions;
};

export const setDepartmentOptions = (departments: Department[]) => {
    let departmentOptions: { label: string; value: string }[] = [];
    departments.map((department: Department) =>
      departmentOptions.push({
        value: department.id,
        label: department.title,
      })
    );
    return departmentOptions;
};

export const CreateUpdateDoctor = ({
  mode,
  values,
  isModalOpen,
  handleCancel,
  handleCreate,
  handleUpdate,
  regionsArray,
  departmentsArray,
}: Props) => {

  const [surname, setSurname] = useState<string>(values.surname);
  const [name, setName] = useState<string>(values.name);
  const [patronymic, setPatronymic] = useState<string>(values.patronymic);
  const [receptionHours, setReceptionHours] = useState<string>(values.receptionHours);
  const [region_Id, setRegion_Id] = useState<string>(values.region_Id);
  const [titleRegion, setTitleRegion] = useState<string>(values.titleRegion);
  const [department_Id, setDepartment_Id] = useState<string>(values.department_Id);
  const [titleDepartment, setTitleDepartment] = useState<string>(values.titleDepartment);
  const [regions, setRegions] = useState<Region[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);

  useEffect(() => {
    setSurname(values.surname);
    setName(values.name);
    setPatronymic(values.patronymic);
    setReceptionHours(values.receptionHours);
    setRegion_Id(values.region_Id);
    setTitleRegion(values.titleRegion);
    setDepartment_Id(values.department_Id);
    setTitleDepartment(values.titleDepartment);
    setRegions(regionsArray);
    setDepartments(departmentsArray);
  }, [values, regionsArray, departmentsArray]);

  const handleOnOk = async () => {
    const doctorRequest = {
      surname,
      name,
      patronymic,
      receptionHours,
      region_Id,
      titleRegion,
      department_Id,
      titleDepartment,
    };

    mode == Mode.Create
      ? handleCreate(doctorRequest)
      : handleUpdate(values.id, doctorRequest);
  };

  const handleSurnameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSurname(event.target.value);
  };

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handlePatronymicChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPatronymic(event.target.value);
  };

  const handleReceptionHoursChange = (event: ChangeEvent<HTMLInputElement>) => {
    setReceptionHours(event.target.value);
  };

  const handleRegionChange = (
    value: string,
    option: { label: string; value: string } | { label: string; value: string }[]
  ) => {
    if (Array.isArray(option)) {
      // Handle the case where option is an array (multi-select)
      setRegion_Id(option[0].value); // Assuming the first element in the array
      setTitleRegion(option[0].label);
    } else {
      // Handle the case where option is a single object
      setRegion_Id(option.value);
      setTitleRegion(option.label);
    }
  };

  const handleDepartmentChange = (
    value: string,
    option: { label: string; value: string } | { label: string; value: string }[]
  ) => {
    if (Array.isArray(option)) {
      // Handle the case where option is an array (multi-select)
      setDepartment_Id(option[0].value); // Assuming the first element in the array
      setTitleDepartment(option[0].label);
    } else {
      // Handle the case where option is a single object
      setDepartment_Id(option.value);
      setTitleDepartment(option.label);
    }
  };

  return (
    <Modal
      title={
        mode === Mode.Create ? "Добавить доктора" : "Редактировать доктора"
      }
      open={isModalOpen}
      onOk={handleOnOk}
      onCancel={handleCancel}
      cancelText={"Отмена"}
    >
      <div className="card_model">

        <p>Фамилия</p>
        <Input
          value={surname}
          onChange={handleSurnameChange}
          placeholder=""
        ></Input>

        <p>Имя</p>
        <Input
          value={name}
          onChange={handleNameChange}
          placeholder=""
        ></Input>

        <p>Отчество</p>
        <Input
          value={patronymic}
          onChange={handlePatronymicChange}
          placeholder=""
        ></Input>

        <p>Часы приёма</p>
        <Input
          value={receptionHours}
          onChange={handleReceptionHoursChange}
          placeholder=""
        ></Input>

        <p>Участок</p>
        <Select
          value={region_Id}
          style={{ margin: "1vh", width: "200px" }}
          onChange={handleRegionChange}
          options={setRegionOptions(regions)}
        />

        <p>Отделение</p>
        <Select
          value={department_Id}
          style={{ margin: "1vh", width: "200px" }}
          onChange={handleDepartmentChange}
          options={setDepartmentOptions(departments)}
        />

      </div>
    </Modal>
  );
};