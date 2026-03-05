import sql from '@/lib/db';

export default async function Home() {
  const data = await sql`SELECT NOW()`;

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-3xl font-bold">Rede Social de Prompts</h1>
      <div className="mt-6 p-4 bg-green-100 text-green-800 rounded-lg border border-green-200">
        Conectado ao NeonDB! <br />
        <span className="text-sm font-mono text-gray-600">
          Hora do Banco: {JSON.stringify(data[0].now)}
        </span>
      </div>
    </main>
  );
}