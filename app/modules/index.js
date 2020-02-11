import React from 'react'
import { Router, Route, IndexRoute, hashHistory, browserHistory } from 'react-router';
import Form from '../modules/main/Form'
import List from '../modules/main/List'
export default class Index extends React.Component{
    render(){
        return(
            <Router history = { hashHistory }>
                <Route path="/" component={List} />
                <Route exact path="/add" component={Form} />
                <Route path='/update/:id' component={Form} />
            </Router>
        )
    }
}