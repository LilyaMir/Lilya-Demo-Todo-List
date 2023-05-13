import 'bootstrap/dist/css/bootstrap.min.css';
import "react-datepicker/dist/react-datepicker.css";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import Todo from "./pages/todo/Todo";
import About from "./pages/about/About";
import Contact from "./pages/contact/Contact";
import NavBar from "./components/navBar/NavBar"
import SingleTask from "./pages/singleTask/SingleTask";
import NotFound from './pages/notFound/NotFound';


const pages = [
  {
    path: "/",
    element: <Todo />,
  },
  {
    path: "/todo",
    element: <Todo />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/task/:taskId",
    element: <SingleTask />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

function App() {
  return (
    <BrowserRouter>
      <main>
        <NavBar />
        <Routes>
          {
            pages.map(page => (
              <Route
                key={page.path}
                path={page.path}
                element={page.element}
              />
            ))
          }
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;