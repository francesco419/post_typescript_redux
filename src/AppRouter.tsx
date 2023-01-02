import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import Main from "./pages/Main";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={`${process.env.PUBLIC_URL}/`} element={<Main />} />
      </Routes>
    </BrowserRouter>
  );
};
export default AppRouter;
