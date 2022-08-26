import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faEdit,
} from '@fortawesome/free-solid-svg-icons';
import { 
    Image,
    Button
} from 'react-bootstrap';
import RemoverNoticia from './remover-noticia';
import AlterarStatusNoticia from './alterar-status-noticia';

function ItensTabelaNoticias(props) {

    const URL_IMG = 'http://www.institutoitaquere.org.br/restful/img/';

    function handleEditarNoticia(event, noticia){
        event.preventDefault();
        props.handleExibirEditar(noticia)
    }

    return ( 
        props.noticias.map(noticia => 
            <tr 
                key={noticia.codigo}>
                <td className="align-middle"
                    style={{ textAlign: 'center' }}>
                    {noticia.codigo}
                </td>
                <td 
                    style={{ textAlign: 'center' }}>
                    <Image 
                        src={URL_IMG + noticia.capa}
                        thumbnail />
                </td>
                <td className="align-middle">
                    {noticia.titulo}
                </td>
                <td  className="align-middle"
                    style={{ textAlign: 'center' }}>
                    <AlterarStatusNoticia
                        noticia={noticia}
                        setRecarregarNoticias={props.setRecarregarNoticias}/>
                </td>
                <td  className="align-middle"
                    style={{ textAlign: 'center' }}>
                    <Button 
                        className={'btn btn-primary btn-sm'}
                        onClick={(event) => handleEditarNoticia(event, noticia)} >
                        <FontAwesomeIcon icon={faEdit} />
                    </Button>
                </td>
                <td className="align-middle"
                    style={{ textAlign: 'center' }}>
                    <RemoverNoticia 
                        noticia={noticia}
                        setRecarregarNoticias={props.setRecarregarNoticias}/>
                </td>
            </tr>
        )
    );
}

ItensTabelaNoticias.propTypes = {
    noticias: PropTypes.array.isRequired, 
    handleExibirEditar: PropTypes.func.isRequired,
    setRecarregarNoticias: PropTypes.func.isRequired
}

export default ItensTabelaNoticias;