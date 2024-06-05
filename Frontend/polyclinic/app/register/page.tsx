"use client";
5
import React, { useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { useRouter } from "next/navigation";
import { createUser, UserRequest } from "../services/users";

export default function RegPage() {
  const router = useRouter()
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordCheck, setPasswordCheck] = useState<string>("");
  const [surname, setSurname] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [patronymic, setPatronymic] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const handleRegister = async () => {

    if (password != passwordCheck)
      alert("Пароли не сопадают");
    else if (surname != "" && name !="" && patronymic != "" && email !="" && login != "" && password !="" && passwordCheck !="")
      {
      const user = {
      login,
      password,
      surname,
      name,
      patronymic,
      email
    } as UserRequest;
    try {
      await createUser(user);
      ToLogin();
    } catch (error) {
      console.error(error);
    }
  }
  };

  const ToLogin = () => {
    router.push("/autorization");
  };

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLogin(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handlePasswordCheckChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordCheck(event.target.value);
  };

  const handleSurnameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSurname(event.target.value);
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handlePatronymicChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPatronymic(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  return (
    <div className="back_login">
    <div className="register">
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
      >
      <h1 style={{color:"white", margin:"0 17%", marginBottom:"30px"}}>Регистрация</h1>
        <Form.Item className="forms"
          name="surname"
          rules={[{ required: true, message: "Введите фамилию!"}]}
          style={{margin:"0 14px", marginBottom:"25px"}}
        >
          <Input
            placeholder="Фамилия"
            onChange={handleSurnameChange}
            style={{width:"100%", fontSize:"16px", paddingLeft:"4px", color:"black", border:"3px solid black", borderRadius:"10px"}}
          />
        </Form.Item>
        <Form.Item className="forms"
          name="name"
          rules={[{ required: true, message: "Введите имя!" }]}
          style={{margin:"0 14px", marginBottom:"25px"}}
        >
          <Input
            placeholder="Имя"
            onChange={handleNameChange}
            style={{width:"100%", fontSize:"16px", paddingLeft:"4px", color:"black", border:"3px solid black", borderRadius:"10px"}}
          />
        </Form.Item>
        <Form.Item className="forms"
          name="patronymic"
          rules={[{ required: true, message: "Введите отчество!" }]}
          style={{margin:"0 14px", marginBottom:"25px"}}
        >
          <Input
            placeholder="Отчество"
            onChange={handlePatronymicChange}
            style={{width:"100%", fontSize:"16px", paddingLeft:"4px", color:"black", border:"3px solid black", borderRadius:"10px"}}
          />
        </Form.Item>
        <Form.Item className="forms"
          name="email"
          rules={[{ required: true, message: "Введите адрес электронной почты!" }]}
          style={{margin:"0 14px", marginBottom:"25px"}}
        >
          <Input
            placeholder="Адрес электронной почты"
            onChange={handleEmailChange}
            style={{width:"100%", fontSize:"16px", paddingLeft:"4px", color:"black", border:"3px solid black", borderRadius:"10px"}}
          />
        </Form.Item>
        <Form.Item className="forms"
          name="username"
          rules={[{ required: true, message: "Введите имя пользователя!" }]}
          style={{margin:"0 14px", marginBottom:"25px"}}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Имя пользователя"
            onChange={handleUsernameChange}
            style={{width:"100%", fontSize:"16px", paddingLeft:"4px", color:"black", border:"3px solid black", borderRadius:"10px"}}
          />
        </Form.Item>
        <Form.Item className="forms"
          name="password"
          rules={[{ required: true, message: "Введите пароль!" }]}
          style={{margin:"0 14px", marginBottom:"25px"}}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Пароль"
            onChange={handlePasswordChange}
            style={{width:"100%", fontSize:"16px", paddingLeft:"4px", color:"black", border:"3px solid black", borderRadius:"10px"}}
          />
        </Form.Item>
        <Form.Item className="forms"
          name="passwordCHeck"
          rules={[{ required: true, message: "Подтвердите свой пароль!" }]}
          style={{margin:"0 14px", marginBottom:"25px"}}
        >
          <Input
            prefix={<LockOutlined/>}
            type="password"
            placeholder="Подтвердите пароль"
            onChange={handlePasswordCheckChange}
            style={{width:"100%", fontSize:"16px", paddingLeft:"4px", color:"black", border:"3px solid black", borderRadius:"10px"}}
          />
        </Form.Item>

        <Form.Item>
          <div>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              onClick={handleRegister}
              style={{width:"90%", margin:"0 14px",height:"38px", marginTop:"5%",border:"2px solid white", backgroundColor:"rgba(0,0,0,0.8)", color:"white", fontSize:"18px", fontWeight:"bold", borderRadius:"11px", lineHeight:"20px" }}
            >
              Зарегистрироваться
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              onClick={ToLogin}
              style={{width:"90%", margin:"0 14px",height:"38px", marginTop:"7%", border:"2px solid white", backgroundColor:"rgba(0,0,0,0.8)", color:"white", fontSize:"18px", fontWeight:"bold", borderRadius:"11px", lineHeight:"20px" }}
            >
              Вернуться к авторизации
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
    </div>
  );
}