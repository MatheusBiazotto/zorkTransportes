"use client";

import { Button, Input } from "@nextui-org/react";
import { useState } from "react";
import { IoMdSearch } from "react-icons/io";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast, ToastContainer, ToastPosition } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Rastreio() {
  const router = useRouter();
  const [codRastreio, setCodRastreio] = useState("");

  function setCod(event) {
    setCodRastreio(event.target.value);
  }

  async function searchRastreio(event) {
    if (codRastreio !== null) {
      const payload = {
        codigo: codRastreio,
        status: "Aguardando",
      };
      console.log(payload);

      try {
        const retorno = await axios.post("/api/rastreio", payload);
        console.log(retorno);
        const id = toast.loading("Relizando busca de código de rastreio...", {
          position: "bottom-right",
          theme: "dark",
        });

        if (retorno.status === 200) {
          toast.update(id, {
            render: "Rastreio encontrado! Redirecionando...",
            type: "success",
            isLoading: false,
            theme: "dark",
            autoClose: 5000,
            closeButton: true,
          });
          setTimeout(() => {
            router.push(`/rastreio/${retorno.data.rastreio.id}`);
          }, 3000);
        }
      } catch (error) {
        const id = toast.loading("Relizando busca de código de rastreio...", {
          position: "bottom-right",
          theme: "dark",
        });

        toast.update(id, {
          render: "Whoops! Código de rastreio não encontrado.",
          type: "error",
          isLoading: false,
          theme: "dark",
          autoClose: 5000,
          closeButton: true,
        });
        console.log(error);
      }
      // console.log(retorno);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4 w-full">
      <h1 className="text-4xl font-bold">Rastreie seu pedido!</h1>
      <h4>Basta digitar seu código de rastreio no campo abaixo</h4>
      <form className="flex flex-wrap gap-4 items-center justify-center mt-12">
        <Input
          type="text"
          label="Digite o código de rastreio"
          className="w-96"
          onChange={setCod}
        />
        <Button
          onClick={searchRastreio}
          disabled={!codRastreio ? true : false}
          className="text-white text-base p-4 h-full"
          color="success"
        >
          <IoMdSearch size={24} />
          Rastrear
        </Button>
      </form>
      <ToastContainer className="absolute" autoClose={5000} />
    </div>
  );
}
