import React from 'react'
import { Container, Col, Row } from 'reactstrap'
import SearchBar from "./SearchBar"

const App = () => (
    <div>
        <br /><br /><br />
        <Container>
            <Row>
                <Col sm={{ size: 8, offset: 2 }}>
                    <SearchBar />
                </Col>
            </Row>
        </Container>
    </div>
)

export default App