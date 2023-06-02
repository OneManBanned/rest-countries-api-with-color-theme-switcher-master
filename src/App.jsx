import { useState } from "react"
import '../dist/css/index.css'
import ListView from "./components/ListView"
import DetailView from "./components/DetailView"

function App() {
  const [isDetailView, setIsDetailView] = useState(false)

  return (
    <>

      <main>
        <ListView
          view={setDetailView}
        />
      </main>
    </>
  )
}

export default App
