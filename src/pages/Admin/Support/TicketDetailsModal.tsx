import React from "react";
import { Modal, Tag } from "antd";
import type { SupportTicket } from "../../../data/support";

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

interface Props {
  visible: boolean;
  ticket: SupportTicket;
  onClose: () => void;
}

const users = [
  { id: "1", name: "Alice" },
  { id: "2", name: "Bob" },
  { id: "3", name: "Charlie" },
];

const TicketDetailsModal: React.FC<Props> = ({ visible, ticket, onClose }) => (
  <Modal open={visible} onCancel={onClose} footer={null} width={600} title="Ticket Details">
    <p><strong>User:</strong> {users.find((u) => u.id === ticket.userId)?.name}</p>
    <p><strong>Subject:</strong> {ticket.subject}</p>
    <p><strong>Status:</strong> <Tag color={statusColors[ticket.status]}>{ticket.status}</Tag></p>
    <p><strong>Priority:</strong> <Tag color={priorityColors[ticket.priority]}>{ticket.priority}</Tag></p>
    <p><strong>Created At:</strong> {ticket.createdAt}</p>
    <p><strong>Details:</strong> {ticket.details}</p>
  </Modal>
);

export default TicketDetailsModal;
