import React from 'react';
import { Link } from 'react-router-dom';

export default function GrupoServicoItem({ value: grupoServico }) {
  
  return (
    <tr>
      <td className="text-center">{grupoServico.id}</td>
      <td>{grupoServico.nome}</td>
      <td>{grupoServico.sigla}</td>
      <td>{grupoServico.descricao}</td>
      <td className="text-center">
        <Link to={`/grupos-servicos/detalhe/${grupoServico.id}`}>Adicionar Serviço</Link>
        <Link to={`/grupos-servicos/detalhe/${grupoServico.id}`}>Editar</Link>
        <Link to={`/grupos-servicos/detalhe/${grupoServico.id}`}>Detalhar</Link>
        <Link to={`/grupos-servicos/detalhe/${grupoServico.id}`}>Excluir</Link>
      </td>
    </tr>
  )
}