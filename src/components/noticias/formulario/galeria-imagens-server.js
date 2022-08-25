import { 
    Card,
    Image,
    Button
} from 'react-bootstrap';
import PropTypes from 'prop-types';

function GaleriaImagensServer(props) {

    const URL_IMG = 'http://www.institutoitaquere.org.br/restful/img/';

    function handleExcluirImagem(event, codigo){
        event.preventDefault();
        props.handleGaleriaServer(codigo);
    }

    return ( 
        props.imagens.map(img => 
            <Card 
                key= {img.codigo}
                style={{ 
                    width: '18rem',
                    margin: '10px',
                    float: 'left' }}>
                <Card.Header >
                    <Button 
                        onClick={(event) => handleExcluirImagem(event, img.codigo)} 
                        variant="danger"
                        style={{ 
                            width: '100%'}}>
                        Excluir
                    </Button>
                </Card.Header>
                <Card.Body>
                    <Image 
                        src={URL_IMG + img.image}
                        style={{ 
                            width: '15rem' }}/>
                </Card.Body>
            </Card>
        )
    );
}

GaleriaImagensServer.propTypes = {
    imagens: PropTypes.array.isRequired,
    handleGaleriaServer: PropTypes.func.isRequired
}

export default GaleriaImagensServer;