import './App.css';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
  Outlet,
} from 'react-router-dom';
import Home from './pages/Home';
import Error from './pages/Error';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import CardDetail from './pages/CardDetail';
import Layout from './components/shared/Layout';
import { Provider } from 'react-redux';
import { store } from './state/store';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from './features/authSlice';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ProtectedRoute() {
  const user = useSelector(selectCurrentUser);
  console.log(user);
  const currentUser = true; // Bunu gerçek auth state ile değiştir
  return currentUser ? <Outlet /> : <Navigate to="/sign-in" />;
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
      {
        path: 'detail',
        element: <ProtectedRoute />,
        children: [{ index: true, element: <CardDetail /> }],
      },
    ],
  },
]);

function App() {
  return (
    <Provider store={store}>
      <ToastContainer />
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
