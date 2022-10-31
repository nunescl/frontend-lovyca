import Head from 'next/head';
import Link from 'next/link';
import React, { useState } from 'react';
import Input from '../../components/Inputs/Input';
import { api, SERV_POST } from '../api/api';

export default function CreateService() {
  const warranty: { id: number; value: number }[] = [
    { id: 1, value: 30 },
    { id: 2, value: 60 },
    { id: 3, value: 90 },
  ];

  const [formValues, setFormValues] = useState<string | any>({
    name: '',
    category: '',
    warranty: '',
    price: '',
    description: '',
  });

  function handleChange({
    target,
  }: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    let { name, value } = target;

    setFormValues((prevState: any) => ({
      ...prevState,
      [name]: value,
    }));
  }

  async function handleSubmit(event: any) {
    event.preventDefault();
    SERV_POST(formValues);
    setTimeout(function () {
      window.location.href = '/user/dashboard';
    }, 1000);
  }

  return (
    <>
      <Head>
        <title>Service</title>
      </Head>
      <header className="bg-gray-300 grid grid-cols-2 h-24 w-full text-gray-800">
        <div className="flex mt-2">
          <Link href="/">
            <i className="fa-solid fa-arrow-left m-2 text-lg text-gray-700"></i>
          </Link>
          <h1 className="ml-2 mt-1 text-2xl">[Nome do prestador]</h1>
        </div>
        <div className="flex justify-items-end justify-self-end">
          <p className=" p-1.5 m-3 bg-amber-400 text-xs self-end">
            Vamos começar a sugerir um serviço.
          </p>
        </div>
      </header>
      <form className="flex flex-auto flex-col h-auto w-2/3 justify-center mx-auto">
        <div className="flex justify-between w-full my-10">
          <Input
            label="Nome do Serviço"
            placeholder="Ex.: Troca de chuveiro"
            type="text"
            className="h-9 w-96 p-2 mr-20 duration-300 outline-none border border-2 border-solid border-gray-200 rounded focus:border-b-teal-500 text-slate-900 spin-button-none"
            name="name"
            value={formValues.name}
            onChange={handleChange}
          />
          <Input
            label="Preço do Serviço"
            placeholder="R$00,00"
            type="number"
            className="h-9 w-32 p-2 duration-300 outline-none border border-2 border-solid border-gray-200 rounded focus:border-b-teal-500 text-slate-900 spin-button-none"
            name="price"
            value={formValues.price}
            onChange={handleChange}
          />
        </div>
        <div className="flex justify-between w-full my-10">
          <Input
            label="Categoria"
            placeholder="Ex.: Elétrica, Hidráulica"
            type="text"
            className="h-9 w-96 p-2 mr-20 duration-300 outline-none border border-2 border-solid border-gray-200 rounded focus:border-b-teal-500 text-slate-900 spin-button-none"
            name="category"
            value={formValues.category}
            onChange={handleChange}
          />
          <div className="grid text-gray-800">
            <h3>Garantia</h3>
            <select
              className="h-9 w-40 duration-300 outline-none border border-2 border-solid border-gray-200 rounded bg-inherit focus:border-b-teal-500 text-slate-900 spin-button-none"
              name="warranty"
              value={formValues.warranty}
              onChange={handleChange}
            >
              {warranty &&
                warranty.map((warranty) => (
                  <option key={warranty.id} value={warranty.value}>
                    {warranty.value} dias
                  </option>
                ))}
            </select>
          </div>
        </div>{' '}
        <Input
          label="Descrição do serviço"
          placeholder="Ex.: Troca de chuveiro"
          className="flex justify-center h-48 p-2 duration-300 outline-none border border-2 border-solid border-gray-200 rounded focus:border-b-teal-500 text-slate-900 spin-button-none"
          name="description"
          value={formValues.description}
          onChange={handleChange}
        />
        <div className="flex justify-end mb-10">
          <button
            type="submit"
            className="justify-end right-0 bg-teal-600 h-10 w-40 mt-10 rounded duration-300 relative after:absolute after:top-0 after:right-full after:bg-teal-700 after:z-10 after:w-full after:h-full overflow-hidden hover:after:translate-x-full after:duration-300"
            onClick={handleSubmit}
          >
            <h2 className="relative z-20">Cadastrar serviço</h2>
          </button>
        </div>
      </form>
    </>
  );
}
