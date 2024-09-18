import {
  Button,
  Checkbox,
  Form,
  Input,
  Select,
  DatePicker,
  Upload,
} from "antd";
import { useState } from 'react';
import { InboxOutlined } from "@ant-design/icons";
import ResultScr from './result';

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

const normFile = (e: unknown) => {
  if (Array.isArray(e)) {
    return e;
  }
  return (e as { fileList?: unknown })?.fileList;
};

function Enroll() {
  const [form] = Form.useForm();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedChildName, setSubmittedChildName] = useState('');

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
        name="register"
        labelWrap
        onFinish={onFinish}
        initialValues={{
          prefix: "+84",
        }}
        style={{ maxWidth: 600 }}
        scrollToFirstError
      >
        <Form.Item
          name="childname"
          label="Tên thiếu nhi"
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
          name="dob"
          label="Ngày sinh"
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
          name="address"
          label="Địa chỉ"
          validateTrigger="onBlur"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập địa chỉ nơi ở!",
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="parentname"
          label="Tên phụ huynh"
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
          name="phone"
          label="Số điện thoại phụ huynh"
          validateTrigger="onBlur"
          rules={[{ required: true, message: "Vui lòng nhập số điện thoại!" }]}
        >
          <Input addonBefore={prefixSelector} style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email phụ huynh"
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
          name="grade"
          label="Khối lớp"
          rules={[{ required: true, message: "Vui lòng chọn khối lớp!" }]}
        >
          <Select placeholder="Chọn khối lớp">
            <Option value="kt">Khai Tâm</Option>
            <Option value="rl">Rước lễ</Option>
            <Option value="vd">Vào Đời</Option>
          </Select>
        </Form.Item>

        <Form.Item label="Upload hình" rules={[{ required: true, message: "Vui lòng upload file yêu cầu!" }]}>
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
        </Form.Item>

        <Form.Item
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
          <Checkbox>
            Tôi đảm bảo các thông tin trên là chính xác.
          </Checkbox>
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Đăng ký
          </Button>
        </Form.Item>
      </Form>
    </>
  );

}export default Enroll;
