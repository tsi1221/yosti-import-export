import React, { useState, useEffect } from "react";
import { Table, Drawer, Form, Input, Button, Upload, Select, Space, Tag, message } from "antd";
import { UploadOutlined, SaveOutlined, CloseOutlined, EyeOutlined, EditOutlined } from "@ant-design/icons";

const { Option } = Select;

interface Inspection {
  inspection_id: string;
  user_id: string;
  supplier_id: string;
  product_type: string;
  inspection_type: "sample" | "pre-shipment" | "factory visit";
  date: string;
  status: "pending" | "completed" | "rejected";
  remarks?: string;
  photo_video_required: boolean;
  reportUrl?: string; // can be video or report
}

// Mock data
const mockInspections: Inspection[] = [
  {
    inspection_id: "1",
    user_id: "USR001",
    supplier_id: "SUP001",
    product_type: "Coffee",
    inspection_type: "sample",
    date: "2025-11-15",
    status: "pending",
    remarks: "",
    photo_video_required: true,
    reportUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    inspection_id: "2",
    user_id: "USR002",
    supplier_id: "SUP002",
    product_type: "Spices",
    inspection_type: "pre-shipment",
    date: "2025-11-14",
    status: "completed",
    remarks: "Passed all checks",
    photo_video_required: false,
    reportUrl: "report2.pdf",
  },
  {
    inspection_id: "3",
    user_id: "USR003",
    supplier_id: "SUP003",
    product_type: "Oilseeds",
    inspection_type: "factory visit",
    date: "2025-11-13",
    status: "rejected",
    remarks: "Low quality",
    photo_video_required: true,
    reportUrl: "https://www.w3schools.com/html/movie.mp4",
  },
];

const Inspections: React.FC = () => {
  const [inspections, setInspections] = useState<Inspection[]>([]);
  const [filteredInspections, setFilteredInspections] = useState<Inspection[]>([]);
  const [viewDrawerOpen, setViewDrawerOpen] = useState(false);
  const [respondDrawerOpen, setRespondDrawerOpen] = useState(false);
  const [selectedInspection, setSelectedInspection] = useState<Inspection | null>(null);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [activeFilter, setActiveFilter] = useState<Inspection["inspection_type"] | "all">("all");

  useEffect(() => {
    setInspections(mockInspections);
    setFilteredInspections(mockInspections);
  }, []);

  const filterByType = (type: Inspection["inspection_type"] | "all") => {
    setActiveFilter(type);
    setFilteredInspections(type === "all" ? inspections : inspections.filter(i => i.inspection_type === type));
  };

  const handleView = (inspection: Inspection) => {
    setSelectedInspection(inspection);
    setViewDrawerOpen(true);
  };

  const handleRespond = (inspection: Inspection) => {
    setSelectedInspection(inspection);
    form.setFieldsValue({
      status: inspection.status,
      remarks: inspection.remarks,
      reportUrl: inspection.reportUrl ? [{ name: inspection.reportUrl, url: inspection.reportUrl }] : [],
    });
    setRespondDrawerOpen(true);
  };

  const handleSave = async () => {
    if (!selectedInspection) return;
    try {
      const values = await form.validateFields();
      setLoading(true);

      // Get uploaded file URL
      const uploadedFile = values.reportUrl?.[0]?.originFileObj
        ? URL.createObjectURL(values.reportUrl[0].originFileObj)
        : selectedInspection.reportUrl;

      const updatedInspection = { ...selectedInspection, ...values, reportUrl: uploadedFile };

      setInspections(prev =>
        prev.map(i => (i.inspection_id === selectedInspection.inspection_id ? updatedInspection : i))
      );
      setFilteredInspections(prev =>
        prev.map(i => (i.inspection_id === selectedInspection.inspection_id ? updatedInspection : i))
      );

      message.success("Inspection responded successfully to buyer");
      setRespondDrawerOpen(false);
      setSelectedInspection(null);
      form.resetFields();
    } catch (err) {
      message.error("Failed to update inspection");
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { title: "Product", dataIndex: "product_type", key: "product_type" },
    { title: "Type", dataIndex: "inspection_type", key: "inspection_type" },
    { title: "Date", dataIndex: "date", key: "date" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => {
        const color = status === "pending" ? "orange" : status === "completed" ? "green" : "red";
        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: Inspection) => (
        <Space>
          <Button
            type="primary"
            style={{ background: "#0F3952", borderColor: "#0F3952", color: "#FFD700" }}
            icon={<EyeOutlined />}
            onClick={() => handleView(record)}
          >
            View
          </Button>
          <Button
            type="default"
            style={{ background: "#FFFFFF", borderColor: "#0F3952", color: "#0F3952" }}
            icon={<EditOutlined />}
            onClick={() => handleRespond(record)}
          >
            Respond
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 24, fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
      <h2 style={{ color: "#0F3952", marginBottom: 16, fontSize: 22 }}>Inspections</h2>

      <Space style={{ marginBottom: 16 }}>
        {(["all", "sample", "pre-shipment", "factory visit"] as const).map(type => (
          <Button
            key={type}
            type={activeFilter === type ? "primary" : "default"}
            style={{
              background: activeFilter === type ? "#0F3952" : "#FFFFFF",
              color: activeFilter === type ? "#FFD700" : "#0F3952",
              borderColor: "#0F3952",
              fontWeight: 600,
            }}
            onClick={() => filterByType(type)}
          >
            {type === "all" ? "All" : type.charAt(0).toUpperCase() + type.slice(1)}
          </Button>
        ))}
      </Space>

      <Table dataSource={filteredInspections} columns={columns} rowKey="inspection_id" pagination={{ pageSize: 5 }} />

      {/* View Drawer */}
      <Drawer
        title={selectedInspection ? `Inspection Details - ${selectedInspection.product_type}` : "Inspection"}
        width={450}
        open={viewDrawerOpen}
        onClose={() => setViewDrawerOpen(false)}
      >
        {selectedInspection && (
          <Space direction="vertical" style={{ width: "100%" }}>
            <p><strong>User ID:</strong> {selectedInspection.user_id}</p>
            <p><strong>Supplier ID:</strong> {selectedInspection.supplier_id}</p>
            <p><strong>Product Type:</strong> {selectedInspection.product_type}</p>
            <p><strong>Inspection Type:</strong> {selectedInspection.inspection_type}</p>
            <p><strong>Date:</strong> {selectedInspection.date}</p>
            <p><strong>Status:</strong> {selectedInspection.status.toUpperCase()}</p>
            <p><strong>Remarks:</strong> {selectedInspection.remarks || "N/A"}</p>
            <p>
              <strong>Photo/Video Required:</strong>{" "}
              {selectedInspection.photo_video_required ? (
                selectedInspection.reportUrl ? (
                  <video width="100%" controls style={{ marginTop: 8 }}>
                    <source src={selectedInspection.reportUrl} type="video/mp4" />
                  </video>
                ) : (
                  "Yes"
                )
              ) : (
                "No"
              )}
            </p>
          </Space>
        )}
      </Drawer>

      {/* Respond Drawer */}
      <Drawer
        title={selectedInspection ? `Respond - ${selectedInspection.product_type}` : "Respond Inspection"}
        width={450}
        open={respondDrawerOpen}
        onClose={() => setRespondDrawerOpen(false)}
      >
        {selectedInspection && (
          <Form form={form} layout="vertical">
            <Form.Item name="status" label="Status" rules={[{ required: true }]}>
              <Select>
                <Option value="completed">Completed</Option>
                <Option value="pending">Pending</Option>
                <Option value="rejected">Rejected</Option>
              </Select>
            </Form.Item>

            <Form.Item name="remarks" label="Remarks">
              <Input.TextArea rows={3} placeholder="Add remarks" />
            </Form.Item>

            <Form.Item
              name="reportUrl"
              label="Upload Report / Video"
              valuePropName="fileList"
              getValueFromEvent={(e: any) => e?.fileList}
            >
              <Upload name="report" listType="text" maxCount={1}>
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
              </Upload>
            </Form.Item>

            {selectedInspection.reportUrl && (
              <div style={{ marginTop: 16 }}>
                <p><strong>Current Video / Report:</strong></p>
                <video width="100%" controls>
                  <source src={selectedInspection.reportUrl} type="video/mp4" />
                </video>
              </div>
            )}

            <Space style={{ display: "flex", justifyContent: "flex-end", marginTop: 16 }}>
              <Button
                icon={<CloseOutlined />}
                onClick={() => setRespondDrawerOpen(false)}
                style={{ border: "1px solid #0F3952", color: "#0F3952", borderRadius: 6 }}
              >
                Cancel
              </Button>
              <Button
                icon={<SaveOutlined />}
                type="primary"
                onClick={handleSave}
                loading={loading}
                style={{ background: "#0F3952", border: "none", borderRadius: 6 }}
              >
                Respond
              </Button>
            </Space>
          </Form>
        )}
      </Drawer>
    </div>
  );
};

export default Inspections;
