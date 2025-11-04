import React from "react";
import { Drawer, Form, Input, InputNumber, Select, Switch, Button, DatePicker, Space, message } from "antd";
import dayjs from "dayjs";

interface DrawerProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (values: any) => void;
}

const { Option } = Select;

const SourcingFormDrawer: React.FC<DrawerProps> = ({ visible, onClose, onSubmit }) => {
  const [form] = Form.useForm();

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      if (values.deadline) values.deadline = dayjs(values.deadline).format("YYYY-MM-DD");

      // Call parent onSubmit
      onSubmit(values);

      // Ant Design success message
      message.success("Sourcing request added successfully!");

      // Reset form and close drawer
      form.resetFields();
      onClose();
    });
  };

  return (
    <Drawer
      title="New Sourcing Request"
      width={400}
      placement="right"
      onClose={onClose}
      open={visible}
      destroyOnClose
    >
      <Form layout="vertical" form={form} style={{ rowGap: 8 }}>
        <Form.Item name="product_name" label="Product Name" rules={[{ required: true }]}>
          <Input placeholder="Enter product name" />
        </Form.Item>

        <Form.Item name="quantity" label="Quantity" rules={[{ required: true }]}>
          <InputNumber style={{ width: "100%" }} min={1} placeholder="Enter quantity" />
        </Form.Item>

        <Form.Item name="target_price" label="Target Price ($)" rules={[{ required: true }]}>
          <InputNumber style={{ width: "100%" }} min={0} placeholder="Enter target price" />
        </Form.Item>

        <Form.Item name="supplier_region" label="Supplier Region" rules={[{ required: true }]}>
          <Select placeholder="Select supplier region">
            <Option value="Yiwu">Yiwu</Option>
            <Option value="Shenzhen">Shenzhen</Option>
            <Option value="Guangzhou">Guangzhou</Option>
          </Select>
        </Form.Item>

        <Form.Item name="sample_required" label="Sample Required" valuePropName="checked">
          <Switch />
        </Form.Item>

        <Form.Item name="deadline" label="Deadline" rules={[{ required: true }]}>
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item name="description" label="Description">
          <Input.TextArea placeholder="Enter description" rows={3} />
        </Form.Item>

        <Form.Item>
          <Space style={{ display: "flex", justifyContent: "space-between" }}>
            <Button onClick={() => { form.resetFields(); onClose(); }}>
              Cancel
            </Button>
            <Button type="primary" onClick={handleSubmit}>
              Submit
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default SourcingFormDrawer;
