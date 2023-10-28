import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import store from "./store";
import { Provider } from "react-redux";
import { Home, Questions, View, Responses } from './pages';
import { HeaderLayout } from "./layouts";

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

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
