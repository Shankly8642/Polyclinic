import React from "react";
import { Button, Space, Table } from "antd";
import type { TableProps } from "antd";
import dayjs from "dayjs";

interface Props {
  appointments: Appointment[];
  handleDelete: (id: string) => void;
  handleOpen: (appointment: Appointment) => void;
}

export const Appointments = ({ appointments, handleDelete, handleOpen }: Props) => {
  const columns: TableProps<Appointment>["columns"] = [
    {
      title: "Дата и время",
      dataIndex: "dateTime",
      key: "dateTime",
      width: "150px"
    },
    {
      title: "Явка пациента",
      dataIndex: "patientTurnOut",
      key: "patientTurnOut",
      width: "150px"
    },
    {
      title: "Итог",
      dataIndex: "result",
      key: "result",
      
    },
    {
      title: "Пациент",
      dataIndex: "patientSNP",
      key: "patientSNP",
    },
    {
      title: "Доктор",
      dataIndex: "doctorSNP",
      key: "doctorSNP",
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
  appointments.map((appointment: Appointment) =>
    dataSource.push({
      id: appointment.id,
      dateTime: dayjs(appointment.dateTime).format("DD.MM.YYYY"),
      patientTurnOut: appointment.patientTurnOut,
      result: appointment.result,
      patient_Id: appointment.patient_Id,
      patientSNP: appointment.patientSNP,
      doctor_Id: appointment.doctor_Id,
      doctorSNP: appointment.doctorSNP,
    })
  );
  return (
    <div className="Table">
      {<Table dataSource={dataSource} columns={columns} />}
    </div>
  );
};