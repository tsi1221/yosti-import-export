import { useState } from "react";
import {
  Card,
  Row,
  Col,
  Avatar,
  Typography,
  Button,
  Form,
  Input,
  Divider,
  message,
} from "antd";
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  EditOutlined,
  LockOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

export default function BuyerProfile() {
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form] = Form.useForm();
  const [passwordForm] = Form.useForm();

  const user = {
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "+251 912 345 678",
    avatar: "",
  };

  const handleUpdate = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));

    message.success("Profile updated successfully!");
    setEditing(false);
    setLoading(false);
  };

  const handleChangePassword = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    message.success("Password changed!");
    passwordForm.resetFields();
    setLoading(false);
  };

  return (
    <div style={{ padding: 24 }}>
      <Title level={2}>My Profile</Title>

      <Row gutter={24}>
        {/* LEFT SIDE – USER CARD */}
        <Col xs={24} md={8}>
          <Card
            style={{ borderRadius: 10 }}
            actions={[
              <Button
                type="link"
                icon={<EditOutlined />}
                onClick={() => setEditing(true)}
              >
                Edit Profile
              </Button>,
            ]}
          >
            <div style={{ textAlign: "center" }}>
              <Avatar
                size={100}
                src={user.avatar}
                icon={<UserOutlined />}
                style={{ marginBottom: 10 }}
              />

              <Title level={4}>{user.name}</Title>

              <Text>
                <MailOutlined /> {user.email}
              </Text>
              <br />
              <Text>
                <PhoneOutlined /> {user.phone}
              </Text>
            </div>
          </Card>
        </Col>

        {/* RIGHT SIDE – EDIT FORM */}
        <Col xs={24} md={16}>
          <Card style={{ borderRadius: 10 }}>
            <Title level={4}>Personal Information</Title>
            <Divider />

            <Form
              layout="vertical"
              form={form}
              initialValues={{
                name: user.name,
                email: user.email,
                phone: user.phone,
              }}
              onFinish={handleUpdate}
              disabled={!editing}
            >
              <Form.Item label="Full Name" name="name" rules={[{ required: true }]}>
                <Input placeholder="Enter full name" />
              </Form.Item>

              <Form.Item
                label="Email Address"
                name="email"
                rules={[{ required: true, type: "email" }]}
              >
                <Input placeholder="Enter email" />
              </Form.Item>

              <Form.Item label="Phone Number" name="phone" rules={[{ required: true }]}>
                <Input placeholder="Enter phone number" />
              </Form.Item>

              {editing && (
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  style={{ marginTop: 10 }}
                >
                  Save Changes
                </Button>
              )}
            </Form>
          </Card>

          <Card style={{ marginTop: 24, borderRadius: 10 }}>
            <Title level={4}>
              <LockOutlined /> Change Password
            </Title>
            <Divider />

            <Form
              layout="vertical"
              form={passwordForm}
              onFinish={handleChangePassword}
            >
              <Form.Item
                label="Current Password"
                name="current_password"
                rules={[{ required: true }]}
              >
                <Input.Password placeholder="Enter current password" />
              </Form.Item>

              <Form.Item
                label="New Password"
                name="new_password"
                rules={[{ required: true, min: 6 }]}
              >
                <Input.Password placeholder="Enter new password" />
              </Form.Item>

              <Form.Item
                label="Confirm New Password"
                name="confirm_password"
                dependencies={["new_password"]}
                rules={[
                  { required: true },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("new_password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject("Passwords do not match!");
                    },
                  }),
                ]}
              >
                <Input.Password placeholder="Confirm new password" />
              </Form.Item>

              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                style={{ marginTop: 10 }}
              >
                Change Password
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
