"use server";

import axios from "axios";
import { promises as fs } from "fs";

import RastreioComponent from "./component";

export default async function PageRastreio({ params }) {
  const rastreio = await getRastreioData(params.id);

  return (
    <div className="flex flex-col min-h-screen items-center justify-center">
      <RastreioComponent data={rastreio} />
    </div>
  );
}

async function getRastreioData(id) {
  const file = await fs.readFile(process.cwd() + "/database.json", "utf8");
  const data = JSON.parse(file);

  return data.rastreios.find((rastreio) => rastreio.id === id);
}
