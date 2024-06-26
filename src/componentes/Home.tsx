import { BadgePercent, Percent } from "lucide-react"
import { Link } from "react-router-dom"

const menuList  = {
  list : [
    {name : "Simulador de Vendas", icons : <BadgePercent />, link : "simulador-de-taxas"},
    // {name : "Comparar Economia", icons : <PiggyBank />, link :"comparativo-de-economia"},
    {name : "Achar Taxa Aplicada", icons : <Percent />, link :"achar-taxa-aplicada"},

  ]
} 

export const HomePage = () =>{
  return(
    <>
    <main>
      <nav className="flex flex-col items-center justify-center gap-2 h-screen">
{
  menuList.list.map(({name, icons, link}, index) =>(
    <Link to={link} key={index} className="flex gap-2 bg-blue-200 py-2 px-4 items-center h-20 justify-center w-[320px] rounded-md">
            <div>{icons}</div>
            <div>{name}</div>

      </Link>
  ))
}
      </nav>
    </main>
    </>
  )
}