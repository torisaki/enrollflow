import React from "react";
import { Descriptions } from "antd";
import { DescriptionsProps, Button, Flex } from "antd";
import { useNavigate } from "react-router-dom";

const items: DescriptionsProps["items"] = [
  {
    key: "1",
    label: "Tên phụ huynh",
    children: "Nguyễn Văn A",
  },
  {
    key: "2",
    label: "Email phụ huynh",
    children: "a@gmail.com",
  },
  {
    key: "3",
    label: "Số điện thoại phụ huynh",
    children: "567809546345",
  },
  {
    key: "4",
    label: "Ngày sinh phụ huynh",
    children: "1999-04-24",
  },
  {
    key: "5",
    label: "Giới tính phụ huynh",
    children: "Nam",
  },
  {
    key: "6",
    label: "Tên thiếu nhi",
    children: "Tăng Văn A",
  },
  {
    key: "7",
    label: "Ngày sinh thiếu nhi",
    children: "2003-04-19",
  },
  {
    key: "8",
    label: "Email thiếu nhi",
    children: "aa@gmail.com",
  },
  {
    key: "9",
    label: "Giáo xứ",
    children: "Giáo xứ Phước Vĩnh",
  },
  {
    key: "10",
    label: "Giới tính thiếu nhi",
    children: "Nam",
  },
  {
    key: "11",
    label: "Khối lớp đã hoàn thành",
    children: "Khai Tâm II - Ấu nhi",
  },
];

const ApplicationDetail: React.FC = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    // You can add any additional logic here before navigating
    navigate("/admin");
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <div style={{ width: '100%' }}>
        <Descriptions
          title={`Thông tin đăng ký học`}
          bordered
          items={items}
        />
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <Flex gap="small" wrap justify="center">
            <Button type="primary" onClick={handleButtonClick}>Đồng ý</Button>
            <Button danger onClick={handleButtonClick}>Từ chối</Button>
          </Flex>
        </div>
      </div>
    </div>
  );
};

export default ApplicationDetail;
