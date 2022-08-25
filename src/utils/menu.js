import { 
    Accordion,
    Table
} from 'react-bootstrap';

function Menu() {
    return ( 
        <Accordion className="mt-3"  defaultActiveKey="0" flush>
            <Accordion.Item eventKey="0">
                <Accordion.Header>Cadastros</Accordion.Header>
                <Accordion.Body>
                    <Table className="table-borderless mb-0 mt-0">
                        <tbody>
                            <tr>
                                <td><a href="/dashboard/noticias">Notícias</a></td>
                            </tr>
                            <tr>
                                <td><a href="/dashboard/balancetes">Balancetes</a></td>
                            </tr>
                            <tr>
                                <td><a href="/dashboard/usuarios">Usuários</a></td>
                            </tr>
                        </tbody>
                    </Table>
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
                <Accordion.Header>Relatórios</Accordion.Header>
                <Accordion.Body>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );
}

export default Menu;
