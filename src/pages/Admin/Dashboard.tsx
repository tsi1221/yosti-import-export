import { useState, useEffect } from "react";
import { Row, Col, Card, Table, Button, Drawer, Form, Input, Switch, Tag } from "antd";
import { EditOutlined, EyeOutlined } from "@ant-design/icons";

const { Column, ColumnGroup } = Table;

// --------------------- Types ---------------------
interface User {
  _id: string;
  fullName: string;
  companyName: string;
  country: string;
  phone: string;
  email: string;
  accountType: string;
  languagePreference: string;
}

interface Supplier {
  _id: string;
  name: string;
  verified: boolean;
  contactPerson: string;
  phone: string;
  email: string;
  locationCity: string;
}

interface DashboardStats {
  totalUsers: number;
  totalSuppliers: number;
  verifications: number;
  totalPayments: number;
}

// ------------------- Dashboard Card -------------------
interface DashboardCardProps {
  title: string;
  value: number | string;
  color?: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, value, color = "#0F3952" }) => (
  <Card
    style={{
      borderRadius: 16,
      boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
      minHeight: 120,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      borderLeft: `6px solid ${color}`,
      textAlign: "center",
    }}
  >
    <h3 style={{ margin: 0, fontSize: 16, color: "#555", fontWeight: 600 }}>{title}</h3>
    <p style={{ margin: 0, fontSize: 28, fontWeight: 700, color: "#0F3952" }}>{value}</p>
  </Card>
);

// ------------------- Main Dashboard -------------------
const AdminDashboard: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalSuppliers: 0,
    verifications: 0,
    totalPayments: 0,
  });

  const [activeTab, setActiveTab] = useState<"users" | "suppliers">("users");
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [editingSupplier, setEditingSupplier] = useState<Supplier | null>(null);
  const [viewMode, setViewMode] = useState(false);

  const [form] = Form.useForm();

  const buttonStyle = (active: boolean) => ({
    backgroundColor: active ? "#0F3952" : "#fff",
    color: active ? "#FFD700" : "#0F3952",
    border: `1px solid #0F3952`,
    borderRadius: 6,
    fontWeight: 600,
    padding: "8px 24px",
    cursor: "pointer",
    transition: "all 0.2s",
  });

  useEffect(() => {
    const mockUsers: User[] = [
      { _id: "1", fullName: "Chen Supplier", companyName: "Chen Co.", country: "China", phone: "444555666", email: "suppliers@example.com", accountType: "supplier", languagePreference: "en" },
      { _id: "2", fullName: "Alice Buyer", companyName: "", country: "USA", phone: "123456789", email: "alice@example.com", accountType: "buyer", languagePreference: "en" },
    ];

    const mockSuppliers: Supplier[] = [
      { _id: "101", name: "Global Supplies", verified: true, contactPerson: "John Doe", phone: "+123456789", email: "contact@globalsupplies.com", locationCity: "New York" },
      { _id: "102", name: "Quality Traders", verified: false, contactPerson: "Jane Roe", phone: "+987654321", email: "info@qualitytraders.com", locationCity: "London" },
      { _id: "103", name: "Asia Importers", verified: true, contactPerson: "Liu Wei", phone: "+55 123 9988", email: "asia@importers.cn", locationCity: "Shanghai" },
      { _id: "104", name: "Africa Wholesale", verified: false, contactPerson: "Samuel K.", phone: "+251900123456", email: "wholesale@africa.com", locationCity: "Addis Ababa" },
    ];

    setUsers(mockUsers);
    setSuppliers(mockSuppliers);
    setStats({
      totalUsers: mockUsers.length,
      totalSuppliers: mockSuppliers.length,
      verifications: mockSuppliers.filter(s => s.verified).length,
      totalPayments: 12345,
    });
  }, []);

  // ------------------- Drawer Open -------------------
  const openDrawer = (type: "user" | "supplier", record: User | Supplier, view: boolean = false) => {
    setViewMode(view);
    if (type === "user") {
      setEditingUser(record as User);
      setEditingSupplier(null);
    } else {
      setEditingSupplier(record as Supplier);
      setEditingUser(null);
    }
    form.setFieldsValue(record);
    setDrawerVisible(true);
  };

  const handleDelete = (type: "user" | "supplier", id: string) => {
    if (type === "user") setUsers(prev => prev.filter(u => u._id !== id));
    else setSuppliers(prev => prev.filter(s => s._id !== id));
  };

  const handleSave = () => {
    const values = form.getFieldsValue();
    if (editingUser) setUsers(prev => prev.map(u => (u._id === editingUser._id ? { ...u, ...values } : u)));
    if (editingSupplier) setSuppliers(prev => prev.map(s => (s._id === editingSupplier._id ? { ...s, ...values } : s)));
    setDrawerVisible(false);
    setEditingUser(null);
    setEditingSupplier(null);
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1 style={{ color: "#0F3952", fontSize: 28, fontWeight: 700, marginBottom: 24 }}>Admin Dashboard</h1>

      {/* Dashboard Cards */}
      <Row gutter={[20, 20]}>
        <Col xs={24} sm={12} md={6}><DashboardCard title="Total Users" value={stats.totalUsers} color="#0F3952" /></Col>
        <Col xs={24} sm={12} md={6}><DashboardCard title="Total Suppliers" value={stats.totalSuppliers} color="#E4BD3B" /></Col>
        <Col xs={24} sm={12} md={6}><DashboardCard title="Verifications" value={stats.verifications} color="#4CAF50" /></Col>
        <Col xs={24} sm={12} md={6}><DashboardCard title="Total Payments" value={`$${stats.totalPayments}`} color="#FF5722" /></Col>
      </Row>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 6, margin: "20px 0" }}>
        <button style={buttonStyle(activeTab === "users")} onClick={() => setActiveTab("users")}>All Users</button>
        <button style={buttonStyle(activeTab === "suppliers")} onClick={() => setActiveTab("suppliers")}>All Suppliers</button>
      </div>

      {/* Users Table */}
      {activeTab === "users" && (
        <Card style={{ borderRadius: 12, boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}>
          <Table<User> dataSource={users} rowKey="_id" bordered pagination={{ position: ["bottomRight"] }}>
            <ColumnGroup title="User Info">
              <Column title="Full Name" dataIndex="fullName" key="fullName" />
              <Column title="Company" dataIndex="companyName" key="companyName" />
              <Column title="Email" dataIndex="email" key="email" />
              <Column title="Phone" dataIndex="phone" key="phone" />
              <Column title="Country" dataIndex="country" key="country" />
              <Column title="Type" dataIndex="accountType" key="accountType" />
              <Column title="Language" dataIndex="languagePreference" key="languagePreference" />
            </ColumnGroup>
            <Column
              title="Actions"
              key="actions"
              render={(_: User, record: User) => (
                <div style={{ display: "flex", gap: 6 }}>
                  <Button icon={<EyeOutlined />} size="small" onClick={() => openDrawer("user", record, true)} />
                  <Button icon={<EditOutlined />} size="small" onClick={() => openDrawer("user", record)} />
                  <Button danger size="small" onClick={() => handleDelete("user", record._id)}>Delete</Button>
                </div>
              )}
            />
          </Table>
        </Card>
      )}

      {/* Suppliers Table */}
      {activeTab === "suppliers" && (
        <Card style={{ borderRadius: 12, boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}>
          <Table<Supplier> dataSource={suppliers} rowKey="_id" bordered pagination={{ position: ["bottomRight"] }}>
            <Column title="Company" dataIndex="name" key="name" />
            <Column title="Contact Person" dataIndex="contactPerson" key="contactPerson" />
            <Column title="Phone" dataIndex="phone" key="phone" />
            <Column title="Email" dataIndex="email" key="email" />
            <Column title="City" dataIndex="locationCity" key="locationCity" />
            <Column
              title="Verified"
              dataIndex="verified"
              key="verified"
              render={(v: boolean) => <Tag color={v ? "green" : "orange"}>{v ? "Yes" : "Pending"}</Tag>}
            />
            <Column
              title="Actions"
              key="actions"
              render={(_: Supplier, record: Supplier) => (
                <div style={{ display: "flex", gap: 6 }}>
                  <Button icon={<EyeOutlined />} size="small" onClick={() => openDrawer("supplier", record, true)} />
                  <Button icon={<EditOutlined />} size="small" onClick={() => openDrawer("supplier", record)} />
                  <Button danger size="small" onClick={() => handleDelete("supplier", record._id)}>Delete</Button>
                </div>
              )}
            />
          </Table>
        </Card>
      )}

      {/* Drawer */}
      <Drawer
        title={viewMode ? "View Details" : "Edit Details"}
        width={400}
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
        footer={
          !viewMode && <Button type="primary" onClick={handleSave} style={{ backgroundColor: "#0F3952", color: "#fff" }}>Update</Button>
        }
      >
        <Form form={form} layout="vertical">
          {editingUser && (
            <>
              <Form.Item name="fullName" label="Full Name"><Input disabled={viewMode} /></Form.Item>
              <Form.Item name="companyName" label="Company"><Input disabled={viewMode} /></Form.Item>
              <Form.Item name="email" label="Email"><Input disabled={viewMode} /></Form.Item>
              <Form.Item name="phone" label="Phone"><Input disabled={viewMode} /></Form.Item>
              <Form.Item name="country" label="Country"><Input disabled={viewMode} /></Form.Item>
              <Form.Item name="accountType" label="Type"><Input disabled={viewMode} /></Form.Item>
              <Form.Item name="languagePreference" label="Language"><Input disabled={viewMode} /></Form.Item>
            </>
          )}
          {editingSupplier && (
            <>
              <Form.Item name="name" label="Company"><Input disabled={viewMode} /></Form.Item>
              <Form.Item name="contactPerson" label="Contact Person"><Input disabled={viewMode} /></Form.Item>
              <Form.Item name="phone" label="Phone"><Input disabled={viewMode} /></Form.Item>
              <Form.Item name="email" label="Email"><Input disabled={viewMode} /></Form.Item>
              <Form.Item name="locationCity" label="City"><Input disabled={viewMode} /></Form.Item>
              <Form.Item name="verified" label="Verified" valuePropName="checked">
                <Switch disabled={viewMode} />
              </Form.Item>
            </>
          )}
        </Form>
      </Drawer>
    </div>
  );
};

export default AdminDashboard;
