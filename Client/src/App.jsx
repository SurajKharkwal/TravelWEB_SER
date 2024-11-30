
import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import BookPage from './pages/bookPage';
import HomePage from './pages/HomePage';
import AboutPage from './pages/aboutPage';
import PackagePage from './pages/packagePage';
import LoginForm from './pages/LoginPage';
import SignUpForm from './pages/SignUp';
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />, 

    },
    {
      path: "/About",
      element: <AboutPage />,
    },
    {
      path: "/Book",
      element: <BookPage />,
    },
    {
      path: "/Package",
      element: < PackagePage/>,
    },
    {
      path: "/Login",
      element:< LoginForm/>,

    },  
    {
      path: "/SignUp",
      element: < SignUpForm/>,
    },     
  ]);

  return (
    <>
        <RouterProvider router={router} />
    </>
  );
}
export default App;
