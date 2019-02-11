// import React from "react";
// import {Row, Container, Col, Button} from "reactstrap";
// import {FaUser, FaEnvelope, FaHome} from "react-icons/lib/fa";

// const User = ({user}) => {
//     return (
//         <Container fluid>
//             <Row>
//                 <Col xs={'auto'}>
//                     <img src={user.person.picture} alt="avatar" className="rounded-circle" width="120" height="120"></img>                    
//                 </Col>
//                 <Col>
//                     <h4><FaUser></FaUser> {user.person.name}</h4>
//                     <h5><i>{user.person.professionalHeadline}</i></h5>
//                     <h5><FaHome></FaHome> {user.person.location}</h5>
//                     <h5><FaEnvelope></FaEnvelope> {user.person.email}</h5>
//                 </Col>
//             </Row>
//         </Container>
//     );
// };

// export default User;

import React from "react";
import { Container, Col, Row, ListGroup, ListGroupItem } from 'reactstrap'
import { FaUser, FaEnvelope, FaHome, FaThumbsUp } from "react-icons/lib/fa";

const Recommendations = (props) => {
    const users = props.user
    const results = props.results

    const getFirstName = (name) => {
        let words = name.split(" ")
        if (words.length) {
            return words[0]
        }
        else {
            return ""
        }
    }

    const show_user = users.map(u => (
        <ListGroupItem key={u.person.publicId} className="list-group-item">

            <Container fluid>
                <Row>
                    <Col xs={'auto'}>
                        <img src={u.person.picture} alt="avatar" className="rounded-circle" width="120" height="120"></img>
                    </Col>
                    <Col>
                        <h4> {u.person.name}</h4>
                        <h4><i>{u.person.professionalHeadline}</i></h4>
                        <h5><FaUser></FaUser> {u.person.publicId}</h5>
                        <h5><FaHome></FaHome> {u.person.location}</h5>
                        <h5><FaEnvelope></FaEnvelope> {u.person.email}</h5>
                    </Col>
                </Row>
            </Container>
        </ListGroupItem>
    ))

    const show_results = results.map(r => (
        <ListGroupItem key={r.user.person.publicId} className="list-group-item">
            <Container fluid>
                <Row>
                    <Col xs={'auto'}>
                        <img src={r.user.person.picture} alt="avatar" className="rounded-circle" width="120" height="120"></img>
                    </Col>
                    <Col>
                        <h4> {r.user.person.name}</h4>
                        <h4><i>{r.user.person.professionalHeadline}</i></h4>
                        <h5><FaUser /> {r.user.person.publicId}</h5>
                        <h5><FaHome></FaHome> {r.user.person.location}</h5>
                        <h5><FaEnvelope></FaEnvelope> {r.user.person.email}</h5>
                        <h4><FaThumbsUp /> {getFirstName(r.user.person.name)} is {Number(r.similarity * 100).toFixed(2)} % recommended
                        </h4>
                    </Col>
                </Row>
            </Container>
        </ListGroupItem>
    ))

    return (
        <Container fluid>
            <Row>
                <ListGroup>
                    {show_user}
                </ListGroup>
            </Row>
            <Row><br/><br/><h3>Your recommendations will be shown below</h3><br/><br/></Row>
            <Row>
                {show_results}
            </Row>
        </Container>


    )
}

export default Recommendations