import { NextResponse } from "next/server";
import { promises as fs } from "fs";

export async function POST(request) {
  const body = await request.json();
  const { user, pass } = body;
  console.log(user, pass);

  const file = await fs.readFile(process.cwd() + "/database.json", "utf8");
  const data = JSON.parse(file);
  console.log(data.login.username, data.login.password);
  //   console.log(data);

  if (data.login.username === user && data.login.password === pass) {
    console.log("entrou");
    return NextResponse.json(
      {
        message: "Login realizado com sucesso",
      },
      { status: 200 }
    );
  }

  return NextResponse.json(
    {
      message: "Não autorizado!",
    },
    { status: 404 }
  );
}
