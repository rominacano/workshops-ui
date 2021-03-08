import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import './App.css';
import routes, { renderRoutes } from 'src/routes';
import { AuthProvider } from 'src/contexts/JWTAuthContext';
import { SnackbarProvider } from 'notistack';

const history = createBrowserHistory();

function App() {
  return (
    <SnackbarProvider dense maxSnack={3}>
      <Router history={history}>
        <AuthProvider>{renderRoutes(routes)}</AuthProvider>
      </Router>
    </SnackbarProvider>
  );
}

export default App;
