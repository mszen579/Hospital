//Articles.js
import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Moment from "react-moment";


class Articles extends Component {
  constructor(props){
    super(props);

    this.state = {

      Articles: null,
      loading: true,
      ArticleClass: null,

    }
  
  }
  handleAddscore() {
    window.location.href = '/admin/addscore';
  }
  handleEdit()
  {
    window.location.href='/admin/editdetails';
  }


  componentDidMount() {
    
    axios.get("http://localhost:8000/api/listofArticles")
      .then((response) => {

        // console.log(response);
        if (response.data.error) {
          _this.setState({ loading: false })
        } else {
          _this.setState({ Articles: response.data, loading: false ,})
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
              {this.state.Articles && this.state.Articles.map(function (Article) {
                return (
                  <div key={Article._id}>
                    <div>
                    <h3 style={{color: "red"}}>Title: {Article.title}</h3>
                      {Article.profilePic &&
                        <img src={`http://localhost:8000/uploads/${Article.profilePic}`} width="100" height="120" />}
                    </div>
                    <Moment className="text-muted" format="DD MMM YYYY">
                    {Article.createdAt}
                    </Moment>
                    
                    {/* <div><strong>Video link: </strong> {Article.Video}</div>
                    <div><strong>Event location:</strong> {Article.location}</div>
                    <div><strong>Article:</strong> {Article.ShortDescription}</div> */}
                    <div><Link className="btn btn-primary" to={`/${Article._id}/SingleArticle`}>Read this article</Link></div><br/><hr/>
                 </div>
                )
          }.bind(this))}
    </div>
  </div>
  )
  }
}
export default Articles;