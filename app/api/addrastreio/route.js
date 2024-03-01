import { NextResponse } from "next/server";
import { promises as fs } from "fs";

export async function POST(request) {
  const body = await request.json();
  const { recebedor, produto } = body;

  if (!recebedor || !produto) {
    return NextResponse.json(
      {
        status: 400,
      },
      { message: "Recebedor e Produto são obrigatórios!" }
    );
  }

  const file = await fs.readFile(process.cwd() + "/database.json", "utf8");
  const data = JSON.parse(file);
  let maxId = 0;
  let dataHoje = new Date();
  dataHoje = dataHoje.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  data.rastreios.forEach((rastreio) => {
    if (rastreio.id > maxId) {
      maxId = rastreio.id;
    }
  });

  const newRastreio = {
    id: String(Number(maxId) + 1),
    recebedor: recebedor,
    produto: produto,
    etapas: {
      pedidoColetado: {
        dataHora: dataHoje,
        status: "Em andamento",
        infos: [],
      },
      emTransporte: {
        dataHora: null,
        status: "Aguardando",
        infos: [],
      },
      saiuEntrega: {
        dataHora: null,
        status: "Aguardando",
        infos: [],
      },
      entregue: {
        dataHora: null,
        status: "Aguardando",
        infos: [],
      },
    },
  };

  try {
    data.rastreios.push(newRastreio);
    await fs.writeFile(
      process.cwd() + "/database.json",
      JSON.stringify(data),
      "utf8"
    );

    // const novoRastreio = data.rastreios.find(
    //   (rastreio) => rastreio.id === String(Number(maxId) + 1)
    // );
    // console.log(novoRastreio);

    return NextResponse.json(
      {
        status: 200,
        codRastreio: newRastreio.id,
      },
      { message: "Rastreio salvo com sucesso!" }
    );
  } catch (e) {
    return NextResponse.json(
      {
        status: 500,
      },
      { message: "Erro ao salvar no banco de dados!" }
    );
  }
}
