import {
    useState,
    useEffect,
} from 'react';
import Cabecalho from '../../utils/cabecalho';
import Menu from '../../utils/menu';
import ItensBalancetes from './lista/itens-balancetes';
import { 
    Container,
    Row,
    Col,
} from 'react-bootstrap';
import axios from 'axios';
import Documento from '../../models/documento.model';
import Secao from '../../models/secao.model';
import CadastrarSecao from './formulario/secao/cadastrar-secao';
import EditarSecao from './formulario/secao/editar-secao';
import CadastrarDocumento from './formulario/documento/cadastrar-documento';
import EditarDocumento from './formulario/documento/editar-documento';
import * as constants from '../../utils/constants';

function Balancetes() {

    const URL_LISTAR_SECAO = constants.URL_BASE + constants.SECAO;
    const URL_LISTAR_DOCUMENTO = constants.URL_BASE + constants.DOCUMENTO;

    const [secoes, setSecoes] = useState([]);
    const [documentos, setDocumentos] = useState([]);
    const [secao, setSecao] = useState(new Secao());
    const [documento, setDocumento] = useState(new Documento());
    const [codParenteSecao, setCodParenteSecao] = useState('');
    const [caminho, setCaminho] = useState('');
    const [nivel, setNivel] = useState('');
    const [carregarBalancetes, setCarregarBalancetes] = useState(true);
    const [exibirItens, setExibirItens] = useState(true);
    const [exibirCadastrarSecao, setExibirCadastrarSecao] = useState(false);
    const [exibirEditarSecao, setExibirEditarSecao] = useState(false);
    const [exibirCadastrarDocumento, setExibirCadastrarDocumento] = useState(false);
    const [exibirEditarDocumento, setExibirEditarDocumento] = useState(false);
    const [carregarSecao, setCarregarSecao] = useState(false);
    const [carregarDocumento, setCarregarDocumento] = useState(false);
    
    useEffect(() => {

        async function obterSecao(){
            let { data } = await axios.get(URL_LISTAR_SECAO);
            setSecoes(data.data);
        }

        async function obterDocumento(){
            let { data } = await axios.get(URL_LISTAR_DOCUMENTO);
            setDocumentos(data.data);
        }

        if(carregarBalancetes){
            obterSecao();
            obterDocumento();
            setCarregarBalancetes(false);
        }
    }, [carregarBalancetes]);

    function handleExibirItensBalancete(){
        setExibirItens(true);
        setExibirCadastrarSecao(false);
        setExibirEditarSecao(false);
        setExibirCadastrarDocumento(false);
        setExibirEditarDocumento(false);
    }

    function handleExibirCadastrarSecao(codParenteSecao, caminho, nivel){
        setCodParenteSecao(codParenteSecao);
        setCaminho(caminho);
        setNivel(nivel);
        setExibirItens(false);
        setExibirCadastrarSecao(true);
        setExibirEditarSecao(false);
        setExibirCadastrarDocumento(false);
        setExibirEditarDocumento(false);
    }

    function handleExibirEditarSecao(secao){
        setSecao(secao);
        setExibirItens(false);
        setExibirCadastrarSecao(false);
        setExibirEditarSecao(true);
        setExibirCadastrarDocumento(false);
        setExibirEditarDocumento(false);
        setCarregarSecao(true);
    }

    function handleExibirCadastrarDocumento(codParenteSecao, caminho, nivel){
        setCodParenteSecao(codParenteSecao);
        setCaminho(caminho);
        setNivel(nivel);
        setExibirItens(false);
        setExibirCadastrarSecao(false);
        setExibirEditarSecao(false);
        setExibirCadastrarDocumento(true);
        setExibirEditarDocumento(false);
    }

    function handleExibirEditarDocumento(documento, caminho){
        setDocumento(documento);
        setCaminho(caminho);
        setExibirItens(false);
        setExibirCadastrarSecao(false);
        setExibirEditarSecao(false);
        setExibirCadastrarDocumento(false);
        setExibirEditarDocumento(true);
        setCarregarDocumento(true);
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
                        <h2 
                            className="mt-3">
                            Balancetes
                        </h2>
                        <ItensBalancetes
                            visivel={exibirItens}
                            secoes={secoes}
                            documentos={documentos}
                            handleExibirCadastrarSecao={handleExibirCadastrarSecao}
                            handleExibirEditarSecao={handleExibirEditarSecao}
                            handleExibirCadastrarDocumento={handleExibirCadastrarDocumento}
                            handleExibirEditarDocumento={handleExibirEditarDocumento}
                            setCarregarBalancetes={setCarregarBalancetes} />
                        <CadastrarSecao
                            visivel={exibirCadastrarSecao}
                            codParenteSecao={codParenteSecao}
                            caminho={caminho}
                            nivel={nivel}
                            setCarregarBalancetes={setCarregarBalancetes}
                            handleExibirItensBalancete={handleExibirItensBalancete} />
                        <EditarSecao
                            visivel={exibirEditarSecao}
                            secao={secao}
                            setCarregarBalancetes={setCarregarBalancetes}
                            handleExibirItensBalancete={handleExibirItensBalancete}
                            carregarSecao={carregarSecao} 
                            setCarregarSecao={setCarregarSecao} />
                        <CadastrarDocumento
                            visivel={exibirCadastrarDocumento}
                            codParenteSecao={codParenteSecao}
                            caminho={caminho}
                            setCarregarBalancetes={setCarregarBalancetes}
                            handleExibirItensBalancete={handleExibirItensBalancete} />
                        <EditarDocumento
                            visivel={exibirEditarDocumento}
                            documento={documento}
                            caminho={caminho}
                            setCarregarBalancetes={setCarregarBalancetes}
                            handleExibirItensBalancete={handleExibirItensBalancete}
                            carregarDocumento={carregarDocumento} 
                            setCarregarDocumento={setCarregarDocumento} />
                    </Col>
                </Row>
            </Container>
        </div> 
    );
}

export default Balancetes;