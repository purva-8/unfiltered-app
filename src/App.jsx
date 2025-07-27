import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import GraffitiWall from "./pages/GraffitiWall";
import PortraitCanvas from "./pages/PortraitCanvas";
import GutFeeling from "./pages/GutFeeling";
import Feed from "./pages/Feed";
import Daily from "./pages/Daily";
import Echo from "./pages/Echo";  // Import Echo page
import Whispers from "./pages/Whispers"; // Import Whispers page

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
        <Link to="/whispers">whispers</Link> {/* Whispers nav link */}
        <Link to="/echo">echo</Link> {/* Echo nav link */}
        <Link to="/daily">roll it!</Link>

      </nav>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/graffiti" element={<GraffitiWall />} />
          <Route path="/portrait" element={<PortraitCanvas />} />
          <Route path="/gut" element={<GutFeeling />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/whispers" element={<Whispers />} /> {/* Whispers route */}
          <Route path="/echo" element={<Echo />} /> {/* Echo route */}
          <Route path="/daily" element={<Daily />} />

        </Routes>
      </main>
    </Router>
  );
}
