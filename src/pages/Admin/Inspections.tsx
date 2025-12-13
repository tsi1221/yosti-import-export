import  { useState, useEffect } from "react";
import { Table, Drawer, Form, Input, Button, Upload, Select, Space, Tag, message } from "antd";
import { UploadOutlined, SaveOutlined, CloseOutlined, EyeOutlined, EditOutlined } from "@ant-design/icons";
import type { RcFile, UploadFile, UploadChangeParam } from "antd/es/upload";

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
];

const Inspections: React.FC = () => {
  const [inspections, setInspections] = useState<Inspection[]>([]);
  const [filteredInspections, setFilteredInspections] = useState<Inspection[]>([]);
  // const [viewDrawerOpen, setViewDrawerOpen] = useState(false);
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
    setFilteredInspections(
      type === "all" ? inspections : inspections.filter(i => i.inspection_type === type)
    );
  };

  const handleView = (inspection: Inspection) => {
    setSelectedInspection(inspection);
    // setViewDrawerOpen(true);
  };

  const handleRespond = (inspection: Inspection) => {
    setSelectedInspection(inspection);
    form.setFieldsValue({
      status: inspection.status,
      remarks: inspection.remarks,
      reportUrl: inspection.reportUrl
        ? [
            {
              uid: "-1",
              name: inspection.reportUrl.split("/").pop() || "file",
              status: "done",
              url: inspection.reportUrl,
            } as UploadFile
          ]
        : [],
    });
    setRespondDrawerOpen(true);
  };

  const handleSave = async () => {
    if (!selectedInspection) return;
    try {
      const values = await form.validateFields();
      setLoading(true);

      let uploadedFileUrl = selectedInspection.reportUrl;

      if (values.reportUrl && values.reportUrl.length > 0) {
        const fileObj = values.reportUrl[0].originFileObj as RcFile | undefined;
        if (fileObj) {
          uploadedFileUrl = URL.createObjectURL(fileObj);
        }
      }

      const updatedInspection: Inspection = {
        ...selectedInspection,
        ...values,
        reportUrl: uploadedFileUrl,
      };

      setInspections(prev =>
        prev.map(i => (i.inspection_id === selectedInspection.inspection_id ? updatedInspection : i))
      );
      setFilteredInspections(prev =>
        prev.map(i => (i.inspection_id === selectedInspection.inspection_id ? updatedInspection : i))
      );

      message.success("Inspection responded successfully");
      setRespondDrawerOpen(false);
      setSelectedInspection(null);
      form.resetFields();
    } catch (err) {
      console.error(err);
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
      render: (_: unknown, record: Inspection) => (
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
    <div style={{ padding: 24 }}>
      <h2 style={{ color: "#0F3952", marginBottom: 16 }}>Inspections</h2>

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
              getValueFromEvent={(e: UploadChangeParam<UploadFile<RcFile>>) => e?.fileList}
            >
              <Upload name="report" listType="text" maxCount={1} beforeUpload={() => false}>
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
              </Upload>
            </Form.Item>

            {selectedInspection.reportUrl && (
              <div style={{ marginTop: 16 }}>
                <p><strong>Current Video / Report:</strong></p>
                {selectedInspection.reportUrl.endsWith(".mp4") ? (
                  <video width="100%" controls>
                    <source src={selectedInspection.reportUrl} type="video/mp4" />
                  </video>
                ) : (
                  <a href={selectedInspection.reportUrl} target="_blank" rel="noreferrer">
                    {selectedInspection.reportUrl}
                  </a>
                )}
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
