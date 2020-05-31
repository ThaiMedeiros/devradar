import React, { useState, useEffect } from "react";
import api from "./services/api";

//arquivos css
import "./global.css";
import "./App.css";
import "./Sidebar.css";
import "./Main.css";

//importando componentes
import DevItem from "./components/DevItem";
import DevForm from "./components/DevForm";

/**
 * Conceitos importantes do React:
 * Componente (Criados através de funções): Bloco isolado de HTML, CSS e JS, o qual não interfere no restante da aplicação;
 * Propriedade (Atributos HTML): Informações que o componente PAI passa para o componente FILHO;
 * Estado (Informação a ser manipulada): Informações mantidas pelo componente (Lembrar: conceito de imutabilidade).
 */

// <></> (Fragment): quando se deseja incluir um bloco de código é necessário um container em volta.
// Toda função própria de um componente, é criada dentro dele mesmo.

function App() {
  const [devs, setDevs] = useState([]);

  //listando todos os devs
  useEffect(() => {
    async function loadDevs() {
      const response = await api.get("/devs");

      setDevs(response.data);
    }

    loadDevs();
  }, []);

  //Cadastrando o Dev
  async function handleAddDev(data) {
    const response = await api.post("/devs", data);

    //inserindo dev no final do array (primeiro copia tudo o que tem dentro, e depois o coloca no final)
    setDevs([...devs, response.data]);
  }

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev} />
      </aside>

      <main>
        <ul>
          {devs.map((dev) => (
            //o primeiro elemento dentro do map precisa que a propriedade key seja setada e tem que ser única
            <DevItem key={dev._id} dev={dev} />
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
