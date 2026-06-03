import { useState } from "react";
import Navbar from "./components/Navbar";
import Body from "./components/Body";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Body />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);
function App() {
  const [count, setCount] = useState(0);

  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
