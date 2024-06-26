import clsx from "clsx";
import { CreditCard, EllipsisVertical, LoaderCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { InputValue, Irate } from "./../types/conpany";
import { currentRate, mercadopagorate } from "./../model/conpany-model";

export default function TablePage() {

  const inputref = useRef(null)
  const [inFocus, setinFocus] = useState(false)
  const [rate, setRate] = useState<Irate[]>();
  const [isLoading, setIsLoading] = useState(false)


  const focusCheck = () =>{
    if(inputref.current === document.activeElement){
      setinFocus(!inFocus)
    }else{
      setinFocus(false)
    }
  }
  
  useEffect(() => {
    setRate(mercadopagorate);
  }, []);

  const [valueInput, setInputValue] = useState<InputValue>({
    initial: 0,
    coin: "",
  });


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
    const curreteRateNow = currentRate[index].rate;
    setIsLoading(!isLoading)

    setTimeout(() => {
      setRate(curreteRateNow);
      setIsLoading(false)

    }, 1000);
  };



  return (
    <main className="font-[inter]">
      <header className="bg-blue-600 pt-10">
        <nav className="flex items-center justify-between px-6">
          <h2 className="font-semibold text-[18px] text-blue-100">
            Simulador de Taxas
          </h2>{" "}
          <span className="active:bg-blue-600 p-4 rounded-full cursor-pointer">
            <EllipsisVertical className="text-blue-100" />
          </span>
        </nav>




        <section className="flex justify-center h-32 items-center ml-auto">
          <fieldset className="flex relative px-4">
            <label
              className={clsx("text-[10px] absolute  text-zinc-200", inFocus ? 'top-[-20px]' : 'top-[-10px] hidden text-zinc-900')}
            >
              Digite o valor da venda
            </label>
            {""}
            <input
              type="text"
              placeholder="Digite o Valor da venda"
              className="placeholder:text-[14px] placeholder:font-normal focus:outline-none bg-zinc-100 px-2 p-2 text-[18px] font-bold text-slate-800 h-12 rounded-s-[12px] w-[80%]"
              inputMode="decimal"
              value={valueInput.coin}
              onChange={handlerInput}
              ref={inputref}
              onFocus={focusCheck}
              onBlur={focusCheck}
            />
            <button
              className="active:bg-blue-950 bg-blue-900 text-zinc-100 px-2 w-[100px] rounded-r-[12px] h-12 text-[14px]"
              onClick={() =>
                setInputValue((prevState) => ({
                  ...prevState,
                  initial: 0,
                  coin: "",
                }))
              }
            >
              Limpar 
            </button>
          </fieldset>
        </section>
      </header>

      <nav className="my-6 w-full overflow-x-scroll custom-scrollbar h-28 flex items-center">
        <ul className="flex justify-start gap-2 w-[600px] pl-4">
          {currentRate.map(({ conpany, style }, index: number) => (
            <li
              key={index}
              className={clsx(
                "cursor-pointer flex gap-[6px] flex-col text-[10px] border px-2 py-[14px] font-bold leading-none text-center items-center justify-center rounded-md w-[200px] bg-slate-100",
                style
              )}
              onClick={() => handleConpany(index)}
            >
              <span>
                <CreditCard size={16} />
              </span>
              <p className="flex flex-wrap px-2">{conpany}</p>
            </li>
          ))}
        </ul>
      </nav>

      <section className="flex flex-col gap-4 justify-start w-11/12 mr-auto ml-auto px-2 rounded-lg shadow-lg border pt-8 pb-8 mb-20">
        <ul className="flex justify-between ">
          <li className="flex font-bold  text-center px-2 w-[120px] text-[14px] flex-1">
            Tempo
          </li>
          <li className="flex font-bold  text-center px-2 w-[120px] text-[14px] flex-1">
            Taxa
          </li>
          <li className="flex font-bold  text-center px-2 w-[120px] text-[14px] flex-1">
            Recebe
          </li>
          <li className="flex font-bold  text-center px-2 w-[120px] text-[14px] flex-1">
            Parcela
          </li>
        </ul>
{
  !isLoading ? <section>
  
  {rate?.map((item, index) => (
            <ul key={index} className="flex justify-between odd:bg-slate-100">
              <li className="flex px-2 w-[120px] text-[12px] font-normal text-zinc-800 py-[12px]">
                {item.parcela}
                {item.parcela !== "Debito" ? "X" : null}
              </li>
              <li className="flex px-2 w-[120px] text-[12px] font-normal text-zinc-800 py-[12px]">
                {item.taxa.toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
                %
              </li>
              <li className="flex px-2 w-[120px] text-[12px] font-normal text-zinc-800 py-[12px]">
                {(valueInput.initial * (1 - item.taxa / 100)).toLocaleString(
                  "pt-BR",
                  { style: "currency", currency: "BRL" }
                )}
              </li>
              <li className="flex px-2 w-[120px] text-[12px] font-normal text-zinc-800 py-[12px]">
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
  </section> : <div className="bg-blue-100 h-[350px] grid place-content-center">
<div className="flex flex-col items-center gap-2"> <LoaderCircle size={36} className="animate-spin" /> <p className="animate-pulse">Carregando Tabelas...</p></div>
  </div>
}
      </section>

      <section className="w-screen h-screen">
      
      <input type="text" className="bg-red-300" />

      </section>
    </main>
  );
}


