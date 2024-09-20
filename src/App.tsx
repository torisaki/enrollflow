import "./App.css";
import { Button, Select  } from "antd";
import Enroll from "./enroll";
import { useState , useEffect} from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const { Option } = Select;

interface Major {
  id: number;
  name: string;
}

function App() {
  const [showEnroll, setShowEnroll] = useState(false);
  const [majors, setMajors] = useState<Major[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      navigate('/login');
    }
    fetchMajors();
  }, [navigate]);

  const fetchMajors = async () => {
    try {
      const response = await axios.get('https://sep490-backend-production.up.railway.app/api/v1/major?page=0&size=10');
      setMajors(response.data.data.content);
    } catch (error) {
      console.error('Error fetching majors:', error);
    }
  };

  const handleEnrollClick = () => {
    setShowEnroll(true);
  };

  const handleMajorChange = (value: number) => {
    console.log(`Selected major ID: ${value}`);
  };

  return (
    <>
      {!showEnroll ? (
        <>
        <Select
          style={{ width: 200, marginBottom: 16 }}
          placeholder="Select a major"
          onChange={handleMajorChange}
        >
          {majors.map(major => (
            <Option key={major.id} value={major.id}>{major.name}</Option>
          ))}
        </Select>
        <Button type="primary" onClick={handleEnrollClick}>
          Đăng ký học
        </Button>
      </>
      ) : (
        <Enroll />
      )}
    </>
  );

}

export default App;
