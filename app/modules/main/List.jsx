import React from 'react'
import axios from 'axios'

export default class List extends React.Component{
    constructor(props){
        super(props)
        this.state={
            data: []
        }        
    }
    componentDidMount(){
        axios.get('main/getallstudents').then((res)=>{
            if (res.data.message==='success'){
                this.setState({
                    data: res.data.data
                })
            }
        })
    }
    deleteStudent(id){
        axios.post('main/delete/',{
            'id' : id
        }).then((res=>{
            if (res.data.message==='success'){
                this.setState({
                    data: res.data.data
                })
            }
        }))
    }
    render(){
        console.log(this.state.data)
        return(
            <div className="container">
                    <hr />
                        <a href="#/add">
                            <button className="btn btn-success btn-sm pull-right">ADD STUDENT</button>
                        </a>
                <h1>Student List</h1>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>First Name</th>
                            <th>Middle Name</th>
                            <th>Last Name</th>
                            <th>Birth Date</th>
                            <th>Course</th>
                            <th>Year Level</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.data.map((a,b)=>{
                            return(
                                <tr key={b}>
                                    <td>{b+1}</td>
                                    <td>{a.firstName}</td>
                                    <td>{a.middleName}</td>
                                    <td>{a.lastName}</td>
                                    <td>{a.birthDate}</td>
                                    <td>{a.course}</td>
                                    <td>{a.yearLevel}</td>
                                    <td><a href={`#/update/${a.id}`}>EDIT</a>| <a style={{'cursor':'pointer'}} onClick={()=> {if(window.confirm('Are you sure to delete?')) this.deleteStudent(a.id)} }>DEL</a></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}