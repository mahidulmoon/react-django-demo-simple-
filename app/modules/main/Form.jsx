import React from 'react'
import axios from 'axios'
axios.defaults.xsrfHeaderName = "X-CSRFToken";
import Input from './components/Input'

export default class Form extends React.Component{
    constructor(props){
        super(props)
        this.state={
            'id': '',
            'firstName': '',
            'middleName': '',
            'lastName': '',
            'birthDate': '',
            'yearLevel': '',
            'course': '',
            'success': false
        }
    }

    componentDidMount(){
        if (this.props.params.id!==undefined){
            // updating
            axios.get('main/moreinfo',{
                params: {'id': this.props.params.id}
            }).then((res)=>{
                console.log(res)
                if (res.data.message==='success'){
                    const data = res.data.data
                    this.setState({
                        id : data.id,
                        firstName: data.firstName,
                        middleName: data.middleName,
                        lastName: data.lastName,
                        birthDate: data.birthDate,
                        yearLevel: data.yearLevel,
                        course: data.course,
                    })
                }
                else{
                    alert('error, no student found')
                }
            })
            
        }
        
    }

    addItem(e){
        e.preventDefault()
        let {firstName,middleName,lastName,birthDate,course,yearLevel} = this.state
        if (firstName!=='' && middleName!=='' && lastName!=='' && birthDate!=='' && course!=='' && yearLevel!==''){
            axios.post('main/save/',{
                'id': this.state.id,
                'firstName': this.state.firstName,
                'middleName': this.state.middleName,
                'lastName': this.state.lastName,
                'birthDate': this.state.birthDate,
                'yearLevel': this.state.yearLevel,
                'course': this.state.course
            }).then((res)=>{
                console.log(res)
                if (res.data.message==='success'){
                    // back to list
                    if (this.props.params.id!==undefined){
                        this.setState({
                            success: true,
                        })
                    } else{
                        this.setState({
                            success: true,
                            firstName: '',
                            middleName: '',
                            lastName: '',
                            birthDate: '',
                            yearLevel: '',
                            course: ''
                        })
                    }
                }
                else{
                    alert('error on saving')
                }
            })
        } else{
            alert('supply all fields please')
        }
        
    }
    onChangeHandle(e){
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    closeAlert(e){
        this.setState({
            success: false
        })
    }

    render(){
        return(
            <div className="container">
                <hr />
             
                <a href="/#">
                    <button className="btn btn-primary btn-sm">BACK TO STUDENT LIST</button>
                </a>
                <h1>{this.props.params.id!==undefined ? 'Update Student' : 'Add Student'}</h1>  
                {this.state.success ? 
                <div className="alert alert-success" role="alert">
                    Success!
                 <button onClick={this.closeAlert.bind(this)} type="button" className="close" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                </div>
                : ''}
                <form>
                    <Input type="text" name="firstName" label="First Name" value={this.state.firstName} onChangeHandle={this.onChangeHandle.bind(this)} />
                    <Input type="text" name="middleName" label="Middle Name" value={this.state.middleName} onChangeHandle={this.onChangeHandle.bind(this)} />
                    <Input type="text" name="lastName" label="Last Name" value={this.state.lastName} onChangeHandle={this.onChangeHandle.bind(this)} />
                    <Input type="date" name="birthDate" label="Birth Date" value={this.state.birthDate} onChangeHandle={this.onChangeHandle.bind(this)} />
                    <Input type="select" name="yearLevel" 
                            label="Year Level" 
                            value={this.state.yearLevel} 
                            onChangeHandle={this.onChangeHandle.bind(this)}
                            options={['1st','2nd','3rd','4th','5th']}
                    />
                    <Input type="select" name="course" 
                            label="Course" 
                            value={this.state.course} 
                            onChangeHandle={this.onChangeHandle.bind(this)}
                            options={['BSIT','BSBA','BSCS','BSCRIM','BSPSYCH']}
                    />
                    <div className="form-group">
                        <button type="submit" className="btn btn-success" onClick={this.addItem.bind(this)}>Save</button>
                    </div>
                </form>
            </div>
        )
    }
}