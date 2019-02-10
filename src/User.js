import React from "react";
import {Row, Container, Col, Button} from "reactstrap";
import {FaUser, FaEnvelope, FaHome} from "react-icons/lib/fa";

const User = ({user}) => {
    return (
        <Container fluid>
            <Row>
                <Col xs={'auto'}>
                    <img src={user.person.picture} alt="avatar" className="rounded-circle" width="120" height="120"></img>                    
                </Col>
                <Col>
                    <h4><FaUser></FaUser> {user.person.name}</h4>
                    <h5><i>{user.person.professionalHeadline}</i></h5>
                    <h5><FaHome></FaHome> {user.person.location}</h5>
                    <h5><FaEnvelope></FaEnvelope> {user.person.email}</h5>
                </Col>
            </Row>
        </Container>
    );
};

export default User;