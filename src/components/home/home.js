import Cabecalho from '../../utils/cabecalho';
import Menu from '../../utils/menu';
import { 
    Container,
    Row,
    Col,
} from 'react-bootstrap';

function Home() {
    return ( 
        <div>
            <Cabecalho />
            <Container 
                fluid>
                <Row>
                    <Col 
                        md={2}
                        className="vh-100" >
                            <Menu />
                    </Col>
                    <Col 
                        md={10} >
                        Instituto Itaquerê
                    </Col>
                </Row>
            </Container>
        </div> 
    );
}

export default Home;