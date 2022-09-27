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
import Usuario from '../../models/usuario.model';
import * as constants from '../../utils/constants';

function Login(props) {

    const URL_LOGIN = constants.URL_BASE + constants.USUARIO;

    const [nome, setNome] = useState('');
    const [senha, setSenha] = useState('');
    const [exibirModalErro, setExibirModalErro] = useState(false);

    async function efetuarLogin(event){
        try {
            event.preventDefault();
            const novoUsuario = new Usuario(nome, senha);
            const formData = new FormData();
            formData.append('data', JSON.stringify(novoUsuario));
            formData.append('method', 'login');
            let { data } = await axios.post(URL_LOGIN, formData);
            if(data.status === 'success'){
                sessionStorage.setItem('token', data.response);
                props.setCarregarToken(true);
            } else {
                setExibirModalErro(true);
            }
        } catch (err) {
            setExibirModalErro(true);
        }
    }

    function handleNome(event){
        setNome(event.target.value);
    }

    function handleSenha(event){
        setSenha(event.target.value);
    }

    function handleFecharModalErro(){
        setExibirModalErro(false);
    }

    return ( 
        <Container 
                fluid>
            <Card 
                className="mt-5 mx-auto"
                style={{ width: '300px' }} >
                <Card.Header>
                    <h2>
                        Log In
                    </h2>
                </Card.Header>
                <Card.Body>
                    <Container >
                        <Form 
                            onSubmit={efetuarLogin}>
                            <Form.Group
                                as={Row}
                                className="mt-2">
                                <Form.Label
                                        column
                                        md={12}>
                                    Usuario:
                                </Form.Label>
                            </Form.Group>
                            <Form.Group
                                as={Row}
                                className="mt-2">
                                <Col 
                                    md={12}>
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
                                        md={12}>
                                    Senha:
                                </Form.Label>
                            </Form.Group>
                            <Form.Group
                                as={Row}
                                className="mt-2">
                                <Col 
                                    md={12}>
                                    <Form.Control
                                        type="password"
                                        value={senha} 
                                        onChange={handleSenha}
                                        required />
                                </Col>
                            </Form.Group>
                            <Form.Group 
                                as={Row} 
                                className="mt-3">
                                <Col 
                                    className="text-start"
                                    md={6}>
                                    <Button 
                                        variant="danger" >
                                        Cancelar
                                    </Button>
                                </Col>
                                <Col 
                                    className="text-end"
                                    md={6}>
                                    <Button 
                                        variant="primary" 
                                        type="submit">
                                        Acessar
                                    </Button>
                                </Col>
                            </Form.Group>
                        </Form>
                    </Container>
                </Card.Body>
            </Card>
            <Modal 
                show={exibirModalErro} 
                onHide={handleFecharModalErro}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Erro
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Acesso Negado! Por favor, verifique o usuário e a senha digitados.
                </Modal.Body>
                <Modal.Footer>
                    <Button 
                        variant="warning"
                        onClick={handleFecharModalErro}>
                        Fechar
                    </Button>
                </Modal.Footer>
            </Modal>
        </ Container>
    );
}

Login.propTypes = {
    setCarregarToken: PropTypes.func.isRequired
}

export default Login;