import React, { Suspense } from 'react';
import { Route, Link, Routes } from 'react-router-dom';
import GrupoServicoDetalhe from '../grupos-servicos/grupo-servico-detalhe';
import GrupoServicoLista from '../grupos-servicos/grupo-servico-lista';

function App() {
  return (
    <>
      <nav>
        <ul>
          <li><Link to="/grupos-servicos">Lista de Grupos de Serviços</Link></li>
          <li><Link to="/grupos-servicos/detalhe/1">Grupo de Serviço 1</Link></li>
          <li><Link to="/grupos-servicos/detalhe/2">Grupo de Serviço 2</Link></li>
          <li><Link to="/grupos-servicos/detalhe/3">Grupo de Serviço 3</Link></li>
        </ul>
      </nav>
      <main>
        <Suspense fallback={<div>Carregando...</div>}>
          <Routes>
            <Route path="/grupos-servicos" element={<GrupoServicoLista/>} />
            <Route path="/grupos-servicos/detalhe/:id" element={<GrupoServicoDetalhe/>} />
          </Routes>
        </Suspense>
      </main>
    </>
  );
}

export default App;
