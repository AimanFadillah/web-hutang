import { BrowserRouter, Route } from "react-router-dom"
import { useEffect, useState } from "react"
import Page404 from "./pages/404";
import DataContext from "./variabels/Context.js"
import Middleware from "./components/Midleware.jsx"
import UserFunction from "./functions/UserFuntion.js";
import Utama from "./pages/Utama.jsx";
import LoadingBar from "./components/LoadingBar.jsx";
import CreateHutang from "./pages/Create.jsx";
import EditHutang from "./pages/Edit.jsx";

export default function App () {
  const [user,setUser] = useState(true);
  const [searchToggle,setSearchToggle] = useState(false);
  const [search,setSearch] = useState("");
  const [hutangs,setHutangs] = useState();
  const [hutang,setHutang] = useState({});
  const [page,setPage] = useState(1);

  const userFunction = new UserFunction(user,setUser);

  const globalVariabel = {
    search,
    setSearch,
    searchToggle,
    setSearchToggle,
    hutangs,
    setHutangs,
    hutang,
    setHutang,
    page,
    setPage,
    checkStatus:userFunction.checkStatus,
  }

  return <BrowserRouter>
    <DataContext.Provider value={globalVariabel} >
      <LoadingBar />

      <Middleware next={user} >
        <Route path="/" element={<Utama />} />
        <Route path="/hutang" element={<CreateHutang />} />
        <Route path="/hutang/:id" element={<EditHutang />} />
        <Route path="*" element={<Page404 />} />
      </Middleware>

    </DataContext.Provider>
  </BrowserRouter>
}