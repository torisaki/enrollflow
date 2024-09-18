import "./App.css";
import { Button } from 'antd';
import Enroll from "./enroll";
import { useState } from "react";

function App() {
  const [showEnroll, setShowEnroll] = useState(false);

  const handleEnrollClick = () => {
    setShowEnroll(true);
  };

  return (
    <>
      {!showEnroll ? (
        <Button type="primary" onClick={handleEnrollClick}>Đăng ký học</Button>
      ) : (
        <Enroll />
      )}
    </>
  );
}

export default App;
