import React, { useState } from 'react';
import { SERV_GET } from '../api/api';
import SearchBar from '../../components/SearchBar';
import Link from 'next/link';
import Head from 'next/head';

export default function UserDashboard() {
  const [services, setServices] = useState<any>();

  React.useEffect(() => {
    SERV_GET(setServices);
  }, []);

  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <header className="bg-gray-300 grid h-auto pb-5 w-full text-gray-800">
        <Link href="/">
          <i className="fa-solid fa-house text-lg text-gray-700 flex mt-2 ml-4"></i>
        </Link>

        <div className="grid w-3/4 m-auto">
          <h1 className="text-xl mb-5">Buscar serviços cadastrados</h1>
          <p className="text-xs self-center mb-1">
            Encontre o seu serviço adicionado
          </p>
          <SearchBar placeholder="Ex.: Hidráulica, Elétrica, Pintura e Decoração..." />
        </div>
      </header>

      <section className="text-gray-700">
        <table className="w-full text-sm">
          <thead className="text-gray-400 text-left border-b border-t border-gray-400">
            <tr className="">
              <th className="pl-2 ">Nome do serviço</th>
              <th className="pl-2 py-2">Categoria</th>
              <th className="pl-2">Data</th>
              <th className="pl-2">Status</th>
              <th className="pl-2">Preço</th>
            </tr>
          </thead>
          {services &&
            services.map((service: any) => (
              <tbody key={service.id}>
                <tr
                  key={service.id}
                  className="bg-gray-100 border-b-t border-solid border-gray-400"
                >
                  <td key={service.id} className="pl-2 py-2">
                    {service.name}
                  </td>
                  <td key={service.id} className="pl-2 py-2">
                    {service.category}
                  </td>
                  <td key={service.id} className="pl-2 py-2">
                    {service.created_at}
                  </td>
                  <td key={service.id} className="pl-2 py-2">
                    {service.status}
                  </td>
                  <td key={service.id} className="pl-2 py-2">
                    {service.price}
                  </td>
                </tr>
              </tbody>
            ))}
        </table>
      </section>
    </>
  );
}
