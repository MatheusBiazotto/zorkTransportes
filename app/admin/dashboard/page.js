"use server";

import { promises as fs } from "fs";
import DashboardPage from "./component";

export default async function DashboardLayout() {
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

  return (
    <div className="flex min-h-screen flex-col items-center gap-16 p-24">
      <h1 className="text-4xl font-bold">Bem-vindo, {data.login.username}!</h1>
      <DashboardPage dataFormat={dataHoje} />
    </div>
  );
}
