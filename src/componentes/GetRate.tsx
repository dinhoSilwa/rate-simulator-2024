import React, { FormEvent, useState } from "react";
import { Irate } from "../types/conpany";

const mercadopagorate: Irate[] = [
  { parcela: 1, taxa: 2.99 },
  { parcela: 2, taxa: 3.49 },
  { parcela: 3, taxa: 4.79 },
  { parcela: 5, taxa: 5.29 },
  { parcela: 6, taxa: 6.29 },
  { parcela: 7, taxa: 7.29 },
  { parcela: 8, taxa: 8.29 },
  { parcela: 9, taxa: 9.29 },
  { parcela: 10, taxa: 10.29 },
  { parcela: 11, taxa: 11.29 },
  { parcela: 12, taxa: 12.29 },
];

export const GetRate = () => {
  interface Ioperation {
    originalvalue: number;
    valuewhithrate: number;
    rate: number;
    portion: number;
  }

  const [inputvalue, setinputvalue] = useState<Ioperation>({
    originalvalue: 0,
    valuewhithrate: 0,
    rate: 0,
    portion: 0,
  });

  const findRate = (event: FormEvent) => {
    event.preventDefault();

    if (inputvalue.originalvalue > inputvalue.valuewhithrate) {
      return alert(
        "O valor original não pode ser maior do que o Valor com A taxa"
      );
    }

    const rate =
      ((inputvalue.valuewhithrate - inputvalue.originalvalue) /
        inputvalue.originalvalue) *
      100;
    setinputvalue((prevState) => ({
      ...prevState,
      rate,
    }));
  };
  return (
    <>
      <form className="flex flex-col" onSubmit={findRate}>
        Achar Taxa Aplicada
        <fieldset className="flex flex-col gap-2">
          <label htmlFor="valorpassado">Digite o valor da venda</label>
          <input
            type="text"
            id="valorpassado"
            className="bg-zinc-200 px-2 py-2"
            value={Number(inputvalue.originalvalue) || 0}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setinputvalue((prevState) => ({
                ...prevState,
                originalvalue: parseFloat(e.target.value),
              }));
            }}
          />
        </fieldset>
        <fieldset className="flex flex-col gap-2">
          <label htmlFor="ValorPassado">
            Digite o valor total (com a taxa)
          </label>
          <input
            type="text"
            className="bg-zinc-200 px-2 py-2"
            value={Number(inputvalue.valuewhithrate) || 0}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setinputvalue((prevState) => ({
                ...prevState,
                valuewhithrate: parseFloat(e.target.value),
              }))
            }
          />
        </fieldset>
        <fieldset className="flex gap-2 flex-wrap">
          {mercadopagorate.map(({ parcela }, index) => (
            <>
              <label
                key={index}
                htmlFor={parcela.toString()}
                className="px-1 py-2 bg-blue-50 hover:bg-blue-400 hover:text-blue-900 w-[80px] flex text-center justify-center text-[12px] font-bold text-zinc-800 rounded-md"
              >
                {parcela === "Debito" ? "Debito" : `${parcela} X`}
              </label>
              <input
                type="radio"
                id={parcela.toString()}
                name={"radioinput"}
                className="hidden"
                onChange={() =>
                  setinputvalue((prevState) => ({
                    ...prevState,
                    portion:
                      typeof parcela === "string"
                        ? inputvalue.valuewhithrate
                        : parcela,
                  }))
                }
              />
            </>
          ))}
        </fieldset>
        <fieldset>
          <button
            type="submit"
            className="bg-green-600 text-white py-2 w-[60%] rounded-md"
          >
            Encontrar Taxa
          </button>
        </fieldset>
      </form>

      <section className=" px-8">
        <section className="bg-blue-200 flex flex-col items-center rounded-lg gap-2">
          <header className="flex justify-center flex-col items-center">
            <h2>Valor da venda : </h2>{" "}
            <strong>{inputvalue.originalvalue}</strong>
          </header>
          <div className="flex gap-6">
            <span> Valor Total : {inputvalue.valuewhithrate} </span>
            <span>
              {(inputvalue.valuewhithrate / inputvalue.portion).toFixed(2)}
            </span>
            <span>Taxa Aplicada : {inputvalue.rate.toFixed(2)}% </span>
          </div>
        </section>
      </section>
    </>
  );
};
