import React from 'react';
import { useParams } from 'react-router-dom';
import { grupoServicoState } from '../../recoil/atoms';
import { useRecoilValueLoadable } from 'recoil';
import { Grid, Paper, TextField } from '@material-ui/core';
import useStyles from '../App/styles';
import Title from '../Title';

function GrupoServicoForm() {
    const classes = useStyles();
    const { id } = useParams('id');
    const grupoServicoLoadable = useRecoilValueLoadable(grupoServicoState(id));
    switch (grupoServicoLoadable.state) {
        case 'hasValue':
            const grupoServico = grupoServicoLoadable.contents;
            return (
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
                            <Title>Grupo de Serviço</Title>
                            <Grid container spacing={1}>
                                <Grid item xs={12} sm={6} xl={6}>
                                    <TextField id="standard-basic" label="Nome" value={grupoServico.nome} disabled aria-readonly fullWidth />
                                </Grid>
                                <Grid item xs={12} sm={3} xl={3}>
                                    <TextField id="standard-basic" label="Sigla" value={grupoServico.sigla} disabled aria-readonly fullWidth />
                                </Grid>
                                <Grid item xs={12} sm={3} xl={3}>
                                    <TextField id="standard-basic" label="Ativo" value={grupoServico.ativo ? "Sim" : "Não"} disabled aria-readonly fullWidth />
                                </Grid>
                                <Grid item xs={12} sm={12} xl={12}>
                                    <TextField id="standard-basic" label="Descrição" value={grupoServico.descricao} disabled aria-readonly fullWidth />
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            );
        case 'loading':
            return <div>Carregando...</div>
        case 'hasError':
            throw new Error('Erro ao obter grupo de serviço pelo id');
        default:
    }
}

export default GrupoServicoDetalhe;