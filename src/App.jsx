import Product from './products/Product';
import './App.css';
import Counter from './Counter'

function App() {
;  return (
    <div className="App">
      <Product 
      name='banana' 
      price='5$' 
      description='Fresh bananas from Ecuador'  
      />

      <Counter />
    </div>
  );
}

export default App;