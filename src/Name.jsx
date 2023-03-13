import Hello from './Hello';
function Name(){
    const name = "John Smith";
    return (
      <div>
        {name}
        <Hello  name= 'John' age={23}/>
      </div>
    );
  }
  export default Name;