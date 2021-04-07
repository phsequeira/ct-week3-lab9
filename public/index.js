import React, { Component } from 'react'
import {
    BrowserRouter as Router, 
    Route, 
    Switch,
} from 'react-router-dom';
import SearchPage from './Pages';
import DetailPage from './Pages';
import ProfilePage from './Pages';

export default class App extends Component {
    render() {
        return (
            <div>
                <Router>
                    <Switch>
                        <Route 
                            path="/" 
                            exact
                            render={(routerProps) => <SearchPage {...routerProps} />} 
                        />
                        <Route 
                          path="/users/:username" 
                          exact
                          render={(routerProps) => <DetailPage {...routerProps} />} 
                        />
                        <Route 
                            path="/users/:Id" 
                            exact
                            render={(routerProps) => <ProfilePage {...routerProps} />} 
                        />
                    </Switch>
                </Router>
            </div>
        )
    }
}