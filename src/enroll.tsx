import {
  Button,
  Form,
  Input,
  Select,
  DatePicker,
  Divider,
} from "antd";
import { useState } from "react";
//import { InboxOutlined } from "@ant-design/icons";
import ResultScr from "./result";

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

// const normFile = (e: unknown) => {
//   if (Array.isArray(e)) {
//     return e;
//   }
//   return (e as { fileList?: unknown })?.fileList;
// };

function Enroll() {
  const [form] = Form.useForm();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedChildName, setSubmittedChildName] = useState("");

  const onFinish = (values: { childname: string }) => {
    console.log("Received values of form: ", values);
    setSubmittedChildName(values.childname);
    setIsSubmitted(true);
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="84">+84</Option>
        <Option value="87">+87</Option>
      </Select>
    </Form.Item>
  );

  if (isSubmitted) {
    return <ResultScr childName={submittedChildName} />;
  }

  return (
    <>
      <Form
        {...formItemLayout}
        form={form}
        layout="vertical"
        name="register"
        labelWrap
        onFinish={onFinish}
        initialValues={{
          prefix: "+84",
        }}
        style={{ maxWidth: 600 }}
        scrollToFirstError
      >
        <Divider orientation="left">Câu hỏi về phụ huynh</Divider>
        <Form.Item
          name="parentname"
          label="Tên của phụ huynh là gì?"
          validateTrigger="onBlur"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tên phụ huynh!",
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email của phụ huynh là gì?"
          validateTrigger="onBlur"
          rules={[
            {
              type: "email",
              message: "E-mail không hợp lệ!",
            },
            {
              required: true,
              message: "Vui lòng nhập E-mail!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="phone"
          label="Số điện thoại của phụ huynh là gì?"
          validateTrigger="onBlur"
          rules={[{ required: true, message: "Vui lòng nhập số điện thoại!" }]}
        >
          <Input addonBefore={prefixSelector} style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          name="dob1"
          label="Ngày tháng năm sinh của phụ huynh?"
          rules={[
            {
              required: true,
              message: "Vui lòng chọn ngày sinh!",
            },
          ]}
          hasFeedback
        >
          <DatePicker />
        </Form.Item>

        <Form.Item
          name="gender1"
          label="Giới tính của phụ huynh là gì?"
          rules={[{ required: true, message: "Vui lòng chọn giới tính!" }]}
        >
          <Select placeholder="Chọn khối lớp">
            <Option value="m1">Nam</Option>
            <Option value="f1">Nữ</Option>
            <Option value="e1">Giới tính khác</Option>
          </Select>
        </Form.Item>

        <Divider orientation="left">Câu hỏi về học sinh</Divider>

        <Form.Item
          name="childname"
          label="Tên của con bạn là gì?"
          validateTrigger="onBlur"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tên thiếu nhi!",
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="dob1"
          label="Con bạn sinh ngày tháng năm nào?"
          rules={[
            {
              required: true,
              message: "Vui lòng chọn ngày sinh!",
            },
          ]}
          hasFeedback
        >
          <DatePicker />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email của con bạn là gì?"
          validateTrigger="onBlur"
          rules={[
            {
              type: "email",
              message: "E-mail không hợp lệ!",
            },
            {
              required: true,
              message: "Vui lòng nhập E-mail!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="giaoxu"
          label="Con bạn thuộc giáo xứ nào?"
          validateTrigger="onBlur"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập giáo xứ!",
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="grade"
          label="Con đã hoàn thành khối nào ở giáo xứ hiện tại?"
          rules={[{ required: true, message: "Vui lòng chọn khối lớp!" }]}
        >
          <Select placeholder="Chọn khối lớp">
            <Option value="kt">Khai Tâm I - Ấu nhi</Option>
            <Option value="kt">Khai Tâm II - Ấu nhi</Option>
            <Option value="rl">Rước lễ I - Thiếu nhi</Option>
            <Option value="rl">Rước lễ II - Thiếu nhi</Option>
            <Option value="rl">Thêm Sức I - Thiếu nhi</Option>
            <Option value="rl">Thêm Sức II - Thiếu nhi</Option>
            <Option value="rl">Bao Đồng I - Nghĩa sĩ</Option>
            <Option value="rl">Bao Đồng II - Nghĩa sĩ</Option>
            <Option value="rl">Bao Đồng III - Nghĩa sĩ</Option>
            <Option value="rl">Bao Đồng IV - Nghĩa sĩ</Option>
            <Option value="rl">Vào Đời I - Hiệp sĩ </Option>
            <Option value="vd">Vào Đời II - Hiệp sĩ </Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="gender1"
          label="Giới tính của con bạn là gì?"
          rules={[{ required: true, message: "Vui lòng chọn giới tính!" }]}
        >
          <Select placeholder="Chọn giới tính">
            <Option value="m1">Nam</Option>
            <Option value="f1">Nữ</Option>
            <Option value="e1">Giới tính khác</Option>
          </Select>
        </Form.Item>

        {/* <Form.Item
          label="Upload hình"
          rules={[{ required: true, message: "Vui lòng upload file yêu cầu!" }]}
        >
          <Form.Item
            name="dragger"
            valuePropName="fileList"
            tooltip="Phụ huynh upload những file theo yêu cầu: hình sổ gia đình công giáo và giấy xác nhận hoàn thành lớp giáo lý."
            getValueFromEvent={normFile}
            noStyle
          >
            <Upload.Dragger name="files" action="/upload.do">
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                Nhấn hoặc kéo thả file vào khu vực này để upload.
              </p>
            </Upload.Dragger>
          </Form.Item>
        </Form.Item> */}

        {/* <Form.Item
          name="agreement"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value
                  ? Promise.resolve()
                  : Promise.reject(new Error("Should accept agreement")),
            },
          ]}
          {...tailFormItemLayout}
        >
          <Checkbox>Tôi đảm bảo các thông tin trên là chính xác.</Checkbox>
        </Form.Item> */}
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Đăng ký
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
export default Enroll;
