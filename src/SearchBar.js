import React, { Component } from "react"
import Recommendations from "./Recommendations"
import axios from 'axios'

const RECOMMENDATIONS_URI = "https://torre-recommender-back.herokuapp.com/user/username/recommend"

class SearchBar extends Component {
    state = {
        error: false,
        query: '',
        user: [],
        results: []
    }

    getRecommendations = () => {
        let url = RECOMMENDATIONS_URI.replace('username', this.state.query)
        console.log(this.state.query)
        const httpClient = axios.create();
        httpClient.defaults.timeout = 500;
        httpClient.get(url).then(({ data }) => {
            this.setState({
                user: [data.user],
                results: data.recommendations
            })
        })
            .catch(() => this.setState({ error: true }))
    }

    handleClick = () => {
        console.log("clicked")
        this.setState({
            query: this.search.value
        }, () => {
            this.getRecommendations()
        })
    }

    render() {
        return (
            <div>
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon1">@</span>
                    </div>
                    <input type="text" class="form-control" placeholder="username" aria-label="Username" aria-describedby="basic-addon1" ref={input => this.search = input} />
                    <div class="input-group-append">
                    <button type="button" class="btn btn-success" onClick={this.handleClick}>Recommend</button>
                    </div>
                </div>
                <br></br>
                <Recommendations user={this.state.user} results={this.state.results} />
            </div>
        )
    }
}
export default SearchBar;