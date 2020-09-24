import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import Rodape from '../layout/rodape';

import useStyles from './styles';
import SatAppBar from '../layout/sat-app-bar';
import SatDrawer from '../layout/sat-drawer';
import { Route, Routes } from 'react-router-dom';
import GrupoServicoLista from '../grupos-servicos/grupo-servico-lista';
import GrupoServicoDetalhe from '../grupos-servicos/grupo-servico-detalhe';
import Dashboard from '../dashboard';
import Triagem from '../triagem';
import Atendimento from '../atendimento';
import Agendamento from '../agendamento';
import Login from '../autenticacao/login';
import Cadastro from '../autenticacao/cadastro';

export default function App() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <SatAppBar open={open} setOpen={setOpen} />
      <SatDrawer open={open} setOpen={setOpen} />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="xl" className={classes.container} pt={5}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/cadastro" element={<Cadastro />} />
                <Route path="/triagem" element={<Triagem />} />
                <Route path="/atendimento" element={<Atendimento />} />
                <Route path="/agendamento" element={<Agendamento />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/grupos-servicos" element={<GrupoServicoLista />} />
                <Route path="/grupos-servicos/detalhe/:id" element={<GrupoServicoDetalhe />} />
              </Routes>
            </Grid>
          </Grid>
          <Box pt={4}>
            <Rodape />
          </Box>
        </Container>
      </main>
    </div>
  );
}