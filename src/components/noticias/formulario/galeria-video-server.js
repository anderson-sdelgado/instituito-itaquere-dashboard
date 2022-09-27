import { 
    Card,
    Button
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import * as constants from '../../../utils/constants';
import { Player } from 'video-react';

function GaleriaVideoServer(props) {

    const URL_VIDEO = constants.URL_BASE + constants.LOCAL_VIDEO;

    function handleExcluirVideo(event, codigo){
        event.preventDefault();
        props.handleGaleriaVideoServer(codigo);
    }

    return ( 
        props.videos.map(v => 
            <Card 
                key= {v.codigo}
                style={{ 
                    width: '18rem',
                    margin: '10px',
                    float: 'left' }}>
                <Card.Header >
                    <Button 
                        onClick={(event) => handleExcluirVideo(event, v.codigo)} 
                        variant="danger"
                        style={{ 
                            width: '100%'}}>
                        Excluir
                    </Button>
                </Card.Header>
                <Card.Body>
                <Player
                    playsInline
                    src={URL_VIDEO + v.video}
                    />
                </Card.Body>
            </Card>
        )
    );
}

GaleriaVideoServer.propTypes = {
    videos: PropTypes.array.isRequired,
    handleGaleriaVideoServer: PropTypes.func.isRequired
}

export default GaleriaVideoServer;