import clsx from "clsx";
import { EllipsisVertical } from "lucide-react";
import { useState } from "react";

interface Irate {
  parcela: string | number;
  taxa: number;
}

interface IConpany {
  conpany: string;
  rate: Irate[];
  style: string;
}

const mercadopagorate: Irate[] = [
  { parcela: "Debito", taxa: 1.99 },
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

const vermelhinhaRate: Irate[] = [
  { parcela: "Debito", taxa: 2.99 },
  { parcela: 1, taxa: 3.99 },
  { parcela: 2, taxa: 4.49 },
  { parcela: 3, taxa: 5.79 },
  { parcela: 5, taxa: 6.29 },
  { parcela: 6, taxa: 7.29 },
  { parcela: 7, taxa: 8.29 },
  { parcela: 8, taxa: 9.29 },
  { parcela: 9, taxa: 10.29 },
  { parcela: 10, taxa: 11.29 },
  { parcela: 11, taxa: 12.29 },
  { parcela: 12, taxa: 13.29 },
];

const amarelinhaRate: Irate[] = [
  { parcela: "Debito", taxa: 3.99 },
  { parcela: 1, taxa: 4.59 },
  { parcela: 2, taxa: 5.29 },
  { parcela: 3, taxa: 6.39 },
  { parcela: 5, taxa: 7.69 },
  { parcela: 6, taxa: 8.19 },
  { parcela: 7, taxa: 9.39 },
  { parcela: 8, taxa: 10.09 },
  { parcela: 9, taxa: 11.89 },
  { parcela: 10, taxa: 12.19 },
  { parcela: 11, taxa: 13.59 },
  { parcela: 12, taxa: 14.39 },
];

const verdinhaRate: Irate[] = [
  { parcela: "Debito", taxa: 5.99 },
  { parcela: 1, taxa: 6.79 },
  { parcela: 2, taxa: 7.69 },
  { parcela: 3, taxa: 8.29 },
  { parcela: 5, taxa: 9.29 },
  { parcela: 6, taxa: 10.99 },
  { parcela: 7, taxa: 11.19 },
  { parcela: 8, taxa: 12.39 },
  { parcela: 9, taxa: 13.79 },
  { parcela: 10, taxa: 14.29 },
  { parcela: 11, taxa: 15.69 },
  { parcela: 12, taxa: 16.29 },
];

const currentRate: IConpany[] = [
  {
    conpany: "Mercado Pago",
    rate: mercadopagorate,
    style: "hover:bg-blue-300 hover:text-blue-800",
  },
  {
    conpany: "Verdinha",
    rate: verdinhaRate,
    style: "hover:bg-green-300 hover:text-green-800",
  },
  {
    conpany: "Amarelinha",
    rate: amarelinhaRate,
    style: "hover:bg-yellow-300 hover:text-yellow-800",
  },
  {
    conpany: "vermelhinha",
    rate: vermelhinhaRate,
    style: "hover:bg-red-300 hover:text-red-800",
  },
];

interface InputValue {
  initial: number;
  coin: string;
}

function App() {
  const [valueInput, setInputValue] = useState<InputValue>({
    initial: 0,
    coin: "",
  });

  let currentTable: Irate[] = mercadopagorate;

  const stringToCoin = (value: string) => {
    const formatCurrency = value.replace(/\D/g, "");
    const toCurrency = (parseFloat(formatCurrency) / 100).toLocaleString(
      "pt-BR",
      { style: "currency", currency: "BRL" }
    );
    const initialValue = parseFloat(formatCurrency);
    setInputValue((prevState) => ({
      ...prevState,
      initial: initialValue,
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
          {currentRate.map(({ conpany, style }, index) => (
            <li
              key={index}
              className={clsx(
                "cursor-pointer flex text-[10px] border px-2 py-[14px] font-bold leading-none text-center items-center justify-center rounded-md w-[20%]",
                style
              )}
            >
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

        {currentTable.map((item, index) => (
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
