import React from "react";
import { Button, Space, Table } from "antd";
import type { TableProps } from "antd";
import Password from "antd/es/input/Password";

interface Props {
  users: User[];
  handleDelete: (id: string) => void;
  handleOpen: (user: User) => void;
}

export const Users = ({ users, handleDelete, handleOpen }: Props) => {
  const columns: TableProps<User>["columns"] = [
    {
      title: "Логин",
      dataIndex: "login",
      key: "login",
    },
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
      title: "Почта",
      dataIndex: "email",
      key: "email",
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
  users.map((user: User) =>
    dataSource.push({
      id: user.id,
      login: user.login,
      surname: user.surname,
      name: user.name,
      patronymic: user.patronymic,
      email: user.email
    })
  );
  return (
    <div className="Table">
      {<Table dataSource={dataSource} columns={columns} />}
    </div>
  );
};