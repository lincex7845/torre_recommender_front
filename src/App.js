import React, { Component } from 'react';
import { Container, Col, Row, ListGroup, ListGroupItem } from 'reactstrap';
import SearchBar from "./SearchBar";
import User from "./User";

const BIO_URI = "https://torre-recommender-back.herokuapp.com/user/"
const RECOMMENDATIONS_URI = "https://torre-recommender-back.herokuapp.com/user/username/recommend"

class App extends Component {
    constructor(props, context) {
        super(props, context);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.state = {
            searchText: '',
            user: [],
            searchResult: [],
            recommended: [],
            show: false,
        }
        this.handleSearch = this.handleSearch.bind(this);
        this.handleRecommended = this.handleRecommended.bind(this);
        this.returnUser = this.returnUser.bind(this);
        this.returnRecommended = this.returnRecommended.bind(this);
    }

    handleSearch(text) {
        this.setState({ searchResult: [], searchText: text, recommended: [], user: [] });
        this.state.user.map(u => {
            this.setState(prevState => ({
                searchResult: [u],
                user: [u]
            }));
        });
    }

    handleRecommended(text){
        this.setState({ searchResult: [], searchText: text, recommended: [], user: [] });
        this.state.recommended.map(r => {
            this.setState(prevState => ({
                recommended: [...prevState.recommended, r]
            }));
        });
    }

    componentWillMount() {
        let init = {
            method: 'GET',
            dataType: 'json',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            cache: 'default'
        };

        let user = this.state.searchText ? this.state.searchText : "dc_mera";

        let url = BIO_URI + user;
        console.log(url);

        fetch(url, init)
            .then(response => response.json())
            .then(
                data => this.setState(
                    prevState => ({
                        user: [data],
                        searchResult: [data]
                    })
                )
            )

        let recommendUrl = RECOMMENDATIONS_URI.replace("username", user)
        console.log(recommendUrl);
        fetch(recommendUrl, init)
            .then(response => response.json())
            .then(
                data => this.setState(
                    prevState => ({
                        recommended: data
                    })
                )
            )
    }

    returnUser() {
        return this.state.searchText ? this.state.searchResult : this.state.user;
    }

    returnRecommended(){ return this.state.recommended}

    handleClose() {
        this.setState({ show: false });
    }

    handleShow() {
        this.setState({ show: true });
    }

    render() {
        return (
            <div>
                <br /> <br /> <br />
                <Container fluid>
                    <Row>
                        <Col sm={{ size: 8, offset: 2 }}>
                            <SearchBar onSearch={this.handleSearch}></SearchBar>
                            <br></br>
                            <ListGroup>
                                {this.returnUser().map(user =>
                                    <ListGroupItem key={user.person.publicId} className="list-group-item">
                                        <User user={user}></User>
                                    </ListGroupItem>
                                )}
                            </ListGroup>
                        </Col>
                    </Row>
                    <br></br>
                    <Row>
                        <Col sm={{ size: 8, offset: 2 }}>
                             <h3>Here some recommended people for you:</h3>
                             <br></br>
                             <ListGroup>
                                {this.returnRecommended().map(r =>
                                    <ListGroupItem key={r.user.person.publicId} className="list-group-item">
                                        <User user={r.user}></User>
                                    </ListGroupItem>
                                )}
                             </ListGroup>       
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default App