"use client";

import "../globals.css";
import React, { useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { useRouter } from "next/navigation";
import { getUserToken, UserRequest } from "../services/users";
import { stringify } from "querystring";

export let token = "";

export function logout() {
  token = "";
  localStorage.clear()
}

export default function LoginPage() {
  const router = useRouter();
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const surname = "1";
  const name = "1";
  const patronymic = "1";
  const email = "1";
  const handleLogin = async () => {
    const user = {
      login,
      password,
      surname,
      name,
      patronymic,
      email
    } as UserRequest;
    try {
      const tokenResponse = await getUserToken(user);
      if (tokenResponse) {
        // Сохранение токена
        token = tokenResponse.token;
        localStorage.clear();
        localStorage.setItem("username", login)
        router.push("/appointments");
      }
    } catch (error) {
      // Обработка ошибки
      console.error(error);
      alert("Неверный логин или пароль!")
    }
  };

  const ToReg = () => {
    router.push("/register");
  };

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLogin(event.target.value);
    let username = event.target.value;
    console.log(username);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  return (
    <div className="back_login">
    <div className="login">
      <Form
        name="login"
        initialValues={{ remember: true }}
      >
        <h1 style={{color:"white", margin:"0 17%", marginBottom:"45px"}}>Авторизация</h1>
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Введите имя пользователя!" }]}
          style={{margin:"0 14px", marginBottom:"20px",}}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Имя пользователя"
            onChange={handleUsernameChange}
            style={{width:"100%", fontSize:"16px", fontWeight:"bold", paddingLeft:"4px", color:"black", border:"3px solid black", borderRadius:"10px"}}
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Введите пароль!" }]}
          style={{margin:"0 14px", marginBottom:"20px"}}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Пароль"
            style={{width:"100%", fontSize:"16px", fontWeight:"bold", paddingLeft:"4px", color:"black", border:"3px solid black", borderRadius:"10px"}}
            onChange={handlePasswordChange}
          />
        </Form.Item>
        <Form.Item>
          <div>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              onClick={handleLogin}
              style={{width:"90%", margin:"0 14px",height:"38px", marginTop:"5%",border:"2px solid white", backgroundColor:"rgba(0,0,0,0.8)", color:"white", fontSize:"18px", fontWeight:"bold", borderRadius:"11px", lineHeight:"20px" }}
            >
              Войти
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              onClick={ToReg}
              style={{width:"90%", margin:"0 14px",height:"38px", marginTop:"7%", border:"2px solid white", backgroundColor:"rgba(0,0,0,0.8)", color:"white", fontSize:"18px", fontWeight:"bold", borderRadius:"11px", lineHeight:"20px" }}
            >
              Зарегистрироваться
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
    </div>

  );
}