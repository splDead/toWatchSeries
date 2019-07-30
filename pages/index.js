import React from 'react';
import axios from 'axios';
import Layout from '../components/Layout';

class LayoutPage extends React.Component {

    state = {
        user: {}
    };

    componentDidMount() {
        axios.post('/profile')
            .then(response => {
                this.setState({
                    user: response.data
                })
            })
    }

    render() {
        const {
            user
        } = this.state;

        debugger
        return (
            <Layout>
                <h1>
                    to watch series
                </h1>
                <h2>Hello {user.displayName}</h2>
            </Layout>
        );
    }
}

export default LayoutPage;
