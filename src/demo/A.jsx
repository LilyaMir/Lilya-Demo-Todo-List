import { Component, PureComponent, useState, useEffect, useMemo } from "react";

class B extends Component {
state = {
  value: '',
  number: 12,
};

  render() {
    return (
      <div>
        <h4>Component B</h4>
        <input
          type="text"
          value = {this.state.value}
          onChange={(event) => {
            this.setState({
                value: event.target.value
            });
          }}
        />
        <p>{this.state.value}</p>
      </div>
    );
  }
}

function C() {
  const [values, setValues] = useState({
    value: '',
    number: 12,
  });



const arr = useMemo(()=>{
  const array = [];
  for(let i=1; i<=10; i++){
    console.log('i=', i);
    array.push(
      <button 
      key={i}
      className="btn btn-primary m-1"
      >Button N {i}</button>
      );
  }
  return array;
}, []);

  const [number, setNumber] = useState(0);
  console.log('numbers', number);
  useEffect(()=>{
    console.log('useEffect componentDidMount');

    return ()=>{
      console.log('useEffect componentWillUnmount');
    }
  }, []);

  useEffect(()=>{
    console.log('useEffect componentDidMount, componentDidUpdate - number');
  }, [number]);

  useEffect(()=>{
    console.log('useEffect componentDidMount, componentDidUpdate');
  });

  // useEffect(()=>{
  //   console.log('useEffect componentDidUpdate');
  // }, [values]);

  return (
    <div>
    <h4>Component C</h4>
    <input
      type="text"
      // value = {this.state.value}
      onChange={(event) => {
        setValues({
          ...values,
            value: event.target.value
        });
      }}
    />
    <button
    onClick={()=>{
      setNumber(number+1);
    }}
    >Number++</button>
    <p>{values.value}</p>
    {arr}
  </div>
  );
}

class A extends PureComponent {
state ={
  showC: true,
};
  render() {
    return (
      <div>
      <B />
      {this.state.showC && <C />}
      <button
      onClick={()=>{
        this.setState({showC : !this.state.showC})
      }}
      >Toggle C</button>
      </div>
    );
  }
}

export default A;