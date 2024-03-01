"use server";

export default async function RastreioLayout({ children }) {

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      {children}
    </div>
  );
}
