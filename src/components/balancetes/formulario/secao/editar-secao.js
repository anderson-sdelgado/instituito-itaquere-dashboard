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
    Modal,
    Image
} from 'react-bootstrap';
import axios from 'axios';
import PropTypes from 'prop-types';
import Secao from '../../../../models/secao.model';

function EditarSecao(props) {

    const URL_CADASTRAR_SECAO = 'http://www.institutoitaquere.org.br/restful/secao/';

    const [messagem, setMessagem] = useState('');
    const [exibirModal, setExibirModal] = useState(false);
    const [exibirModalErro, setExibirModalErro] = useState(false);
    const [codigo, setCodigo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [caminho, setCaminho] = useState('');

    useEffect(() => {

        async function obterSecao(){
            setCodigo(props.secao.codigo);
            setDescricao(props.secao.descricao);
            setCaminho(props.secao.caminho);
        }

        if(props.carregarSecao){
            obterSecao();
            props.setCarregarSecao(false);
        }
    }, [props.carregarSecao]);

    async function salvarSecao(event){
        try {
            event.preventDefault();
            const novaSecao = new Secao(props.secao.codparente, descricao, props.secao.nivel, '');
            const formData = new FormData();
            formData.append('data', JSON.stringify(novaSecao));
            formData.append('method', 'put');
            console.log(JSON.stringify(novaSecao));
            console.log(URL_CADASTRAR_SECAO + props.secao.codigo);
            let { data } = await axios.post(URL_CADASTRAR_SECAO + props.secao.codigo, formData);
            if(data.status==='success'){
                setMessagem(data.response);
                setExibirModal(true);
            } else {
                setMessagem("Erro na Criação de Novo Registro: " + data.response);
                setExibirModalErro(true);
            }
        } catch (err) {
            setMessagem("Erro na Edição de Registro: " + err.message);
            setExibirModalErro(true);
        }
    }

    function visivel() {
        return props.visivel ? null : 'hidden';
    }

    function handleExibirItensBalancete(event){
        event.preventDefault();
        props.handleExibirItensBalancete();
        props.setCarregarBalancetes(true);
    }

    function handleDescricaoSecao(event){
        setDescricao(event.target.value);
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

    return ( 
        <div
            className={visivel()}>
            <Card >
                <Card.Header>
                    <h2>
                        Editar Seção
                    </h2>
                </Card.Header>
                <Card.Body>
                    <Container >
                        <Form 
                            onSubmit={salvarSecao} >
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
                                        value={descricao} 
                                        onChange={handleDescricaoSecao}
                                        required />
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
                        onClick={handleFecharModal}>
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

EditarSecao.propTypes = {
    visivel: PropTypes.bool.isRequired,
    secao: PropTypes.object.isRequired,
    setCarregarBalancetes: PropTypes.func.isRequired,
    handleExibirItensBalancete: PropTypes.func.isRequired,
    carregarSecao: PropTypes.bool.isRequired,
    setCarregarSecao: PropTypes.func.isRequired,
}

export default EditarSecao;