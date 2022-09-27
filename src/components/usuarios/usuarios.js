import {
    useState,
    useEffect,
} from 'react';
import Cabecalho from '../../utils/cabecalho';
import Menu from '../../utils/menu';
import TabelaUsuarios from './tabela/tabela-usuarios';
import EditarUsuario from './formulario/editar-usuario';
import CadastrarUsuario from './formulario/cadastrar-usuario';
import { 
    Container,
    Row,
    Col,
    Modal,
    Button
} from 'react-bootstrap';
import axios from 'axios';
import Usuario from '../../models/usuario.model';
import * as constants from '../../utils/constants';

function Usuarios() {

    const URL_LISTAR_USUARIOS = constants.URL_BASE + constants.USUARIO;

    const [exibirTabela, setExibirTabela] = useState(true);
    const [exibirEditar, setExibirEditar] = useState(false);
    const [exibirCadastrar, setExibirCadastrar] = useState(false);
    const [usuarios, setUsuarios] = useState([]);
    const [carregarUsuarios, setCarregarUsuarios] = useState(true);
    const [usuario, setUsuario] = useState(new Usuario());
    const [carregarUsuario, setCarregarUsuario] = useState(false);
    const [paginaAtual, setPaginaAtual] = useState(1);
    const [ordenar, setOrdenar] = useState(0);
    const [filtro, setFiltro] = useState('');
    const [countPage, setCountPage] = useState(3);
    const [totalItems, setTotalItems] = useState(0);
    const [messagem, setMessagem] = useState('');
    const [exibirModalErro, setExibirModalErro] = useState(false);

    useEffect(() => {

        async function obterUsuarios(){
            try{
                let ordem = '';
                if(ordenar === 1){
                    ordem = 'codigo ASC';
                } else if(ordenar === 2){
                    ordem = 'codigo DESC';
                } else if(ordenar === 3){
                    ordem = 'nome ASC';
                } else if(ordenar === 4){
                    ordem = 'nome DESC';
                } 
                const params = `?page=${paginaAtual}&countpage=${countPage}&order=${ordem}&filter=${filtro}`;
                let { data } = await axios.get(URL_LISTAR_USUARIOS + params);
                if(data.status==='success'){
                    setUsuarios(data.data);
                    setTotalItems(parseInt(data.count));
                } else {
                    setMessagem(data.response);
                    setExibirModalErro(true);
                }
            } catch(err){
                setUsuarios([]);
                setMessagem(err.message);
                setExibirModalErro(true);
            }
        }

        if(carregarUsuarios){
            obterUsuarios();
            setCarregarUsuarios(false);
        }
    }, [carregarUsuarios, paginaAtual, countPage, ordenar, filtro]);

    function handleExibirTabela(){
        setExibirTabela(true);
        setExibirEditar(false);
        setExibirCadastrar(false);
    }

    function handleExibirCadastrar(){
        setExibirCadastrar(true);
        setExibirTabela(false);
        setExibirEditar(false);
    }

    function handleExibirEditar(usuario){
        setUsuario(usuario);
        setCarregarUsuario(true);
        setExibirEditar(true);
        setExibirTabela(false);
        setExibirCadastrar(false);
    }

    function handleMudarPagina(pagina) {
        setPaginaAtual(pagina);
        setCarregarUsuarios(true);
    }

    function handleFecharModalErro(){
        setExibirModalErro(false);
    }

    return ( 
        <div>
            <Cabecalho />
            <Container 
                fluid>
                <Row>
                    <Col 
                        md={2}
                        className="vh-100" >
                        <Menu />
                    </Col>
                    <Col md={10} >
                        <TabelaUsuarios
                            visivel={exibirTabela}
                            handleExibirCadastrar={handleExibirCadastrar}
                            handleExibirEditar={handleExibirEditar}
                            usuarios={usuarios}
                            setRecarregarUsuarios={setCarregarUsuarios}
                            totalItems={totalItems} 
                            paginaAtual={paginaAtual} 
                            handleMudarPagina={handleMudarPagina}
                            countPage={countPage}
                            setCountPage={setCountPage}
                            filtro={filtro}
                            setFiltro={setFiltro}
                            ordenar={ordenar}
                            setOrdenar={setOrdenar}/>
                        <CadastrarUsuario
                            visivel={exibirCadastrar}
                            handleExibirTabela={handleExibirTabela}
                            setRecarregarUsuarios={setCarregarUsuarios}/>
                        <EditarUsuario
                            visivel={exibirEditar}
                            handleExibirTabela={handleExibirTabela}
                            setRecarregarUsuarios={setCarregarUsuarios}
                            usuario={usuario}
                            carregarUsuario={carregarUsuario} 
                            setCarregarUsuario={setCarregarUsuario}/>
                    </Col>
                </Row>
            </Container>
            <Modal 
                show={exibirModalErro} 
                onHide={handleFecharModalErro}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Erro
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Erro ao buscar Notícias: {messagem}
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

export default Usuarios;