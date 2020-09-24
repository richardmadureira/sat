import React from 'react';
import { TableCell, TableRow, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Visibility from '@material-ui/icons/Visibility';

export function GrupoServicoItem({ value: grupoServico }) {
  console.log(grupoServico);
  return (
    <TableRow key={grupoServico.id}>
      <TableCell>{grupoServico.nome}</TableCell>
      <TableCell>{grupoServico.sigla}</TableCell>
      <TableCell>{grupoServico.ativo? "Sim": "Não"}</TableCell>
      <TableCell><Typography noWrap>{grupoServico.descricao}</Typography></TableCell>
      <TableCell><Link title="Detalhar Grupo de Serviço" to={`/grupos-servicos/detalhe/${grupoServico.id}`}><Visibility color="primary" /></Link></TableCell>
    </TableRow>
  );
}

export default GrupoServicoItem;