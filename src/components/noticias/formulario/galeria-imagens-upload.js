import { 
    Card,
    Image,
    Button
} from 'react-bootstrap';
import PropTypes from 'prop-types';

function GaleriaImagensUpload(props) {

    function handleExcluirImagem(event, img){
        event.preventDefault();
        props.handleGaleriaUpload(img);
    }

    function render() {
        let key = props.qtdeGaleria;
        const cols = props.imagens.map(img => 
            <Card  
                key= {key++} 
                style={{ 
                    width: '18rem',
                    margin: '10px',
                    float: 'left' }} >
                <Card.Header >
                    <Button 
                        onClick={(event) => handleExcluirImagem(event, img)} 
                        variant="danger"
                        style={{ 
                            width: '100%'}}>
                        Excluir
                    </Button>
                </Card.Header>
                <Card.Body>
                    <Image 
                        src={URL.createObjectURL(img)}
                        style={{ 
                            width: '15rem' }} />
                </Card.Body>
            </Card>
        )
        return cols;
    }

    return render();
}

GaleriaImagensUpload.propTypes = {
    imagens: PropTypes.array.isRequired,
    qtdeGaleria: PropTypes.number.isRequired,
    handleGaleriaUpload: PropTypes.func.isRequired
}

export default GaleriaImagensUpload;