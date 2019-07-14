import React, {Component} from 'react';
import axios from 'axios'
import './App.css'

const API_URL = 'http://localhost:3004';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            title: '',
            url: '',
            list: []
        }
    }

    render() {
        return (
            <div className="container-fluid" style={{marginTop: '20px'}}>
                <form className="form-horizontal" onSubmit={this.handleFormSubmit}>
                    <div className="form-group row">
                        <label htmlFor="title" className="col-sm-2 control-label">Title:</label>
                        <div className="col-sm-10">
                            <input type="text" id="title" className="form-control" value={this.state.title}
                                   onChange={(e) => {
                                       this.setState({title: e.target.value})
                                   }}/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="url" className="col-sm-2 control-label">Youtube URL:</label>
                        <div className="col-sm-10">
                            <input type="text" id="title" className="form-control" value={this.state.url}
                                   onChange={(e) => {
                                       this.setState({url: e.target.value})
                                   }}/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col-sm-10 ml-auto">
                            <button type="submit" className="btn btn-primary">Add Video</button>
                        </div>
                    </div>
                </form>
                <table className="table">
                    <thead>
                    <tr>
                        <th>S.no</th>
                        <th>Title</th>
                        <th>URL</th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.list.map(item => {
                            return (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.title}</td>
                                    <td>{item.url}</td>
                                    <td>
                                        <button className="btn btn-primary" onClick={() => {
                                            this.setState({id: item.id, title: item.title, url: item.url})
                                        }}>Edit
                                        </button>
                                        <button className="btn btn-primary" style={{marginLeft: '5px'}}
                                                onClick={() => {
                                                    this.deleteItem(item)
                                                }}>Delete
                                        </button>
                                        <button className="btn btn-success" style={{marginLeft: '5px'}}
                                                onClick={() => {
                                                    this.deleteItem(item)
                                                }}>Approve
                                        </button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
            </div>
        );
    }

    componentDidMount() {
        this.query();
    }

    query = () => {
        axios.get(API_URL + '/user').then(({data}) => {
            this.setState({
                list: data
            });
        })
    }
    deleteItem = (item) => {
        axios.delete(API_URL + `/user/${item.id}`).then(({data}) => {
            this.query();
        })
    }
    handleFormSubmit = (e) => {
        e.preventDefault();
        if (this.state.id) {
            axios.put(API_URL + `/user/${this.state.id}`, {
                title: this.state.title,
                url: this.state.url
            }).then(({data}) => {
                this.setState({
                    id: '',
                    title: '',
                    url: ''
                });
                this.query();
            })
        } else {
            axios.post(API_URL + '/user', {
                title: this.state.title,
                url: this.state.url
            }).then(({data}) => {
                this.setState({
                    id: '',
                    title: '',
                    url: ''
                });
                this.query();
            })
        }
    }
}

export default App;