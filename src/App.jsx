import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { Chats } from "./views/Chats";
import { Navbar } from "./cmps/Navbar";

function App() {
  const routes = [
    {
      path: "/",
      component: <Chats />,
    },
    {
      path: "/:chatId",
      component: <Chats />,
    },
  ];

  return (
    <main className="app">
      <Router>
        <Navbar />
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
