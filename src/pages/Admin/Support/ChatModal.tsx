import React, { useState } from "react";
import { Modal, Form, Input, Button } from "antd";
import type { SupportTicket, ChatMessage } from "../../../data/support";
import { chatMessages as chatData } from "../../../data/support";

interface Props {
  visible: boolean;
  ticket: SupportTicket;
  onClose: () => void;
}

const ChatModal: React.FC<Props> = ({ visible, ticket, onClose }) => {
  const [form] = Form.useForm();
  const [chats, setChats] = useState<ChatMessage[]>(
    chatData.filter((msg) => msg.ticketId === ticket.id)
  );

  const handleSendReply = (values: { reply: string }) => {
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const newMsg: ChatMessage = {
      id: `c${chats.length + 1}`,
      ticketId: ticket.id,
      sender: "Admin",
      message: values.reply,
      time: timeString,
    };
    setChats([...chats, newMsg]);
    form.resetFields();
  };

  return (
    <Modal open={visible} onCancel={onClose} footer={null} width={650} title={`Chat - ${ticket.subject}`}>
      <div style={{ display: "flex", flexDirection: "column", gap: 12, height: 400, justifyContent: "space-between" }}>
        <div style={{ flexGrow: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 8, padding: 8, background: "#f7f9fa", borderRadius: 8 }}>
          {chats.map((chat) => (
            <div key={chat.id} style={{
              alignSelf: chat.sender === "User" ? "flex-start" : "flex-end",
              backgroundColor: chat.sender === "User" ? "#e6f7ff" : "#0F3952",
              color: chat.sender === "Admin" ? "white" : "black",
              padding: "8px 12px",
              borderRadius: 12,
              maxWidth: "70%",
              wordBreak: "break-word",
            }}>
              <small>{chat.sender} • {chat.time}</small>
              <div>{chat.message}</div>
            </div>
          ))}
        </div>

        <Form form={form} onFinish={handleSendReply}>
          <Form.Item name="reply" rules={[{ required: true, message: "Type a reply!" }]}>
            <Input.TextArea rows={2} placeholder="Write a reply..." style={{ borderRadius: 6 }} />
          </Form.Item>
          <Form.Item style={{ textAlign: "right", marginBottom: 0 }}>
            <Button type="primary" htmlType="submit" style={{ backgroundColor: "#0F3952", borderColor: "#0F3952", padding: "4px 18px" }}>
              Send
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};

export default ChatModal;
