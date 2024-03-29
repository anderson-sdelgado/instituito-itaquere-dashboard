import {
    useState,
    useEffect,
} from 'react';
import { 
    Card,
    Button,
    Container,
    Row,
    Col,
    Form,
    Modal
} from 'react-bootstrap';
import axios from 'axios';
import PropTypes from 'prop-types';
import Documento from '../../../../models/documento.model';
import * as constants from '../../../../utils/constants';

function EditarDocumento(props) {

    const URL_DOC = constants.URL_BASE + constants.LOCAL_DOC;
    const URL_CADASTRAR_DOCUMENTO = constants.URL_BASE + constants.DOCUMENTO + '/';

    const [descricaoDocumento, setDescricaoDocumento] = useState('');
    const [documento, setDocumento] = useState();
    const [messagem, setMessagem] = useState('');
    const [exibirModal, setExibirModal] = useState(false);
    const [exibirModalErro, setExibirModalErro] = useState(false);
    const [codigo, setCodigo] = useState('');
    const [caminho, setCaminho] = useState('');
    const [documentoServ, setDocumentoServ] = useState('');

    useEffect(() => {

        function obterDocumento(){
            setCodigo(props.documento.codigo);
            setDescricaoDocumento(props.documento.descricao);
            setCaminho(props.caminho);
            setDocumentoServ(URL_DOC + props.documento.documento);
        }

        if(props.carregarDocumento){
            obterDocumento();
            props.setCarregarDocumento(false);
        }
    }, [props.carregarDocumento]);

    async function salvarDocumento(event){
        try {
            event.preventDefault();
            const novoDocumento = new Documento(descricaoDocumento, '', '');
            const formData = new FormData();
            formData.append('document', documento);
            formData.append('data', JSON.stringify(novoDocumento));
            formData.append('method', 'put');
            let { data } = await axios.post(URL_CADASTRAR_DOCUMENTO + codigo, formData);
            if(data.status==='success'){
                setMessagem(data.response);
                setExibirModal(true);
            } else {
                setMessagem("Erro na Criação de Novo Registro: " + data.response);
                setExibirModalErro(true);
            }
        } catch (err) {
            if(props.codNoticia === 0){
                setMessagem("Erro na Criação de Novo Registro: " + err.message);
            } else {
                setMessagem("Erro na Edição de Registro: " + err.message);
            }
            setExibirModalErro(true);
        }
    }

    function visivel() {
        return props.visivel ? null : 'hidden';
    }

    function handleExibirItensBalancete(event){
        event.preventDefault();
        props.handleExibirItensBalancete();
    }

    function handleDescricaoDocumento(event){
        setDescricaoDocumento(event.target.value);
    }

    function handleFecharModal(){
        setExibirModal(false);
        props.handleExibirItensBalancete();
        props.setCarregarBalancetes(true);
    }

    function handleFecharModalErro(){
        setExibirModalErro(false);
        props.handleExibirItensBalancete();
        props.setCarregarBalancetes(true);
    }

    function handleDocumento(event){
        setDocumento(event.target.files[0]);
    }

    return ( 
        <div
            className={visivel()}>
            <Card >
                <Card.Header>
                    <h2>
                        Editar Documento 
                    </h2>
                </Card.Header>
                <Card.Body>
                    <Container >
                        <Form 
                            onSubmit={salvarDocumento} >
                            <Form.Group
                                as={Row}>
                                <Form.Label
                                        column
                                        md={2}>
                                    Codigo:
                                </Form.Label>
                                <Form.Label
                                        column
                                        md={10}>
                                    {codigo}
                                </Form.Label>
                            </Form.Group>
                            <Form.Group
                                as={Row}
                                className="mt-2">
                                <Form.Label
                                        column
                                        md={2}>
                                    Caminho:
                                </Form.Label>
                                <Form.Label
                                        column
                                        md={10}>
                                    {caminho}
                                </Form.Label>
                            </Form.Group>
                            <Form.Group
                                as={Row}
                                className="mt-2">
                                <Form.Label
                                        column
                                        md={2}>
                                    Descrição:
                                </Form.Label>
                                <Col 
                                    md={10}>
                                    <Form.Control
                                        type="text"
                                        value={descricaoDocumento}
                                        onChange={handleDescricaoDocumento}
                                        required />
                                </Col>
                            </Form.Group>
                            <Form.Group
                                as={Row}
                                className="mt-2">
                                <Form.Label
                                        column
                                        md={2}>
                                    Documento:
                                </Form.Label>
                                <Col 
                                    md={10}>
                                    <Form.Control
                                        type="file"
                                        onChange={handleDocumento}
                                        accept="application/pdf"
                                        />
                                </Col>
                            </Form.Group>
                            <Form.Group
                                as={Row}
                                className="mt-2">
                                <Form.Label
                                        column
                                        md={2}>
                                    Documento Atual:
                                </Form.Label>
                                <Col 
                                    md={10}>
                                    <a href={documentoServ} target="_blank">
                                        {descricaoDocumento}
                                    </a>
                                </Col>
                            </Form.Group>
                            <Form.Group 
                                as={Row} 
                                className="mt-3">
                                <Col 
                                    className="text-end"
                                    md={6}>
                                    <Button 
                                        variant="danger"
                                        onClick={handleExibirItensBalancete} >
                                        Cancelar
                                    </Button>
                                </Col>
                                <Col 
                                    className="text-start"
                                    md={6}>
                                    <Button 
                                        variant="primary" 
                                        type="submit">
                                        Salvar
                                    </Button>
                                </Col>
                            </Form.Group>
                        </Form>
                    </Container>
                </Card.Body>
            </Card>
            <Modal 
                show={exibirModal} 
                onHide={handleFecharModal} >
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
                        onClick={handleFecharModal} >
                        Continuar
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal 
                show={exibirModalErro} 
                onHide={handleFecharModalErro} >
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
                        onClick={handleFecharModalErro} >
                        Fechar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

EditarDocumento.propTypes = {
    visivel: PropTypes.bool.isRequired,
    documento: PropTypes.object.isRequired,
    caminho: PropTypes.string.isRequired,
    setCarregarBalancetes: PropTypes.func.isRequired,
    handleExibirItensBalancete: PropTypes.func.isRequired,
    carregarDocumento: PropTypes.bool.isRequired,
    setCarregarDocumento: PropTypes.func.isRequired,
}

export default EditarDocumento;