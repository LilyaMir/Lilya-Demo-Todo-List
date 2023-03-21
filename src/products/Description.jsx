import { Component } from 'react';

class Description extends Component{

    render(){
        
        return (
            <span>{this.props.text}</span>
            );
    }
}

export default Description;