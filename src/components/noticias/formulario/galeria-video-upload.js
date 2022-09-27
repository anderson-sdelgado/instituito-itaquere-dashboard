import { 
    Card,
    Button
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Player } from 'video-react';

function GaleriaVideoUpload(props) {

    function handleExcluirVideo(event, video){
        event.preventDefault();
        props.handleGaleriaVideoUpload(video);
    }

    function render() {
        let key = props.qtdeGaleriaVideo;
        const cols = props.videos.map(video => 
            <Card  
                key= {key++} 
                style={{ 
                    width: '30rem',
                    margin: '10px',
                    float: 'left' }} >
                <Card.Header >
                    <Button 
                        onClick={(event) => handleExcluirVideo(event, video)} 
                        variant="danger"
                        style={{ 
                            width: '100%'}}>
                        Excluir
                    </Button>
                </Card.Header>
                <Card.Body>
                <Player
                    playsInline
                    src={URL.createObjectURL(video)}
                    style={{ 
                        width: '27rem' }} />
                </Card.Body>
            </Card>
        )
        return cols;
    }

    return render();
}

GaleriaVideoUpload.propTypes = {
    videos: PropTypes.array.isRequired,
    qtdeGaleriaVideo: PropTypes.number.isRequired,
    handleGaleriaVideoUpload: PropTypes.func.isRequired
}

export default GaleriaVideoUpload;