import React from 'react';
import { useRecoilValueLoadable } from 'recoil';
import GrupoServicoItem from './grupo-servico-item';
import { gruposServicosState } from '../../recoil/atoms';
import { Grid, Paper, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import useStyles from '../App/styles';
import Title from '../Title';

function GrupoServicoLista() {
    const gruposServicosLoadable = useRecoilValueLoadable(gruposServicosState);
    const classes = useStyles();

    switch (gruposServicosLoadable.state) {
        case 'hasValue':
            const gruposServicos = gruposServicosLoadable.contents;
            return (
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <Paper className={classes.paper} style={{ height: "calc(100vh - 200px)"}}>
                            <Title>Grupos de Serviços</Title>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Nome</TableCell>
                                        <TableCell>Sigla To</TableCell>
                                        <TableCell>Ativo</TableCell>
                                        <TableCell>Descrição</TableCell>
                                        <TableCell>Ação</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {gruposServicos.map(gs => <GrupoServicoItem key={gs.id} value={gs}/>)}
                                </TableBody>
                            </Table>
                        </Paper>
                    </Grid>
                </Grid>
            );
        case 'loading':
            return <div>Carregando...</div>
        case 'hasError':
            throw new Error('Erro ao obter lista de grupos de serviços');
        default:
    }
}

export default GrupoServicoLista;