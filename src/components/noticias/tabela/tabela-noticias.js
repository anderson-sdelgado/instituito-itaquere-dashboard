import {
    useState,
} from 'react';
import {
    Row,
    Col,
    Table,
    Form,
    Button,
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import ItensTabelaNoticias from './itens-tabela-noticias';
import PropTypes from 'prop-types';
import Paginacao from './paginacao';
import Ordenacao from './ordenacao';

function TabelaNoticias(props) {

    const [ordenarCodigoAsc, setOrdenarCodigoAsc] = useState(false);
    const [ordenarCodigoDesc, setOrdenarCodigoDesc] = useState(false);
    const [ordenarTituloAsc, setOrdenarTituloAsc] = useState(false);
    const [ordenarTituloDesc, setOrdenarTituloDesc] = useState(false);

    function visivel() {
        return props.visivel ? null : 'hidden';
    }

    function handleSelectCountPage(event){
        props.setCountPage(parseInt(event.target.value));
        props.setRecarregarNoticias(true);
    }

    function handleFiltrar(event) {
        props.setFiltro(event.target.value);
        props.setRecarregarNoticias(true);
    }

    function handleOrdernar(event, tipo){
        event.preventDefault();
        if(tipo === 1){
            if(!ordenarCodigoAsc && !ordenarCodigoDesc){
                setOrdenarCodigoAsc(true);
                setOrdenarCodigoDesc(false);
                props.setOrdenar(1);
            } else if(ordenarCodigoAsc){
                setOrdenarCodigoAsc(false);
                setOrdenarCodigoDesc(true);
                props.setOrdenar(2);
            } else {
                setOrdenarCodigoAsc(false);
                setOrdenarCodigoDesc(false);
                props.setOrdenar(0);
            }
            setOrdenarTituloAsc(false);
            setOrdenarTituloDesc(false);
        }
        if(tipo === 2){
            if(!ordenarTituloAsc && !ordenarTituloDesc){
                setOrdenarTituloAsc(true);
                setOrdenarTituloDesc(false);
                props.setOrdenar(3);
            } else if(ordenarTituloAsc){
                setOrdenarTituloAsc(false);
                setOrdenarTituloDesc(true);
                props.setOrdenar(4);
            } else {
                setOrdenarTituloAsc(false);
                setOrdenarTituloDesc(false);
                props.setOrdenar(0);
            }
            setOrdenarCodigoAsc(false);
            setOrdenarCodigoDesc(false);
        }
        props.setRecarregarNoticias(true);
    }

    return ( 
        <div 
            className={visivel()}>
            <h2 
                className="mt-3">
                Notícias
            </h2>
            <Table 
                striped 
                bordered 
                hover 
                className="mt-3">
                <thead>
                    <tr>
                        <th 
                            colSpan={3}>
                        <Row>
                            <Col 
                                md={2} 
                                style={{ textAlign: 'center' }}>
                                <span 
                                    style={{ 
                                        display: 'inline-block',
                                        verticalAlign: 'middle',
                                        lineHeight: 'normal' }}>
                                    Pesquisa
                                </span>
                            </Col>
                            <Col 
                                md={7}>
                                <Form.Control
                                    className="filtro"
                                    type="text" 
                                    value={props.filtro}
                                    onChange={handleFiltrar} >
                                </Form.Control>
                            </Col>
                            <Col 
                                md={2}>
                                <Form.Select 
                                    value={props.countPage} 
                                    onChange={handleSelectCountPage} >
                                    <option value="3">3</option>
                                    <option value="5">5</option>
                                    <option value="10">10</option>
                                    <option value="50">50</option>
                                    <option value="100">100</option>
                                    <option value="1000">1000</option>
                                </Form.Select>
                            </Col>
                        </Row>
                        </th>
                        <th 
                            colSpan={3} 
                            style={{ textAlign: 'center' }}>
                            <Button 
                                variant="success"
                                onClick={props.handleExibirCadastrar} >
                                <FontAwesomeIcon icon={faPlus} />
                                &nbsp;
                                Inserir
                            </Button>
                        </th>
                    </tr>
                    <tr>
                        <th 
                            width="10%" 
                            style={{ textAlign: 'center' }} 
                            onClick={(event) => handleOrdernar(event, 1)} >
                                Código
                                &nbsp;
                                <Ordenacao
                                        ordenarAsc={ordenarCodigoAsc}
                                        ordenarDesc={ordenarCodigoDesc} />
                        </th>
                        <th 
                            width="20%" 
                            style={{ textAlign: 'center' }}>
                            Capa
                        </th>
                        <th
                            onClick={(event) => handleOrdernar(event, 2)} >
                            Descrição
                            &nbsp;
                            <Ordenacao
                                    ordenarAsc={ordenarTituloAsc}
                                    ordenarDesc={ordenarTituloDesc} />
                        </th>
                        <th 
                            width="10%">
                            &nbsp;
                        </th>
                        <th 
                            width="10%">
                            &nbsp;
                        </th>
                        <th 
                            width="10%">
                            &nbsp;
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <ItensTabelaNoticias 
                        noticias={props.noticias}
                        handleExibirEditar={props.handleExibirEditar}
                        setRecarregarNoticias={props.setRecarregarNoticias}
                         />
                </tbody>
            </Table>
            <Paginacao
                totalItems={props.totalItems}
                itemsPorPagina={props.countPage}
                paginaAtual={props.paginaAtual}
                mudarPagina={props.handleMudarPagina} />
        </div>
     );
}

TabelaNoticias.propTypes = {
    visivel: PropTypes.bool.isRequired,
    handleExibirCadastrar: PropTypes.func.isRequired,
    handleExibirEditar: PropTypes.func.isRequired,
    noticias: PropTypes.array.isRequired,
    setRecarregarNoticias: PropTypes.func.isRequired,
    totalItems: PropTypes.number.isRequired,
    paginaAtual: PropTypes.number.isRequired,
    handleMudarPagina: PropTypes.func.isRequired,
    countPage: PropTypes.number.isRequired,
    setCountPage: PropTypes.func.isRequired,
    filtro: PropTypes.string.isRequired,
    setFiltro: PropTypes.func.isRequired,
    ordenar: PropTypes.number.isRequired,
    setOrdenar: PropTypes.func.isRequired,
}

export default TabelaNoticias;