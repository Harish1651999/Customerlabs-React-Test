import "./App.css";
import Container from "react-bootstrap/Container";
import { Button } from "react-bootstrap";
import Header from "./components/Header";
import SegmentOffcanvas from "./components/SegmentOffcanvas";
import { useState } from "react";

function App() {
  const [segmentShow, setSegmentShow] = useState(false);

  const handleShow = () => setSegmentShow(true);

  return (
    <>
      <Header />
      <main className="min-vh-100">
        <Container>
          <Button variant="info" onClick={handleShow}>
            Save Segment
          </Button>
          <SegmentOffcanvas
            show={segmentShow}
            onHide={() => setSegmentShow(false)}
            placement={"end"}
          />
        </Container>
      </main>
    </>
  );
}

export default App;
