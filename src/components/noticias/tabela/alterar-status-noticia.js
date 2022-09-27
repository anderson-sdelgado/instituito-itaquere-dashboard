import {
    useState,
} from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  
    faThumbsUp,
    faThumbsDown,
} from '@fortawesome/free-solid-svg-icons';
import { 
    Button,
    Modal
} from 'react-bootstrap';
import axios from 'axios';
import Noticia from '../../../models/noticia.model';
import * as constants from '../../../utils/constants';

function AlterarStatusNoticia(props) {

    const URL_REMOVER_NOTICIA =  constants.URL_BASE + constants.NOTICIA + '/';

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

    function descricaoStatus() {
        return props.noticia.status === 'S' ? 'desativar' : 'ativar';
    }

    function iconStatus() {
        return props.noticia.status === 'S' ? faThumbsUp: faThumbsDown;
    }

    async function handleRemoverTarefa(event){
        event.preventDefault();
        try {
            let status = props.noticia.status === 'S' ? 'N' : 'S'
            const novaNoticia = new Noticia('', '', status);
            const formData = new FormData();
            formData.append('data', JSON.stringify(novaNoticia));
            formData.append('method', 'status');
            let { data } = await axios.post(URL_REMOVER_NOTICIA + props.noticia.codigo, formData);
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
                className={'btn btn-light btn-sm'}
                onClick={handleAbrirModal} >
                <FontAwesomeIcon icon={iconStatus()} />
            </Button>
            <Modal 
                show={exibirModal} 
                onHide={handleFecharModal} 
                data-testid="modal" >
                <Modal.Header closeButton>
                    <Modal.Title>
                        Remover tarefa
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Deseja realmente {descricaoStatus()} a noticia?
                    <br />
                    <strong>{props.noticia.titulo}</strong>
                </Modal.Body>
                <Modal.Footer>
                    <Button 
                        variant="primary" 
                        onClick={handleRemoverTarefa}
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

AlterarStatusNoticia.propTypes = {
    noticia: PropTypes.object.isRequired,
    setRecarregarNoticias: PropTypes.func.isRequired,
}

export default AlterarStatusNoticia;