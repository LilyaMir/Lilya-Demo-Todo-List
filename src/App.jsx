import 'bootstrap/dist/css/bootstrap.min.css';
import "react-datepicker/dist/react-datepicker.css";
import 'react-toastify/dist/ReactToastify.css';
import Todo from './components/todo/Todo';
import './App.css';

function App(){
    return (
      <main className="body main">      
          <Todo />
      </main>

    );
}

export default App;