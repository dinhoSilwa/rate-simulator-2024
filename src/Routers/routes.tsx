import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TablePage from "../componentes/table";
import { GetRate } from "../componentes/GetRate";
import { HomePage } from "../componentes/Home";

 const routerList = [
  { path: "/", element: <HomePage /> },
  { path: "/simulador-de-taxas", element: <TablePage /> },
  { path: "/achar-taxa-aplicada", element: <GetRate /> },

];

export const AppRoute = () => {
  return (
    <>
      <Router>
        <Routes>
          {routerList.map((item) => (
            <>
              <Route path={item.path} element={item.element}></Route>
            </>
          ))}
        </Routes>
      </Router>
    </>
  );
};
