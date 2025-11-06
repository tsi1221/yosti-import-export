import React from "react";
import {
  Drawer,
  Form,
  Radio,
  Input,
  InputNumber,
  Select,
  Button,
  DatePicker,
  Space,
  message,
  ConfigProvider,
} from "antd";
import dayjs from "dayjs";

interface DrawerProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (values: any) => void;
}

const { Option } = Select;

const SourcingFormDrawer: React.FC<DrawerProps> = ({
  visible,
  onClose,
  onSubmit,
}) => {
  const [form] = Form.useForm();

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      if (values.deadline)
        values.deadline = dayjs(values.deadline).format("YYYY-MM-DD");

      onSubmit(values);
      message.success("Sourcing request added successfully!");

      form.resetFields();
      onClose();
    });
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#0F3952",
          colorLink: "#0F3952",
          colorLinkHover: "#0c2f46",
          colorLinkActive: "#0b283d",
        },
      }}
    >
      <Drawer
        title="New Sourcing Request"
        width={400}
        placement="right"
        onClose={onClose}
        open={visible}
        destroyOnClose
      >
        <Form layout="vertical" form={form} style={{ rowGap: 8 }}>
          <Form.Item
            name="product_name"
            label="Product Name"
            rules={[{ required: true, message: "Please enter product name" }]}
          >
            <Input placeholder="Enter product name" />
          </Form.Item>

          <Form.Item
            name="quantity"
            label="Quantity"
            rules={[{ required: true, message: "Please enter quantity" }]}
          >
            <InputNumber
              style={{ width: "100%" }}
              min={1}
              placeholder="Enter quantity"
            />
          </Form.Item>

          <Form.Item
            name="target_price"
            label="Target Price ($)"
            rules={[{ required: true, message: "Please enter target price" }]}
          >
            <InputNumber
              style={{ width: "100%" }}
              min={0}
              placeholder="Enter target price"
            />
          </Form.Item>

          <Form.Item
            name="supplier_region"
            label="Supplier Region"
            rules={[
              { required: true, message: "Please select supplier region" },
            ]}
          >
            <Select placeholder="Select supplier region">
              <Option value="Yiwu">Yiwu</Option>
              <Option value="Shenzhen">Shenzhen</Option>
              <Option value="Guangzhou">Guangzhou</Option>
            </Select>
          </Form.Item>

          <Form.Item name="sample_required" label="Sample Required">
            <Radio.Group>
              <Radio value={true}>Yes</Radio>
              <Radio value={false}>No</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            name="deadline"
            label="Deadline"
            rules={[{ required: true, message: "Please select deadline" }]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item name="description" label="Description">
            <Input.TextArea placeholder="Enter description" rows={3} />
          </Form.Item>

          <Form.Item>
            <Space
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <Button
                onClick={() => {
                  form.resetFields();
                  onClose();
                }}
              >
                Cancel
              </Button>
              <Button
                type="primary"
                onClick={handleSubmit}
                style={{
                  backgroundColor: "#0F3952",
                  borderColor: "#0F3952",
                }}
              >
                Submit
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Drawer>
    </ConfigProvider>
  );
};

export default SourcingFormDrawer;
