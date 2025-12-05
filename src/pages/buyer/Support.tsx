import  { useState } from "react";
import {
  Table,
  Button,
  Drawer,
  Form,
  Input,
  Select,
  Typography,
  Card,
  Row,
  Col,
  Tag,
  message,
} from "antd";
import {
  MessageOutlined,
  PhoneOutlined,
  MailOutlined,
  // InfoCircleOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;
const { Option } = Select;

// ---------------------------------------------------
// Types
// ---------------------------------------------------
interface Inquiry {
  inquiry_id: string;
  inquiry_type: "order" | "product" | "payment" | "other";
  description: string;
  status: "resolved" | "pending" | "rejected";
  created_at: string;
}

interface InquiryFormValues {
  inquiry_type: string;
  description: string;
}

// ---------------------------------------------------
// Initial dummy data
// ---------------------------------------------------
const initialInquiries: Inquiry[] = [
  {
    inquiry_id: "SUP-001",
    inquiry_type: "order",
    description: "Order delayed delivery",
    status: "resolved",
    created_at: "2025-02-10",
  },
  {
    inquiry_id: "SUP-002",
    inquiry_type: "product",
    description: "Received damaged product",
    status: "pending",
    created_at: "2025-02-12",
  },
  {
    inquiry_id: "SUP-003",
    inquiry_type: "payment",
    description: "Payment not reflecting in the system",
    status: "rejected",
    created_at: "2025-02-15",
  },
];

// ---------------------------------------------------
// Main Component
// ---------------------------------------------------
export default function Support() {
  const [inquiries, setInquiries] = useState<Inquiry[]>(initialInquiries);

  const [detailDrawerVisible, setDetailDrawerVisible] = useState(false);
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);

  const [writeDrawerVisible, setWriteDrawerVisible] = useState(false);
  const [form] = Form.useForm();

  // ---------------------------------------------------
  // Table Columns
  // ---------------------------------------------------
  const columns = [
    { title: "ID", dataIndex: "inquiry_id", key: "inquiry_id" },
    { title: "Type", dataIndex: "inquiry_type", key: "inquiry_type" },
    { title: "Description", dataIndex: "description", key: "description" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: Inquiry["status"]) => {
        let color: string = "default";
        if (status === "resolved") color = "green";
        else if (status === "pending") color = "orange";
        else if (status === "rejected") color = "red";

        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      },
    },
    { title: "Created At", dataIndex: "created_at", key: "created_at" },
    {
      title: "Action",
      key: "action",
      render: (_: unknown, record: Inquiry) => (
        <Button
          type="primary"
          ghost
          size="small"
          onClick={() => openDetails(record)}
        >
          View
        </Button>
      ),
    },
  ];

  // ---------------------------------------------------
  // Drawer Handlers
  // ---------------------------------------------------
  const openDetails = (record: Inquiry) => {
    setSelectedInquiry(record);
    setDetailDrawerVisible(true);
  };

  const closeDetails = () => {
    setSelectedInquiry(null);
    setDetailDrawerVisible(false);
  };

  const openWriteDrawer = () => setWriteDrawerVisible(true);
  const closeWriteDrawer = () => {
    form.resetFields();
    setWriteDrawerVisible(false);
  };

  // ---------------------------------------------------
  // Submit Handler
  // ---------------------------------------------------
  const handleSubmit = (values: InquiryFormValues) => {
    const newInquiry: Inquiry = {
      inquiry_id: `SUP-${(inquiries.length + 1)
        .toString()
        .padStart(3, "0")}`,
      inquiry_type: values.inquiry_type as Inquiry["inquiry_type"],
      description: values.description,
      status: "pending",
      created_at: new Date().toISOString().split("T")[0],
    };

    setInquiries([newInquiry, ...inquiries]);
    message.success("Support inquiry submitted!");
    closeWriteDrawer();
  };

  // ---------------------------------------------------
  // Render
  // ---------------------------------------------------
  return (
    <div style={{ padding: 24 }}>
      <Title level={2}>Customer Support</Title>

      {/* Contact Info */}
      <Row gutter={24} style={{ marginBottom: 24 }}>
        <Col xs={24} md={8}>
          <Card bordered={false} style={{ borderRadius: 12 }}>
            <PhoneOutlined style={{ fontSize: 30 }} />
            <Title level={4}>Call Us</Title>
            <Text>+251 912 345 678</Text>
          </Card>
        </Col>

        <Col xs={24} md={8}>
          <Card bordered={false} style={{ borderRadius: 12 }}>
            <MailOutlined style={{ fontSize: 30 }} />
            <Title level={4}>Email</Title>
            <Text>support@buyer.com</Text>
          </Card>
        </Col>

        <Col xs={24} md={8}>
          <Card bordered={false} style={{ borderRadius: 12 }}>
            <MessageOutlined style={{ fontSize: 30 }} />
            <Title level={4}>Live Chat</Title>
            <Text>Chat with us for quick help</Text>
          </Card>
        </Col>
      </Row>

      {/* Header + Button */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 16,
        }}
      >
        <Title level={4}>Support Inquiries</Title>

        <Button
          type="primary"
          style={{ background: "#0B2545" }}
          onClick={openWriteDrawer}
        >
          Write Inquiry
        </Button>
      </div>

      {/* Table */}
      <Table
        dataSource={inquiries}
        columns={columns}
        rowKey="inquiry_id"
        pagination={{ pageSize: 5 }}
      />

      {/* ---------------------------------------------------
          Detail Drawer
      --------------------------------------------------- */}
      <Drawer
        open={detailDrawerVisible}
        width={400}
        onClose={closeDetails}
        title="Inquiry Details"
      >
        {selectedInquiry && (
          <div>
            <p>
              <strong>ID:</strong> {selectedInquiry.inquiry_id}
            </p>
            <p>
              <strong>Type:</strong> {selectedInquiry.inquiry_type}
            </p>
            <p>
              <strong>Description:</strong>
              <br />
              {selectedInquiry.description}
            </p>
            <p>
              <strong>Status:</strong> {selectedInquiry.status}
            </p>
            <p>
              <strong>Date:</strong> {selectedInquiry.created_at}
            </p>
          </div>
        )}
      </Drawer>

      {/* ---------------------------------------------------
          Write Inquiry Drawer
      --------------------------------------------------- */}
      <Drawer
        open={writeDrawerVisible}
        width={420}
        onClose={closeWriteDrawer}
        title="Submit Support Inquiry"
      >
        <Form layout="vertical" form={form} onFinish={handleSubmit}>
          <Form.Item
            label="Inquiry Type"
            name="inquiry_type"
            rules={[{ required: true }]}
          >
            <Select placeholder="Select inquiry type">
              <Option value="order">Order</Option>
              <Option value="product">Product</Option>
              <Option value="payment">Payment</Option>
              <Option value="other">Other</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true }]}
          >
            <Input.TextArea
              rows={4}
              placeholder="Describe your issue..."
            />
          </Form.Item>

          <Button
            type="primary"
            block
            htmlType="submit"
            style={{ background: "#0B2545" }}
          >
            Submit Inquiry
          </Button>
        </Form>
      </Drawer>
    </div>
  );
}
