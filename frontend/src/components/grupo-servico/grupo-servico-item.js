import React from 'react';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrashAlt, FaEye } from 'react-icons/fa';
export default function GrupoServicoItem({ value: grupoServico }) {

  return (
    <tr>
      <td className="text-center">{grupoServico.id}</td>
      <td>{grupoServico.nome}</td>
      <td>{grupoServico.sigla}</td>
      <td>{grupoServico.descricao}</td>
      <td style={{width: '100px'}} className="px-2 text-center">
        <div style={{display:'flex', justifyContent: 'center', alignItems: 'space-between'}}>
          <Link to={`edit/${grupoServico.id}`} style={{flex:1}}><FaEdit /></Link>
          <Link to={`detail/${grupoServico.id}`} style={{flex:1}}><FaEye /></Link>
          <Link to={`delete/${grupoServico.id}`} style={{flex:1}}><FaTrashAlt /></Link>
        </div>
      </td>
    </tr>
  )
}