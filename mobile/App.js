import React from "react";
import { StatusBar } from "react-native";

//rotas da aplicação
import Routes from "./src/routes";

export default function App() {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7D40E7" />
      <Routes />
    </>
  );
}
