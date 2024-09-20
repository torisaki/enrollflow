import "./App.css";
import { Button } from "antd";
import Enroll from "./enroll";
import { useState , useEffect} from "react";
import { useNavigate } from "react-router-dom";

function App() {
  const [showEnroll, setShowEnroll] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [navigate]);

  const handleEnrollClick = () => {
    setShowEnroll(true);
  };

  return (
    <>
      {!showEnroll ? (
        <Button type="primary" onClick={handleEnrollClick}>
          Đăng ký học
        </Button>
      ) : (
        <Enroll />
      )}
    </>
  );

}

export default App;
