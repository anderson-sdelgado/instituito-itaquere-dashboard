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
    Image,
    Spinner
} from 'react-bootstrap';
import Noticia from '../../../models/noticia.model';
import axios from 'axios';
import PropTypes from 'prop-types';
import GaleriaImagensServer from './galeria-imagens-server';
import GaleriaImagensUpload from './galeria-imagens-upload';
import GaleriaVideoServer from './galeria-video-server';
import GaleriaVideoUpload from './galeria-video-upload';
import * as constants from '../../../utils/constants';

function EditarNoticia(props) {

    const URL_IMG = constants.URL_BASE + constants.LOCAL_IMG;
    const CADASTRAR_NOTICIA = constants.URL_BASE + constants.NOTICIA;
    const LISTAR_GALERIA = constants.URL_BASE + constants.GALERIA + '/';
    const LISTAR_VIDEO = constants.URL_BASE + constants.VIDEO + '/';

    const [capa, setCapa] = useState('');
    const [galeriaImagensServer, setGaleriaImagensServer] = useState([]);
    const [galeriaImagensUpload, setGaleriaImagensUpload] = useState([]);
    const [galeriaVideoServer, setGaleriaVideoServer] = useState([]);
    const [galeriaVideoUpload, setGaleriaVideoUpload] = useState([]);
    const [imagem, setImagem] = useState();
    const [codigo, setCodigo] = useState('');
    const [titulo, setTitulo] = useState('');
    const [conteudo, setConteudo] = useState('');
    const [exibirModalSucesso, setExibirModalSucesso] = useState(false);
    const [exibirModalErro, setExibirModalErro] = useState(false);
    const [exibirImage, setExibirImage] = useState(false);
    const [qtdeGaleriaImagens, setQtdeGaleriaImagens] = useState(0);
    const [qtdeGaleriaVideo, setQtdeGaleriaVideo] = useState(0);
    const [messagem, setMessagem] = useState('');
    const [exibirProcessando, setExibirProcessando] = useState(false);

    const capaElement = useRef();
    const galeriaElement = useRef();

    useEffect(() => {

        async function obterGaleriaImage(){
            let { data } = await axios.get(LISTAR_GALERIA + props.noticia.codigo);
            setGaleriaImagensServer(data.data);
            setQtdeGaleriaImagens(data.data.length);
        }

        async function obterGaleiraVideo(){
            let { data } = await axios.get(LISTAR_VIDEO + props.noticia.codigo);
            setGaleriaVideoServer(data.data);
            setQtdeGaleriaVideo(data.data.length);
        }

        async function obterNoticia(){
            
            setGaleriaImagensUpload([]);
            setGaleriaVideoUpload([]);
            setImagem();
            setCodigo(props.noticia.codigo);
            setTitulo(props.noticia.titulo);
            setConteudo(props.noticia.conteudo);
            setCapa(URL_IMG + props.noticia.capa);
            setExibirImage(true);
            setExibirProcessando(false);
            
            capaElement.current.required = false;
            capaElement.current.value = "";
            galeriaElement.current.value = "";
        }

        if(props.carregarNoticia){
            obterGaleriaImage();
            obterGaleiraVideo()
            obterNoticia();
            props.setCarregarNoticia(false);
        }
    }, [props.carregarNoticia]);

    async function salvarNoticia(event){
        try {
            event.preventDefault();
            setExibirProcessando(true);
            const novaNoticia = new Noticia(conteudo, titulo);
            const formData = new FormData();
            formData.append('image', imagem);
            formData.append('data', JSON.stringify(novaNoticia));

            galeriaImagensUpload.map((img, index) => {
                var cod = index + 1;
                formData.append('gallery' + cod, img);
            });
            formData.append('galleryserver', JSON.stringify(galeriaImagensServer));
            
            galeriaVideoUpload.map((video, index) => {
                var cod = index + 1;
                formData.append('video' + cod, video);
            });
            formData.append('videoserver', JSON.stringify(galeriaVideoServer));

            formData.append('method', 'put');
            let { data } = await axios.post(CADASTRAR_NOTICIA + '/' + codigo, formData);
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
        return exibirImage ? null : 'hidden';
    }

    function visivel() {
        return props.visivel ? 'mt-3' : 'hidden';
    }

    function handleImage(event){
        setImagem(event.target.files[0]);
        setExibirImage(true);
        setCapa(URL.createObjectURL(event.target.files[0]));
    }

    function handleGalleryImagens(event){
        setGaleriaImagensUpload(Array.from(event.target.files));
    }

    function handleGalleryVideo(event){
        setGaleriaVideoUpload(Array.from(event.target.files));
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

    function handleGaleriaImagensServer(codigo){
        setGaleriaImagensServer(galeriaImagensServer.filter(image => image.codigo !== codigo));
    }

    function handleGaleriaImagensUpload(imageRet){
        setGaleriaImagensUpload(galeriaImagensUpload.filter(image => image !== imageRet));
    }

    function handleGaleriaVideoServer(codigo){
        setGaleriaVideoServer(galeriaVideoServer.filter(video => video.codigo !== codigo));
    }

    function handleGaleriaVideoUpload(videoRet){
        setGaleriaVideoUpload(galeriaVideoUpload.filter(video => video !== videoRet));
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
                                        onChange={handleGalleryImagens}
                                        accept="image/png, image/jpeg"
                                        ref={galeriaElement} />
                                </Col>
                            </Form.Group>
                            <Form.Group
                                as={Row} >
                                <GaleriaImagensServer 
                                    imagens={galeriaImagensServer}
                                    handleGaleriaImagensServer={handleGaleriaImagensServer}/>
                                <GaleriaImagensUpload 
                                    imagens={galeriaImagensUpload}
                                    qtdeGaleriaImagens={qtdeGaleriaImagens}
                                    handleGaleriaImagensUpload={handleGaleriaImagensUpload}/>
                            </Form.Group>
                            <Form.Group
                                as={Row}
                                className="mt-2">
                                <Form.Label
                                        column
                                        md={2}>
                                    Video (MP4):
                                </Form.Label>
                                <Col 
                                    md={10}>
                                    <Form.Control
                                        type="file" multiple
                                        onChange={handleGalleryVideo}
                                        accept="video/mp4"
                                        ref={galeriaElement} />
                                </Col>
                            </Form.Group>
                            <Form.Group
                                as={Row} >
                                <GaleriaVideoServer 
                                    videos={galeriaVideoServer}
                                    handleGaleriaVideoServer={handleGaleriaVideoServer}/>
                                <GaleriaVideoUpload 
                                    videos={galeriaVideoUpload}
                                    qtdeGaleriaVideo={qtdeGaleriaVideo}
                                    handleGaleriaVideoUpload={handleGaleriaVideoUpload}/>
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
                                    md={6}
                                    className={exibirProcessando ? 'hidden' : 'text-start'} >
                                    <Button 
                                        variant="primary" 
                                        type="submit" >
                                        Salvar
                                    </Button>
                                </Col>
                                <Col 
                                    md={6}
                                    className={exibirProcessando ? 'text-start' : 'hidden'}>
                                    <Spinner
                                        animation="border"/>
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