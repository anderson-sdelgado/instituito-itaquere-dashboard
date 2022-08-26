import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faEdit,
} from '@fortawesome/free-solid-svg-icons';
import { 
    Button
} from 'react-bootstrap';
import RemoverUsuario from './remover-usuario';

function ItensTabelaUsuarios(props) {

    function handleEditarUsuario(event, usuario){
        event.preventDefault();
        props.handleExibirEditar(usuario)
    }

    return ( 
        props.usuarios.map(usuario => 
            <tr 
                key={usuario.codigo}>
                <td className="align-middle"
                    style={{ textAlign: 'center' }}>
                    {usuario.codigo}
                </td>
                <td className="align-middle">
                    {usuario.nome}
                </td>
                <td  className="align-middle"
                    style={{ textAlign: 'center' }}>
                    <Button 
                        className={'btn btn-primary btn-sm'}
                        onClick={(event) => handleEditarUsuario(event, usuario)} >
                        <FontAwesomeIcon icon={faEdit} />
                    </Button>
                </td>
                <td className="align-middle"
                    style={{ textAlign: 'center' }}>
                    <RemoverUsuario
                        usuario={usuario}
                        setRecarregarUsuarios={props.setRecarregarUsuarios}/>
                </td>
            </tr>
        )
    );
}

ItensTabelaUsuarios.propTypes = {
    usuarios: PropTypes.array.isRequired, 
    handleExibirEditar: PropTypes.func.isRequired,
    setRecarregarUsuarios: PropTypes.func.isRequired
}

export default ItensTabelaUsuarios;