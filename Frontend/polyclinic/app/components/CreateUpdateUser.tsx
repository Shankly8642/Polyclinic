import Modal from "antd/es/modal/Modal";
import { UserRequest } from "../services/users";
import Input from "antd/es/input/Input";
import { ChangeEvent, useEffect, useState } from "react";
import { DatePicker, Select } from "antd";
import { log } from "console";

interface Props {
  mode: Mode;
  values: User;
  isModalOpen: boolean;
  handleCancel: () => void;
  handleCreate: (request: UserRequest) => void;
  handleUpdate: (id: string, request: UserRequest) => void;
}

export enum Mode {
  Create,
  Update,
}


export const CreateUpdateUser = ({
  mode,
  values,
  isModalOpen,
  handleCancel,
  handleCreate,
  handleUpdate,
}: Props) => {

  const [login, setLogin] = useState<string>(values.login);
  const [password, setPassword] = useState<string>(values.password);
  const [surname, setSurname] = useState<string>(values.surname);
  const [name, setName] = useState<string>(values.name);
  const [patronymic, setPatronymic] = useState<string>(values.patronymic);
  const [email, setEmail] = useState<string>(values.email);

  useEffect(() => {
    setLogin(values.login);
    setPassword(values.password);
  }, [values]);

  const handleOnOk = async () => {
    const userRequest = {
      login,
      password,
      surname,
      name,
      patronymic,
      email,
    };

    mode == Mode.Create
      ? handleCreate(userRequest)
      : handleUpdate(values.id, userRequest);
  };

  const handleLoginChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLogin(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
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

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  return (
    <Modal
      title={
        mode === Mode.Create ? "Добавить пользователя" : "Редактировать пользователя"
      }
      open={isModalOpen}
      onOk={handleOnOk}
      onCancel={handleCancel}
      cancelText={"Отмена"}
    >
      <div className="card_model">

        <p>Логин</p>
        <Input
          value={login}
          onChange={handleLoginChange}
          placeholder=""
        ></Input>

        <p>Пароль</p>
        <Input
          value={password}
          onChange={handlePasswordChange}
          placeholder=""
        ></Input>

        <p>Фамилия</p>
        <Input
          value={login}
          onChange={handleSurnameChange}
          placeholder=""
        ></Input>

        <p>Имя</p>
        <Input
          value={password}
          onChange={handleNameChange}
          placeholder=""
        ></Input>

        <p>Отчество</p>
        <Input
          value={login}
          onChange={handlePatronymicChange}
          placeholder=""
        ></Input>

        <p>Почта</p>
        <Input
          value={password}
          onChange={handleEmailChange}
          placeholder=""
        ></Input>

      </div>
    </Modal>
  );
};