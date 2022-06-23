import { useState } from "react";
import { useEffect } from "react";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import "./App.css";
import Detail from "./Components/Detail";
import Header from "./Components/Header";
import Home from "./Components/Home";
import Login from "./Components/Login";
import { disneyData } from "./Data/DisneyRawContents";
import { useSelector } from "react-redux";
import { selectUserName } from "./feature/user/userSlice";
import FromAws from "./Components/FromAws";

function App() {
  const userName = useSelector(selectUserName);
  const [recommendss, setrecommends] = useState([]);
  const [originalss, setoriginals] = useState([]);
  const [newDisneyss, setnewDisneys] = useState([]);
  const [trendings, settrending] = useState([]);

  let recommends = [];
  let newDisneys = [];
  let originals = [];
  let trending = [];
  let id = 0;

  useEffect(() => {
    setrecommends([]);
    setnewDisneys([]);
    settrending([]);
    setoriginals([]);

    disneyData.map((item) => {
      id = id + 1;
      let items = { ...item, ...{ id: id } };
      switch (item.type) {
        case "recommend":
          recommends.push(items);
          break;
        case "new":
          newDisneys.push(items);
          break;
        case "trending":
          trending.push(items);
          break;
        case "original":
          originals.push(items);
          break;
      }
    });
    setrecommends(recommends);
    setnewDisneys(newDisneys);
    settrending(trending);
    setoriginals(originals);
  }, [userName]);

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Login />
              </>
            }
          />
          <Route
            path="/home/"
            element={
              <>
                <Home
                  recommendss={recommendss}
                  newDisneyss={newDisneyss}
                  trendings={trendings}
                  originalss={originalss}
                />
              </>
            }
          />
          <Route
            path="/detail/:id"
            element={
              <>
                <Detail
                  recommendss={recommendss}
                  newDisneyss={newDisneyss}
                  trendings={trendings}
                  originalss={originalss}
                />
              </>
            }
          />
          <Route
            path="/fromAWS/"
            element={
              <>
                <FromAws />
              </>
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
