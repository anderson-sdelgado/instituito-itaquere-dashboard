import { useState } from 'react';
import { 
    faEdit, 
    faPlus,
    faTrashAlt
} from '@fortawesome/free-solid-svg-icons';
import { 
    Button,
    Modal
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import axios from 'axios';
import DownDocumento from './down-documento';
import UpDocumento from './up-documento';
import DownSecao from './down-secao';
import UpSecao from './up-secao';

function ItensBalancetes(props) {

    let key = 0;

    const API_URL_REMOVER_DOCUMENTO = 'http://www.institutoitaquere.org.br/restful/documento/';
    const API_URL_REMOVER_SECAO = 'http://www.institutoitaquere.org.br/restful/secao/';

    const [exibirModal, setExibirModal] = useState(false);
    const [exibirModalSucesso, setExibirModalSucesso] = useState(false);
    const [exibirModalErro, setExibirModalErro] = useState(false);
    const [messagem, setMessagem] = useState('');
    const [tipoRemocao, setTipoRemocao] = useState(0);
    const [codigoRemocao, setCodigoRemocao] = useState(0);
    const [descricaoRemocao, setDescricaoRemocao] = useState('');
    const [descricaoItemRemocao, setDescricaoItemRemocao] = useState('');

    async function handleRemoverDocumento(){
        try {
            let { data } = await axios.delete(API_URL_REMOVER_DOCUMENTO + codigoRemocao);
            setExibirModal(false);
            if(data.status==='success'){
                setMessagem(data.response);
                setExibirModalSucesso(true);
            } else {
                setMessagem("Erro na Exclusão do Registro Documento: " + data.response);
                setExibirModalErro(true);
            }
        } catch(err) {
            setExibirModal(false);
            setMessagem("Erro na Exclusão do Registro Documento: " + err.message);
            setExibirModalErro(true);
        }
    }

    async function handleRemoverSecao(){
        try {
            let { data } = await axios.delete(API_URL_REMOVER_SECAO + codigoRemocao);
            setExibirModal(false);
            if(data.status==='success'){
                setMessagem(data.response);
                setExibirModalSucesso(true);
            } else {
                setMessagem("Erro na Exclusão do Registro Secao: " + data.response);
                setExibirModalErro(true);
            }
        } catch(err) {
            setExibirModal(false);
            setMessagem("Erro na Exclusão do Registro Secao: " + err.message);
            setExibirModalErro(true);
        }
    }

    function handleRemover(event){
        event.preventDefault();
        if(tipoRemocao === 1){
            handleRemoverSecao();
        } else {
            handleRemoverDocumento();
        }
    }

    function visivel() {
        return props.visivel ? null : 'hidden';
    }

    function handleExibirCadastrarSecao(event, codParenteSecao, caminho, nivel){
        event.preventDefault();
        props.handleExibirCadastrarSecao(codParenteSecao, caminho, nivel);
    }

    function handleExibirEditarSecao(event, secao){
        event.preventDefault();
        props.handleExibirEditarSecao(secao);
    }

    function handleExibirCadastrarDocumento(event, codParenteSecao, caminho, nivel){
        event.preventDefault();
        props.handleExibirCadastrarDocumento(codParenteSecao, caminho, nivel);
    }

    function handleExibirEditarDocumento(event, secao, caminho){
        event.preventDefault();
        props.handleExibirEditarDocumento(secao, caminho);
    }

    function handleAbrirModalSecao(event, secao){
        event.preventDefault();
        setTipoRemocao(1);
        setCodigoRemocao(parseInt(secao.codigo));
        setDescricaoRemocao('Seção');
        setDescricaoItemRemocao(secao.descricao);
        setExibirModal(true);
    }

    function handleAbrirModalDocumento(event, documento){
        event.preventDefault();
        setTipoRemocao(2);
        setCodigoRemocao(parseInt(documento.codigo));
        setDescricaoRemocao('Documento');
        setDescricaoItemRemocao(documento.descricao);
        setExibirModal(true);
    }

    function handleFecharModal(){
        setExibirModal(false);
    }

    function handleFecharModalSucesso(){
        setExibirModalSucesso(false);
        props.setCarregarBalancetes(true);
    }

    function handleFecharModalErro(){
        setExibirModalErro(false);
        props.setCarregarBalancetes(true);
    }

    function gerarItemSecao(codigo, nivel){
        let listSecao = [];
        listSecao = props.secoes.filter(secao => {
            return ((parseInt(secao.nivel) === nivel) && (parseInt(secao.codparente) === codigo));
        });
        let items = [];
        listSecao.map(secao => {
            items.push(gerarDescrSecao(secao));
            items.push(gerarSecao(secao));
        });
        return(items);
    }

    function gerarSecao(secao){
        return(
            <ul key={key++}>
                {gerarItemCadastro(secao)}
                {gerarDocumento(secao)}
                {gerarItemSecao(parseInt(secao.codigo), (parseInt(secao.nivel) + 1))}
            </ul>
        );
    }

    function gerarDocumento(secao){
        let items = [];
        props.documentos.map(documento => {
            if(parseInt(documento.secao) === parseInt(secao.codigo)){
                items.push(gerarDescrDocumento(secao, documento));
            }
        });
        return(items);
    }

    function gerarDescrSecao(secao) {
        return(
            <li key={key++} className="mb-1">
                <b>{secao.descricao}</b>
                &nbsp;
                <FontAwesomeIcon 
                    className={'btn btn-outline-primary btn-sm'}
                    onClick={(event) => handleExibirEditarSecao(event, secao)}
                    icon={faEdit} />
                &nbsp;
                <FontAwesomeIcon
                    className={'btn btn-danger btn-sm'}
                    onClick={(event) => handleAbrirModalSecao(event, secao)}
                    icon={faTrashAlt} />
                &nbsp;
                <UpSecao
                    secao={secao}
                    setCarregarBalancetes={props.setCarregarBalancetes} />
                &nbsp;
                <DownSecao
                    secao={secao}
                    setCarregarBalancetes={props.setCarregarBalancetes} />
            </li>
        );
    }

    function gerarDescrDocumento(secao, documento){
        return(
            <li key={key++} className="mb-1">
                {documento.descricao}
                &nbsp;
                <FontAwesomeIcon 
                    className={'btn btn-outline-primary btn-sm'}
                    onClick={(event) => handleExibirEditarDocumento(event, documento, secao.caminho)}
                    icon={faEdit} />
                &nbsp;
                <FontAwesomeIcon
                    className={'btn btn-danger btn-sm'}
                    onClick={(event) => handleAbrirModalDocumento(event, documento)}
                    icon={faTrashAlt} />
                &nbsp;
                <UpDocumento
                    documento={documento}
                    setCarregarBalancetes={props.setCarregarBalancetes} />
                &nbsp;
                <DownDocumento
                    documento={documento}
                    setCarregarBalancetes={props.setCarregarBalancetes} />
            </li>
        );
    }

    function gerarItemCadastro(secao){
        if(parseInt(secao.nivel) < 4){
            return (<li key={key++} className="mb-1">
                    <Button 
                        className={'btn btn-success btn-sm'}
                        onClick={(event) => handleExibirCadastrarSecao(event, secao.codigo, secao.caminho, secao.nivel)} >
                        <FontAwesomeIcon 
                            icon={faPlus} />
                        &nbsp;
                        Nova Secao 
                    </Button>
                    &nbsp;
                    <Button 
                        className={'btn btn-success btn-sm'}
                        onClick={(event) => handleExibirCadastrarDocumento(event, secao.codigo, secao.caminho, secao.nivel)} >
                        <FontAwesomeIcon 
                            icon={faPlus} />
                        &nbsp;
                        Novo Documento 
                    </Button>
                </li>);
        }
        else{
            return (<li key={key++} className="mb-1">
                    <Button 
                        className={'btn btn-success btn-sm'}
                        onClick={(event) => handleExibirCadastrarDocumento(event, '', '', '')} >
                        <FontAwesomeIcon 
                            icon={faPlus} />
                        &nbsp;
                        Novo Documento
                    </Button>
                </li>);
        }
    }

    function gerarItemCadastroRaiz(){
        return (<li key={key++} className="mb-1">
                <Button 
                    className={'btn btn-success btn-sm'}
                    onClick={(event) => handleExibirCadastrarSecao(event, '', '', '')} >
                    <FontAwesomeIcon 
                        icon={faPlus} />
                    &nbsp;
                    Nova Secao 
                </Button>
            </li>);
    }

    return (
        <div
            className={visivel()}>
            {gerarItemCadastroRaiz()}    
            {gerarItemSecao(0, 1)}
            <Modal 
                show={exibirModal} 
                onHide={handleFecharModal} 
                data-testid="modal" >
                <Modal.Header closeButton>
                    <Modal.Title>
                        Remover {descricaoRemocao}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Deseja realmente remover a seguinte {descricaoRemocao}?
                    <br />
                    <strong>{descricaoItemRemocao}</strong>
                </Modal.Body>
                <Modal.Footer>
                    <Button 
                        variant="primary" 
                        onClick={handleRemover}
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

ItensBalancetes.propTypes = {
    visivel: PropTypes.bool.isRequired,
    secoes: PropTypes.array.isRequired,
    documentos: PropTypes.array.isRequired,
    handleExibirCadastrarSecao: PropTypes.func.isRequired,
    handleExibirEditarSecao: PropTypes.func.isRequired,
    handleExibirCadastrarDocumento: PropTypes.func.isRequired,
    handleExibirEditarDocumento: PropTypes.func.isRequired,
    setCarregarBalancetes: PropTypes.func.isRequired,
}

export default ItensBalancetes;