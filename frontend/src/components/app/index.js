import React, { useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import GrupoServicoDetail from '../grupo-servico/grupo-servico-detail';
import GrupoServicoLista from '../grupo-servico/grupo-servico-list';
import { Routes, Route, Link } from 'react-router-dom';
import Home from '../home';
import GrupoServicoForm from '../grupo-servico/grupo-servico-form';
import { FaSearch } from 'react-icons/fa';
import { DiHtml5, DiCss3, DiJavascript } from 'react-icons/di';

import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { ProgressSpinner } from 'primereact/progressspinner';
import { useRecoilState } from 'recoil';
import { selectedMenuState} from '../../states/global';

export default function App() {

    const Menu = () => {
        const [selectedMenu, setSelectedMenu] = useRecoilState(selectedMenuState);
        const senhaRef = useRef(null);

        function pesquisarSenha(e) {
            console.log("Pesquisando pela senha");
        }

        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary py-1">
                <Link className="navbar-brand" to="/">SAT</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <Link to="home" className="nav-link active">Home <span className="sr-only">(current)</span></Link>
                        </li>
                        <li className="nav-item">
                            <Link to="grupos-servicos" className="nav-link">Grupos de Serviços</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="grupos-servicos/novo" className="nav-link">Novo Grupo de Serviço</Link>
                        </li>
                    </ul>
                    <form id="form-pesquisa-senha" className="form-inline my-2 my-lg-0" onSubmit={pesquisarSenha}>
                        <input id="senha-pesquisa" ref={senhaRef} className="form-control mr-sm-2" type="search" placeholder="Senha" aria-label="Search" />
                        <button id="brn-pesquisa-senha" type="submit" className="btn btn-success my-2 my-sm-0"><FaSearch /> Pesquisar</button>
                    </form>
                </div>
            </nav>
        );
    }
    return (
        <>
            <header>
                <Menu />
            </header>
            <main className="py-2 bg-light">
                <div className="container">
                    <React.Suspense fallback={<div style={{flex: 1, display:'flex', justifyContent:'center', alignItems:'center'}}> <ProgressSpinner/></div>}>
                        <Routes>
                            <Route path="/grupos-servicos" element={<GrupoServicoLista />} />
                            <Route path="grupos-servicos/novo" element={<GrupoServicoForm mode="new"/>} />
                            <Route path="grupos-servicos/edit/:id" element={<GrupoServicoForm mode="edit"/>} />
                            <Route path="grupos-servicos/detail/:id" element={<GrupoServicoDetail mode="detail" />} />
                            <Route path="grupos-servicos/delete/:id" element={<GrupoServicoDetail mode="delete" />} />
                            <Route path="home" element={<Home />} />
                            <Route path="/" element={<Home />} />
                        </Routes>
                    </React.Suspense>
                </div>
            </main>
            <footer>
                <nav className="py-0 navbar navbar-dark fixed-bottom bg-primary">
                    <div className="navbar-text">Todos os Direitos Reservados</div>
                    <div className="navbar-text">
                        <DiHtml5 size="28px" title="HTML 5" />&nbsp;
                        <DiCss3 size="28px" title="CSS 3" />&nbsp;
                        <DiJavascript size="28px" title="JavaScript" />
                    </div>
                    <div className="navbar-text">{new Date().toLocaleString()}</div>
                </nav>
            </footer>
        </>
    );
}
