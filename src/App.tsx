import clsx from "clsx";
import { EllipsisVertical } from "lucide-react";
import { useState } from "react";

const mpagorate = [
  { parcela: "Debito", taxa: 1.99 },
  { parcela: 1, taxa: 4.99 },
  { parcela: 2, taxa: 5.49 },
  { parcela: 3, taxa: 7.79 },
  { parcela: 5, taxa: 9.29 },
  { parcela: 6, taxa: 9.29 },
  { parcela: 7, taxa: 9.29 },
  { parcela: 8, taxa: 9.29 },
  { parcela: 9, taxa: 9.29 },
  { parcela: 10, taxa: 9.29 },
  { parcela: 11, taxa: 9.29 },
  { parcela: 12, taxa: 9.29 },
 
];

const Paybrands = [
  {name : 'Mercado Pago', rate : mpagorate , style : 'bg-blue-400'}
]

function App() {

  const [inputvalue, setValue] = useState({
    initial : 0,
    toReal : 0
  });


  

  const formaterToCoin = (number) =>{
    let toNumeric = number.replace(/\D/g, '')
    toNumeric = (parseFloat(toNumeric) / 100).toLocaleString('pt-BR',{style : 'currency', currency : 'BRL'})
    return toNumeric
  }

  const revertCoin = (number) =>{
    let reverter = number.replace(/\D/g, '');
    return reverter
  }

  const handlerInput = (e) =>{
    const {value} = e.target
    const valueRS = formaterToCoin(value)
    const reverteRS = revertCoin(valueRS)
    setValue(prevState=>({
      ...prevState, toReal : valueRS, initial :reverteRS/100
    }))

  }
 
  return (
    <main className="font-[inter]">

      <nav className="flex items-center justify-between h-20 px-6">
        <h2 className="font-semibold text-[24px] text-slate-800">Simulador de Taxas</h2> <span className="active:bg-slate-200 p-4 rounded-full cursor-pointer"><EllipsisVertical /></span>
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
            value={inputvalue.toReal}
            onChange={handlerInput}
          />
               <button className="bg-green-600 text-zinc-100 px-2 w-[100px] font-bold rounded-md h-12 text-[14px]">
          Confirmar
        </button>
        </fieldset>
   
      </section>

      <nav className="my-6">
        <ul className="flex justify-center gap-2">
          <li className="cursor-pointer flex text-[10px] border px-2 py-[14px] font-bold leading-none text-center items-center justify-center rounded-md w-[20%] hover:bg-blue-300 hover:text-blue-800">Mercado Pago</li>
          <li className="cursor-pointer flex text-[10px] border px-2 py-[14px] font-bold leading-none text-center items-center justify-center rounded-md w-[20%] hover:bg-yellow-300 hover:text-yellow-800">Amarelinha</li>
          <li className="cursor-pointer flex text-[10px] border px-2 py-[14px] font-bold leading-none text-center items-center justify-center rounded-md w-[20%] hover:bg-red-300 hover:text-red-800">Vermelhina</li>
          <li className="cursor-pointer flex text-[10px] border px-2 py-[14px] font-bold leading-none text-center items-center justify-center rounded-md w-[20%] hover:bg-green-300 hover:text-green-800">Verdinha</li>
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

          {mpagorate.map((item, index) => (
            <ul key={index} className="flex justify-between odd:bg-slate-100">
              <li className="flex px-2 w-[120px] text-[10px] font-normal text-zinc-800 py-[12px]">
                {item.parcela}{item.parcela !== "Debito" ? "X" : null}
              </li>
              <li className="flex px-2 w-[120px] text-[10px] font-normal text-zinc-800 py-[12px]">
                {item.taxa.toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
                %
              </li>
              <li className="flex px-2 w-[120px] text-[10px] font-normal text-zinc-800 py-[12px]">
                {(inputvalue.initial * (1 - item.taxa / 100)).toLocaleString(
                  "pt-BR",
                  { style: "currency", currency: "BRL" }
                )}
              </li>
              <li className="flex px-2 w-[120px] text-[10px] font-normal text-zinc-800 py-[12px]">
                {(
                  inputvalue.initial *
                  (1 - item.taxa / 100) *
                  item.parcela
                ).toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </li>
            </ul>
          ))}
      </section>
    </main>
  );
}

export default App;
