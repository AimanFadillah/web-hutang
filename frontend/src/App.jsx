import { BrowserRouter, Route } from "react-router-dom"
import { useEffect, useState } from "react"
import Page404 from "./pages/404";
import DataContext from "./variabels/Context.js"
import Middleware from "./components/Midleware.jsx"
import UserFunction from "./functions/UserFuntion.js";
import Utama from "./pages/Utama.jsx";
import LoadingBar from "./components/LoadingBar.jsx";

export default function App () {
  const [user,setUser] = useState(true);
  const userFunction = new UserFunction(user,setUser);

  const globalVariabel = {
    checkStatus:userFunction.checkStatus,
  }

  return <BrowserRouter>
    <DataContext.Provider value={globalVariabel} >
      <LoadingBar />

      <Middleware next={user} >
        <Route path="/" element={<Utama />} />
        <Route path="*" element={<Page404 />} />
      </Middleware>

    </DataContext.Provider>
  </BrowserRouter>
}