import React, { Component } from "react"
import Recommendations from "./Recommendations"
import axios from 'axios'

const RECOMMENDATIONS_URI = "https://torre-recommender-back.herokuapp.com/user/username/recommend"

class SearchBar extends Component {
    state = {
        error: false,
        query: '',
        user : [],
        results : []
    }

    getRecommendations = () => {
        let url = RECOMMENDATIONS_URI.replace('username', this.state.query)
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

    handleInputChange = () => {
        this.setState({
            query: this.search.value
        }, () => {
            if (this.state.query && this.state.query.length > 1) {
                this.getRecommendations()
            }
        })
    }

    render() {
        return (
            <div className=" input-group-lm">
                <form>
                    <input type="search" className="form-control" ref={input => this.search = input}  onChange={this.handleInputChange} placeholder="Type your username from Torre Bio" id="username-search"></input>
                </form>
                <br></br>
                <Recommendations user={this.state.user} results={this.state.results}/>
            </div>
        )
    }
}
export default SearchBar;