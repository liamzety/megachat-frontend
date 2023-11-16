import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./views/Home";
import { Rooms } from "./views/Rooms";
import { Room } from "./views/Room";

function App() {
  const routes = [
    {
      path: "/",
      component: <Home />,
    },
    {
      path: "/rooms",
      component: <Rooms />,
    },
    {
      path: "/rooms/:roomId",
      component: <Room />,
    },
  ];

  return (
    <main className="app">
      <Router>
        <Routes>
          {routes.map((route) => (
            <Route
              key={route.path}
              exact
              element={route.component}
              path={route.path}
            />
          ))}
        </Routes>
      </Router>
    </main>
  );
}

export default App;
