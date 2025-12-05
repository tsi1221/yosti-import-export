import React, { useState } from "react";
import { Table, Tag, Button, Tabs, Drawer, Form, Input, DatePicker, InputNumber, Checkbox } from "antd";
import dayjs from "dayjs";
import { useTrips } from "../../hooks/useTrips";
import type { BusinessTrip, VisaInvitation } from "./type/TripsInterface";

const { TabPane } = Tabs;

export default function MyTrips() {
  const { businessTrips, visaInvitations, addBusinessTrip, addVisaInvitation } = useTrips();
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [drawerType, setDrawerType] = useState<"trip" | "visa">("trip");
  const [form] = Form.useForm();

  const openDrawer = (type: "trip" | "visa") => {
    setDrawerType(type);
    setDrawerVisible(true);
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
    form.resetFields();
  };

  const handleAddEntry = (values: BusinessTrip) => {
    if (drawerType === "trip") {
      addBusinessTrip({
        arrival_city: values.arrival_city,
        arrival_date: values.arrival_date.format("YYYY-MM-DD"),
        duration_days: values.duration_days,
        hotel_booking: values.hotel_booking || false,
        transport: values.transport || false,
        translator: values.translator || false,
      });
    } else {
      addVisaInvitation({
        passport_number: values.passport_number,
        nationality: values.nationality,
        planned_arrival_date: values.planned_arrival_date.format("YYYY-MM-DD"),
        duration_days: values.duration_days,
        purpose: values.purpose,
      });
    }
    closeDrawer();
  };

  const tripColumns = [
    { title: "Trip ID", dataIndex: "trip_id", key: "trip_id" },
    { title: "Arrival City", dataIndex: "arrival_city", key: "arrival_city" },
    {
      title: "Arrival Date",
      dataIndex: "arrival_date",
      key: "arrival_date",
      render: (d: string) => dayjs(d).format("YYYY-MM-DD"),
    },
    { title: "Duration (days)", dataIndex: "duration_days", key: "duration_days" },
    {
      title: "Hotel",
      dataIndex: "hotel_booking",
      key: "hotel_booking",
      render: (val: boolean) => <Checkbox checked={val} disabled />,
    },
    {
      title: "Transport",
      dataIndex: "transport",
      key: "transport",
      render: (val: boolean) => <Checkbox checked={val} disabled />,
    },
    {
      title: "Translator",
      dataIndex: "translator",
      key: "translator",
      render: (val: boolean) => <Checkbox checked={val} disabled />,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: BusinessTrip["status"]) => {
        let color = "default";
        if (status === "planned") color = "blue";
        else if (status === "ongoing") color = "orange";
        else if (status === "completed") color = "green";
        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      },
    },
  ];

  const visaColumns = [
    { title: "Visa ID", dataIndex: "visa_id", key: "visa_id" },
    { title: "Passport No.", dataIndex: "passport_number", key: "passport_number" },
    { title: "Nationality", dataIndex: "nationality", key: "nationality" },
    {
      title: "Planned Arrival",
      dataIndex: "planned_arrival_date",
      key: "planned_arrival_date",
      render: (d: string) => dayjs(d).format("YYYY-MM-DD"),
    },
    { title: "Duration (days)", dataIndex: "duration_days", key: "duration_days" },
    { title: "Purpose", dataIndex: "purpose", key: "purpose" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: VisaInvitation["status"]) => {
        let color = "default";
        if (status === "pending") color = "orange";
        else if (status === "approved") color = "green";
        else if (status === "rejected") color = "red";
        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      },
    },
  ];

  return (
    <div className="p-6 min-h-screen bg-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Trips & Visa Invitations</h1>
        <div className="flex gap-4">
          <Button
            style={{ backgroundColor: "#0B2545", color: "#fff", border: "none" }}
            onClick={() => openDrawer("trip")}
          >
            Request Trip
          </Button>
          <Button type="default" onClick={() => openDrawer("visa")}>
            Request Visa
          </Button>
        </div>
      </div>

      <Tabs defaultActiveKey="trips">
        <TabPane tab="Business Trips" key="trips">
          <Table
            dataSource={businessTrips}
            columns={tripColumns}
            rowKey="trip_id"
            pagination={{ position: ["bottomRight"], pageSize: 5 }}
          />
        </TabPane>
        <TabPane tab="Visa Invitations" key="visa">
          <Table
            dataSource={visaInvitations}
            columns={visaColumns}
            rowKey="visa_id"
            pagination={{ position: ["bottomRight"], pageSize: 5 }}
          />
        </TabPane>
      </Tabs>

      <Drawer
        title={drawerType === "trip" ? "Request New Trip" : "Request Visa Invitation"}
        placement="right"
        width={400}
        onClose={closeDrawer}
        open={drawerVisible}
      >
        <Form form={form} layout="vertical" onFinish={handleAddEntry}>
          {drawerType === "trip" ? (
            <>
              <Form.Item name="arrival_city" label="Arrival City" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
              <Form.Item name="arrival_date" label="Arrival Date" rules={[{ required: true }]}>
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
              <Form.Item name="duration_days" label="Duration (days)" rules={[{ required: true }]}>
                <InputNumber style={{ width: "100%" }} min={1} />
              </Form.Item>
              <Form.Item name="hotel_booking" valuePropName="checked">
                <Checkbox>Hotel Booking</Checkbox>
              </Form.Item>
              <Form.Item name="transport" valuePropName="checked">
                <Checkbox>Transport</Checkbox>
              </Form.Item>
              <Form.Item name="translator" valuePropName="checked">
                <Checkbox>Translator</Checkbox>
              </Form.Item>
            </>
          ) : (
            <>
              <Form.Item name="passport_number" label="Passport Number" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
              <Form.Item name="nationality" label="Nationality" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
              <Form.Item name="planned_arrival_date" label="Planned Arrival Date" rules={[{ required: true }]}>
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
              <Form.Item name="duration_days" label="Duration (days)" rules={[{ required: true }]}>
                <InputNumber style={{ width: "100%" }} min={1} />
              </Form.Item>
              <Form.Item name="purpose" label="Purpose" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </>
          )}
          <Form.Item>
            <Button
              style={{ backgroundColor: "#0B2545", color: "#fff", border: "none" }}
              htmlType="submit"
              block
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
}
