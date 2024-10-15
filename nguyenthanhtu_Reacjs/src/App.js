import { useRoutes } from 'react-router-dom';
import LayoutBackend from './layouts/backend';
import LayoutFrontend from './layouts/frontend';
import NotFound from './pages/NotFounds';
import RouterBackend from './router/RouterBackend';
import RouterFrontend from './router/RouterFrontend';
function App() {
  let element = useRoutes([
    {
      path: "/",
      element: <LayoutFrontend />,
      children: RouterFrontend,
    },
    {
      path: "/admin",
      element: <LayoutBackend />,
      children: RouterBackend,
    },
    { path: "*", element: <NotFound /> },
  ]);

  return element;
}
export default App;
