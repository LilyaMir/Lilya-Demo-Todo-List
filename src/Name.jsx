import Hello from './Hello';
function Name(){
    const name = "John Smith";
    return (
      <div>
        {name}
        <Hello />
      </div>
    );
  }
  export default Name;