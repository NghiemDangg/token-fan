import { publicRoutes } from './routers/index';

import { useRoutes } from 'react-router-dom';
import { Layout } from './layouts';

const App = () => {
    const routes = useRoutes(publicRoutes);
    return (
        <div className="App">
            <Layout>{routes}</Layout>
        </div>
    );
};

export default App;
