
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NavBar } from "./components/navBar/NavBar";
import { Books } from "./pages/Books";
import { Authors } from "./pages/Authors";
import store from "./store";
import { Provider } from "react-redux";
import { ThemeProvider, createTheme } from '@mui/material/styles';

const THEME = createTheme({
  typography: {
    "fontFamily": `"Verdana", sans-serif`,
    "fontSize": 12,
  }
});


const App = () => {
  return (
    <ThemeProvider theme={THEME}>

      <Provider store={store}>
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path={'/'} element={<Books />} />
            <Route path={'/books'} element={<Books />} />
            <Route path={'/authors'} element={<Authors />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </ThemeProvider>


  );
};

export default App;
