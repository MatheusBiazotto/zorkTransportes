import { NextResponse } from "next/server";
import { promises as fs } from "fs";

export async function POST(request) {
  const body = await request.json();
  const { codigo, status, tipoOp } = body;

  const file = await fs.readFile(process.cwd() + "/database.json", "utf8");
  const data = JSON.parse(file);
  let dataHoje = new Date();
  dataHoje = dataHoje.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  if (!tipoOp) {
    return NextResponse.json({
      status: 400,
      message: "Tipo de Operação obrigatório!",
    });
  }

  if (tipoOp === "status") {
    const { codigo, status } = body;

    if (!codigo || !status) {
      return NextResponse.json({
        status: 400,
        message: "Parâmetros obrigatórios",
      });
    }

    const rastreio = data.rastreios.find((rastreio) => rastreio.id === codigo);
    // console.log(rastreio);
    if (!rastreio) {
      return NextResponse.json({
        status: 404,
        message: "Rastreio não encontrado",
      });
    }

    if (status.pedidoColetado) {
      rastreio.etapas.pedidoColetado.dataHora = dataHoje;
      rastreio.etapas.pedidoColetado.status = status.pedidoColetado;
    }
    if (status.emTransporte) {
      rastreio.etapas.emTransporte.dataHora = dataHoje;
      rastreio.etapas.emTransporte.status = status.emTransporte;
    }
    if (status.saiuEntrega) {
      rastreio.etapas.saiuEntrega.dataHora = dataHoje;
      rastreio.etapas.saiuEntrega.status = status.saiuEntrega;
    }
    if (status.entregue) {
      rastreio.etapas.entregue.dataHora = dataHoje;
      rastreio.etapas.entregue.status = status.entregue;
    }

    try {
      await fs.writeFile(
        process.cwd() + "/database.json",
        JSON.stringify(data),
        "utf8"
      );

      return NextResponse.json({
        status: 200,
        message: "Status alterado com sucesso",
      });
    } catch (e) {
      console.log(e);
      return NextResponse.json({
        status: 500,
        message: "Erro ao alterar status",
      });
    }
  } else if (tipoOp === "details") {
    const { codigo, etapa, descricao } = body;
    console.log(codigo, etapa, descricao);

    if (!codigo || !etapa || !descricao) {
      return NextResponse.json({
        status: 400,
        message: "Parâmetros obrigatórios",
      });
    }

    const rastreio = data.rastreios.find((rastreio) => rastreio.id === codigo);
    if (!rastreio) {
      return NextResponse.json({
        status: 404,
        message: "Rastreio não encontrado",
      });
    }

    const info = {
      dataHora: dataHoje,
      descricao: descricao,
    };

    rastreio.etapas[etapa].infos.push(info);

    try {
      await fs.writeFile(
        process.cwd() + "/database.json",
        JSON.stringify(data),
        "utf8"
      );
      return NextResponse.json({
        status: 200,
        message: "Status alterado com sucesso",
      });
    } catch (e) {
      console.log(e);
      return NextResponse.json({
        status: 500,
        message: "Erro ao alterar status",
      });
    }
  }

  return NextResponse.json({
    status: 400,
    message: "Parâmetros obrigatórios",
  });
}
