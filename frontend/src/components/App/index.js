import React, { Suspense, useEffect } from 'react';
import { Route, Link, Routes } from 'react-router-dom';
import GrupoServicoDetalhe from '../grupos-servicos/grupo-servico-detalhe';
import GrupoServicoLista from '../grupos-servicos/grupo-servico-lista';

import socketIOClient from "socket.io-client";
import DashBoard from '../dashboard';
const ENDPOINT = "http://localhost:3333";

function App() {
  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on("message", data => {
      console.log("Mensagem recebida do socket: " + data);
    });
  }, []);

  return (
    <>
      <nav>
        <ul>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/grupos-servicos">Lista de Grupos de Serviços</Link></li>
          <li><Link to="/grupos-servicos/detalhe/1">Grupo de Serviço 1</Link></li>
          <li><Link to="/grupos-servicos/detalhe/2">Grupo de Serviço 2</Link></li>
          <li><Link to="/grupos-servicos/detalhe/3">Grupo de Serviço 3</Link></li>
        </ul>
      </nav>
      <main>
        <Suspense fallback={<div>Carregando...</div>}>
          <Routes>
          <Route path="/dashboard" element={<DashBoard />} />
            <Route path="/grupos-servicos" element={<GrupoServicoLista />} />
            <Route path="/grupos-servicos/detalhe/:id" element={<GrupoServicoDetalhe />} />
          </Routes>
        </Suspense>
      </main>
    </>
  );
}

export default App;
