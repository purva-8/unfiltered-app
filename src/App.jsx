import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import GraffitiWall from "./pages/GraffitiWall";
import PortraitCanvas from "./pages/PortraitCanvas";
import GutFeeling from "./pages/GutFeeling";
import Feed from "./pages/Feed";
import Daily from "./pages/Daily";
import Echo from "./pages/Echo";  // Import Echo page

export default function App() {
  return (
    <Router>
      <nav style={{
        display: "flex",
        justifyContent: "center",
        gap: "2rem",
        padding: "1.2rem",
        fontWeight: "600",
        fontSize: "1rem",
        background: "#FAF7F2",
        borderBottom: "1px solid #ddd",
      }}>
        <Link to="/">home</Link>
        <Link to="/graffiti">vibe wall</Link>
        <Link to="/portrait">canvas</Link>
        <Link to="/gut">gut check</Link>
        <Link to="/feed">hive</Link>
        <Link to="/daily">roll it!</Link>
        <Link to="/echo">echo</Link> {/* Echo nav link */}
      </nav>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/graffiti" element={<GraffitiWall />} />
          <Route path="/portrait" element={<PortraitCanvas />} />
          <Route path="/gut" element={<GutFeeling />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/daily" element={<Daily />} />
          <Route path="/echo" element={<Echo />} /> {/* Echo route */}
        </Routes>
      </main>
    </Router>
  );
}
