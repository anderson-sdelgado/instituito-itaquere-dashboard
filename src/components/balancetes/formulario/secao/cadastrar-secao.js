import {
    useState,
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
import Secao from '../../../../models/secao.model';

function CadastrarSecao(props) {

    const URL_CADASTRAR_SECAO = 'http://www.institutoitaquere.org.br/restful/secao';

    const [descricaoSecao, setDescricaoSecao] = useState('');
    const [messagem, setMessagem] = useState('');
    const [exibirModal, setExibirModal] = useState(false);
    const [exibirModalErro, setExibirModalErro] = useState(false);

    async function salvarSecao(event){
        try {
            event.preventDefault();
            let codParenteSecao = '0';
            let nivel = 1;
            if(props.codParenteSecao !== ''){
                codParenteSecao = props.codParenteSecao;
                nivel = parseInt(props.nivel) + 1;
            }
            const novaSecao = new Secao(codParenteSecao, descricaoSecao, nivel, '');
            const formData = new FormData();
            formData.append('data', JSON.stringify(novaSecao));
            formData.append('method', 'post');
            console.log(JSON.stringify(novaSecao));
            let { data } = await axios.post(URL_CADASTRAR_SECAO, formData);
            if(data.status==='success'){
                setMessagem(data.response);
                setExibirModal(true);
            } else {
                setMessagem("Erro na Criação de Novo Registro: " + data.response);
                setExibirModalErro(true);
            }
        } catch (err) {
            setMessagem("Erro na Criação de Novo Registro: " + err.message);
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
        setDescricaoSecao(event.target.value);
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
                        Cadastrar Seção
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
                                    {props.caminho}
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
                                        value={descricaoSecao} 
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

CadastrarSecao.propTypes = {
    visivel: PropTypes.bool.isRequired,
    codParenteSecao: PropTypes.string.isRequired,
    caminho: PropTypes.string.isRequired,
    nivel: PropTypes.string.isRequired,
    setCarregarBalancetes: PropTypes.func.isRequired,
    handleExibirItensBalancete: PropTypes.func.isRequired,
}

export default CadastrarSecao;