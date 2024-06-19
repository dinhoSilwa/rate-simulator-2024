import clsx from "clsx";
import { CreditCard, EllipsisVertical } from "lucide-react";
import { useEffect, useState } from "react";
import { InputValue, Irate } from "./types/conpany";
import { currentRate, mercadopagorate } from "./model/conpany-model";

function App() {
useEffect(()=>{
  setRate(mercadopagorate)
},[])


  const [valueInput, setInputValue] = useState<InputValue>({
    initial: 0,
    coin: "",
  });


  const [rate, setRate] = useState<Irate[]>()

  const stringToCoin = (value: string) => {
    const formatCurrency = value.replace(/\D/g, "");
    const toCurrency = (parseFloat(formatCurrency) / 100).toLocaleString(
      "pt-BR",
      { style: "currency", currency: "BRL" }
    );
    const initialValue = parseFloat(formatCurrency);
    setInputValue((prevState) => ({
      ...prevState,
      initial: initialValue / 100,
    }));
    return toCurrency;
  };
  const handlerInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const formatedValue = stringToCoin(value);
    setInputValue((prevState) => ({
      ...prevState,
      coin: formatedValue,
    }));
  };

  const handleConpany = (index: number) => {
   
    const curreteRateNow = currentRate[index].rate
    setRate(curreteRateNow)
  };

  return (
    <main className="font-[inter]">

      <nav className="flex items-center justify-between h-20 px-6">
        <h2 className="font-semibold text-[24px] text-slate-800">
          Simulador de Taxas
        </h2>{" "}
        <span className="active:bg-slate-200 p-4 rounded-full cursor-pointer">
          <EllipsisVertical />
        </span>
      </nav>

      <section className="flex justify-center h-32 items-center ml-auto">
        <fieldset className="flex relative px-4">
          <label className={clsx("text-[12px] absolute top-[-20px]")}>
            Digite o Valor da venda
          </label>
          {""}
          <input
            type="text"
            placeholder="digite o valor"
            className="focus:outline-none bg-zinc-100 px-2 p-2 text-[18px] font-bold text-slate-800 h-12 rounded-lg w-[80%]"
            inputMode="decimal"
            value={valueInput.coin}
            onChange={handlerInput}
          />
          <button className="bg-green-600 text-zinc-100 px-2 w-[100px] font-bold rounded-md h-12 text-[14px]">
            Confirmar
          </button>
        </fieldset>
      </section>

      <nav className="my-6">
        <ul className="flex justify-center gap-2">
          {currentRate.map(({ conpany, style }, index : number) => (
            <li
              key={index}
              className={clsx(
                "cursor-pointer flex gap-[4px] flex-col text-[10px] border px-2 py-[14px] font-bold leading-none text-center items-center justify-center rounded-md w-[20%]",
                style
              )}
              onClick={() => handleConpany(index)}
            >
              <span>
              <CreditCard  size={16}/>
              </span>
              {conpany}
            </li>
          ))}
        </ul>
      </nav>

      <section className="flex flex-col gap-4 justify-start w-11/12 mr-auto ml-auto px-2 rounded-lg shadow-lg border pt-8 pb-8">
        <ul className="flex justify-between ">
          <li className="flex font-bold  text-center px-2 w-[120px] text-[14px]">
            Parcela
          </li>
          <li className="flex font-bold  text-center px-2 w-[120px] text-[14px]">
            Taxa
          </li>
          <li className="flex font-bold  text-center px-2 w-[120px] text-[14px]">
            Recebe
          </li>
          <li className="flex font-bold  text-center px-2 w-[120px] text-[14px]">
            Parcelas
          </li>
        </ul>

        {rate?.map((item, index) => (
          <ul key={index} className="flex justify-between odd:bg-slate-100">
            <li className="flex px-2 w-[120px] text-[10px] font-normal text-zinc-800 py-[12px]">
              {item.parcela}
              {item.parcela !== "Debito" ? "X" : null}
            </li>
            <li className="flex px-2 w-[120px] text-[10px] font-normal text-zinc-800 py-[12px]">
              {item.taxa.toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
              %
            </li>
            <li className="flex px-2 w-[120px] text-[10px] font-normal text-zinc-800 py-[12px]">
              {(valueInput.initial * (1 - item.taxa / 100)).toLocaleString(
                "pt-BR",
                { style: "currency", currency: "BRL" }
              )}
            </li>
            <li className="flex px-2 w-[120px] text-[10px] font-normal text-zinc-800 py-[12px]">
              {typeof item.parcela === "number"
                ? (
                    valueInput.initial *
                    (1 - item.taxa / 100) *
                    item.parcela
                  ).toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })
                : null}
            </li>
          </ul>
        ))}
      </section>
    </main>
  );
}

export default App;
