import React from "react";
import { Button, Space, Table } from "antd";
import type { TableProps } from "antd";
import dayjs from "dayjs";

interface Props {
  patients: Patient[];
  handleDelete: (id: string) => void;
  handleOpen: (patient: Patient) => void;
}

export const Patients = ({ patients, handleDelete, handleOpen }: Props) => {
  const columns: TableProps<Patient>["columns"] = [
    {
      title: "Фамилия",
      dataIndex: "surname",
      key: "surname",
    },
    {
      title: "Имя",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Отчество",
      dataIndex: "patronymic",
      key: "patronymic",
    },
    {
      title: "Дата рождения",
      dataIndex: "dateBirth",
      key: "dateBirth",
    },
    {
      title: "Участок",
      dataIndex: "titleRegion",
      key: "titleRegion",
    },
    {
      title: "Действие",
      key: "action",
      render: (_, record) => (
        <Space>
          <Button onClick={() => handleOpen(record)}>Редактировать</Button>
          <Button danger onClick={() => handleDelete(record.id)}>Удалить</Button>
        </Space>
      ),
    },
  ];
  let dataSource: any[] | undefined = [];
  patients.map((patient: Patient) =>
    dataSource.push({
      id: patient.id,
      surname: patient.surname,
      name: patient.name,
      patronymic: patient.patronymic,
      dateBirth: dayjs(patient.dateBirth).format("DD.MM.YYYY"),
      region_Id: patient.region_Id,
      titleRegion: patient.titleRegion,
    })
  );
  return (
    <div className="Table">
      {<Table dataSource={dataSource} columns={columns} />}
    </div>
  );
};