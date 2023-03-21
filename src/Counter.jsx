import { Component } from 'react';
class Counter extends Component{
    count = 0;
    chengeCounter = ()=>{
        this.count++;
        console.log(this.count);
    };
    render(){
        
        return (
            <div>
            Count: {this.count}
            <button onClick={this.chengeCounter}>+</button>
            </div>
            );
    }
}

export default Counter;