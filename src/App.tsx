import "./App.css";
import { Button, Select } from "antd";
import Enroll from "./enroll";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const { Option } = Select;

interface Major {
  id: number;
  name: string;
}

interface Grade {
  id: number;
  name: string;
  description: string | null;
  status: string;
  major: {
    id: number;
    name: string;
    description: string | null;
    status: string;
  };
  createdBy: string | null;
  createdDate: string | null;
  lastModifiedBy: string | null;
  lastModifiedDate: string | null;
}

function App() {
  const [showEnroll, setShowEnroll] = useState(false);
  const [majors, setMajors] = useState<Major[]>([]);
  const [grades, setGrades] = useState<Grade[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      navigate("/login");
    }
    fetchMajors();
    fetchGrades();
  }, [navigate]);

  const fetchMajors = async () => {
    try {
      const response = await axios.get(
        "https://sep490-backend-production.up.railway.app/api/v1/major?page=0&size=10"
      );
      setMajors(response.data.data.content);
    } catch (error) {
      console.error("Error fetching majors:", error);
    }
  };

  const fetchGrades = async () => {
    try {
      const response = await axios.get('https://sep490-backend-production.up.railway.app/api/grade?page=0&size=10');
      if (response.data && Array.isArray(response.data.content)) {
        setGrades(response.data.content);
      } else if (response.data && response.data.data && Array.isArray(response.data.data.content)) {
        setGrades(response.data.data.content);
      } else {
        console.error('Unexpected response structure:', response.data);
        setGrades([]);
      }
    } catch (error) {
      console.error('Error fetching grades:', error);
      setGrades([]);
    }
  };

  const handleEnrollClick = () => {
    setShowEnroll(true);
  };

  const handleMajorChange = (value: number) => {
    console.log(`Selected major ID: ${value}`);
  };

  const handleGradeChange = (value: number) => {
    console.log(`Selected major ID: ${value}`);
  };

  return (
    <>
      {!showEnroll ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div>
            <label htmlFor="major-select" style={{ marginRight: "8px" }}>
              Major:
            </label>
            <Select
              id="major-select"
              style={{ width: 200 }}
              placeholder="Select a major"
              onChange={handleMajorChange}
            >
              {majors.map((major) => (
                <Option key={major.id} value={major.id}>
                  {major.name}
                </Option>
              ))}
            </Select>
          </div>
          <div>
            <label htmlFor="grade-select" style={{ marginRight: "8px" }}>
              Grade:
            </label>
            <Select
              id="grade-select"
              style={{ width: 200 }}
              placeholder="Select a grade"
              onChange={handleGradeChange}
            >
              {Array.isArray(grades) &&
                grades.map((grade) => (
                  <Option key={grade.id} value={grade.id}>
                    {grade.name}
                  </Option>
                ))}
            </Select>
          </div>
          <div>
            <Button type="primary" onClick={handleEnrollClick}>
              Đăng ký học
            </Button>
          </div>
        </div>
      ) : (
        <Enroll />
      )}
    </>
  );
}

export default App;
