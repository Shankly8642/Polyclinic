import React from "react";
import { Button, Space, Table } from "antd";
import type { TableProps } from "antd";

interface Props {
  doctors: Doctor[];
  handleDelete: (id: string) => void;
  handleOpen: (doctor: Doctor) => void;
}

export const Doctors = ({ doctors, handleDelete, handleOpen }: Props) => {
  const columns: TableProps<Doctor>["columns"] = [
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
      title: "Часы приёма",
      dataIndex: "receptionHours",
      key: "receptionHours",
    },
    {
      title: "Участок",
      dataIndex: "titleRegion",
      key: "titleRegion",
    },
    {
        title: "Отделение",
        dataIndex: "titleDepartment",
        key: "titleDepartment",
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
  doctors.map((doctor: Doctor) =>
    dataSource.push({
      id: doctor.id,
      surname: doctor.surname,
      name: doctor.name,
      patronymic: doctor.patronymic,
      receptionHours: doctor.receptionHours,
      region_Id: doctor.region_Id,
      titleRegion: doctor.titleRegion,
      department_Id: doctor.department_Id,
      titleDepartment: doctor.titleDepartment,
    })
  );
  return (
    <div className="Table">
      {<Table dataSource={dataSource} columns={columns} />}
    </div>
  );
};