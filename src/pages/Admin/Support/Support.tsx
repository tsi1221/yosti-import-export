// src/pages/Admin/Support/Support.tsx
import React, { useState, useMemo } from "react";
import { Table, Button, Tag, Input, Modal, message, Space, Select, Checkbox, Dropdown } from "antd";
import { InfoCircleOutlined, SendOutlined, SaveOutlined, FilterOutlined, SearchOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

const { TextArea } = Input;
const { Option } = Select;

// --- Dummy Data ---
const mockTickets = [
  {
    support_id: "SR-001",
    user_id: "U1234",
    order_reference: "ORD-9876",
    issue_type: "damage",
    description: "The glassware set arrived completely shattered. Box was crushed.",
    photo_video_url: "https://placehold.co/100x100/A3E635/FFFFFF?text=Photo+1",
    resolution_requested: "refund",
    urgency: "high",
    status: "open",
    created_at: "2025-10-29T10:00:00Z",
  },
  {
    support_id: "SR-002",
    user_id: "U4567",
    order_reference: "ORD-6543",
    issue_type: "defect",
    description: "Laptop power button is faulty and only works intermittently.",
    photo_video_url: "https://placehold.co/100x100/38BDF8/FFFFFF?text=Video",
    resolution_requested: "replacement",
    urgency: "medium",
    status: "resolved",
    created_at: "2025-10-28T14:30:00Z",
  },
];

// --- Color Helpers ---
const getColor = (type: "status" | "urgency" | "issue_type", value: string) => {
  if (type === "status") return value === "open" ? "orange" : value === "resolved" ? "green" : "gray";
  if (type === "urgency") return value === "high" ? "volcano" : value === "medium" ? "gold" : "blue";
  if (type === "issue_type") return value === "defect" ? "purple" : value === "damage" ? "magenta" : value === "missing" ? "cyan" : "geekblue";
  return "default";
};

const formatDate = (iso: string) => dayjs(iso).format("YYYY-MM-DD HH:mm");

// --- Main Component ---
const Support: React.FC = () => {
  const [tickets, setTickets] = useState(mockTickets);
  const [searchText, setSearchText] = useState("");
  const [selectedTicket, setSelectedTicket] = useState<any>(null);

  const [statusFilter, setStatusFilter] = useState<string[]>([]);
  const [urgencyFilter, setUrgencyFilter] = useState<string[]>([]);
  const [issueTypeFilter, setIssueTypeFilter] = useState<string[]>([]);

  // --- Filtered Data ---
  const filteredTickets = useMemo(() => {
    let filtered = [...tickets];

    if (searchText) {
      const text = searchText.toLowerCase();
      filtered = filtered.filter(
        (t) =>
          t.support_id.toLowerCase().includes(text) ||
          t.description.toLowerCase().includes(text) ||
          t.order_reference.toLowerCase().includes(text)
      );
    }

    if (statusFilter.length) filtered = filtered.filter((t) => statusFilter.includes(t.status));
    if (urgencyFilter.length) filtered = filtered.filter((t) => urgencyFilter.includes(t.urgency));
    if (issueTypeFilter.length) filtered = filtered.filter((t) => issueTypeFilter.includes(t.issue_type));

    return filtered;
  }, [tickets, searchText, statusFilter, urgencyFilter, issueTypeFilter]);

  // --- Filter Menus ---
  const statusMenu = (
    <div style={{ padding: 8 }}>
      {["open", "resolved", "closed"].map((s) => (
        <Checkbox
          key={s}
          checked={statusFilter.includes(s)}
          onChange={(e) => setStatusFilter(e.target.checked ? [...statusFilter, s] : statusFilter.filter((v) => v !== s))}
          style={{ display: "block", marginBottom: 4 }}
        >
          {s.toUpperCase()}
        </Checkbox>
      ))}
    </div>
  );

  const urgencyMenu = (
    <div style={{ padding: 8 }}>
      {["high", "medium", "low"].map((s) => (
        <Checkbox
          key={s}
          checked={urgencyFilter.includes(s)}
          onChange={(e) => setUrgencyFilter(e.target.checked ? [...urgencyFilter, s] : urgencyFilter.filter((v) => v !== s))}
          style={{ display: "block", marginBottom: 4 }}
        >
          {s.toUpperCase()}
        </Checkbox>
      ))}
    </div>
  );

  const issueTypeMenu = (
    <div style={{ padding: 8 }}>
      {["damage", "defect", "missing"].map((s) => (
        <Checkbox
          key={s}
          checked={issueTypeFilter.includes(s)}
          onChange={(e) => setIssueTypeFilter(e.target.checked ? [...issueTypeFilter, s] : issueTypeFilter.filter((v) => v !== s))}
          style={{ display: "block", marginBottom: 4 }}
        >
          {s.toUpperCase()}
        </Checkbox>
      ))}
    </div>
  );

  // --- Table Columns ---
  const columns = [
    { title: "Ticket ID", dataIndex: "support_id", key: "support_id" },
    {
      title: (
        <Space>
          Issue Type
          <Dropdown overlay={issueTypeMenu} trigger={["click"]}>
            <FilterOutlined style={{ cursor: "pointer" }} />
          </Dropdown>
        </Space>
      ),
      dataIndex: "issue_type",
      key: "issue_type",
      render: (t: string) => <Tag color={getColor("issue_type", t)}>{t.toUpperCase()}</Tag>,
    },
    { title: "Order Ref", dataIndex: "order_reference", key: "order_reference" },
    {
      title: (
        <Space>
          Urgency
          <Dropdown overlay={urgencyMenu} trigger={["click"]}>
            <FilterOutlined style={{ cursor: "pointer" }} />
          </Dropdown>
        </Space>
      ),
      dataIndex: "urgency",
      key: "urgency",
      render: (t: string) => <Tag color={getColor("urgency", t)}>{t.toUpperCase()}</Tag>,
    },
    {
      title: (
        <Space>
          Status
          <Dropdown overlay={statusMenu} trigger={["click"]}>
            <FilterOutlined style={{ cursor: "pointer" }} />
          </Dropdown>
        </Space>
      ),
      dataIndex: "status",
      key: "status",
      render: (t: string) => <Tag color={getColor("status", t)}>{t.toUpperCase()}</Tag>,
    },
    { title: "Created At", dataIndex: "created_at", key: "created_at", render: (t: string) => formatDate(t) },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: any) => (
        <Button type="link" onClick={() => setSelectedTicket(record)}>
          View
        </Button>
      ),
    },
  ];

  // --- Ticket Detail Modal ---
  const TicketModal = () => {
    if (!selectedTicket) return null;
    const [status, setStatus] = useState(selectedTicket.status);
    const [reply, setReply] = useState("");

    const sendReply = () => {
      if (!reply.trim()) return message.error("Reply cannot be empty");
      message.success(`Reply sent to user ${selectedTicket.user_id} (simulated)`);
      setReply("");
    };

    const saveStatus = () => {
      setTickets(tickets.map((t) => (t.support_id === selectedTicket.support_id ? { ...t, status } : t)));
      setSelectedTicket(null);
    };

    return (
      <Modal
        open={!!selectedTicket}
        onCancel={() => setSelectedTicket(null)}
        footer={null}
        width={600}
        title={<Space><InfoCircleOutlined /> Ticket Details: {selectedTicket.support_id}</Space>}
      >
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
          <div><strong>User ID:</strong> {selectedTicket.user_id}</div>
          <div><strong>Order Ref:</strong> {selectedTicket.order_reference}</div>
          <div><strong>Created At:</strong> {formatDate(selectedTicket.created_at)}</div>
          <div><strong>Resolution:</strong> {selectedTicket.resolution_requested}</div>
        </div>

        <Space size={16} style={{ marginBottom: 16 }}>
          <div><strong>Issue Type</strong> <Tag color={getColor("issue_type", selectedTicket.issue_type)}>{selectedTicket.issue_type.toUpperCase()}</Tag></div>
          <div><strong>Urgency</strong> <Tag color={getColor("urgency", selectedTicket.urgency)}>{selectedTicket.urgency.toUpperCase()}</Tag></div>
          <div><strong>Status</strong> <Tag color={getColor("status", selectedTicket.status)}>{selectedTicket.status.toUpperCase()}</Tag></div>
        </Space>

        <div style={{ marginBottom: 16 }}>
          <strong>Description:</strong>
          <div style={{ padding: 8, border: "1px solid #f0f0f0", borderRadius: 4, background: "#fff" }}>{selectedTicket.description}</div>
        </div>

        {selectedTicket.photo_video_url && (
          <div style={{ marginBottom: 16 }}>
            <strong>Evidence:</strong>
            <img src={selectedTicket.photo_video_url} alt="Evidence" style={{ width: 120, height: 120, objectFit: "cover", borderRadius: 4, border: "1px solid #f0f0f0" }} />
          </div>
        )}

        <div style={{ marginBottom: 16 }}>
          <strong>Reply to User:</strong>
          <TextArea rows={3} value={reply} onChange={(e) => setReply(e.target.value)} placeholder="Enter professional reply..." />
        </div>

        <Space style={{ display: "flex", justifyContent: "space-between" }}>
          <Select value={status} onChange={setStatus} style={{ width: 150 }}>
            {["open", "resolved", "closed"].map((s) => <Option key={s} value={s}>{s.toUpperCase()}</Option>)}
          </Select>
          <Space>
            <Button type="primary" icon={<SendOutlined />} onClick={sendReply} disabled={!reply.trim()}>Send Reply</Button>
            <Button icon={<SaveOutlined />} onClick={saveStatus} disabled={status === selectedTicket.status}>Save Status</Button>
          </Space>
        </Space>
      </Modal>
    );
  };

  return (
    <div style={{ padding: 32, background: "#fff", borderRadius: 10 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <h2 style={{ margin: 0, fontWeight: 600 }}>Admin Support Dashboard</h2>
      </div>

      <div className="mb-4 w-72 relative">
  <Input
    placeholder="Search by ID, order, or description..."
    value={searchText}
    onChange={(e) => setSearchText(e.target.value)}
    className="w-full"
    suffix={<SearchOutlined className="text-white" />}
  />
</div>


      <Table
        dataSource={filteredTickets}
        columns={columns}
        rowKey="support_id"
        pagination={{ pageSize: 5 }}
        bordered
      />

      {selectedTicket && <TicketModal />}
    </div>
  );
};

export default Support;
