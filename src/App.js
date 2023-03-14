
import Product from './products/Product';
import './App.css';

function App() {
  return (
    <div className="App">
      <Product 
      name='banana' 
      price='5$' 
      description='Fresh bananas from Ecuador'  
      />
    </div>
  );
}

export default App;
