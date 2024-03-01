import { NextResponse } from "next/server";
import { promises as fs } from "fs";

export async function POST(request) {
  const body = await request.json();
  const { codigo } = body;
  console.log(codigo);

  const file = await fs.readFile(process.cwd() + "/database.json", "utf8");
  const data = JSON.parse(file);
  // console.log(data);

  const rastreio = data.rastreios.find((rastreio) => rastreio.id === codigo);
  // console.log(rastreio);

  if (!rastreio) {
    return NextResponse.json(
      {
        message: "Rastreio não encontrado",
      },
      { status: 400 }
    );
  }

  return NextResponse.json({
    status: 200,
    rastreio: rastreio,
    message: "Rastreio encontrado com sucesso!",
  });
}
