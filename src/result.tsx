import { useState } from "react";
import { Button, Result } from "antd";
import App from "./App";

interface ResultScrProps {
    childName: string;
  }

function ResultScr({ childName }: ResultScrProps) {
  const [toMain, setToMain] = useState(false);

  const handleToMainClick = () => {
    setToMain(true);
  };

  if (toMain) {
    return <App />;
  }

  return (
    <Result
      status="success"
      title="Đăng ký học giáo lý thành công!"
      subTitle={`Đăng ký thành công cho ${childName}. Vui lòng chờ xác nhận từ ban giáo lý.`}
      extra={[
        !toMain ? (
          <Button type="primary" onClick={handleToMainClick}>
            Quay về trang chủ
          </Button>
        ) : (
          <App />
        ),
      ]}
    />
  );
}

export default ResultScr;
