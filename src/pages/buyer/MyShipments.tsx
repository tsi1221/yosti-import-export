// src/pages/buyer/MyShipments.tsx
import { useState } from "react";
import { Table, Drawer, Button, Form, Input, InputNumber, Select } from "antd";
import { EnvironmentOutlined, PlusOutlined } from "@ant-design/icons";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import dayjs from "dayjs";

import type { Shipment, ShipmentStatus } from "../../pages/buyer/type/ShipmentsInterface";
import { useShipments, type BookShipmentForm } from "../../hooks/useShipments";

const { Option } = Select;

export default function MyShipments() {
  const { shipments, addShipment } = useShipments();
  const [openBook, setOpenBook] = useState(false);
  const [openTrack, setOpenTrack] = useState(false);
  const [selectedShipment, setSelectedShipment] = useState<Shipment | null>(null);
  const [form] = Form.useForm<BookShipmentForm>();

  const timelineSteps: ShipmentStatus[] = ["booked", "in transit", "at port", "customs", "delivered"];
  const getUpdateTime = (shipment: Shipment, step: ShipmentStatus) => {
    const upd = shipment.updates.find((u) => u.status === step);
    return upd ? dayjs(upd.update_time).format("YYYY-MM-DD HH:mm") : "-";
  };

  const handleBook = (values: BookShipmentForm) => {
    addShipment(values);
    form.resetFields();
    setOpenBook(false);
  };

  const columns = [
    { title: "Tracking No.", dataIndex: "tracking_number", key: "tracking_number", render: (text: string) => <span className="font-semibold">{text}</span> },
    { title: "Destination", key: "destination", render: (_: unknown, record: Shipment) => `${record.destination_city}, ${record.destination_country}` },
    { title: "Method", dataIndex: "shipping_method", key: "shipping_method" },
    { title: "Status", dataIndex: "status", key: "status" },
    { title: "Est. Delivery", dataIndex: "estimated_delivery", key: "estimated_delivery", render: (date: string) => dayjs(date).format("YYYY-MM-DD") },
    {
      title: "Track",
      key: "track",
      render: (_: unknown, record: Shipment) => (
        <Button
          icon={<EnvironmentOutlined />}
          size="small"
          className="bg-[#0F3952] text-white border-none flex items-center gap-1"
          onClick={() => {
            setSelectedShipment(record);
            setOpenTrack(true);
          }}
        >
          Track
        </Button>
      ),
    },
  ];

  return (
    <div className="p-6 min-h-screen bg-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">My Shipments</h1>
        <Button
          icon={<PlusOutlined />}
          className="bg-[#0F3952] text-white border-none flex items-center gap-1"
          onClick={() => setOpenBook(true)}
        >
          Book Shipment
        </Button>
      </div>

      <div className="overflow-x-auto rounded-xl border border-gray-200">
        <Table<Shipment>
          dataSource={shipments}
          columns={columns}
          rowKey="shipment_id"
          pagination={{ pageSize: 5, position: ["bottomRight"] }}
          bordered
        />
      </div>

      {/* BOOK DRAWER */}
      <Drawer title="Book New Shipment" open={openBook} width={400} onClose={() => setOpenBook(false)}>
        <Form layout="vertical" form={form} onFinish={handleBook}>
          <Form.Item label="Pickup Location" name="pickup_location" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Destination Country" name="destination_country" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Destination City" name="destination_city" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Goods Description" name="goods_description" rules={[{ required: true }]}>
            <Input.TextArea rows={2} />
          </Form.Item>
          <Form.Item label="Weight (kg)" name="weight" rules={[{ required: true }]}>
            <InputNumber className="w-full" />
          </Form.Item>
          <Form.Item label="Volume (m³)" name="volume" rules={[{ required: true }]}>
            <InputNumber className="w-full" />
          </Form.Item>
          <Form.Item label="Shipping Method" name="shipping_method" rules={[{ required: true }]}>
            <Select>
              <Option value="sea">Sea</Option>
              <Option value="air">Air</Option>
              <Option value="express">Express</Option>
            </Select>
          </Form.Item>
          <Button htmlType="submit" className="w-full bg-[#0F3952] text-white border-none">
            Confirm Booking
          </Button>
        </Form>
      </Drawer>

      {/* TRACKING DRAWER */}
      <Drawer title="Live Shipment Tracking" open={openTrack} width={450} onClose={() => setOpenTrack(false)}>
        {selectedShipment && (
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900 mb-2">Status Timeline</h3>
            <ul className="space-y-2">
              {timelineSteps.map((step) => {
                const upd = selectedShipment.updates.find((u) => u.status === step);
                return (
                  <li key={step} className="p-2 rounded border border-gray-300">
                    <div className="flex justify-between">
                      <span className="font-medium">{step.toUpperCase()}</span>
                      <span className="text-sm">{getUpdateTime(selectedShipment, step)}</span>
                    </div>
                    <div className="text-gray-700">{upd ? `${upd.location} — ${upd.remarks}` : ""}</div>
                  </li>
                );
              })}
            </ul>

            <h3 className="font-semibold text-gray-900">Live Map</h3>
            <div className="h-64 rounded overflow-hidden">
              <MapContainer center={[30.6, 104.0]} zoom={5} style={{ height: "100%", width: "100%" }}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker position={[30.6, 104.0]}>
                  <Popup>Shipment is in transit</Popup>
                </Marker>
              </MapContainer>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
}
