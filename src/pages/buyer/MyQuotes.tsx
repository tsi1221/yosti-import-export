import { useState } from "react";
import { Table, Button, Drawer, Input, message } from "antd";
import { MessageOutlined, SendOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import type { SupplierQuote } from "../../pages/buyer/type/QuotesInterface";
import { useQuotes } from "../../hooks/useQuotes";

export default function MyQuotes() {
  const { quotes, addReply } = useQuotes();
  const [selectedQuote, setSelectedQuote] = useState<SupplierQuote | null>(null);
  const [replyText, setReplyText] = useState("");
  const [drawerVisible, setDrawerVisible] = useState(false);

  const handleOpenDrawer = (quote: SupplierQuote) => {
    setSelectedQuote(quote);
    setReplyText("");
    setDrawerVisible(true);
  };

  const handleSendReply = () => {
    if (!replyText.trim()) {
      message.error("Reply cannot be empty.");
      return;
    }
    if (selectedQuote) {
      addReply(selectedQuote.quote_id, replyText);
      setReplyText("");
      message.success("Reply sent successfully!");
    }
  };

  const columns = [
    { title: "Request ID", dataIndex: "request_id", key: "request_id", className: "font-semibold text-[#0A1A4E]", width: 120 },
    { title: "Supplier", dataIndex: "supplier_name", key: "supplier_name", width: 140 },
    { title: "Price ($)", dataIndex: "price", key: "price", width: 100 },
    { title: "MOQ", dataIndex: "moq", key: "moq", width: 80 },
    { title: "Lead Time", dataIndex: "lead_time", key: "lead_time", width: 100 },
    { 
      title: "Created At", 
      dataIndex: "created_at", 
      key: "created_at", 
      width: 120,
      render: (date: string) => dayjs(date).format("YYYY-MM-DD") 
    },
    { 
      title: "Notes", 
      dataIndex: "notes", 
      key: "notes", 
      render: (text: string) => <p className="truncate max-w-[180px]">{text}</p>,
      width: 200
    },
    {
      title: "Reply",
      key: "reply",
      width: 100,
      render: (_: SupplierQuote, record: SupplierQuote) => (
        <Button
          icon={<MessageOutlined />}
          size="small"
          className="bg-[#0A1A4E] text-white border-none flex items-center justify-center gap-1"
          onClick={() => handleOpenDrawer(record)}
        >
          Reply
        </Button>
      ),
    },
  ];

  return (
    <div className="p-6 min-h-screen bg-white">
      <h1 className="text-3xl font-bold text-[#0A1A4E] mb-6">My Quotes</h1>

      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-4 overflow-x-auto">
        <Table
          dataSource={quotes}
          columns={columns}
          rowKey="quote_id"
          pagination={{ pageSize: 5, position: ["bottomRight"] }}
          scroll={{ x: "max-content" }}
          bordered
        />
      </div>

      {/* Reply Drawer */}
      <Drawer
        title={`Chat with ${selectedQuote?.supplier_name}`}
        width={400}
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
      >
        {selectedQuote && (
          <div className="flex flex-col h-[70vh] justify-between">
            <div className="overflow-y-auto p-2 flex flex-col gap-3">
              {(selectedQuote.replies || []).map((r, i) => (
                <div
                  key={i}
                  className={`p-2 rounded-xl break-words ${
                    r.sender === "buyer"
                      ? "self-end bg-[#0A1A4E] text-[#FFD700]"
                      : "self-start bg-gray-200 text-gray-800"
                  }`}
                >
                  <p className="text-sm">{r.message}</p>
                  <p className="text-xs text-right mt-1 opacity-70">
                    {dayjs(r.created_at).format("YYYY-MM-DD HH:mm")}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-2 flex gap-2">
              <Input.TextArea
                rows={2}
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Type your reply..."
              />
              <Button
                type="primary"
                icon={<SendOutlined />}
                size="small"
                className="bg-[#0A1A4E] border-none flex items-center justify-center"
                onClick={handleSendReply}
              />
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
}
