import { ThemeProvider } from "../context/theme/ThemeProvider";
import AppRoutes from "./AppRoutes";
import Header from "../component/Header";

function App() {
  return(
    <ThemeProvider>
      <Header />
      <AppRoutes/>
    </ThemeProvider>
  )
}

export default App;