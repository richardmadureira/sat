import React from 'react';

export default function GrupoServicoItem({ value: grupoServico }) {
  return (
    <tr>
      <td className="text-center">{grupoServico.id}</td>
      <td>{grupoServico.nome}</td>
      <td>{grupoServico.sigla}</td>
      <td>{grupoServico.descricao}</td>
    </tr>
  )
}