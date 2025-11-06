import React, { useState, useMemo } from "react";
import {
  Table,
  Button,
  Tag,
  message,
  Space,
  Dropdown,
  Checkbox,
  Input,
} from "antd";
import {
  PlusOutlined,
  FilterOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import SourcingFormDrawer from "./SourcingFormDrawer";
import ShowDetails from "./ShowDetails";

interface SourcingRequest {
  request_id: string;
  product_name: string;
  description: string;
  quantity: number;
  target_price: number;
  supplier_region: string;
  deadline: string;
  status: "open" | "quoted" | "completed";
}

// --- Mock Data ---
const mockData: SourcingRequest[] = [
  {
    request_id: "REQ001",
    product_name: "LED Bulbs",
    description: "Energy saving bulbs",
    quantity: 1000,
    target_price: 2.5,
    supplier_region: "Yiwu",
    deadline: "2025-11-05",
    status: "open",
  },
  {
    request_id: "REQ002",
    product_name: "Plastic Chairs",
    description: "Durable stackable chairs",
    quantity: 500,
    target_price: 6,
    supplier_region: "Guangzhou",
    deadline: "2025-11-10",
    status: "quoted",
  },
  {
    request_id: "REQ003",
    product_name: "Power Banks",
    description: "10,000mAh with USB-C",
    quantity: 300,
    target_price: 9.5,
    supplier_region: "Shenzhen",
    deadline: "2025-11-03",
    status: "completed",
  },
];

const SourcingDashboard: React.FC = () => {
  const [data, setData] = useState<SourcingRequest[]>(mockData);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string[]>([]);
  const [regionFilter, setRegionFilter] = useState<string[]>([]);
  const [deadlineOrder, setDeadlineOrder] = useState<string | null>(null);
  const [searchText, setSearchText] = useState("");
  const [detailsRequest, setDetailsRequest] =
    useState<SourcingRequest | null>(null);
  const [detailsVisible, setDetailsVisible] = useState(false);

  // --- Filtered & Sorted Data ---
  const filteredData = useMemo(() => {
    let filtered = [...data];

    // --- Search Filter (Product name & Quantity) ---
    if (searchText) {
      const text = searchText.toLowerCase();
      filtered = filtered.filter(
        (item) =>
          item.product_name.toLowerCase().includes(text) ||
          item.quantity.toString().includes(text)
      );
    }

    // --- Status Filter ---
    if (statusFilter.length > 0) {
      filtered = filtered.filter((item) => statusFilter.includes(item.status));
    }

    // --- Region Filter ---
    if (regionFilter.length > 0) {
      filtered = filtered.filter((item) =>
        regionFilter.includes(item.supplier_region)
      );
    }

    // --- Deadline Sorting ---
    if (deadlineOrder === "nearest") {
      filtered.sort(
        (a, b) =>
          new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
      );
    } else if (deadlineOrder === "farthest") {
      filtered.sort(
        (a, b) =>
          new Date(b.deadline).getTime() - new Date(a.deadline).getTime()
      );
    }

    return filtered;
  }, [data, statusFilter, regionFilter, deadlineOrder, searchText]);

  // --- Filter Menus ---
  const statusMenu = (
    <div style={{ padding: 8 }}>
      {["open", "quoted", "completed"].map((status) => (
        <div key={status} style={{ marginBottom: 4 }}>
          <Checkbox
            checked={statusFilter.includes(status)}
            onChange={(e) => {
              if (e.target.checked) {
                setStatusFilter([...statusFilter, status]);
              } else {
                setStatusFilter(statusFilter.filter((s) => s !== status));
              }
            }}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Checkbox>
        </div>
      ))}
    </div>
  );

  const regionMenu = (
    <div style={{ padding: 8 }}>
      {Array.from(new Set(data.map((d) => d.supplier_region))).map((region) => (
        <div key={region} style={{ marginBottom: 4 }}>
          <Checkbox
            checked={regionFilter.includes(region)}
            onChange={(e) => {
              if (e.target.checked) {
                setRegionFilter([...regionFilter, region]);
              } else {
                setRegionFilter(regionFilter.filter((r) => r !== region));
              }
            }}
          >
            {region}
          </Checkbox>
        </div>
      ))}
    </div>
  );

  const deadlineMenu = {
    items: [
      { key: "nearest", label: "Nearest Deadline" },
      { key: "farthest", label: "Farthest Deadline" },
    ],
    onClick: (e: any) => setDeadlineOrder(e.key),
  };

  // --- Table Columns ---
  const columns = [
    {
      title: "Product",
      dataIndex: "product_name",
      key: "product_name",
      sorter: (a: SourcingRequest, b: SourcingRequest) =>
        a.product_name.localeCompare(b.product_name),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      width: 100,
    },
    {
      title: "Target Price ($)",
      dataIndex: "target_price",
      key: "target_price",
      width: 130,
      render: (p: number) => `$${p}`,
    },
    {
      title: (
        <Space size={4}>
          Supplier Region
          <Dropdown dropdownRender={() => regionMenu} trigger={["click"]}>
            <FilterOutlined style={{ cursor: "pointer" }} />
          </Dropdown>
        </Space>
      ),
      dataIndex: "supplier_region",
      key: "supplier_region",
    },
    {
      title: (
        <Space size={4}>
          Deadline
          <Dropdown menu={deadlineMenu} trigger={["click"]}>
            <FilterOutlined style={{ cursor: "pointer" }} />
          </Dropdown>
        </Space>
      ),
      dataIndex: "deadline",
      key: "deadline",
      render: (d: string) => dayjs(d).format("YYYY-MM-DD"),
    },
    {
      title: (
        <Space size={4}>
          Status
          <Dropdown dropdownRender={() => statusMenu} trigger={["click"]}>
            <FilterOutlined style={{ cursor: "pointer" }} />
          </Dropdown>
        </Space>
      ),
      dataIndex: "status",
      key: "status",
      render: (status: string) => {
        const color =
          status === "open"
            ? "orange"
            : status === "quoted"
            ? "blue"
            : "green";
        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: SourcingRequest) => (
        <Button
          type="link"
          onClick={() => {
            setDetailsRequest(record);
            setDetailsVisible(true);
          }}
        >
          View
        </Button>
      ),
    },
  ];

  return (
    <div style={{ padding: 32, background: "#fff", borderRadius: 10 }}>
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 10,
        }}
      >
        <h2 style={{ margin: 0, fontWeight: 600 }}>Sourcing Requests</h2>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setDrawerVisible(true)}
          style={{
            backgroundColor: "#0F3952",
            borderColor: "#0F3952",
          }}
        >
          New Request
        </Button>
      </div>

      {/* Search Bar */}
      <div style={{ marginBottom: 20 }}>
        <Input
          placeholder="Search by product or quantity"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          suffix={
            <div
              style={{
                backgroundColor: "#0F3952",
                padding: "8px 8px",
                borderRadius: "0 4px 4px 0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <SearchOutlined style={{ color: "white" }} />
            </div>
          }
          style={{
            width: 250,
            backgroundColor: "white",
            borderRadius: 4,
            height: 30,
            paddingRight: 0,
          }}
        />
      </div>

      {/* Table */}
      <Table
        dataSource={filteredData}
        columns={columns}
        rowKey="request_id"
        pagination={{ pageSize: 4 }}
        bordered
      />

      {/* Drawer for adding new request */}
      <SourcingFormDrawer
        visible={drawerVisible}
        onClose={() => setDrawerVisible(false)}
        onSubmit={(newReq) => {
          setData([
            ...data,
            {
              ...newReq,
              request_id: `REQ00${data.length + 1}`,
              status: "open",
              deadline: dayjs().format("YYYY-MM-DD"),
            },
          ]);
          message.success("Sourcing request added successfully!");
        }}
      />

      {/* Drawer for viewing details */}
      <ShowDetails
        visible={detailsVisible}
        request={detailsRequest}
        onClose={() => setDetailsVisible(false)}
      />
    </div>
  );
};

export default SourcingDashboard;
