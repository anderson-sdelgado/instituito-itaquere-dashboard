import { useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  
    faSortDown
} from '@fortawesome/free-solid-svg-icons';
import { 
    Button,
    Modal
} from 'react-bootstrap';
import axios from 'axios';
import Secao from '../../../models/secao.model';

function DownSecao(props) {

    const API_URL_UPDATE_SECAO = 'http://www.institutoitaquere.org.br/restful/secao/';

    const [messagem, setMessagem] = useState('');

    async function handleDownSecao(event){
        event.preventDefault();
        try {
            const novoSecao = new Secao(props.secao.codparente, '', '', props.secao.posicao);
            const formData = new FormData();
            formData.append('data', JSON.stringify(novoSecao));
            formData.append('method', 'down');
            let { data } = await axios.post(API_URL_UPDATE_SECAO + props.secao.codigo, formData);
            if(data.status==='success'){
                setMessagem(data.response);
                props.setCarregarBalancetes(true);
            } else {
                setMessagem("Erro Down do Registro: " + data.response);
                console.log(messagem);
            }
        } catch(err) {
            setMessagem("Erro Down do Registro: " + err.message);
            console.log(messagem);
        }
    }

    return ( 
        <FontAwesomeIcon
            className={'btn btn-outline-dark btn-sm'}
            onClick={handleDownSecao}
            icon={faSortDown} />
    );
}

DownSecao.propTypes = {
    secao: PropTypes.object.isRequired,
    setCarregarBalancetes: PropTypes.func.isRequired,
}

export default DownSecao;