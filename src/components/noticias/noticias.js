import {
    useState,
    useEffect,
} from 'react';
import Noticia from '../../models/noticia.model';
import Cabecalho from '../../utils/cabecalho';
import Menu from '../../utils/menu';
import TabelaNoticias from './tabela/tabela-noticias';
import EditarNoticia from './formulario/editar-noticia';
import CadastrarNoticia from './formulario/cadastrar-noticia';
import { 
    Container,
    Row,
    Col,
    Modal,
    Button
} from 'react-bootstrap';
import axios from 'axios';

function Noticias() {

    const API_URL_LISTAR_NOTICIAS = 'http://www.institutoitaquere.org.br/restful/noticias';

    const [exibirTabela, setExibirTabela] = useState(true);
    const [exibirEditar, setExibirEditar] = useState(false);
    const [exibirCadastrar, setExibirCadastrar] = useState(false);
    const [noticias, setNoticias] = useState([]);
    const [carregarNoticias, setCarregarNoticias] = useState(true);
    const [noticia, setNoticia] = useState(new Noticia());
    const [carregarNoticia, setCarregarNoticia] = useState(false);
    const [paginaAtual, setPaginaAtual] = useState(1);
    const [ordenar, setOrdenar] = useState(0);
    const [filtro, setFiltro] = useState('');
    const [countPage, setCountPage] = useState(3);
    const [totalItems, setTotalItems] = useState(0);
    const [messagem, setMessagem] = useState('');
    const [exibirModalErro, setExibirModalErro] = useState(false);

    useEffect(() => {

        async function obterNoticias(){
            try{
                let ordem = '';
                if(ordenar === 1){
                    ordem = 'codigo ASC';
                } else if(ordenar === 2){
                    ordem = 'codigo DESC';
                } else if(ordenar === 3){
                    ordem = 'titulo ASC';
                } else if(ordenar === 4){
                    ordem = 'titulo DESC';
                } 
                const params = `?page=${paginaAtual}&countpage=${countPage}&order=${ordem}&filter=${filtro}`;
                let { data } = await axios.get(API_URL_LISTAR_NOTICIAS + params);
                if(data.status==='success'){
                    setNoticias(data.data);
                    setTotalItems(parseInt(data.count));
                } else {
                    setMessagem(data.response);
                    setExibirModalErro(true);
                }
            } catch(err){
                setNoticias([]);
                setMessagem(err.message);
                setExibirModalErro(true);
            }
        }

        if(carregarNoticias){
            obterNoticias();
            setCarregarNoticias(false);
        }
    }, [carregarNoticias, paginaAtual, countPage, ordenar, filtro]);

    function handleExibirTabela(){
        setExibirTabela(true);
        setExibirEditar(false);
        setExibirCadastrar(false);
    }

    function handleExibirCadastrar(){
        setExibirCadastrar(true);
        setExibirTabela(false);
        setExibirEditar(false);
        setCarregarNoticia(true);
    }

    function handleExibirEditar(noticia){
        setNoticia(noticia);
        setExibirEditar(true);
        setExibirTabela(false);
        setExibirCadastrar(false);
        setCarregarNoticia(true);
    }

    function handleMudarPagina(pagina) {
        setPaginaAtual(pagina);
        setCarregarNoticias(true);
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
                        <TabelaNoticias
                            visivel={exibirTabela}
                            handleExibirCadastrar={handleExibirCadastrar}
                            handleExibirEditar={handleExibirEditar}
                            noticias={noticias}
                            setRecarregarNoticias={setCarregarNoticias}
                            totalItems={totalItems} 
                            paginaAtual={paginaAtual} 
                            handleMudarPagina={handleMudarPagina}
                            countPage={countPage}
                            setCountPage={setCountPage}
                            filtro={filtro}
                            setFiltro={setFiltro}
                            ordenar={ordenar}
                            setOrdenar={setOrdenar}/>
                        <CadastrarNoticia
                            visivel={exibirCadastrar}
                            handleExibirTabela={handleExibirTabela}
                            setRecarregarNoticias={setCarregarNoticias}
                            carregarNoticia={carregarNoticia} 
                            setCarregarNoticia={setCarregarNoticia}/>
                        <EditarNoticia
                            visivel={exibirEditar}
                            handleExibirTabela={handleExibirTabela}
                            setRecarregarNoticias={setCarregarNoticias}
                            noticia={noticia}
                            carregarNoticia={carregarNoticia} 
                            setCarregarNoticia={setCarregarNoticia}/>
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

export default Noticias;