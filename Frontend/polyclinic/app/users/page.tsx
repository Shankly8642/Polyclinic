"use client";

import { Button, Flex } from "antd";
import { Users } from "../components/User";
import { useEffect, useState } from "react";
import {
  createUser,
  deleteUser,
  getAllUsers,
  UserRequest,
  updateUser,
} from "../services/users";
import Title from "antd/es/typography/Title";
import { CreateUpdateUser, Mode } from "../components/CreateUpdateUser";
import { token } from "../autorization/page";
import { useRouter } from "next/navigation";
import { utils, writeFile } from "xlsx";

export default function UserPage() {


  const defaultValues = {
    login: "",
    password: "",
    surname:"",
    name:"",
    patronymic:"",
    email:"",

  } as User;

  const [values, setValues] = useState<User>(defaultValues);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mode, setMode] = useState(Mode.Create);

  useEffect(() => {
    const getUsers = async () => {
      const users = await getAllUsers();
      setLoading(false);
      setUsers(users);
      console.log(users);
    };

    getUsers();
    }, []);

  const handleCreateUser = async (request: UserRequest) => {
    await createUser(request);
    closeModal();
    console.log(request.login);
    console.log(request.password);
    const users = await getAllUsers();
    setUsers(users);
  };

  const handleUpdateUser = async (id: string, request: UserRequest) => {
    await updateUser(id, request);
    closeModal();

    const users = await getAllUsers();
    setUsers(users);
  };

  const handleDeleteUser = async (id: string) => {
    await deleteUser(id);
    closeModal();

    const users = await getAllUsers();
    setUsers(users);
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

  const openEditModal = (user: User) => {
    setMode(Mode.Update);
    setValues(user);
    console.log(user);
    setIsModalOpen(true);
  };

  const updateData = async () => {
    const users = await getAllUsers();
    setUsers(users);
  };

  const exportData = async () => {
    
    updateData();

    let tableData: any[] = [];
    users.map((user: User) =>
      tableData.push({
        Логин: user.login,
        Фамилия: user.surname,
        Имя: user.name,
        Отчество: user.patronymic,
        Почта: user.email,
      })
    );
    var wb = utils.book_new(),
      ws = utils.json_to_sheet(tableData);
    utils.book_append_sheet(wb, ws, "Пользователи");
    writeFile(wb, "Пользователи.xlsx");
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

      <CreateUpdateUser
        mode={mode}
        values={values}
        isModalOpen={isModalOpen}
        handleCreate={handleCreateUser}
        handleUpdate={handleUpdateUser}
        handleCancel={closeModal}
      />

      {loading ? (
        <Title>Loading</Title>
      ) : (
        <Users
          users={users}
          handleDelete={handleDeleteUser}
          handleOpen={openEditModal}
        />
      )}
    </div>
  );
}