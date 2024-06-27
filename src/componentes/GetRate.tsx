import React, { FormEvent, useState } from "react";
import { Irate } from "../types/conpany";
import { EllipsisVertical } from "lucide-react";
import clsx from "clsx";
import toast, { Toaster } from 'react-hot-toast';

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

interface Ioperation {
  originalvalue: number;
  valuewhithrate: number;
  rate: number;
  portion: number;
}

export const GetRate = () => {

  const notify = (msg : string) => toast.error(msg)

  const [isRate, setisRate] = useState(false);
  const [inputvalue, setinputvalue] = useState<Ioperation>({
    originalvalue: 0,
    valuewhithrate: 0,
    rate: 0,
    portion: 0,
  });

  const findRate = (event: FormEvent) => {
    event.preventDefault();

    if (inputvalue.originalvalue > inputvalue.valuewhithrate) {
       notify("O valor do primeiro campo não pode ser menor do que o do segundo")
       return

    }else if(!inputvalue.originalvalue && !inputvalue.valuewhithrate){
      notify("Não pode existir campos vazios")
      return
    }else if(inputvalue.portion <= 0){
      return notify("Escolha um Tipo de Parcelamento")
    }else{
      setisRate(!isRate);

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

  const [isCliked, setisCliked] = useState('')

  return (
    <>

    <Toaster />
      <section>
        {/* {inputvalue.originalvalue} - {inputvalue.valuewhithrate} - {inputvalue.rate} - {inputvalue.portion} */}
      </section>
      <header className="flex flex-col bg-blue-600 py-8">
        <nav className="flex items-center justify-between px-6 h-20">
          <h2 className="font-semibold text-[18px] text-blue-100">
            Encontrar Taxa Aplicada
          </h2>{" "}
          <span className="active:bg-blue-800 p-4 rounded-full cursor-pointer">
            <EllipsisVertical className="text-blue-100" />
          </span>
        </nav>

        <section
          className={clsx(
            "bg-white rounded-lg w-[90%] ml-auto mr-auto px-4 py-8 flex flex-col gap-6",
            { hidden: !isRate }
          )}
        >
          <header className="flex justify-between pr-6 flex-col">
            <h3 className="w-full text-[8px] text-slate-500 font-semibold font-[inter] ">
              valor total com a taxa
            </h3>
            <section className="flex justify-between items-center">
              <div className="flex w-1/2 gap-2">
                <span className="text-[32px] font-[inter] text-zinc-400">
                  R$
                </span>
                <span className="text-[32px] font-[inter] text-slate-800 font-bold">
                  {Number(inputvalue.valuewhithrate) || 0}
                </span>
              </div>

              <div className="flex border border-green-400 w-[70px] h-8 rounded-2xl items-center justify-center text-green-600 shadow-green-300">
                {Number(inputvalue.rate || 0)} %
              </div>
            </section>
          </header>

          <section className="flex justify-between">
            <div className=" border-l-[3px] pl-2 border-red-600 h-8 w-[50%]">
              <div className="w-full text-[8px] text-slate-500 font-semibold font-[inter]">
                valor da venda
              </div>

              <div className="text-[14px] font-bold text-slate-800">
                {(Number(inputvalue.originalvalue) || 0).toLocaleString(
                  "pt-BR",
                  { style: "currency", currency: "BRL" }
                )}
              </div>
            </div>

            <div className=" border-l-[4px] pl-2 border-blue-300 h-8 w-[50%]">
              <div className="w-full text-[8px] text-slate-500 font-semibold font-[inter]">
                Parcelamento
              </div>

              <div className="text-[14px] font-bold text-slate-800">
                {(
                  Number(inputvalue.valuewhithrate / inputvalue.portion) || 0
                ).toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </div>
            </div>
          </section>
        </section>
      </header>

      <form
        className="flex flex-col px-4 rounded-lg py-10 font-[inter] gap-4"
        onSubmit={findRate}
      >
        <fieldset className="flex flex-col gap-2">
          <label
            htmlFor="valorpassado"
            className="font-bold text-zinc-500 text-[14px]"
          >
            Digite o valor da venda
          </label>
          <input
          
            type="text"
            id="valorpassado"
            className="bg-zinc-200 pl-4 py-4 rounded-lg"
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
          <label
            htmlFor="ValorPassado"
            className="font-bold text-zinc-500 text-[14px]"
          >
            Digite o valor total (com a taxa)
          </label>
          <input
            type="text"
            className="bg-zinc-200 pl-4 py-4 rounded-lg"
            value={Number(inputvalue.valuewhithrate) || 0}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setinputvalue((prevState) => ({
                ...prevState,
                valuewhithrate: parseFloat(e.target.value),
              }))
            }
          />
        </fieldset>

        <span>Quantidade de Parcelas:</span>
      
        <fieldset className="flex gap-2 flex-wrap items-center mb-6">
          {mercadopagorate.map(({ parcela }, index) => (
            <>
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
              <label
                key={index}
                htmlFor={parcela.toString()}
                className={clsx("px-1 py-2 bg-blue-50 hover:bg-blue-400 hover:text-blue-900 w-[80px] flex text-center justify-center text-[12px] font-bold text-zinc-800 rounded-md cursor-pointer",{"bg-blue-300 text-blue-800 font-bold" : isCliked === parcela})}
                onClick={()=>setisCliked(parcela as string)}
              >
                {parcela === "Debito" ? "Debito" : `${parcela} X`}
              </label>
      
            </>
          ))}
        </fieldset>
        <fieldset className="flex items-center justify-center">
          <button
            type="submit"
            className={clsx("bg-green-600 text-white py-2 w-[80%] rounded-md h-16 transition-all", {"bg-zinc-200" : !inputvalue.originalvalue || !inputvalue.valuewhithrate || !inputvalue.portion})}
            disabled={!(inputvalue.originalvalue && inputvalue.valuewhithrate && inputvalue.portion)}
            >
            Encontrar Taxa
          </button>
        </fieldset>
      </form>

    </>
  );
};
