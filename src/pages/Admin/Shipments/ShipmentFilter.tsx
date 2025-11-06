import React from "react";
import { Select, Input } from "antd";

const { Option } = Select;

interface FilterProps {
  onStatusChange?: (value: string) => void;
  onMethodChange?: (value: string) => void;
  onSearch?: (value: string) => void;
}

const ShipmentFilter: React.FC<FilterProps> = ({ onStatusChange, onMethodChange, onSearch }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mb-6 items-center">
      <Select placeholder="Status" className="w-full sm:w-40" onChange={onStatusChange}>
        <Option value="booked">Booked</Option>
        <Option value="in transit">In Transit</Option>
        <Option value="at port">At Port</Option>
        <Option value="customs">Customs</Option>
        <Option value="delivered">Delivered</Option>
      </Select>
      <Select placeholder="Shipping Method" className="w-full sm:w-40" onChange={onMethodChange}>
        <Option value="sea">Sea</Option>
        <Option value="air">Air</Option>
        <Option value="express">Express</Option>
      </Select>
      <Input.Search placeholder="Search by Tracking #" className="w-full sm:w-64" onSearch={onSearch} allowClear />
    </div>
  );
};

export default ShipmentFilter;
