// src/pages/supplier/Profile.tsx
import  { useState, useEffect } from "react";
import {
  Row, Col, Card, Avatar, Typography, Button, Form, Input,
  Upload, Table, Modal, Tag, message
} from "antd";
import { EditOutlined, SaveOutlined, UploadOutlined, EyeOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

const { Title, Text } = Typography;

const initialSupplier = {
  supplier_id: "SUP-001",
  name: "ABC Textiles",
  contact_person: "John Doe",
  phone: "0912345678",
  email: "abc@textiles.com",
  address: "123 Main St",
  city: "Addis Ababa",
  province: "Addis Ababa",
  verified: false,
  logo: "",
  created_at: "2025-10-01",
};

const initialVerifications = [
  {
    verification_id: "V-001",
    concerns: "Need admin approval",
    status: "Pending",
    created_at: "2025-11-26",
  },
];

export default function SupplierProfile() {
  const [supplier, setSupplier] = useState(initialSupplier);
  const [verifications] = useState(initialVerifications);
  const [editing, setEditing] = useState(false);
  const [logoPreview, setLogoPreview] = useState(supplier.logo);
  const [selected, setSelected] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(supplier);
  }, [supplier]);

  const saveProfile = async () => {
    const values = await form.validateFields();
    setSupplier({ ...supplier, ...values, logo: logoPreview });
    setEditing(false);
    message.success("Saved");
  };

  const columns = [
    { title: "ID", dataIndex: "verification_id" },
    { title: "Concerns", dataIndex: "concerns" },
    {
      title: "Status",
      dataIndex: "status",
      render: (s) => <Tag color={s === "Approved" ? "green" : s === "Rejected" ? "red" : "gold"}>{s}</Tag>,
    },
    {
      title: "Date",
      dataIndex: "created_at",
      render: (d) => dayjs(d).format("YYYY-MM-DD"),
    },
    {
      title: "Action",
      render: (_, r) => (
        <Button type="link" icon={<EyeOutlined />} onClick={() => { setSelected(r); setModalOpen(true); }}>
          View
        </Button>
      ),
    },
  ];

  return (
    <div className="p-6">
      <Row justify="space-between" style={{ marginBottom: 16 }}>
        <Title level={3}>Supplier Profile</Title>
        {!editing ? (
          <Button icon={<EditOutlined />} onClick={() => setEditing(true)}>Edit</Button>
        ) : (
          <Button type="primary" icon={<SaveOutlined />} onClick={saveProfile}>Save</Button>
        )}
      </Row>

      {/* PROFILE CARD */}
      <Card style={{ marginBottom: 20 }}>
        <Row gutter={24}>
          <Col md={6} style={{ textAlign: "center" }}>
            <Avatar size={100} src={logoPreview} />
            {editing && (
              <Upload
                showUploadList={false}
                beforeUpload={(file) => {
                  setLogoPreview(URL.createObjectURL(file));
                  return false;
                }}
              >
                <Button size="small" icon={<UploadOutlined />} style={{ marginTop: 10 }}>
                  Change Logo
                </Button>
              </Upload>
            )}
            <div style={{ marginTop: 12 }}>
              <Tag color={supplier.verified ? "green" : "gold"}>
                {supplier.verified ? "Verified" : "Not Verified"}
              </Tag>
            </div>
          </Col>

          <Col md={18}>
            <Form layout="vertical" form={form} disabled={!editing}>
              <Row gutter={12}>
                <Col span={12}>
                  <Form.Item label="Company Name" name="name" rules={[{ required: true }]}>
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Contact Person" name="contact_person" rules={[{ required: true }]}>
                    <Input />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={12}>
                <Col span={12}>
                  <Form.Item label="Phone" name="phone" rules={[{ required: true }]}>
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Email" name="email" rules={[{ required: true }]}>
                    <Input />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item label="Address" name="address">
                <Input />
              </Form.Item>

              <Row gutter={12}>
                <Col span={12}>
                  <Form.Item label="City" name="city">
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Province" name="province">
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </Card>

      {/* VERIFICATION TABLE */}
      <Card title="Verification Requests">
        <Table
          columns={columns}
          dataSource={verifications}
          rowKey="verification_id"
          pagination={false}
          size="small"
        />
      </Card>

      <Modal
        title="Verification Details"
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        footer={<Button onClick={() => setModalOpen(false)}>Close</Button>}
      >
        {selected && (
          <>
            <p><b>ID:</b> {selected.verification_id}</p>
            <p><b>Concerns:</b><br />{selected.concerns}</p>
            <p><b>Status:</b> {selected.status}</p>
            <p><b>Date:</b> {dayjs(selected.created_at).format("YYYY-MM-DD")}</p>
          </>
        )}
      </Modal>
    </div>
  );
}
