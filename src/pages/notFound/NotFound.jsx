import { Link } from 'react-router-dom';

function NotFound(){

    return (
        <div>
        <h1 className="text-center">404 Page not found</h1>
        <Link to='/'>Go to homepage</Link>
        </div>
    )
}

export default NotFound;