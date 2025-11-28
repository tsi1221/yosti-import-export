import React, { useState, useEffect } from "react";
import { Table, Tag, Drawer, Form, Input, Select, Button, Space, message } from "antd";
import { EyeOutlined, EditOutlined, CloseOutlined, SaveOutlined } from "@ant-design/icons";

const { Option } = Select;

interface SupportTicket {
  support_id: string;
  user_id: string;
  orderReference: string;
  issueType: "defect" | "damage" | "missing" | "other";
  description?: string;
  photoVideoUrl?: string;
  resolutionRequested?: "refund" | "replacement" | "repair";
  urgency?: "low" | "medium" | "high";
  status: "open" | "resolved" | "closed";
  adminNotes?: string;
  created_at?: string;
}

// Mock data
const mockTickets: SupportTicket[] = [
  {
    support_id: "SUP001",
    user_id: "USR001",
    orderReference: "ORD1001",
    issueType: "defect",
    description: "Screen not working",
    photoVideoUrl: "https://sample-videos.com/video123/mp4/240/big_buck_bunny_240p_1mb.mp4",
    resolutionRequested: "replacement",
    urgency: "high",
    status: "open",
    adminNotes: "",
    created_at: "2025-11-15",
  },
  {
    support_id: "SUP002",
    user_id: "USR002",
    orderReference: "ORD1002",
    issueType: "damage",
    description: "Box damaged during shipping",
    resolutionRequested: "refund",
    urgency: "medium",
    status: "open",
    adminNotes: "",
    created_at: "2025-11-16",
  },
  {
    support_id: "SUP003",
    user_id: "USR003",
    orderReference: "ORD1003",
    issueType: "missing",
    description: "Item not delivered",
    resolutionRequested: "replacement",
    urgency: "high",
    status: "resolved",
    adminNotes: "Processed replacement",
    created_at: "2025-11-17",
  },
];

const SupportTable: React.FC = () => {
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [viewDrawerOpen, setViewDrawerOpen] = useState(false);
  const [editDrawerOpen, setEditDrawerOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);
  const [form] = Form.useForm();
  const [filters, setFilters] = useState({ status: "", urgency: "" });

  useEffect(() => {
    setTickets(mockTickets);
  }, []);

  const handleView = (ticket: SupportTicket) => {
    setSelectedTicket(ticket);
    setViewDrawerOpen(true);
  };

  const handleEdit = (ticket: SupportTicket) => {
    setSelectedTicket(ticket);
    form.setFieldsValue({
      status: ticket.status,
      adminNotes: ticket.adminNotes || "",
    });
    setEditDrawerOpen(true);
  };

  const handleUpdate = async () => {
    if (!selectedTicket) return;
    try {
      const values = await form.validateFields();
      setTickets((prev) =>
        prev.map((t) =>
          t.support_id === selectedTicket.support_id ? { ...t, ...values } : t
        )
      );
      message.success("Ticket updated successfully");
      setEditDrawerOpen(false);
      setSelectedTicket(null);
      form.resetFields();
    } catch (err) {
      console.error(err);
      message.error("Failed to update ticket");
    }
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const filteredTickets = tickets.filter((t) => {
    const statusMatch = filters.status ? t.status === filters.status : true;
    const urgencyMatch = filters.urgency ? t.urgency === filters.urgency : true;
    return statusMatch && urgencyMatch;
  });

  const columns = [
    { title: "Order Ref", dataIndex: "orderReference", key: "orderReference" },
    { title: "Issue Type", dataIndex: "issueType", key: "issueType" },
    { 
      title: "Status", 
      dataIndex: "status", 
      key: "status",
      render: (status: string) => {
        const color = status === "open" ? "red" : status === "resolved" ? "green" : "gray";
        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      },
      filters: [
        { text: "Open", value: "open" },
        { text: "Resolved", value: "resolved" },
        { text: "Closed", value: "closed" },
      ],
      onFilter: (value: string, record: SupportTicket) => record.status === value
    },
    {
      title: "Urgency",
      dataIndex: "urgency",
      key: "urgency",
      render: (urgency: string) => {
        const color = urgency === "high" ? "volcano" : urgency === "medium" ? "gold" : "green";
        return <Tag color={color}>{urgency?.toUpperCase()}</Tag>;
      },
      filters: [
        { text: "High", value: "high" },
        { text: "Medium", value: "medium" },
        { text: "Low", value: "low" },
      ],
      onFilter: (value: string, record: SupportTicket) => record.urgency === value
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: SupportTicket) => (
        <Space>
          <Button type="link" icon={<EyeOutlined />} onClick={() => handleView(record)}>
            View
          </Button>
          <Button type="link" icon={<EditOutlined />} onClick={() => handleEdit(record)}>
            Edit
          </Button>
        </Space>
      )
    }
  ];

  return (
    <div style={{ padding: "32px 40px", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
      <h2 style={{ color: "#0F3952", fontSize: 22, fontWeight: 700, marginBottom: 24 }}>
        Support Tickets
      </h2>

      <Table
        dataSource={filteredTickets}
        columns={columns}
        rowKey="support_id"
        bordered
        pagination={{ pageSize: 5 }}
      />

      {/* View Drawer */}
      <Drawer
        title={selectedTicket ? `Ticket #${selectedTicket.orderReference}` : "Ticket Details"}
        width={450}
        open={viewDrawerOpen}
        onClose={() => setViewDrawerOpen(false)}
      >
        {selectedTicket && (
          <Space direction="vertical" style={{ width: "100%" }}>
            <p><strong>User ID:</strong> {selectedTicket.user_id}</p>
            <p><strong>Order Reference:</strong> {selectedTicket.orderReference}</p>
            <p><strong>Issue Type:</strong> {selectedTicket.issueType}</p>
            <p><strong>Description:</strong> {selectedTicket.description || "N/A"}</p>
            {selectedTicket.photoVideoUrl && (
              <div>
                <strong>Photo / Video:</strong>
                <video width="100%" controls style={{ marginTop: 8 }}>
                  <source src={selectedTicket.photoVideoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            )}
            <p><strong>Resolution Requested:</strong> {selectedTicket.resolutionRequested || "N/A"}</p>
            <p><strong>Urgency:</strong> {selectedTicket.urgency?.toUpperCase() || "N/A"}</p>
            <p><strong>Status:</strong> {selectedTicket.status.toUpperCase()}</p>
            <p><strong>Admin Notes:</strong> {selectedTicket.adminNotes || "N/A"}</p>
            <p><strong>Created At:</strong> {selectedTicket.created_at || "N/A"}</p>
          </Space>
        )}
      </Drawer>

      {/* Edit Drawer */}
      <Drawer
        title={selectedTicket ? `Edit Ticket #${selectedTicket.orderReference}` : "Edit Ticket"}
        width={450}
        open={editDrawerOpen}
        onClose={() => setEditDrawerOpen(false)}
      >
        {selectedTicket && (
          <Form form={form} layout="vertical">
            <Form.Item name="status" label="Update Status" rules={[{ required: true }]}>
              <Select placeholder="Select status">
                <Option value="open">Open</Option>
                <Option value="resolved">Resolved</Option>
                <Option value="closed">Closed</Option>
              </Select>
            </Form.Item>

            <Form.Item name="adminNotes" label="Admin Notes">
              <Input.TextArea rows={4} placeholder="Add notes..." />
            </Form.Item>

            <Space style={{ marginTop: 16, width: "100%", justifyContent: "flex-end" }}>
              <Button
                icon={<CloseOutlined />}
                onClick={() => setEditDrawerOpen(false)}
                style={{ border: "1px solid #0F3952", color: "#0F3952", borderRadius: 6, fontWeight: 600 }}
              >
                Cancel
              </Button>
              <Button
                icon={<SaveOutlined />}
                type="primary"
                onClick={handleUpdate}
                style={{ background: "#0F3952", border: "none", borderRadius: 6, fontWeight: 600 }}
              >
                Save
              </Button>
            </Space>
          </Form>
        )}
      </Drawer>
    </div>
  );
};

export default SupportTable;
