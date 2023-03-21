import { Component } from 'react';

class Name extends Component{

    render(){
        const {text} = this.props;
        return (
            <div>{text}</div>
            );
    }
}

export default Name;