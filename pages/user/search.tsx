import Link from 'next/link';
import React from 'react';
import SearchBar from '../../components/SearchBar';

export default function UserSearch() {
  return (
    <div className="h-screen flex justify-center mx-10">
      <div className="py-30 m-auto w-3/4 text-gray-800 ">
        <p className="mb-2">Para começar seus serviços</p>
        <h1 className="text-4xl mb-3">
          Encontre os seus serviços
          <br /> no catálogo Lovyca
        </h1>
        <SearchBar />
        <div className="mt-10">
          <Link
            href="/user/createservice"
            className="underline text-violet-600 text-sm"
          >
            Estou adicionando um serviço que não é ofertado na Lovyca
          </Link>
        </div>
      </div>
    </div>
  );
}
