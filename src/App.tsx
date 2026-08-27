import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import LiveClasses from './pages/LiveClasses/LiveClasses'
import LiveClassDetails from './pages/LiveClasses/LiveClassDetails'
import LiveClassRoom from './pages/LiveClasses/LiveClassRoom'
import ClassEnded from './pages/LiveClasses/ClassEnded'
import Recordings from './pages/LiveClasses/Recordings'
import JoinClass from './Components/LiveClass/JoinClass'
import ClassAnalytics from './pages/LiveClasses/ClassAnalytics'
import PostClassReview from './pages/LiveClasses/PostClassReview'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LiveClasses />} />
        <Route path="/live-classes" element={<LiveClasses />} />
        <Route path="/live-classes/:classId" element={<LiveClassDetails />} />
        <Route path="/live-classes/:classId/room" element={<LiveClassRoom />} />
        <Route path="/class-ended" element={<ClassEnded />} />
        <Route path="/recordings" element={<Recordings />} />
        <Route path="/live-classes/:classId/join" element={<JoinClass />} />
        <Route path="/live-classes/:classId/analytics" element={<ClassAnalytics />} />
        <Route path="/live-classes/:classId/review" element={<PostClassReview />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

