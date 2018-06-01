import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AdminNav from './AdminNav';
axios.defaults.withCredentials = true;


class Dashboardarticle extends Component {
    constructor(props){
        super(props);

        this.state = {
            Articles: null,
            loading: true,
            ArticleClass: null, 
            admin:{

            }
        }

        this.componentDidMount = this.componentDidMount.bind(this);
  
    }

    handleAddscore() {
        window.location.href = '/admin/addscore';
    }


    handleEdit(){
        window.location.href='/admin/editdetails';
    }


    componentDidMount() {
        axios.get("http://localhost:8000/api/listofArticles")
        .then((response) => {

            if (response.data.error) {
            this.setState({ loading: false })
            } else {
            this.setState({ Articles: response.data, loading: false ,})
            }
        })
        .catch((error) => {
            console.log(error)
        })

        
        axios.get('http://localhost:8000/api/isloggedin')
        .then((res) => {
            if (res.data.error) {
                this.setState({ loading: false })
            } else if (res.data.jobTitle === 'Admin' || res.data.jobTitle === 'SuperAdmin') {
                this.setState({ admin: res.data, loading: false })
            } else {
                window.location.href = "/adminwsq"
            }
        });
    }

    render() {
        return (
            <div>
                <AdminNav />
                <h1>Alle Nieuws Artikelen</h1>

                <div className="table-responsive-md">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col" colSpan={1}>Picture</th>
                                <th scope="col" colSpan={1}>Title</th>
                                <th scope="col" colSpan={3}>Actions</th>
                                <th scope="col" colSpan={4}>More</th>

                            </tr>
                        </thead>
                        <tbody>

                            {this.state.Articles && this.state.Articles.map(function (Article) {
                                console.log(Article);
                                return (
                                    <tr key={Article._id}>
                                        <td>
                                            {Article.profilePic &&
                                                <img src={`http://localhost:8000/uploads/${Article.profilePic}`} width="100" height="120" />}
                                        </td>
                                        <td colSpan={3}>{Article.title}</td>

                                        <td><Link className="btn btn-primary" to={`/Admin-Panel/${Article._id}/EditArticle`}>Bewerken</Link></td>
                                        <td><Link className="btn btn-primary" to={`/${Article._id}/SingleArticle`}>Bekijk details</Link></td>
                                    </tr>
                                )
                            }.bind(this))}
                        </tbody>
                    </table>
                    <br/>
                    <br/>
                <br/>
                </div>
          
            </div>
         
        )

    }
}
export default Dashboardarticle;