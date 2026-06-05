import { useState } from "react";
import Navbar from "./components/Navbar";
import Body from "./components/Body";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/Login";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Feed from "./components/Feed";
import Profile from "./components/Profile";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Body />,
    children: [
      {
        path:"/login",
        index:true,
        element: <Login />,
      },
      {
        path:"/feed",
        element:<Feed/>
      },{
        path:"/profile",
        element:<Profile/>
      }
    ],
  },
]);
function App() {

  return (
    <Provider store={appStore }>
      <RouterProvider router={appRouter}></RouterProvider>
    </Provider>
  );
}

export default App;
