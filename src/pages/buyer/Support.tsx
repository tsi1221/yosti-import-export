import React, { useState } from "react";
import {
  Table,
  Tag,
  Button,
  Drawer,
  Form,
  Input,
  Select,
  Upload,
  message,
  Card,
  Space,
  Divider,
  Typography,
  Row,
  Col,
  Descriptions,
  Image,
  Timeline,
  // Comment,
  Avatar
} from "antd";
import {
  EyeOutlined,
  PlusOutlined,
  UploadOutlined,
  CustomerServiceOutlined,
  UserOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  SolutionOutlined
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";

const { Title, Text } = Typography;
const { Option } = Select;
const { TextArea } = Input;

const brandBlue = "#001F54";
const brandLightBlue = "#E6F0FF";
const hoverYellow = "#FFD700";

// Status badge component
const StatusTag = ({ status }: { status: string }) => {
  const statusConfig: Record<string, { color: string; text: string }> = {
    OPEN: { color: "orange", text: "Open" },
    RESOLVED: { color: "blue", text: "Resolved" },
    CLOSED: { color: "green", text: "Closed" },
  };

  const config = statusConfig[status] || { color: "default", text: status };
  return <Tag color={config.color}>{config.text}</Tag>;
};

// Urgency tag component
const UrgencyTag = ({ urgency }: { urgency: string }) => {
  const urgencyConfig: Record<string, { color: string }> = {
    high: { color: "red" },
    medium: { color: "orange" },
    low: { color: "green" },
  };

  const config = urgencyConfig[urgency] || { color: "default" };
  return (
    <Tag color={config.color} style={{ textTransform: "capitalize" }}>
      {urgency}
    </Tag>
  );
};

// Issue type tag component
const IssueTypeTag = ({ type }: { type: string }) => {
  const typeConfig: Record<string, { color: string; text: string }> = {
    defect: { color: "volcano", text: "Defect" },
    damage: { color: "red", text: "Damage" },
    missing: { color: "gold", text: "Missing" },
    other: { color: "default", text: "Other" },
  };

  const config = typeConfig[type] || { color: "default", text: type };
  return <Tag color={config.color}>{config.text}</Tag>;
};

interface SupportRequest {
  support_id: string;
  user_id: string;
  order_reference: string;
  issue_type: "defect" | "damage" | "missing" | "other";
  description: string;
  photo_video_url?: string;
  resolution_requested: "refund" | "replacement" | "repair";
  urgency: "low" | "medium" | "high";
  status: "OPEN" | "RESOLVED" | "CLOSED";
  issue: string;
  created_at: string;
  updated_at: string;
}

interface SupportDetail extends SupportRequest {
  customer_name: string;
  customer_email: string;
  order_date: string;
  product_details: string;
  support_agent?: string;
  last_response?: string;
  timeline: {
    time: string;
    action: string;
    description: string;
    user: string;
  }[];
  comments: {
    author: string;
    avatar: string;
    content: string;
    datetime: string;
  }[];
}

export default function Support() {
  const [filter, setFilter] = useState<"ALL" | "OPEN" | "RESOLVED" | "CLOSED">("ALL");
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [detailVisible, setDetailVisible] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<SupportDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [requests, setRequests] = useState<SupportRequest[]>([
    {
      support_id: "SUP-001",
      user_id: "USR-001",
      issue: "Damaged Product",
      order_reference: "ORD-12221",
      issue_type: "damage",
      description: "The product arrived with visible damage on the packaging and the item itself has scratches.",
      photo_video_url: "https://images.unsplash.com/photo-1587334941770-6fef452c31fc?w=400",
      resolution_requested: "replacement",
      urgency: "high",
      status: "OPEN",
      created_at: "2025-10-01",
      updated_at: "2025-10-01"
    },
    {
      support_id: "SUP-002",
      user_id: "USR-002",
      issue: "Missing Items",
      order_reference: "ORD-99887",
      issue_type: "missing",
      description: "Two items from my order are missing from the delivery package.",
      resolution_requested: "refund",
      urgency: "medium",
      status: "RESOLVED",
      created_at: "2025-10-10",
      updated_at: "2025-10-12"
    },
    {
      support_id: "SUP-003",
      user_id: "USR-003",
      issue: "Wrong Product Sent",
      order_reference: "ORD-45321",
      issue_type: "defect",
      description: "Received a different product than what I ordered. The model number doesn't match.",
      photo_video_url: "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=400",
      resolution_requested: "replacement",
      urgency: "low",
      status: "CLOSED",
      created_at: "2025-09-28",
      updated_at: "2025-10-05"
    },
  ]);

  // Detailed data for each request
  const detailedData: Record<string, SupportDetail> = {
    "SUP-001": {
      ...requests[0],
      customer_name: "John Smith",
      customer_email: "john.smith@email.com",
      order_date: "2025-09-28",
      product_details: "Wireless Bluetooth Headphones - Black",
      support_agent: "Sarah Johnson",
      last_response: "2 hours ago",
      timeline: [
        {
          time: "2025-10-01 14:30",
          action: "Request Created",
          description: "Support request submitted by customer",
          user: "John Smith"
        },
        {
          time: "2025-10-01 15:15",
          action: "Under Review",
          description: "Request assigned to support agent",
          user: "Sarah Johnson"
        }
      ],
      comments: [
        {
          author: "Sarah Johnson",
          avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40",
          content: "I've reviewed the photos and can confirm the damage. I'll process your replacement immediately.",
          datetime: "2025-10-01 15:20"
        }
      ]
    },
    "SUP-002": {
      ...requests[1],
      customer_name: "Emma Wilson",
      customer_email: "emma.wilson@email.com",
      order_date: "2025-10-05",
      product_details: "Smart Watch Series 5 - Silver",
      support_agent: "Mike Chen",
      last_response: "2 days ago",
      timeline: [
        {
          time: "2025-10-10 09:15",
          action: "Request Created",
          description: "Reported missing items from order",
          user: "Emma Wilson"
        },
        {
          time: "2025-10-10 10:30",
          action: "Investigation Started",
          description: "Checking warehouse records and packaging",
          user: "Mike Chen"
        },
        {
          time: "2025-10-12 11:00",
          action: "Resolved",
          description: "Refund processed for missing items",
          user: "Mike Chen"
        }
      ],
      comments: [
        {
          author: "Mike Chen",
          avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40",
          content: "I've verified the issue and processed a full refund for the missing items. The amount will reflect in your account within 3-5 business days.",
          datetime: "2025-10-12 11:05"
        }
      ]
    },
    "SUP-003": {
      ...requests[2],
      customer_name: "Robert Brown",
      customer_email: "robert.brown@email.com",
      order_date: "2025-09-25",
      product_details: "Gaming Mouse - RGB Edition",
      support_agent: "Lisa Wang",
      last_response: "1 week ago",
      timeline: [
        {
          time: "2025-09-28 16:45",
          action: "Request Created",
          description: "Reported wrong product received",
          user: "Robert Brown"
        },
        {
          time: "2025-09-29 09:00",
          action: "Replacement Initiated",
          description: "Correct product shipped to customer",
          user: "Lisa Wang"
        },
        {
          time: "2025-10-05 14:20",
          action: "Closed",
          description: "Customer confirmed receipt of correct product",
          user: "Lisa Wang"
        }
      ],
      comments: [
        {
          author: "Lisa Wang",
          avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40",
          content: "I've shipped the correct gaming mouse to you. You should receive it by Friday. Please use the prepaid return label to send back the incorrect item.",
          datetime: "2025-09-29 09:15"
        },
        {
          author: "Robert Brown",
          avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40",
          content: "Received the correct mouse today. Everything works perfectly. Thank you for the quick resolution!",
          datetime: "2025-10-05 14:15"
        }
      ]
    }
  };

  const filteredRequests = filter === "ALL" 
    ? requests 
    : requests.filter((r) => r.status === filter);

  const handleViewDetails = (record: SupportRequest) => {
    const detail = detailedData[record.support_id] || createDefaultDetail(record);
    setSelectedRequest(detail);
    setDetailVisible(true);
  };

  const createDefaultDetail = (request: SupportRequest): SupportDetail => {
    return {
      ...request,
      customer_name: "Customer",
      customer_email: "customer@email.com",
      order_date: "2025-01-01",
      product_details: "Product",
      timeline: [
        {
          time: request.created_at,
          action: "Request Created",
          description: "Support request submitted",
          user: "Customer"
        }
      ],
      comments: []
    };
  };

  const generateSupportId = () => {
    const nextId = requests.length + 1;
    return `SUP-${nextId.toString().padStart(3, '0')}`;
  };

  const handleSubmitRequest = async (values: any) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newRequest: SupportRequest = {
        support_id: generateSupportId(),
        user_id: `USR-${(requests.length + 1).toString().padStart(3, '0')}`,
        issue: values.issue,
        order_reference: values.order_reference,
        issue_type: values.issue_type,
        description: values.description,
        resolution_requested: values.resolution_requested,
        urgency: values.urgency,
        status: "OPEN",
        created_at: new Date().toISOString().split('T')[0],
        updated_at: new Date().toISOString().split('T')[0]
      };

      setRequests(prev => [newRequest, ...prev]);
      message.success("Support request submitted successfully!");
      setDrawerVisible(false);
      form.resetFields();
    } catch (error) {
      message.error("Failed to submit support request");
    } finally {
      setLoading(false);
    }
  };

  const uploadProps = {
    beforeUpload: (file: File) => {
      const isImage = file.type.startsWith('image/');
      const isVideo = file.type.startsWith('video/');
      if (!isImage && !isVideo) {
        message.error('You can only upload image or video files!');
      }
      return (isImage || isVideo) || Upload.LIST_IGNORE;
    },
    maxCount: 3,
  };

  const columns: ColumnsType<SupportRequest> = [
    {
      title: "Support ID",
      dataIndex: "support_id",
      key: "support_id",
      width: 100,
      render: (id: string) => (
        <Text strong style={{ color: brandBlue, fontSize: "12px" }}>
          {id}
        </Text>
      ),
    },
    {
      title: "Issue",
      dataIndex: "issue",
      key: "issue",
      render: (issue: string, record: SupportRequest) => (
        <div>
          <div style={{ fontWeight: 500, marginBottom: 2, fontSize: "13px" }}>{issue}</div>
          <div style={{ fontSize: "11px", color: "#666" }}>
            <IssueTypeTag type={record.issue_type} />
          </div>
        </div>
      ),
    },
    {
      title: "Order Ref",
      dataIndex: "order_reference",
      key: "order_reference",
      width: 100,
      render: (text: string) => (
        <Text style={{ fontSize: "12px" }}>{text}</Text>
      ),
    },
    {
      title: "Resolution",
      dataIndex: "resolution_requested",
      key: "resolution_requested",
      width: 100,
      render: (resolution: string) => (
        <span style={{ textTransform: "capitalize", fontSize: "12px" }}>
          {resolution}
        </span>
      ),
    },
    {
      title: "Urgency",
      dataIndex: "urgency",
      key: "urgency",
      width: 90,
      render: (urgency: string) => <UrgencyTag urgency={urgency} />,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 90,
      render: (status: string) => <StatusTag status={status} />,
    },
    {
      title: "Actions",
      key: "actions",
      width: 60,
      render: (_, record) => (
        <Button
          type="text"
          icon={<EyeOutlined />}
          style={{ 
            color: brandBlue,
            transition: "all 0.3s ease"
          }}
          className="view-detail-btn"
          onClick={() => handleViewDetails(record)}
        />
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <style>
        {`
          .view-detail-btn:hover {
            color: ${hoverYellow} !important;
            background: rgba(255, 215, 0, 0.1) !important;
            border-color: ${hoverYellow} !important;
            transform: scale(1.1);
          }
          .filter-btn:hover {
            border-color: ${hoverYellow} !important;
            color: ${hoverYellow} !important;
          }
          .primary-btn:hover {
            border-color: ${hoverYellow} !important;
            background: ${hoverYellow} !important;
            color: #000 !important;
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(255, 215, 0, 0.3);
          }
        `}
      </style>

      <Row justify="space-between" align="middle" style={{ marginBottom: 24 }}>
        <Col>
          <Title level={2} style={{ color: brandBlue, margin: 0 }}>
            <CustomerServiceOutlined style={{ marginRight: 12 }} />
            Support Requests
          </Title>
        </Col>
        <Col>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            size="large"
            className="primary-btn"
            style={{ 
              backgroundColor: brandBlue,
              borderColor: brandBlue,
              borderRadius: 6,
              fontWeight: 600,
              transition: "all 0.3s ease"
            }}
            onClick={() => setDrawerVisible(true)}
          >
            Request Support
          </Button>
        </Col>
      </Row>

      {/* FILTER TABS */}
      <Card style={{ marginBottom: 24, borderRadius: 8 }}>
        <Space size="middle">
          {["ALL", "OPEN", "RESOLVED", "CLOSED"].map((tab) => (
            <Button
              key={tab}
              type={filter === tab ? "primary" : "default"}
              className={filter !== tab ? "filter-btn" : ""}
              onClick={() => setFilter(tab as any)}
              style={{
                backgroundColor: filter === tab ? brandBlue : "transparent",
                borderColor: brandBlue,
                color: filter === tab ? "#fff" : brandBlue,
                borderRadius: 6,
                fontWeight: 600,
                transition: "all 0.3s ease"
              }}
            >
              {tab}
            </Button>
          ))}
        </Space>
      </Card>

      {/* TABLE */}
      <Card 
        style={{ 
          borderRadius: 8,
          boxShadow: "0 2px 8px rgba(0, 31, 84, 0.1)"
        }}
      >
        <Table
          columns={columns}
          dataSource={filteredRequests}
          rowKey="support_id"
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total, range) => 
              `${range[0]}-${range[1]} of ${total} items`,
          }}
          scroll={{ x: 700 }}
          size="small"
        />
      </Card>

      {/* SUPPORT REQUEST DRAWER - 500px width */}
      <Drawer
        title={
          <Space>
            <PlusOutlined style={{ color: brandBlue }} />
            <Text strong style={{ color: brandBlue, fontSize: 16 }}>
              New Support Request
            </Text>
          </Space>
        }
        placement="right"
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
        width={500}
        styles={{
          body: { paddingBottom: 80 },
          header: { borderBottom: `1px solid ${brandLightBlue}` }
        }}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmitRequest}
          requiredMark="optional"
        >
          <Row gutter={12}>
            <Col span={12}>
              <Form.Item
                name="order_reference"
                label="Order Reference"
                rules={[{ required: true, message: 'Please enter order reference' }]}
              >
                <Input placeholder="e.g., ORD-12345" size="small" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="issue_type"
                label="Issue Type"
                rules={[{ required: true, message: 'Please select issue type' }]}
              >
                <Select placeholder="Select issue type" size="small">
                  <Option value="defect">Defect</Option>
                  <Option value="damage">Damage</Option>
                  <Option value="missing">Missing</Option>
                  <Option value="other">Other</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="issue"
            label="Issue Title"
            rules={[{ required: true, message: 'Please enter issue title' }]}
          >
            <Input placeholder="Brief description of the issue" size="small" />
          </Form.Item>

          <Form.Item
            name="description"
            label="Detailed Description"
            rules={[{ required: true, message: 'Please provide detailed description' }]}
          >
            <TextArea
              rows={3}
              placeholder="Please provide detailed information about the issue..."
              size="small"
            />
          </Form.Item>

          <Row gutter={12}>
            <Col span={12}>
              <Form.Item
                name="resolution_requested"
                label="Resolution Requested"
                rules={[{ required: true, message: 'Please select resolution' }]}
              >
                <Select placeholder="Select resolution" size="small">
                  <Option value="refund">Refund</Option>
                  <Option value="replacement">Replacement</Option>
                  <Option value="repair">Repair</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="urgency"
                label="Urgency Level"
                rules={[{ required: true, message: 'Please select urgency' }]}
              >
                <Select placeholder="Select urgency" size="small">
                  <Option value="low">Low</Option>
                  <Option value="medium">Medium</Option>
                  <Option value="high">High</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="attachments"
            label="Attachments (Photos/Videos)"
            extra="Upload images or videos that show the issue"
          >
            <Upload {...uploadProps}>
              <Button icon={<UploadOutlined />} size="small">Upload Files</Button>
            </Upload>
          </Form.Item>

          <Divider />

          <Form.Item style={{ marginBottom: 0, textAlign: "right" }}>
            <Space>
              <Button onClick={() => setDrawerVisible(false)} size="small">
                Cancel
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                className="primary-btn"
                size="small"
                style={{ 
                  backgroundColor: brandBlue, 
                  borderColor: brandBlue,
                  transition: "all 0.3s ease"
                }}
              >
                Submit Request
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Drawer>

      {/* DETAIL VIEW DRAWER */}
      <Drawer
        title={
          <Space>
            <SolutionOutlined style={{ color: brandBlue }} />
            <Text strong style={{ color: brandBlue, fontSize: 16 }}>
              Support Request Details
            </Text>
          </Space>
        }
        placement="right"
        onClose={() => setDetailVisible(false)}
        open={detailVisible}
        width={700}
        styles={{
          body: { padding: 0 },
          header: { borderBottom: `1px solid ${brandLightBlue}` }
        }}
      >
        {selectedRequest && (
          <div style={{ padding: 20 }}>
            {/* Header Section */}
            <Card 
              style={{ marginBottom: 16, borderLeft: `4px solid ${brandBlue}`, padding: 16 }}
              size="small"
            >
              <Row gutter={16} align="middle">
                <Col flex="auto">
                  <Title level={4} style={{ margin: 0, color: brandBlue, fontSize: 16 }}>
                    {selectedRequest.support_id}
                  </Title>
                  <Text type="secondary" style={{ fontSize: 12 }}>{selectedRequest.issue}</Text>
                </Col>
                <Col>
                  <StatusTag status={selectedRequest.status} />
                </Col>
              </Row>
            </Card>

            {/* Customer and Order Information */}
            <Card title="Customer & Order Information" size="small" style={{ marginBottom: 16 }}>
              <Descriptions column={1} size="small">
                <Descriptions.Item label="Customer Name">
                  {selectedRequest.customer_name}
                </Descriptions.Item>
                <Descriptions.Item label="Customer Email">
                  {selectedRequest.customer_email}
                </Descriptions.Item>
                <Descriptions.Item label="Order Reference">
                  {selectedRequest.order_reference}
                </Descriptions.Item>
                <Descriptions.Item label="Order Date">
                  {selectedRequest.order_date}
                </Descriptions.Item>
                <Descriptions.Item label="Product Details">
                  {selectedRequest.product_details}
                </Descriptions.Item>
              </Descriptions>
            </Card>

            {/* Issue Details */}
            <Card title="Issue Details" size="small" style={{ marginBottom: 16 }}>
              <Row gutter={16}>
                <Col span={12}>
                  <Descriptions column={1} size="small">
                    <Descriptions.Item label="Issue Type">
                      <IssueTypeTag type={selectedRequest.issue_type} />
                    </Descriptions.Item>
                    <Descriptions.Item label="Resolution">
                      <Text strong style={{ textTransform: "capitalize", fontSize: 12 }}>
                        {selectedRequest.resolution_requested}
                      </Text>
                    </Descriptions.Item>
                  </Descriptions>
                </Col>
                <Col span={12}>
                  <Descriptions column={1} size="small">
                    <Descriptions.Item label="Urgency">
                      <UrgencyTag urgency={selectedRequest.urgency} />
                    </Descriptions.Item>
                    <Descriptions.Item label="Support Agent">
                      {selectedRequest.support_agent || "Not assigned"}
                    </Descriptions.Item>
                  </Descriptions>
                </Col>
              </Row>
              
              <Divider style={{ margin: "12px 0" }} />
              
              <Text strong style={{ fontSize: 12 }}>Description:</Text>
              <div style={{ marginTop: 8, padding: 8, background: "#f5f5f5", borderRadius: 4, fontSize: 12 }}>
                {selectedRequest.description}
              </div>

              {selectedRequest.photo_video_url && (
                <>
                  <Divider style={{ margin: "12px 0" }} />
                  <Text strong style={{ fontSize: 12 }}>Attachments:</Text>
                  <div style={{ marginTop: 8 }}>
                    <Image
                      width={150}
                      src={selectedRequest.photo_video_url}
                      alt="Issue attachment"
                      style={{ borderRadius: 4 }}
                    />
                  </div>
                </>
              )}
            </Card>

            {/* Timeline */}
            <Card title="Timeline" size="small" style={{ marginBottom: 16 }}>
              <Timeline size="small">
                {selectedRequest.timeline.map((event, index) => (
                  <Timeline.Item
                    key={index}
                    dot={index === 0 ? <ClockCircleOutlined style={{ color: brandBlue }} /> : <CheckCircleOutlined style={{ color: "#52c41a" }} />}
                    color={index === 0 ? brandBlue : "green"}
                  >
                    <Text strong style={{ fontSize: 12 }}>{event.action}</Text>
                    <br />
                    <Text type="secondary" style={{ fontSize: 11 }}>{event.description}</Text>
                    <br />
                    <Text type="secondary" style={{ fontSize: 10 }}>
                      {event.time} • By {event.user}
                    </Text>
                  </Timeline.Item>
                ))}
              </Timeline>
            </Card>

            {/* Comments */}
            <Card title="Comments & Updates" size="small">
              {selectedRequest.comments.length > 0 ? (
                selectedRequest.comments.map((comment, index) => (
                  <Comment
                    key={index}
                    author={<Text style={{ fontSize: 12 }}>{comment.author}</Text>}
                    avatar={<Avatar src={comment.avatar} icon={<UserOutlined />} size="small" />}
                    content={<Text style={{ fontSize: 12 }}>{comment.content}</Text>}
                    datetime={<Text style={{ fontSize: 11 }}>{comment.datetime}</Text>}
                  />
                ))
              ) : (
                <Text type="secondary" style={{ fontSize: 12 }}>No comments yet.</Text>
              )}
            </Card>
          </div>
        )}
      </Drawer>
    </div>
  );
}