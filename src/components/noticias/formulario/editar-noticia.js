import {
    useState,
    useEffect,
    useRef,
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
import Noticia from '../../../models/noticia.model';
import axios from 'axios';
import PropTypes from 'prop-types';
import GaleriaImagensServer from './galeria-imagens-server';
import GaleriaImagensUpload from './galeria-imagens-upload';

function EditarNoticia(props) {

    const URL_IMG = 'http://www.institutoitaquere.org.br/restful/img/';
    const URL_CADASTRAR_NOTICIA = 'http://www.institutoitaquere.org.br/restful/noticias';
    const API_URL_LISTAR_GALERIA = 'http://www.institutoitaquere.org.br/restful/galeria/';

    const [capa, setCapa] = useState('');
    const [galeriaServer, setGaleriaServer] = useState([]);
    const [galeriaUpload, setGaleriaUpload] = useState([]);
    const [imagem, setImagem] = useState();
    const [codigo, setCodigo] = useState('');
    const [titulo, setTitulo] = useState('');
    const [conteudo, setConteudo] = useState('');
    const [exibirModalSucesso, setExibirModalSucesso] = useState(false);
    const [exibirModalErro, setExibirModalErro] = useState(false);
    const [exibirImagens, setExibirImagens] = useState(false);
    const [qtdeGaleria, setQtdeGaleria] = useState(0);
    const [messagem, setMessagem] = useState('');

    const capaElement = useRef();
    const galeriaElement = useRef();

    useEffect(() => {

        async function obterNoticia(){
            
            setGaleriaUpload([]);
            setImagem();
            let { data } = await axios.get(API_URL_LISTAR_GALERIA + props.noticia.codigo);
            setGaleriaServer(data.data);
            setCodigo(props.noticia.codigo);
            setTitulo(props.noticia.titulo);
            setConteudo(props.noticia.conteudo);
            setCapa(URL_IMG + props.noticia.capa);
            setExibirImagens(true);
            setQtdeGaleria(data.data.length);
            capaElement.current.required = false;

            capaElement.current.value = "";
            galeriaElement.current.value = "";
        }

        if(props.carregarNoticia){
            obterNoticia();
            props.setCarregarNoticia(false);
        }
    }, [props.carregarNoticia]);

    async function salvarNoticia(event){
        try {
            event.preventDefault();
            const novaNoticia = new Noticia(conteudo, titulo);
            const formData = new FormData();
            formData.append('image', imagem);
            formData.append('data', JSON.stringify(novaNoticia));
            galeriaUpload.map((img, index) => {
                var cod = index + 1;
                formData.append('gallery' + cod, img);
            });
            formData.append('galleryserver', JSON.stringify(galeriaServer));
            formData.append('method', 'put');
            let { data } = await axios.post(URL_CADASTRAR_NOTICIA + '/' + codigo, formData);
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

    function visivelCapa() {
        return exibirImagens ? null : 'hidden';
    }

    function visivel() {
        return props.visivel ? 'mt-3' : 'hidden';
    }

    function handleImage(event){
        setImagem(event.target.files[0]);
        setExibirImagens(true);
        setCapa(URL.createObjectURL(event.target.files[0]));
    }

    function handleGallery(event){
        setGaleriaUpload(Array.from(event.target.files));
    }

    function handleTxtTitulo(event){
        setTitulo(event.target.value);
    }

    function handleTxtConteudo(event){
        setConteudo(event.target.value);
    }

    function handleFecharModalSucesso(){
        setExibirModalSucesso(false);
        props.handleExibirTabela();
        props.setRecarregarNoticias(true);
    }

    function handleFecharModalErro(){
        setExibirModalErro(false);
        props.handleExibirTabela();
        props.setRecarregarNoticias(true);
    }

    function handleGaleriaServer(codigo){
        setGaleriaServer(galeriaServer.filter(img => img.codigo !== codigo));
    }

    function handleGaleriaUpload(imagem){
        setGaleriaUpload(galeriaUpload.filter(img => img !== imagem));
    }

    return ( 
        <div
            className={visivel()}>
            <Card >
                <Card.Header>
                    <h2>
                        Editar Notícia
                    </h2>
                </Card.Header>
                <Card.Body>
                    <Container >
                        <Form 
                            onSubmit={salvarNoticia}>
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
                                    Capa (PNG ou JPG):
                                </Form.Label>
                                <Col 
                                    md={5}>
                                    <Form.Control
                                        type="file"
                                        onChange={handleImage}
                                        accept="image/png, image/jpeg"
                                        ref={capaElement} />
                                </Col>
                                <Col 
                                    md={3}
                                    className={visivelCapa()}>
                                    <Image 
                                        src={capa}
                                        thumbnail />
                                </Col>
                            </Form.Group>
                            <Form.Group
                                as={Row}
                                className="mt-2">
                                <Form.Label
                                        column
                                        md={2}>
                                    Título:
                                </Form.Label>
                                <Col 
                                    md={10}>
                                    <Form.Control
                                        type="text"
                                        value={titulo} 
                                        onChange={handleTxtTitulo}
                                        required />
                                </Col>
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
                                        as="textarea" 
                                        rows={10}
                                        value={conteudo} 
                                        onChange={handleTxtConteudo} 
                                        required />
                                </Col>
                            </Form.Group>
                            <Form.Group
                                as={Row}
                                className="mt-2">
                                <Form.Label
                                        column
                                        md={2}>
                                    Galeria (PNG ou JPG):
                                </Form.Label>
                                <Col 
                                    md={10}>
                                    <Form.Control
                                        type="file" multiple
                                        onChange={handleGallery}
                                        accept="image/png, image/jpeg"
                                        ref={galeriaElement} />
                                </Col>
                            </Form.Group>
                            <Form.Group
                                as={Row} >
                                <GaleriaImagensServer 
                                    imagens={galeriaServer}
                                    handleGaleriaServer={handleGaleriaServer}/>
                                <GaleriaImagensUpload 
                                    imagens={galeriaUpload}
                                    qtdeGaleria={qtdeGaleria}
                                    handleGaleriaUpload={handleGaleriaUpload}/>
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

EditarNoticia.propTypes = {
    visivel: PropTypes.bool.isRequired,
    handleExibirTabela: PropTypes.func.isRequired,
    setRecarregarNoticias: PropTypes.func.isRequired,
    noticia: PropTypes.object.isRequired,
    carregarNoticia: PropTypes.bool.isRequired,
    setCarregarNoticia: PropTypes.func.isRequired,
}

export default EditarNoticia;