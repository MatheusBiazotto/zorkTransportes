"use client";

import React, { useState } from "react";
import { Button, Input } from "@nextui-org/react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { CiLogin } from "react-icons/ci";
import { toast, ToastContainer, ToastPosition } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function PageLogin() {
  const router = useRouter();

  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  function onUserChange(event) {
    setUser(event.target.value);
  }

  function onPasswordChange(event) {
    setPassword(event.target.value);
  }

  async function getLogin(event) {
    if (user && password) {
      const payload = {
        user: user,
        pass: password,
      };
      console.log(payload);
      const id = toast.loading("Realizando login...", {
        position: "bottom-right",
        theme: "dark",
      });

      try {
        const retorno = await axios.post("/api/auth", payload);
        if (retorno.status === 200) {
          localStorage.setItem("user", "logado");
          toast.update(id, {
            render: "Login realizado! Redirecionando...",
            type: "success",
            isLoading: false,
            theme: "dark",
            autoClose: 5000,
            closeButton: true,
          });

          setTimeout(() => {
            router.push("/admin/dashboard");
          }, 3000);
        }
      } catch (e) {
        toast.update(id, {
          render: "Whoops! Usuário e/ou senha incorretos/inexistentes",
          type: "error",
          isLoading: false,
          theme: "dark",
          autoClose: 5000,
          closeButton: true,
        });
        console.log(e);
      }
    }
  }

  return (
    <div className="flex flex-col min-h-screen justify-center items-center gap-4">
      <h1 className="text-2xl font-semibold">Painel - Entrar</h1>
      <Input
        onChange={onUserChange}
        type="text"
        label="Usuário"
        className="max-w-xs"
      />
      <Input
        label="Senha"
        onChange={onPasswordChange}
        endContent={
          <button
            className="focus:outline-none"
            type="button"
            onClick={toggleVisibility}
          >
            {isVisible ? (
              <FaEye size={20} color="#000" />
            ) : (
              <FaEyeSlash size={20} color="#000" />
            )}
          </button>
        }
        type={isVisible ? "text" : "password"}
        className="max-w-xs"
      />

      <Button
        onClick={getLogin}
        color="success"
        style={{ width: "320px" }}
        className="max-w-xs text-sm text-white"
      >
        Entrar
        <CiLogin size={24} />
      </Button>
      <ToastContainer className="absolute" autoClose={5000} />
    </div>
  );
}
