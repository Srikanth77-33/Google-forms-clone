import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { Home, Questions } from "./components";
import store from "./store";
import { Provider } from "react-redux";
import HeaderLayout from "./components/layouts/HeaderLayout";
import View from "./components/form/View";
import Responses from "./components/form/Responses";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route index element={<Home />} />
      <Route path=":id/" element={<HeaderLayout />}>
        <Route path="edit" element={<Questions />} />
        <Route path="view" element={<View />} />
        <Route path="responses" element={<Responses />} />
      </Route>
    </Route>
  )
);

// <Route>
// <Route index element={<Home />} />
// <Route path=":id" element={<Form />} />
// <Route path="/dummy" element={<Dummy />} />
// </Route>

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
