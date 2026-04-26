import { ThemeProvider } from "../context/theme/ThemeProvider";
import AppRoutes from "./AppRoutes";
import Header from "../component/Header";
import { LanguageProvider } from "../context/language/LanguageProvider";

function App() {
  return(
    <ThemeProvider>
      <LanguageProvider>
        <Header />
        <AppRoutes/>
      </LanguageProvider>
    </ThemeProvider>
  )
}

export default App;