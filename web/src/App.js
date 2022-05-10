import "./App.css"
import { BrowserRouter, Link, Route, Routes } from "react-router-dom"
import Goals from "./components/Goals/Goals"
import Finisheds from "./components/Finished/Finisheds"
import FinishAllGoals from "./components/FinishAll/FinishAllGoals"
import Layout from "./components/Layout/Layout"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="goals" element={<Goals />} />
          <Route path="finished" element={<Finisheds />} />
          <Route path="all" element={<FinishAllGoals />} />
          <Route path="*" element={<>Yellow</>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
