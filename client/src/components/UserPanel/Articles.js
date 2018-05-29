//Articles.js
import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Moment from "react-moment";


class Articles extends Component {
    constructor(props) {
        super(props);

        this.state = {

            Articles: null,
            loading: true,


        }
        this.componentDidMount = this.componentDidMount.bind(this)
        
    }
    handleAddscore() {
        window.location.href = '/admin/addscore';
    }
    handleEdit() {
        window.location.href = '/admin/editdetails';
    }


    componentDidMount() {

        axios.get("http://localhost:8000/api/listofArticles")
            .then((response) => {

                // console.log(response);
                if (response.data.error) {
                    this.setState({ loading: false })
                } else {
                    this.setState({ Articles: response.data, loading: false, })
                }
            })
            .catch((error) => {
                console.log(error)
            })


    }

    render() {

        // console.log(this.state.Articles);
        return (


            <div>
                <h1>All News</h1>
                <div className="table-responsive-md">
                    {this.state.Articles && this.state.Articles.map(function (article) {
                        return (
                            <div key={article._id}>
                                <div>
                                    <h3 style={{ color: "red" }}>Title: {article.title}</h3>
                                    {article.profilePic &&
                                        <img src={`http://localhost:8000/uploads/${article.profilePic}`} width="100" height="120" />}
                                </div>
                                <Moment className="text-muted" format="DD MMM YYYY">
                                    {article.createdAt}
                                </Moment>
                                <div><Link className="btn btn-primary" to={`/${article._id}/SingleArticle`}>Read this article</Link></div><br /><hr />
                            </div>
                        )
                    }.bind(this))}
                </div>
            </div>
        )
    }
}
export default Articles;