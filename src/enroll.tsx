import {
  Button,
  Form,
  Input,
  Select,
  DatePicker,
} from "antd";
import { useEffect, useState } from "react";
import ResultScr from "./result";

const { Option } = Select;

interface Question {
  questionId: number;
  questionText: string;
  questionType: string;
  options: { optionId: number; optionText: string }[] | null;
}

interface SurveyData {
  surveyId: number;
  surveyTitle: string;
  questions: Question[];
}

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

function Enroll() {
  const [form] = Form.useForm();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedChildName, setSubmittedChildName] = useState("");
  const [surveyData, setSurveyData] = useState<SurveyData | null>(null);

  useEffect(() => {
    fetch('/api/survey/1')
      .then(response => response.json())
      .then(data => setSurveyData(data.data))
      .catch(error => console.error('Error fetching survey data:', error));
  }, []);

  const onFinish = (values: { [key: string]: unknown }) => {
    console.log("Received values of form: ", values);
    setSubmittedChildName(values['childname'] as string);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return <ResultScr childName={submittedChildName} />;
  }

  if (!surveyData) {
    return <div>Loading...</div>;
  }

  return (
      <Form
        {...formItemLayout}
        form={form}
        layout="vertical"
        name="register"
        onFinish={onFinish}
        style={{ maxWidth: 600 }}
        scrollToFirstError
      >
        <h2>{surveyData.surveyTitle}</h2>
      {surveyData.questions.map((question) => (
        <Form.Item
          key={question.questionId}
          name={question.questionId}
          label={question.questionText}
          rules={[{ required: true, message: `Vui lòng trả lời câu hỏi này!` }]}
        >
          {question.questionType === 'text' ? (
            question.questionId === 4 || question.questionId === 7 ? (
              <DatePicker style={{ width: '100%' }} />
            ) : (
              <Input />
            )
          ) : (
            <Select placeholder="Chọn một lựa chọn">
              {question.options?.map((option) => (
                <Option key={option.optionId} value={option.optionId}>
                  {option.optionText}
                </Option>
              ))}
            </Select>
          )}
        </Form.Item>
      ))}
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Đăng ký
        </Button>
      </Form.Item>
    </Form>
  );
}
export default Enroll;
