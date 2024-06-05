import Modal from "antd/es/modal/Modal";
import { AppointmentRequest } from "../services/appointments";
import Input from "antd/es/input/Input";
import { ChangeEvent, useEffect, useState } from "react";
import { DatePicker, Select } from "antd";
import dayjs, { Dayjs } from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

const dateFormat = "DD.MM.YYYY";

interface Props {
  mode: Mode;
  values: Appointment;
  isModalOpen: boolean;
  handleCancel: () => void;
  handleCreate: (request: AppointmentRequest) => void;
  handleUpdate: (id: string, request: AppointmentRequest) => void;
  patientsArray: Patient[];
  doctorsArray: Doctor[];
}

export enum Mode {
  Create,
  Update,
}

export const setPatientOptions = (patients: Patient[]) => {
  let patientOptions: { label: string; value: string }[] = [];
  patients.map((patient: Patient) =>
    patientOptions.push({
      value: patient.id,
      label: `${patient.surname} ${patient.name} ${patient.patronymic}`,
    })
  );
  return patientOptions;
};

export const setDoctorOptions = (doctors: Doctor[]) => {
    let doctorOptions: { label: string; value: string }[] = [];
    doctors.map((doctor: Doctor) =>
        doctorOptions.push({
        value: doctor.id,
        label: `${doctor.surname} ${doctor.name} ${doctor.patronymic}`,
      })
    );
    return doctorOptions;
  };


export const CreateUpdateAppointment = ({
  mode,
  values,
  isModalOpen,
  handleCancel,
  handleCreate,
  handleUpdate,
  patientsArray,
  doctorsArray
}: Props) => {

  const [dateTime, setDateTime] = useState<Dayjs | null>(values.dateTime ? dayjs(values.dateTime): null);
  const [patientTurnOut, setPatientTurnOut] = useState<string>(values.patientTurnOut);
  const [result, setResult] = useState<string>(values.result);
  const [patient_Id, setPatient_Id] = useState<string>(values.patient_Id);
  const [patientSNP, setPatientSNP] = useState<string>(values.patientSNP);
  const [doctor_Id, setDoctor_Id] = useState<string>(values.doctor_Id);
  const [doctorSNP, setDoctorSNP] = useState<string>(values.doctorSNP);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);

  useEffect(() => {
    setDateTime(values.dateTime ? dayjs(values.dateTime) : null);
    setPatientTurnOut(values.patientTurnOut);
    setResult(values.result);
    setPatient_Id(values.patient_Id);
    setPatientSNP(values.patientSNP);
    setDoctor_Id(values.doctor_Id);
    setDoctorSNP(values.doctorSNP);
    setPatients(patientsArray);
    setDoctors(doctorsArray);
  }, [values, patientsArray, doctorsArray]);

  const handleOnOk = async () => {
    const appointmentRequest = {
      dateTime: dateTime?.toDate() || new Date(),
      patientTurnOut,
      result,
      patient_Id,
      patientSNP,
      doctor_Id,
      doctorSNP,
    };

    mode == Mode.Create
      ? handleCreate(appointmentRequest)
      : handleUpdate(values.id, appointmentRequest);
  };

  const handleResultChange = (event: ChangeEvent<HTMLInputElement>) => {
    setResult(event.target.value);
  };

  const handleDateTimeChange = (date: Dayjs | null) => {
    setDateTime(date);
  };

  const handlePatientChange = (
    value: string,
    option: { label: string; value: string } | { label: string; value: string }[]
  ) => {
    if (Array.isArray(option)) {
      // Handle the case where option is an array (multi-select)
      setPatient_Id(option[0].value); // Assuming the first element in the array
      setPatientSNP(option[0].label);
    } else {
      // Handle the case where option is a single object
      setPatient_Id(option.value);
      setPatientSNP(option.label);
    }
  };

  const handleDoctorChange = (
    value: string,
    option: { label: string; value: string } | { label: string; value: string }[]
  ) => {
    if (Array.isArray(option)) {
      // Handle the case where option is an array (multi-select)
      setDoctor_Id(option[0].value); // Assuming the first element in the array
      setDoctorSNP(option[0].label);
    } else {
      // Handle the case where option is a single object
      setDoctor_Id(option.value);
      setDoctorSNP(option.label);
    }
  };

  const handlePatientTurnOutChange = (
    value: string,
    option: { label: string; value: string } | { label: string; value: string }[]
  ) => {
    if (Array.isArray(option)) {
      // Handle the case where option is an array (multi-select)
      setPatientTurnOut(option[0].value); // Assuming the first element in the array
    } else {
      // Handle the case where option is a single object
      setPatientTurnOut(option.value);
    }
  };

  return (
    <Modal
      title={
        mode === Mode.Create ? "Добавить прием" : "Редактировать прием"
      }
      open={isModalOpen}
      onOk={handleOnOk}
      onCancel={handleCancel}
      cancelText={"Отмена"}
    >
      <div className="card_model">

        <p>Дата приёма</p>
        <DatePicker
          value={dateTime}
          format={dateFormat}
          onChange={handleDateTimeChange}
          style={{cursor: "pointer", userSelect: "none"}}
        />

        <p>Явка пациента</p>
        <Select
          value={patientTurnOut}
          style={{ margin: "1vh", width: "200px" }}
          onChange={handlePatientTurnOutChange}>
            <Select.Option value="Присутствовал">Присутствовал</Select.Option>
            <Select.Option value="Отсутствовал">Отсутствовал</Select.Option>
        </Select>

        <p>Итог приёма</p>
        <Input
          value={result}
          onChange={handleResultChange}
          placeholder=""
        ></Input>

        <p>Пациент</p>
        <Select
          value={patient_Id}
          style={{ margin: "1vh", width: "200px" }}
          onChange={handlePatientChange}
          options={setPatientOptions(patients)}
        />

        <p>Доктор</p>
        <Select
          value={doctor_Id}
          style={{ margin: "1vh", width: "200px" }}
          onChange={handleDoctorChange}
          options={setDoctorOptions(doctors)}
        />
      </div>
    </Modal>
  );
};