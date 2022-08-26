import { useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  
    faSortUp
} from '@fortawesome/free-solid-svg-icons';
import { 
    Button,
    Modal
} from 'react-bootstrap';
import axios from 'axios';
import Documento from '../../../models/documento.model';

function UpDocumento(props) {

    const API_URL_UPDATE_DOCUMENTO = 'http://www.institutoitaquere.org.br/restful/documento/';

    const [messagem, setMessagem] = useState('');
    
    async function handleUpDocumento(event){
        event.preventDefault();
        try {
            const novoDocumento = new Documento('', props.documento.secao, props.documento.posicao);
            const formData = new FormData();
            formData.append('data', JSON.stringify(novoDocumento));
            formData.append('method', 'up');
            let { data } = await axios.post(API_URL_UPDATE_DOCUMENTO + props.documento.codigo, formData);
            if(data.status==='success'){
                setMessagem(data.response);
                props.setCarregarBalancetes(true);
            } else {
                setMessagem("Erro Up do Registro: " + data.response);
                console.log(messagem);
            }
        } catch(err) {
            setMessagem("Erro Up do Registro: " + err.message);
            console.log(messagem);
        }
    }

    return ( 
        <FontAwesomeIcon
            className={'btn btn-outline-dark btn-sm'}
            onClick={handleUpDocumento}
            icon={faSortUp} />
    );
}

UpDocumento.propTypes = {
    documento: PropTypes.object.isRequired,
    setCarregarBalancetes: PropTypes.func.isRequired,
}

export default UpDocumento;