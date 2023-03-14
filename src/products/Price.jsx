import { Component } from 'react';


class Price extends Component{

    render(){
        const {text} = this.props;
        return (
            <div> Price: {text}</div>
            );
    }
}

export default Price;