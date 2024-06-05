import Modal from "antd/es/modal/Modal";
import { PatientRequest } from "../services/patients";
import Input from "antd/es/input/Input";
import { ChangeEvent, useEffect, useState } from "react";
import { DatePicker, Select } from "antd";
import dayjs, { Dayjs } from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

const dateFormat = "DD.MM.YYYY";

interface Props {
  mode: Mode;
  values: Patient;
  isModalOpen: boolean;
  handleCancel: () => void;
  handleCreate: (request: PatientRequest) => void;
  handleUpdate: (id: string, request: PatientRequest) => void;
  regionsArray: Region[];
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


export const CreateUpdatePatient = ({
  mode,
  values,
  isModalOpen,
  handleCancel,
  handleCreate,
  handleUpdate,
  regionsArray,
}: Props) => {

  const [surname, setSurname] = useState<string>(values.surname);
  const [name, setName] = useState<string>(values.name);
  const [patronymic, setPatronymic] = useState<string>(values.patronymic);
  const [dateBirth, setDateBrth] = useState<Dayjs | null>(values.dateBirth ? dayjs(values.dateBirth): null);
  const [region_Id, setRegion_Id] = useState<string>(values.region_Id);
  const [titleRegion, setTitleRegion] = useState<string>(values.titleRegion);
  const [regions, setRegions] = useState<Region[]>([]);

  useEffect(() => {
    setSurname(values.surname);
    setName(values.name);
    setPatronymic(values.patronymic);
    setDateBrth(values.dateBirth ? dayjs(values.dateBirth) : null);
    setRegion_Id(values.region_Id);
    setTitleRegion(values.titleRegion);
    setRegions(regionsArray);
  }, [values, regionsArray]);

  const handleOnOk = async () => {
    const patientRequest = {
      surname,
      name,
      patronymic,
      dateBirth: dateBirth?.toDate() || new Date(),
      region_Id,
      titleRegion,
    };

    mode == Mode.Create
      ? handleCreate(patientRequest)
      : handleUpdate(values.id, patientRequest);
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

  const handleDateBirthChange = (date: Dayjs | null) => {
    setDateBrth(date);
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

  return (
    <Modal
      title={
        mode === Mode.Create ? "Добавить пациента" : "Редактировать пациента"
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

        <p>Дата рождения</p>
        <DatePicker
          value={dateBirth}
          format={dateFormat}
          onChange={handleDateBirthChange}
          style={{cursor: "pointer", userSelect: "none"}}
        />

        <p>Участок</p>
        <Select
          value={region_Id}
          style={{ margin: "1vh", width: "200px" }}
          onChange={handleRegionChange}
          options={setRegionOptions(regions)}
        />
      </div>
    </Modal>
  );
};