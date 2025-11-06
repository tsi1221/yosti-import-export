// src/components/support/SupportTable.tsx
import React, { useState } from "react";
import { Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import type { SupportTicket } from "../../../data/support";
import { supportTickets, users } from "../../../data/support";
import TicketDetailsModal from "./TicketDetailsModal";
import ChatModal from "./ChatModal";
import ActionButtons from "./ActionButtons";

const statusColors: Record<SupportTicket["status"], string> = {
  Open: "green",
  Pending: "orange",
  Closed: "red",
};

const priorityColors: Record<string, string> = {
  High: "red",
  Medium: "orange",
  Low: "blue",
};

const SupportTable: React.FC = () => {
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(
    null
  );
  const [detailVisible, setDetailVisible] = useState(false);
  const [chatVisible, setChatVisible] = useState(false);

  const handleView = (ticket: SupportTicket) => {
    setSelectedTicket(ticket);
    setDetailVisible(true);
  };

  const handleReply = (ticket: SupportTicket) => {
    setSelectedTicket(ticket);
    setChatVisible(true);
  };

  const columns: ColumnsType<SupportTicket> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 70,
    },
    {
      title: "User Name",
      dataIndex: "userId",
      key: "userName",
      sorter: (a, b) => {
        const userA = users.find((u) => u.id === a.userId)?.name || "";
        const userB = users.find((u) => u.id === b.userId)?.name || "";
        return userA.localeCompare(userB);
      },
      render: (userId) => users.find((u) => u.id === userId)?.name || "Unknown",
    },
    {
      title: "Priority",
      dataIndex: "priority",
      key: "priority",
      filters: [
        { text: "High", value: "High" },
        { text: "Medium", value: "Medium" },
        { text: "Low", value: "Low" },
      ],
      onFilter: (value, record) => record.priority === value,
      render: (priority) => <Tag color={priorityColors[priority]}>{priority}</Tag>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      filters: [
        { text: "Open", value: "Open" },
        { text: "Pending", value: "Pending" },
        { text: "Closed", value: "Closed" },
      ],
      onFilter: (value, record) => record.status === value,
      render: (status) => <Tag color={statusColors[status]}>{status}</Tag>,
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      sorter: (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    },
    {
      title: "Action",
      key: "action",
      align: "right",
      render: (_: any, record: SupportTicket) => (
        <ActionButtons onView={() => handleView(record)} onReply={() => handleReply(record)} />
      ),
    },
  ];

  return (
    <div style={{ padding: 20, background: "#fff", borderRadius: 8 }}>
      <h2 style={{ marginBottom: 16, color: "#0F3952" }}>Support Requests</h2>
      <Table columns={columns} dataSource={supportTickets} rowKey="id" pagination={{ pageSize: 6 }} />
      {selectedTicket && (
        <>
          <TicketDetailsModal
            visible={detailVisible}
            ticket={selectedTicket}
            onClose={() => setDetailVisible(false)}
          />
          <ChatModal
            visible={chatVisible}
            ticket={selectedTicket}
            onClose={() => setChatVisible(false)}
          />
        </>
      )}
    </div>
  );
};

export default SupportTable;
