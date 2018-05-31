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
  

  

  handleEdit()
  {
    window.location.href='/admin/editdetails';
  }


  componentDidMount() {
    
    axios.get("http://localhost:8000/api/listofArticles")
      .then((response) => {

        // console.log(response);
        if (response.data.error) {
          this.setState({ loading: false })
        } else {
          this.setState({ Articles: response.data, loading: false ,})
        }
      })
      .catch((error) => {
        console.log(error)
      })


  }

 render() {
    // console.log(this.state.Articles);
    return <div>
       
     
       
         

          <section id="imgBanner">
            <h2>All News</h2>
          </section>


 {this.state.Articles && this.state.Articles.map(function(article) {
                return(
          <section id="courseArchive">
            <div className="container">
              <div className="row">
                <div className="col-lg-8 col-md-8 col-sm-8">
                  <div className="courseArchive_content">
                    <div className="row">
                      <div className="col-lg-12 col-12 col-sm-12">
                        <div className="single_blog_archive wow fadeInUp">
                          <div className="blogimg_container">
                            <a href="#" className="blog_img">
                                      <img alt="img" src={`http://localhost:8000/uploads/${article.profilePic}`}  />
                            </a>
                          </div>
                          <h2 className="blog_title">
                            <a href="events-single.html">
                              {" "}
                                      {article.title}
                            </a>
                          </h2>
                          <div className="blog_commentbox">
                            <p>
                                      <i className="fa fa-clock-o" /><Moment className="text-muted" format="DD MMM YYYY">
                                        {article.createdAt}
                                      </Moment>
                            </p>
                            <p>
                                      <i className="fa fa-map-marker" /> {article.location}
                            </p>
                          </div>
                          <p className="blog_summary">

                                      { article.ShortDescription}
                          </p>
                          
                                    <Link className="blog_readmore" href="events-single.html" to={`/${article._id}/SingleArticle`}>
                                      Read this article
                      </Link>
                         
                          
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          );
                                      }
                                    )}
                            
                            
     
      </div>;
  }

}
export default Articles;