import { Component } from 'react';

class Counter extends Component{
// constructor(props){
//     super(props);
//     this.state = {
//         text: props.name
//     }
// }

    state = {
        count:0,
        test: 'hello',
    };
   

    changeCounter = ()=>{
        // this.setState(
        //     (state)=>{
        //         return {
        //             count: state.count + 1,
        //         };
        // }, 
        // ()=>{
        //     console.log(this.state.count);
        // });

        this.setState({
            count: this.state.count + 1,
        });

    };

    render(){
        return (
            <div>
           Count: {this.state.count}
            <button onClick={this.changeCounter}>+</button>
            </div>
            );
    
    }
}

export default Counter;