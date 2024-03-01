"use client";

import React, { useState } from "react";
import {
  Tabs,
  Tab,
  Card,
  CardBody,
  CardHeader,
  Select,
  SelectItem,
  Textarea,
} from "@nextui-org/react";
import { Input, Button } from "@nextui-org/react";
import axios from "axios";
import { toast, ToastContainer, ToastPosition } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CircularProgress } from "@nextui-org/react";
import { CiCircleCheck } from "react-icons/ci";

export default function DashboardPage(dataFormat) {
  const [recebedor, setRecebedor] = useState("");
  const [produto, setProduto] = useState("");
  const [codRastreio, setCodRastreio] = useState("");
  const [status, setStatus] = useState({});
  const [etapa, setEtapa] = useState("");
  const [descricao, setDescricao] = useState("");
  const statusList = ["Aguardando", "Em andamento", "Sucesso"];
  const etapasList = [
    {
      label: "Pedido Coletado",
      value: "pedidoColetado",
    },
    { label: "Em Transporte", value: "emTransporte" },
    {
      label: "Saiu para entrega",
      value: "saiuEntrega",
    },
    {
      label: "Entregue",
      value: "entregue",
    },
  ];

  function setRec(event) {
    setRecebedor(event.target.value);
  }
  function setProd(event) {
    setProduto(event.target.value);
  }
  function setCod(event) {
    setCodRastreio(event.target.value);
  }
  function setSt(event) {
    const att = { [event.target.name]: event.target.value };
    setStatus((status) => ({
      ...status,
      ...att,
    }));
  }
  function setEt(event) {
    setEtapa(event.target.value);
  }
  function setDesc(event) {
    setDescricao(event.target.value);
  }

  async function handleClickAddRastreio() {
    const payload = {
      recebedor: recebedor,
      produto: produto,
    };
    const id = toast.loading("Cadastrando novo rastreio...", {
      position: "bottom-right",
      theme: "dark",
    });

    try {
      const retorno = await axios.post("/api/addrastreio", payload);
      console.log(retorno);
      if (retorno.status === 200) {
        toast.update(id, {
          render: `Rastreio adicionado com sucesso! Código de rastreio: ${retorno.data.codRastreio}`,
          type: "success",
          isLoading: false,
          theme: "dark",
          autoClose: 5000,
          closeButton: true,
        });
      }
    } catch (e) {
      console.log(e);
      toast.update(id, {
        render: `Erro ao adicionar novo rastreio.`,
        type: "error",
        isLoading: false,
        theme: "dark",
        autoClose: 5000,
        closeButton: true,
      });
    }
  }

  async function handleClickAddDetails() {
    const payload = {
      codigo: codRastreio,
      etapa: etapa,
      descricao: descricao,
      tipoOp: "details",
    };
    const id = toast.loading("Cadastrando detalhes do rastreio...", {
      position: "bottom-right",
      theme: "dark",
    });

    try {
      const retorno = await axios.post("/api/editrastreio", payload);
      if (retorno.status === 200) {
        toast.update(id, {
          render: `Detalhes do rastreio adicionado com sucesso!`,
          type: "success",
          isLoading: false,
          theme: "dark",
          autoClose: 5000,
          closeButton: true,
        });
      }
    } catch (e) {
      console.log(e);
      toast.update(id, {
        render: `Erro ao adicionar detalhes de rastreio.`,
        type: "error",
        isLoading: false,
        theme: "dark",
        autoClose: 5000,
        closeButton: true,
      });
    }
  }

  async function handleClickUpStatus(event) {
    const payload = {
      codigo: codRastreio,
      status: status,
      tipoOp: "status",
    };

    const id = toast.loading("Alterando status do rastreio...", {
      position: "bottom-right",
      theme: "dark",
    });

    try {
      const retorno = await axios.post("/api/editrastreio", payload);
      console.log(retorno);
      if (retorno.status === 200) {
        toast.update(id, {
          render: `Status alterado com sucesso!`,
          type: "success",
          isLoading: false,
          theme: "dark",
          autoClose: 5000,
          closeButton: true,
        });
      }
    } catch (e) {
      console.log(e);
      toast.update(id, {
        render: "Whoops! Erro ao alterar status.",
        type: "error",
        isLoading: false,
        theme: "dark",
        autoClose: 5000,
        closeButton: true,
      });
    }
  }

  return (
    <div className="flex flex-col w-full gap-1 items-center justify-center">
      <Tabs
        style={{ backgroundColor: "transparent !important" }}
        color="primary"
      >
        <Tab title="Adicionar Rastreio">
          <div className="flex flex-col gap-4 justify-center items-center">
            <Input
              style={{ width: "320px" }}
              type="text"
              label="Nome do Recebedor"
              onChange={setRec}
            />
            <Input
              onChange={setProd}
              className="max-w-sm"
              type="text"
              label="Produto"
            />
            <Button
              disabled={!recebedor && !produto ? true : false}
              onClick={handleClickAddRastreio}
              color="success"
              className="text-white"
            >
              Adicionar Rastreio
            </Button>
          </div>
        </Tab>
        <Tab
          className="flex flex-col gap-4"
          title="Adicionar rastreio detalhado"
        >
          <Input
            style={{ width: "320px" }}
            type="text"
            label="Código de Rastreio"
            value={codRastreio}
            onChange={setCod}
          />
          <Select
            label="Etapa"
            placeholder="Selecione uma etapa"
            onChange={setEt}
          >
            {etapasList.map((et) => (
              <SelectItem
                className="text-black"
                key={et.value}
                value={et.value}
              >
                {et.label}
              </SelectItem>
            ))}
          </Select>
          <Textarea
            label="Rastreio Detalhado"
            placeholder="Descreva o rastreio aqui, ex: chegou a base de distribuição em Rio de Janeiro - RJ"
            onChange={setDesc}
          />

          <Button
            disabled={!codRastreio || !etapa || !descricao ? true : false}
            className="text-white"
            color="success"
            onClick={handleClickAddDetails}
          >
            Adicionar rastreio detalhado
          </Button>
        </Tab>
        <Tab title="Alterar Status" className="flex flex-col flex-wrap gap-4">
          <Input
            style={{ width: "320px" }}
            type="text"
            label="Código de Rastreio"
            value={codRastreio}
            onChange={setCod}
          />
          <div className="flex gap-2 justify-center items-center ">
            <Card
              style={{ width: "250px" }}
              className={
                status.pedidoColetado
                  ? status.pedidoColetado === "Sucesso"
                    ? "py-4 bg-emerald-400"
                    : "py-4"
                  : "py-4"
              }
            >
              <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                <p className="text-tiny uppercase font-bold">Fase</p>
                <h4 className="font-bold text-large">Pedido Coletado</h4>
                <small className="text-default-500">
                  {dataFormat.dataFormat}
                </small>
              </CardHeader>
              <CardBody className="flex overflow-visible py-2 justify-center w-full items-center">
                {status.pedidoColetado ? (
                  status.pedidoColetado === "Em andamento" ? (
                    <CircularProgress />
                  ) : status.pedidoColetado === "Sucesso" ? (
                    <CiCircleCheck size={32} />
                  ) : null
                ) : null}
              </CardBody>
            </Card>
            <Select
              style={{ width: "200px" }}
              label="Status"
              placeholder="Selecione um status"
              name="pedidoColetado"
              onChange={setSt}
            >
              {statusList.map((st) => (
                <SelectItem className="text-black" key={st} value={st}>
                  {st}
                </SelectItem>
              ))}
            </Select>
          </div>
          <div className="flex gap-2 justify-center items-center ">
            <Card
              style={{ width: "250px" }}
              className={
                status.emTransporte
                  ? status.emTransporte === "Sucesso"
                    ? "py-4 bg-emerald-400"
                    : "py-4"
                  : "py-4"
              }
            >
              <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                <p className="text-tiny uppercase font-bold">Fase</p>
                <h4 className="font-bold text-large">Em Transporte</h4>
                <small className="text-default-500">
                  {dataFormat.dataFormat}
                </small>
              </CardHeader>
              <CardBody className="flex overflow-visible py-2 justify-center w-full items-center">
                {status.emTransporte ? (
                  status.emTransporte === "Em andamento" ? (
                    <CircularProgress />
                  ) : status.emTransporte === "Sucesso" ? (
                    <CiCircleCheck size={32} />
                  ) : null
                ) : null}
              </CardBody>
            </Card>
            <Select
              style={{ width: "200px" }}
              label="Status"
              placeholder="Selecione um status"
              name="emTransporte"
              onChange={setSt}
            >
              {statusList.map((st) => (
                <SelectItem className="text-black" key={st} value={st}>
                  {st}
                </SelectItem>
              ))}
            </Select>
          </div>
          <div className="flex gap-2 justify-center items-center ">
            <Card
              style={{ width: "250px" }}
              className={
                status.saiuEntrega
                  ? status.saiuEntrega === "Sucesso"
                    ? "py-4 bg-emerald-400"
                    : "py-4"
                  : "py-4"
              }
            >
              <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                <p className="text-tiny uppercase font-bold">Fase</p>
                <h4 className="font-bold text-large">Saiu para entrega</h4>
                <small className="text-default-500">
                  {dataFormat.dataFormat}
                </small>
              </CardHeader>
              <CardBody className="flex overflow-visible py-2 justify-center w-full items-center">
                {status.saiuEntrega ? (
                  status.saiuEntrega === "Em andamento" ? (
                    <CircularProgress />
                  ) : status.saiuEntrega === "Sucesso" ? (
                    <CiCircleCheck size={32} />
                  ) : null
                ) : null}
              </CardBody>
            </Card>
            <Select
              style={{ width: "200px" }}
              label="Status"
              placeholder="Selecione um status"
              name="saiuEntrega"
              onChange={setSt}
            >
              {statusList.map((st) => (
                <SelectItem className="text-black" key={st} value={st}>
                  {st}
                </SelectItem>
              ))}
            </Select>
          </div>
          <div className="flex gap-2 justify-center items-center ">
            <Card
              style={{ width: "250px" }}
              className={
                status.entregue
                  ? status.entregue === "Sucesso"
                    ? "py-4 bg-emerald-400"
                    : "py-4"
                  : "py-4"
              }
            >
              <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                <p className="text-tiny uppercase font-bold">Fase</p>
                <h4 className="font-bold text-large">Entregue</h4>
                <small className="text-default-500">
                  {dataFormat.dataFormat}
                </small>
              </CardHeader>
              <CardBody className="flex overflow-visible py-2 justify-center w-full items-center">
                {status.entregue ? (
                  status.entregue === "Em andamento" ? (
                    <CircularProgress />
                  ) : status.entregue === "Sucesso" ? (
                    <CiCircleCheck size={32} />
                  ) : null
                ) : null}
              </CardBody>
            </Card>
            <Select
              style={{ width: "200px" }}
              label="Status"
              placeholder="Selecione um status"
              name="entregue"
              onChange={setSt}
            >
              {statusList.map((st) => (
                <SelectItem className="text-black" key={st} value={st}>
                  {st}
                </SelectItem>
              ))}
            </Select>
          </div>
          <Button
            onClick={handleClickUpStatus}
            className="text-white"
            color="success"
            disabled={!status || !codRastreio ? true : false}
          >
            Alterar Status
          </Button>
        </Tab>
      </Tabs>
      <ToastContainer className="absolute" autoClose={5000} />
    </div>
  );
}
