import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import Home from './pages/Home';
import Error from './pages/Error';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import CardDetail from './pages/CardDetail';
import Layout from './components/shared/Layout';
import { Provider, useSelector } from 'react-redux';
import store, { persistor } from './state/store';
import { PersistGate } from 'redux-persist/integration/react';
import { selectCurrentUser } from './features/authSlice';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Write from './pages/Write';

function ProtectedRoute({ children }) {
  const user = useSelector(selectCurrentUser);
  if (!user) {
    return null; // Sadece null döndür, toast Card'da gösterilecek
  }
  return children;
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />, // Layout burada
    errorElement: <Error />,
    children: [
      { index: true, element: <Home /> },
      { path: 'sign-in', element: <SignIn /> },
      { path: 'sign-up', element: <SignUp /> },
      { path: 'write', element: <Write /> },
      {
        path: 'blogs/:id',
        element: (
          <ProtectedRoute>
            <CardDetail />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ToastContainer />
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  );
}

export default App;
