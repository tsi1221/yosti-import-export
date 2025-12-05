import { useState } from "react";
import { Table, Button, Drawer, Form, Input, Select, DatePicker, Checkbox } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { useInspections } from "../../hooks/useInspections";
import {type Inspection } from "./type/InspectionsInterface";

const { Option } = Select;

export default function MyInspectionsBuyer() {
  const { inspections, addInspection } = useInspections();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [form] = Form.useForm();

  const columns = [
    {
      title: "Inspection ID",
      dataIndex: "inspection_id",
      key: "inspection_id",
      render: (text: string) => <span className="font-semibold text-gray-900">{text}</span>,
    },
    { title: "Product Type", dataIndex: "product_type", key: "product_type" },
    { title: "Inspection Type", dataIndex: "inspection_type", key: "inspection_type" },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (d: string) => dayjs(d).format("YYYY-MM-DD"),
    },
    {
      title: "Photo/Video Required",
      dataIndex: "photo_video_files",
      key: "photo_video_required",
      render: (files: string[]) => <Checkbox checked={files.length > 0} disabled />,
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
      render: (d: string) => dayjs(d).format("YYYY-MM-DD"),
    },
    {
      title: "Report",
      dataIndex: "report_url",
      key: "report_url",
      render: (url: string) =>
        url ? (
          <a href={url} target="_blank" rel="noreferrer" className="text-blue-600">
            View
          </a>
        ) : (
          "-"
        ),
    },
  ];

  const handleRequestInspection = (values: Inspection ) => {
    const newInspection: Inspection = {
      inspection_id: `INS-${Math.floor(Math.random() * 999).toString().padStart(3, "0")}`,
      user_id: "USR-001",
      product_type: values.product_type,
      inspection_type: values.inspection_type,
      date: values.date.format("YYYY-MM-DD"),
      photo_video_files: values.photo_video_required ? ["required"] : [],
      report_url: "",
      created_at: dayjs().format("YYYY-MM-DD"),
    };
    addInspection(newInspection);
    form.resetFields();
    setOpenDrawer(false);
  };

  return (
    <div className="p-6 bg-white min-h-screen">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">My Inspections</h1>
        <Button
          icon={<PlusOutlined />}
          style={{ backgroundColor: "#0f3952", color: "white", border: "none" }}
          onClick={() => setOpenDrawer(true)}
        >
          Request Inspection
        </Button>
      </div>

      {/* INSPECTIONS TABLE */}
      <Table
        dataSource={inspections}
        columns={columns}
        rowKey="inspection_id"
        pagination={{ position: ["bottomRight"], pageSize: 5 }}
      />

      {/* REQUEST INSPECTION DRAWER */}
      <Drawer
        title="Request Quality Inspection"
        open={openDrawer}
        width={400}
        onClose={() => setOpenDrawer(false)}
      >
        <Form layout="vertical" form={form} onFinish={handleRequestInspection}>
          <Form.Item label="Product Type" name="product_type" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Inspection Type" name="inspection_type" rules={[{ required: true }]}>
            <Select>
              <Option value="sample">Sample</Option>
              <Option value="pre-shipment">Pre-Shipment</Option>
              <Option value="factory visit">Factory Visit</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Date" name="date" rules={[{ required: true }]}>
            <DatePicker className="w-full" />
          </Form.Item>
          <Form.Item name="photo_video_required" valuePropName="checked">
            <Checkbox>Photo/Video Required</Checkbox>
          </Form.Item>
          <Button
            htmlType="submit"
            className="w-full"
            style={{ backgroundColor: "#0f3952", color: "white", border: "none" }}
          >
            Submit Request
          </Button>
        </Form>
      </Drawer>
    </div>
  );
}
