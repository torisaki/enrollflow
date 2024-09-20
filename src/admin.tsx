import React, { useContext, useEffect, useRef, useState } from "react";
import type { GetRef, InputRef, TableProps } from "antd";
import { Form, Input, Table, Tag } from "antd";
import { Link } from 'react-router-dom';
import { CheckCircleOutlined, ClockCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';

type FormInstance<T> = GetRef<typeof Form<T>>;

const EditableContext = React.createContext<FormInstance<unknown> | null>(null);

interface Item {
  key: string;
  name: string;
  age: string;
  address: string;
}

interface EditableRowProps {
  index: number;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

interface EditableCellProps {
  title: React.ReactNode;
  editable: boolean;
  dataIndex: keyof Item;
  record: Item;
  handleSave: (record: Item) => void;
}

const EditableCell: React.FC<React.PropsWithChildren<EditableCellProps>> = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<InputRef>(null);
  const form = useContext(EditableContext)!;

  useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();

      toggleEdit();
      handleSave({ ...record, ...(values as Record<string, unknown>) });
    } catch (errInfo) {
      console.log("Save failed:", errInfo);
    }
  };
  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{ margin: 0 }}
        name={dataIndex}
        rules={[{ required: true, message: `${title} is required.` }]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{ paddingInlineEnd: 24 }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

interface DataType {
  key: React.Key;
  childname: string;
  parentname: string;
  status: string;
}

type ColumnTypes = Exclude<TableProps["columns"], undefined>;

const Admin: React.FC = () => {
  const [dataSource, setDataSource] = useState<DataType[]>([
    {
      key: "0",
      childname: "Nguyễn Văn A",
      parentname: "Trần Đại A",
      status: "Đã chấp nhận",
    },
    {
      key: "1",
      childname: "Nguyễn Văn B",
      parentname: "Trần Đại B",
      status: "Đang chờ",
    },
    {
      key: "2",
      childname: "Nguyễn Văn C",
      parentname: "Trần Đại C",
      status: "Đang chờ",
    },
    {
      key: "3",
      childname: "Nguyễn Văn D",
      parentname: "Trần Đại D",
      status: "Đã từ chối",
    },
  ]);

  const defaultColumns: (ColumnTypes[number] & {
    editable?: boolean;
    dataIndex: string;
  })[] = [
    {
      title: "STT",
      dataIndex: "key",
      width: "10%",
    },
    {
      title: "Tên thiếu nhi",
      dataIndex: "childname",
    },
    {
      title: "Tên phụ huynh",
      dataIndex: "parentname",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      render: (status: string) => {
        let color = 'default';
        let icon = null;
    
        switch (status) {
          case 'Đã chấp nhận':
            color = 'success';
            icon = <CheckCircleOutlined />;
            break;
          case 'Đang chờ':
            color = 'processing';
            icon = <ClockCircleOutlined />;
            break;
          case 'Đã từ chối':
            color = 'error';
            icon = <CloseCircleOutlined />;
            break;
        }
    
        return (
          <Tag icon={icon} color={color}>
            {status.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: "Hành động",
      dataIndex: "operation",
      render: (_, record) =>
        dataSource.length >= 1
          ? <Link to={`/application-detail/${record.key}`}>Xem chi tiết</Link>
          : null,
    },
  ];

  const handleSave = (row: DataType) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSource(newData);
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: DataType) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });

  return (
    <div>
      <Table
        components={components}
        rowClassName={() => "editable-row"}
        bordered
        dataSource={dataSource}
        columns={columns as ColumnTypes}
      />
    </div>
  );
};

export default Admin;
