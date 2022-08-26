import { 
    Container, 
    Nav, 
    Navbar,
    NavDropdown,
} from 'react-bootstrap';

function Cabecalho() {
    return ( 
        <Navbar bg="dark" variant="dark">
            <Container fluid className="mr-2 ml-2" >
                <Navbar.Brand href="">Instituto Itaquerê</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
                    <Nav>
                        <NavDropdown
                            title="Anderson"
                            align="end">
                        <NavDropdown.Item 
                            href="" >
                            <strong>Perfil</strong>
                        </NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item 
                            href=""
                            style={{ color: 'green' }} >
                            Logout
                        </NavDropdown.Item>
                    </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
     );
}

export default Cabecalho;