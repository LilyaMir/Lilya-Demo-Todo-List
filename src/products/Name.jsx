import { Component } from 'react';

class Name extends Component{

    render(){
        const {text} = this.props;
        return (
            <div>Name: {text}</div>
            );
    }
}

export default Name;