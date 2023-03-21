function Hello(props){
    // console.log('props', props);
  
      return  (
        <h2>
      Hello from another component!
      Hello, I am {props.name}, I am {props.age} years old!
      </h2>
      );
    }
  
    export default Hello;