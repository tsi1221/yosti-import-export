import React from "react";
import { Button } from "antd";
import { EyeOutlined, MessageOutlined } from "@ant-design/icons";

interface Props {
  onView: () => void;
  onReply: () => void;
}

const ActionButtons: React.FC<Props> = ({ onView, onReply }) => (
  <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
    <Button
      icon={<EyeOutlined />}
      onClick={onView}
      style={{ backgroundColor: "#0F3952", color: "#fff", border: "none", borderRadius: 4 }}
    />
    <Button
      icon={<MessageOutlined />}
      onClick={onReply}
      style={{ backgroundColor: "#0F3952", color: "#fff", border: "none", borderRadius: 4 }}
    />
  </div>
);

export default ActionButtons;
