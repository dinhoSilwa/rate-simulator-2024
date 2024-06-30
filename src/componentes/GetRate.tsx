import React, { FormEvent, useState } from "react";
import { EllipsisVertical } from "lucide-react";
import clsx from "clsx";
import toast, { Toaster } from "react-hot-toast";
import { Ioperation } from "../types/getrate";
import { mercadopagorate } from "../model/getrate.model";

export const GetRate = () => {
  const notify = (msg: string) => toast(msg);

  const [isCliked, setisCliked] = useState("");
  const [isRate, setisRate] = useState(false);
  const [inputvalue, setinputvalue] = useState<Ioperation>({
    originalvalue: "",
    valuewhithrate: "",
    rate: 0,
    portion: 0,
    divide : '',
    mpRate : 0
  });

  const convertValue = (value: string) => {
    const currentValue = value.replace(/\D/g, "");
    const numberValue = Number(currentValue);
    return numberValue;
  };

  const updateRate = (findedRate: number) => {
    const curretRate = Number(findedRate.toFixed(2));

    setinputvalue((prevState) => ({
      ...prevState,
      rate: curretRate,
    }));

    notify("✅ | Taxa encontrada");
    setisRate(true);
  };

  const findRate = (event: FormEvent) => {
    event.preventDefault();

    const convertOrigin = convertValue(inputvalue.originalvalue);
    const convertWithRate = convertValue(inputvalue.valuewhithrate);
    const findRate = ((convertWithRate - convertOrigin) / convertOrigin) * 100;
    const findDiv = (convertWithRate / 100) / inputvalue.portion



      if (convertOrigin >= convertWithRate) {
        notify(
          "🚨 | Digite um valor no primeiro Campo menor do que no Segundo"
        );
        return;
      }
      updateRate(findRate);
      setinputvalue(prevState=>({
        ...prevState, divide : findDiv.toLocaleString('pt-BR', {style : "currency", currency : "BRL"})
      }))

  };

  const finishOperation = () =>{
    setisRate(!isRate)
    setinputvalue(prevState=>({
      ...prevState, originalvalue : '', valuewhithrate : '', rate : 0, divide : '', portion : 0
    }))
  }

  const compareRate = (mprate : number) =>{
    alert(`Vai comparar Porra ${mprate}`)
  }


  return (
    <>
      <Toaster />
      <header className="flex flex-col bg-blue-600 py-8">

        <nav className="flex items-center justify-between px-6 h-20">
          <h2 className="font-semibold text-[18px] text-blue-50">
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
       <nav className="font-[inter] text-[10px] text-right pr-8 cursor-pointer flex gap-2 justify-end" >
        <div onClick={finishOperation}>Fechar</div>
        <div onClick={() =>compareRate(inputvalue.mpRate as number)}>Comparar</div>
       </nav>
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
                  {inputvalue.valuewhithrate}
                </span>
              </div>

              <div className="flex border-[3px] border-green-400 w-[70px] h-8 rounded-2xl items-center justify-center text-green-600 shadow-green-300 font-bold">
                {`${inputvalue.rate}%`}
              </div>
            </section>
          </header>

          <section className="flex justify-between">
            <div className=" border-l-[3px] pl-2 border-red-600 h-8 w-[50%]">
              <div className="w-full text-[8px] text-slate-500 font-semibold font-[inter]">
                valor da venda
              </div>

              <div className="text-[14px] font-bold text-slate-800">
               {inputvalue.originalvalue}
              </div>
            </div>

            <div className=" border-l-[4px] pl-2 border-blue-300 h-8 w-[50%]">
              <div className="w-full text-[8px] text-slate-500 font-semibold font-[inter]">
                Parcelamento
              </div>

              <div className="text-[14px] font-bold text-slate-800">
                {inputvalue.divide}
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
            placeholder="R$ 00,00"
            value={inputvalue.originalvalue}
            className="bg-zinc-200 pl-4 py-4 rounded-lg text-zinc-800 font-semibold"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const currentValue = e.target.value.replace(/\D/g, "");
              const toCoin = (Number(currentValue) / 100).toLocaleString(
                "pt-BR",
                {
                  style: "currency",
                  currency: "BRL",
                }
              );

              setinputvalue((prevState) => ({
                ...prevState,
                originalvalue: toCoin,
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
            placeholder="R$ 00,00"
            type="text"
            value={inputvalue.valuewhithrate}
            className="bg-zinc-200 pl-4 py-4 rounded-lg text-zinc-800 font-semibold"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const currentValue = e.target.value.replace(/\D/g, "");
              const toCoin = (Number(currentValue) / 100).toLocaleString(
                "pt-BR",
                {
                  style: "currency",
                  currency: "BRL",
                }
              );

              setinputvalue((prevState) => ({
                ...prevState,
                valuewhithrate: toCoin,
              }));
            }}
          />
        </fieldset>

        <span>Quantidade de Parcelas: {inputvalue.portion}</span>

        <fieldset className="flex gap-2 flex-wrap items-center mb-6">
          {mercadopagorate.map(({ parcela, taxa }, index) => (
            <>
              <input
                type="radio"
                id={parcela.toString()}
                name={"radioinput"}
                className="hidden"
                onChange={() => {
                  setinputvalue((prevState) => ({
                    ...prevState,
                    portion: Number(parcela),
                  }));
                }}
              />
              <label
                key={index}
                htmlFor={parcela.toString()}
                className={clsx(
                  "px-1 py-2 bg-blue-50 w-[80px] flex text-center justify-center text-[12px] font-bold text-zinc-800 rounded-md cursor-pointer",
                  {
                    "bg-blue-300 text-blue-900 font-bold": isCliked === parcela,
                  }
                )}
                onClick={() => {
                  setisCliked(parcela as string), setinputvalue(prevState=>({
                    ...prevState, mpRate : taxa
                  }))
                }}
              >
                {parcela === "Debito" ? "Debito" : `${parcela} X`}
              </label>
              
            </>
          ))}
        </fieldset>
        <fieldset className="flex items-center justify-center">
          <button
            type="submit"
            className={clsx(
              "bg-green-600 text-white py-2 w-[80%] rounded-md h-16 transition-all",
              {
                "bg-zinc-200":
                  !inputvalue.originalvalue ||
                  !inputvalue.valuewhithrate ||
                  !inputvalue.portion,
              }
            )}
            disabled={
              !(
                inputvalue.originalvalue &&
                inputvalue.valuewhithrate &&
                inputvalue.portion
              )
            }
          >
            Encontrar Taxa
          </button>
        </fieldset>
      </form>
    </>
  );
};
