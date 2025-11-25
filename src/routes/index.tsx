import { createFileRoute, Link } from '@tanstack/react-router';

const IndexRoute = () => {
    return (
        <div>
            <h1>Index Page</h1>
            <Link to={'/account'}>Go to /account/</Link>
            <br />
            <Link to={'/catalog'}>Go to /catalog/</Link>
        </div>
    );
};

export const Route = createFileRoute('/')({
    component: IndexRoute,
});
