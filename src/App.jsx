import { useState, createContext } from "react"
import Navbar from "./components/Navbar"
import ListView from "./routes/listView"
import DetailView from "./routes/DetailView"
import { Route, Routes } from "react-router-dom"


export const ThemeContext = createContext(null);

function App() {
  const [theme, setTheme] = useState('light')

  return (
    <>
      <ThemeContext.Provider value={{ theme }}>
        <div id={theme}>
          <Navbar
            setTheme={setTheme}
            theme={theme}
          />
          <main className="container">
            <Routes>
              <Route path='/' element={<ListView />} />
              <Route path='/detailView/:country/:borders?' element={<DetailView />} />
            </Routes>
          </main>
        </div>
      </ThemeContext.Provider>
    </>
  )
}

export default App
