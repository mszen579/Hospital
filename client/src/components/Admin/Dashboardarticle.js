import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AdminNav from './AdminNav';


class Dashboardarticle extends Component {
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
    let _this = this;
    axios.get("http://localhost:8000/api/listofArticles")
      .then((response) => {

        console.log(response);
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
    let _this = this;
    console.log(this.state.Articles);
    return (
      <div>
        <AdminNav />
        <h1>Admin Dashboard</h1>

        <div className="table-responsive-md">
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col" colSpan={1}>#</th>
                <th scope="col" colSpan={1}>Picture</th>
                <th scope="col" colSpan={3}>Name</th>
                <th scope="col" colSpan={4}>Actions</th>

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
                    <td colSpan={3}>{Article.FirstName} {Article.LastName}</td>

                    <td><Link className="btn btn-primary" to={`/Admin-Panel/${Article._id}/EditArticle`}>Edit</Link></td>
                    <td><Link className="btn btn-primary" to={`/${Article._id}/SingleArticle`}>View details</Link></td>
                 </tr>
                )
              }.bind(this))}
        </tbody>
      </table>
    </div>
  </div>
  )

  }
}
export default Dashboardarticle;