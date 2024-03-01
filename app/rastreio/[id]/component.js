"use client";

import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import { CircularProgress } from "@nextui-org/react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { FaTruck } from "react-icons/fa";
import { TfiHeadphoneAlt } from "react-icons/tfi";
import { CiCircleCheck } from "react-icons/ci";

export default function RastreioComponent(data) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  let dataHoje = new Date();
  dataHoje = dataHoje.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return (
    <div className="flex flex-col w-full justify-center items-center gap-16">
      <div
        style={{ height: "150px" }}
        className="flex flex-wrap gap-12 w-full justify-center items-center"
      >
        <Card
          style={{ width: "200px" }}
          className={
            data.data.etapas.pedidoColetado.status === "Sucesso"
              ? "py-4 bg-emerald-300"
              : "py-4 h-full"
          }
        >
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
            <p className="text-tiny uppercase font-bold">Fase</p>

            <h4 className="font-bold text-large">Pedido Coletado</h4>
            <small className="text-default-900">
              {data.data.etapas.pedidoColetado.status !== "Aguardando"
                ? data.data.etapas.pedidoColetado.dataHora
                : null}
            </small>
          </CardHeader>
          <CardBody className="flex overflow-visible py-2 justify-center w-full items-center">
            {data.data.etapas.pedidoColetado.status === "Em andamento" ? (
              <CircularProgress aria-label="Loading..." />
            ) : data.data.etapas.pedidoColetado.status === "Sucesso" ? (
              <CiCircleCheck size="32" />
            ) : null}
          </CardBody>
        </Card>

        <Card
          style={{ width: "200px" }}
          className={
            data.data.etapas.emTransporte.status === "Sucesso"
              ? "py-4 bg-emerald-300"
              : "py-4 h-full"
          }
        >
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
            <p className="text-tiny uppercase font-bold">Fase</p>

            <h4 className="font-bold text-large">Em transporte</h4>
            <small className="text-default-500">
              {data.data.etapas.emTransporte.status !== "Aguardando"
                ? data.data.etapas.emTransporte.dataHora
                : null}
            </small>
          </CardHeader>
          <CardBody className="flex overflow-visible py-2 justify-center w-full items-center">
            {data.data.etapas.emTransporte.status === "Em andamento" ? (
              <CircularProgress aria-label="Loading..." />
            ) : data.data.etapas.emTransporte.status === "Sucesso" ? (
              <CiCircleCheck size="32" />
            ) : null}
          </CardBody>
        </Card>

        <Card
          style={{ width: "200px" }}
          className={
            data.data.etapas.saiuEntrega.status === "Sucesso"
              ? "py-4 bg-emerald-300"
              : "py-4 h-full"
          }
        >
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
            <p className="text-tiny uppercase font-bold">Fase</p>

            <h4 className="font-bold text-large">Saiu para entrega</h4>
            <small className="text-default-500">
              {data.data.etapas.saiuEntrega.status !== "Aguardando"
                ? data.data.etapas.saiuEntrega.dataHora
                : null}
            </small>
          </CardHeader>
          <CardBody className="flex overflow-visible py-2 justify-center w-full items-center">
            {data.data.etapas.saiuEntrega.status === "Em andamento" ? (
              <CircularProgress aria-label="Loading..." />
            ) : data.data.etapas.saiuEntrega.status === "Sucesso" ? (
              <CiCircleCheck size="32" />
            ) : null}
          </CardBody>
        </Card>

        <Card
          style={{ width: "200px" }}
          className={
            data.data.etapas.entregue.status === "Sucesso"
              ? "py-4 bg-emerald-300"
              : "py-4 h-full"
          }
        >
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
            <p className="text-tiny uppercase font-bold">Fase</p>

            <h4 className="font-bold text-large">Entregue</h4>
            <small className="text-default-500">
              {data.data.etapas.entregue.status !== "Aguardando"
                ? data.data.etapas.entregue.dataHora
                : null}
            </small>
          </CardHeader>
          <CardBody className="flex overflow-visible py-2 justify-center w-full items-center">
            {data.data.etapas.entregue.status === "Em andamento" ? (
              <CircularProgress aria-label="Loading..." />
            ) : data.data.etapas.entregue.status === "Sucesso" ? (
              <CiCircleCheck size="32" />
            ) : null}
          </CardBody>
        </Card>
      </div>
      <div className="flex flex-col flex-wrap w-full justify-center items-center gap-4">
        <Button color="primary" onPress={onOpen}>
          <FaTruck size={24} />
          Rastreio Detalhado
        </Button>
        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          isDismissable={false}
          isKeyboardDismissDisabled={true}
          size="5xl"
        >
          <ModalContent className="text-black">
            {(onClose) => (
              <>
                <ModalHeader className="flex gap-1">
                  Rastreio Detalhado
                </ModalHeader>
                <ModalBody>
                  {data.data.etapas.pedidoColetado.status !== "Aguardando"
                    ? data.data.etapas.pedidoColetado.infos
                        .slice()
                        .reverse()
                        .map((info) => {
                          return (
                            <>
                              <div className="flex flex-col gap-1 justify-start">
                                <small className="text-default-500">
                                  {info.dataHora}
                                </small>
                                <p>{info.descricao}</p>
                              </div>
                            </>
                          );
                        })
                    : null}

                  {data.data.etapas.emTransporte.status !== "Aguardando"
                    ? data.data.etapas.emTransporte.infos
                        .slice()
                        .reverse()
                        .map((info) => {
                          return (
                            <>
                              <div className="flex flex-col gap-1 justify-start">
                                <small className="text-default-500">
                                  {info.dataHora}
                                </small>
                                <p>{info.descricao}</p>
                              </div>
                            </>
                          );
                        })
                    : null}

                  {data.data.etapas.saiuEntrega.status !== "Aguardando"
                    ? data.data.etapas.saiuEntrega.infos
                        .slice()
                        .reverse()
                        .map((info) => {
                          return (
                            <>
                              <div className="flex flex-col gap-1 justify-start">
                                <small className="text-default-500">
                                  {info.dataHora}
                                </small>
                                <p>{info.descricao}</p>
                              </div>
                            </>
                          );
                        })
                    : null}

                  {data.data.etapas.entregue.status !== "Aguardando"
                    ? data.data.etapas.entregue.infos
                        .slice()
                        .reverse()
                        .map((info) => {
                          return (
                            <>
                              <div className="flex flex-col gap-1 justify-start">
                                <small className="text-default-500">
                                  {info.dataHora}
                                </small>
                                <p>{info.descricao}</p>
                              </div>
                            </>
                          );
                        })
                    : null}
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" variant="solid" onPress={onClose}>
                    Fechar
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
        <Button color="secondary">
          <TfiHeadphoneAlt size={24} />
          Suporte
        </Button>
      </div>
    </div>
  );
}
