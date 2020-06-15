import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import GrupoServicoDetail from '../grupo-servico/grupo-servico-detail';
import ErrorBoundary from '../shared/ErrorBoundary';
import GrupoServicoLista from '../grupo-servico/grupo-servico-list';
import { Routes, Route, NavLink, Link } from 'react-router-dom';

export default function App() {
    return (
        <div className="container-fluid">
            <header>
                <h2>SAT - Sistema de Atendimentos</h2>
            </header>
            <nav>
                <Link to="grupos-servicos">Grupos de Serviços</Link><br />
                <Link to="grupos-servicos/detail/1">Detalhe do grupo de serviço 1</Link><br />
            </nav>
            <main>
                <Routes>
                    <ErrorBoundary>
                        <React.Suspense fallback={<div>Carregando Grupo de Serviço...</div>}>
                            <Route path="/grupos-servicos" element={<GrupoServicoLista />} />
                        </React.Suspense>
                    </ErrorBoundary>
                    <ErrorBoundary>
                        <React.Suspense fallback={<div>Carregando Grupo de Serviço...</div>}>
                            <Route path="grupos-servicos/detail/:id" element={<GrupoServicoDetail />} />
                        </React.Suspense>
                    </ErrorBoundary>
                </Routes>
            </main>
            <footer>Rodapé</footer>
        </div>
    );
}
