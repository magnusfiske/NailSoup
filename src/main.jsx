import React from "react";
import ReactDOM from "react-dom/client";
import { 
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements, 
} from "react-router-dom";
import Home, {loader as startLoader} from './assets/pages/home/Home'
import Recipe, {loader as recipeLoader} from "./assets/components/recipe-info/Recipe"
import { ContactUs } from "./assets/pages/contact/ContactForm";
import AboutUs from "./assets/pages/about/AboutUs";
import "./index.css";
import App from "./App";
import Layout from "./Layout";
import ErrorPage from "./assets/components/Errors/Error-Page";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      element={<App />}
      path="/">
        <Route path="contact" element={<ContactUs />} />
        <Route path="about" element={<AboutUs />} />
        <Route path="recipe/:recipeId" element={<Recipe />} loader={recipeLoader} />
        <Route index element={<Home />} loader={startLoader} />
        <Route path="*" element={<ErrorPage/>}/>
    </Route>

  )
)

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Layout />,
//     children: [
//     {
//       index: <Home />,
//       // loader: startLoader,
//     },
//     {
//       path: "/contact",
//       element: <ContactUs />,
//     },
//     {
//       path: "/about",
//       element: <AboutUs />,
//     },
//     {
//       path: "recipe/recipeId",
//       element: <Recipe />,
//       loader: recipeLoader,
//     }
// ]}
// ])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);