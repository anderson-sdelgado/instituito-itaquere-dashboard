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
import Usuario from '../../../models/usuario.model';
import axios from 'axios';
import PropTypes from 'prop-types';
import * as constants from '../../../utils/constants';

function CadastrarUsuario(props) {

    const URL_CADASTRAR_USUARIO = constants.URL_BASE + constants.USUARIO;

    const [nome, setNome] = useState('');
    const [senha, setSenha] = useState('');
    const [exibirModalSucesso, setExibirModalSucesso] = useState(false);
    const [exibirModalErro, setExibirModalErro] = useState(false);
    const [messagem, setMessagem] = useState('');

    async function salvarUsuario(event){
        try {
            event.preventDefault();
            const novoUsuario = new Usuario(nome, senha);
            const formData = new FormData();
            formData.append('data', JSON.stringify(novoUsuario));
            formData.append('method', 'post');
            let { data } = await axios.post(URL_CADASTRAR_USUARIO, formData);
            if(data.status==='success'){
                setMessagem(data.response);
                setExibirModalSucesso(true);
            } else {
                setMessagem("Erro na Edição de Registro: " + data.response);
                setExibirModalErro(true);
            }
        } catch (err) {
            setMessagem("Erro na Edição de Registro: " + err.message);
            setExibirModalErro(true);
        }
    }

    function visivel() {
        return props.visivel ? 'mt-3' : 'hidden';
    }

    function handleNome(event){
        setNome(event.target.value);
    }

    function handleSenha(event){
        setSenha(event.target.value);
    }

    function handleFecharModalSucesso(){
        setExibirModalSucesso(false);
        props.handleExibirTabela();
        props.setRecarregarUsuarios(true);
    }

    function handleFecharModalErro(){
        setExibirModalErro(false);
        props.handleExibirTabela();
        props.setRecarregarUsuarios(true);
    }

    return ( 
        <div
            className={visivel()}>
            <Card >
                <Card.Header>
                    <h2>
                        Cadastrar Usuario
                    </h2>
                </Card.Header>
                <Card.Body>
                    <Container >
                        <Form 
                            onSubmit={salvarUsuario}>
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
                                    Nome:
                                </Form.Label>
                                <Col 
                                    md={10}>
                                    <Form.Control
                                        type="text"
                                        value={nome} 
                                        onChange={handleNome}
                                        required />
                                </Col>
                            </Form.Group>
                            <Form.Group
                                as={Row}
                                className="mt-2">
                                <Form.Label
                                        column
                                        md={2}>
                                    Senha:
                                </Form.Label>
                                <Col 
                                    md={10}>
                                    <Form.Control
                                        type="text"
                                        value={senha} 
                                        onChange={handleSenha}
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
                                        onClick={props.handleExibirTabela} >
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

CadastrarUsuario.propTypes = {
    visivel: PropTypes.bool.isRequired,
    handleExibirTabela: PropTypes.func.isRequired,
    setRecarregarUsuarios: PropTypes.func.isRequired,
}

export default CadastrarUsuario;