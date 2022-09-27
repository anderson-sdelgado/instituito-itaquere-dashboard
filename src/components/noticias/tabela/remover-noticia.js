import { useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  
    faTrashAlt
} from '@fortawesome/free-solid-svg-icons';
import { 
    Button,
    Modal
} from 'react-bootstrap';
import axios from 'axios';
import * as constants from '../../../utils/constants';

function RemoverNoticia(props) {

    const URL_REMOVER_NOTICIA = constants.URL_BASE + constants.NOTICIA + '/';

    const [exibirModal, setExibirModal] = useState(false);
    const [exibirModalSucesso, setExibirModalSucesso] = useState(false);
    const [exibirModalErro, setExibirModalErro] = useState(false);
    const [messagem, setMessagem] = useState('');
    
    function handleAbrirModal(event){
        event.preventDefault();
        setExibirModal(true);
    }

    function handleFecharModal(){
        setExibirModal(false);
    }

    function handleFecharModalSucesso(){
        setExibirModalSucesso(false);
        props.setRecarregarNoticias(true);
    }

    function handleFecharModalErro(){
        setExibirModalErro(false);
        props.setRecarregarNoticias(true);
    }

    async function handleRemoverNoticia(event){
        event.preventDefault();
        try {
            let { data } = await axios.delete(URL_REMOVER_NOTICIA + props.noticia.codigo);
            setExibirModal(false);
            if(data.status==='success'){
                setMessagem(data.response);
                setExibirModalSucesso(true);
            } else {
                setMessagem("Erro na Exclusão do Registro: " + data.response);
                setExibirModalErro(true);
            }
        } catch(err) {
            setExibirModal(false);
            setMessagem("Erro na Exclusão do Registro: " + err.message);
            setExibirModalErro(true);
        }
    }

    return ( 
        <div>
            <Button 
                className={'btn btn-danger btn-sm'}
                onClick={handleAbrirModal} >
                <FontAwesomeIcon icon={faTrashAlt} />
            </Button>
            <Modal 
                show={exibirModal} 
                onHide={handleFecharModal} 
                data-testid="modal" >
                <Modal.Header closeButton>
                    <Modal.Title>
                        Remover Notícia
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Deseja realmente remover a seguinte notícia?
                    <br />
                    <strong>{props.noticia.titulo}</strong>
                </Modal.Body>
                <Modal.Footer>
                    <Button 
                        variant="primary" 
                        onClick={handleRemoverNoticia}
                        data-testid="btn-remover" >
                        Sim
                    </Button>
                    <Button 
                        variant="light" 
                        onClick={handleFecharModal}
                        data-testid="btn-fechar-modal" >
                        Não
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal 
                show={exibirModalSucesso} 
                onHide={handleFecharModalSucesso} >
                <Modal.Header closeButton>
                    <Modal.Title>
                        Sucesso
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {messagem}
                </Modal.Body>
                <Modal.Footer>
                    <Button 
                        variant="success"
                        onClick={handleFecharModalSucesso}>
                        Continuar
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal 
                show={exibirModalErro} 
                onHide={handleFecharModalErro}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Erro
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {messagem}
                </Modal.Body>
                <Modal.Footer>
                    <Button 
                        variant="warning"
                        onClick={handleFecharModalErro}>
                        Fechar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

RemoverNoticia.propTypes = {
    noticia: PropTypes.object.isRequired,
    setRecarregarNoticias: PropTypes.func.isRequired,
}

export default RemoverNoticia;