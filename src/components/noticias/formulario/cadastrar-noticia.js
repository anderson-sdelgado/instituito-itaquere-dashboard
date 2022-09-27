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
import GaleriaImagensUpload from './galeria-imagens-upload';
import GaleriaVideoUpload from './galeria-video-upload';
import * as constants from '../../../utils/constants';

function EditarNoticia(props) {

    const URL_CADASTRAR_NOTICIA = constants.URL_BASE + constants.NOTICIA;

    const [capa, setCapa] = useState('');
    const [galeriaImagensUpload, setGaleriaImagensUpload] = useState([]);
    const [galeriaVideoUpload, setGaleriaVideoUpload] = useState([]);
    const [imagem, setImagem] = useState();
    const [codigo, setCodigo] = useState('');
    const [titulo, setTitulo] = useState('');
    const [conteudo, setConteudo] = useState('');
    const [exibirModalSucesso, setExibirModalSucesso] = useState(false);
    const [exibirModalErro, setExibirModalErro] = useState(false);
    const [exibirImagens, setExibirImagens] = useState(false);
    const [qtdeGaleriaImagens, setQtdeGaleriaImagens] = useState(0);
    const [qtdeGaleriaVideo, setQtdeGaleriaVideo] = useState(0);
    const [messagem, setMessagem] = useState('');
    const [exibirProcessando, setExibirProcessando] = useState(false);

    const capaElement = useRef();
    const galeriaElement = useRef();
    const videoElement = useRef();

    useEffect(() => {

        function obterNoticia(){
            setGaleriaImagensUpload([]);
            setGaleriaVideoUpload([]);
            setImagem();
            setCodigo('');
            setTitulo('');
            setConteudo('');
            setExibirImagens(false);
            setQtdeGaleriaImagens(0);
            setQtdeGaleriaVideo(0);
            setExibirProcessando(false);
            capaElement.current.required = true;
            capaElement.current.value = "";
            galeriaElement.current.value = "";
            videoElement.current.value = "";
        }

        if(props.carregarNoticia){
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
            galeriaVideoUpload.map((img, index) => {
                var cod = index + 1;
                formData.append('video' + cod, img);
            });
            formData.append('method', 'post');
            let { data } = await axios.post(URL_CADASTRAR_NOTICIA, formData);
            if(data.status==='success'){
                setMessagem(data.response);
                setExibirModalSucesso(true);
            } else {
                setMessagem("Erro na Criação de Novo Registro: " + data.response);
                setExibirModalErro(true);
            }
        } catch (err) {
            console.log(err);
            setMessagem("Erro na Criação de Novo Registro: " + err.message);
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

    function handleGaleriaImagensUpload(retImage){
        setGaleriaImagensUpload(galeriaImagensUpload.filter(image => image !== retImage));
    }

    function handleGaleriaVideoUpload(retVideo){
        setGaleriaVideoUpload(galeriaVideoUpload.filter(video => video !== retVideo));
    }

    return ( 
        <div
            className={visivel()}>
            <Card >
                <Card.Header>
                    <h2>
                        Cadastrar Notícia
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
                                        ref={videoElement} />
                                </Col>
                            </Form.Group>
                            <Form.Group
                                as={Row} >
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
    carregarNoticia: PropTypes.bool.isRequired,
    setCarregarNoticia: PropTypes.func.isRequired,
}

export default EditarNoticia;