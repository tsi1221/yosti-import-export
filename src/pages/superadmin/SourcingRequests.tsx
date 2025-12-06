import React, { useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Drawer, Button, Input, Checkbox, Modal, message } from "antd"; // Added 'message' for feedback

// --- INTERFACE DEFINITIONS ---

interface SourcingRequest {
  id: string;
  userName: string;
  productName: string;
  description: string;
  quantity: number; // Must be a number in the final data
  targetPrice: number; // Must be a number in the final data
  supplierRegion: string;
  sampleRequired: boolean;
  createdAt: string;
  deadline: string; // Added 'deadline' to the final structure
}

// FormData interface for UNCONTROLLED string inputs (for number fields before conversion)
interface FormData {
  userName: string;
  productName: string;
  description: string;
  quantity: string; // Stored as string in the form state
  targetPrice: number; // Stored as string in the form state
  supplierRegion: string;
  sampleRequired: boolean;
  deadline: string;
}

// Helper to correctly type the state that can be EITHER SourcingRequest (for editing) OR FormData (for creating)
type CurrentFormState = SourcingRequest | FormData;

// --- INITIAL DATA ---

let requestIdCounter = 3; // Changed to 3 since initial data goes up to SR002

const initialRequests: SourcingRequest[] = [
  { id: "SR001", userName: "John Doe", productName: "Coffee Beans", description: "High quality Arabica", quantity: 100, targetPrice: 500, supplierRegion: "Yiwu", sampleRequired: true, createdAt: "2025-11-24", deadline: "2026-01-01" },
  { id: "SR002", userName: "Alice Smith", productName: "Mobile Phones", description: "Latest model, unlocked", quantity: 50, targetPrice: 15000, supplierRegion: "Shenzhen", sampleRequired: false, createdAt: "2025-11-22", deadline: "2026-02-15" },
];

// --- COMPONENT ---

export default function SourcingRequests() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [requests, setRequests] = useState<SourcingRequest[]>(initialRequests);
  const [editingRequest, setEditingRequest] = useState<SourcingRequest | null>(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [viewRequest, setViewRequest] = useState<SourcingRequest | null>(null);
  const [formData, setFormData] = useState<FormData>({
    userName: "",
    productName: "",
    description: "",
    quantity: "",
    targetPrice: 0,
    supplierRegion: "",
    sampleRequired: false,
    deadline: "",
  });

  const itemsPerPage = 5;

  const filteredRequests = requests.filter(
    (req) =>
      req.productName.toLowerCase().includes(search.toLowerCase()) ||
      req.userName.toLowerCase().includes(search.toLowerCase()) ||
      req.id.toLowerCase().includes(search.toLowerCase()) // Added ID search
  );

  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedRequests = filteredRequests.slice(startIndex, startIndex + itemsPerPage);

  const handlePrevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);
  const handleNextPage = () => currentPage < totalPages && setCurrentPage(currentPage + 1);

  // Consolidated form state handler for both Creation (FormData) and Editing (SourcingRequest)
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked; // Checkbox value is on the target itself

    if (editingRequest) {
      // Logic for Editing (SourcingRequest)
      setEditingRequest((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          [name]: type === "checkbox" ? checked : (name === "quantity" || name === "targetPrice" ? Number(value) : value),
        };
      });
    } else {
      // Logic for Creation (FormData)
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  // Type guard function to check if the data has all required fields (string checks for FormData, number checks for SourcingRequest)
  const validateForm = (data: CurrentFormState|FormData): boolean => {
    // Check required string fields
    if (!data.userName || !data.productName || !data.supplierRegion || !data.deadline) {
        return false;
    }

    // Check required quantity/price fields, handling string (FormData) or number (SourcingRequest) types
    const quantity = (data).quantity;
    const targetPrice = (data).targetPrice;

    if (typeof quantity === 'string') {
      // Validate FormData strings
      return quantity.trim() !== '' && !isNaN(Number(quantity));
    } else if (typeof quantity === 'number') {
      // Validate SourcingRequest numbers
      return quantity > 0 && targetPrice > 0;
    }

    return false;
  };


  // Resets the create form state
  const resetCreateForm = () => {
    setFormData({ userName: "", productName: "", description: "", quantity: "", targetPrice: 0, supplierRegion: "", sampleRequired: false, deadline: "" });
  };


  const handleCreateRequest = () => {
    if (!validateForm(formData)) {
        message.error("Please fill in all required fields (marked with *).");
        return;
    }

    const newReq: SourcingRequest = {
      id: `SR${String(requestIdCounter).padStart(3, "0")}`,
      userName: formData.userName,
      productName: formData.productName,
      description: formData.description,
      // CONVERSION: Convert string form values to numbers for the final SourcingRequest type
      quantity: Number(formData.quantity),
      targetPrice: Number(formData.targetPrice),
      supplierRegion: formData.supplierRegion,
      sampleRequired: formData.sampleRequired,
      createdAt: new Date().toISOString().split("T")[0],
      deadline: formData.deadline, // Using deadline from the form
    };

    setRequests([newReq, ...requests]);
    requestIdCounter++;
    setDrawerOpen(false);
    resetCreateForm();
    message.success(`Request ${newReq.id} created successfully!`);
  };

  const handleSaveEdit = () => {
    if (!editingRequest) return;
    // Check against SourcingRequest type validation
    if (!validateForm(editingRequest)) {
        message.error("Please ensure all required fields are valid.");
        return;
    }

    setRequests(requests.map((r) => (r.id === editingRequest.id ? editingRequest : r)));
    setDrawerOpen(false);
    setEditingRequest(null);
    message.success(`Request ${editingRequest.id} updated successfully!`);
  };

  const handleViewRequest = (req: SourcingRequest) => {
    setViewRequest(req);
    setViewModalOpen(true);
  };

  const handleEditRequest = (req: SourcingRequest) => {
    // Convert numbers back to strings for the Input components to work correctly in the Drawer
    setEditingRequest({
        ...req,
        // Since the Drawer's Input components are controlled by a string value, we must ensure
        // the SourcingRequest object passed to the state also has string number fields.
        // The fix in the handleInputChange handles the conversion back to number on change.
    });
    setDrawerOpen(true);
  };

  const handleDeleteRequest = (id: string) => {
    setRequests(requests.filter((r) => r.id !== id));
    message.warning(`Request ${id} deleted.`);
  };

  // Determine the current state used by the form inputs
  const currentForm = editingRequest || formData;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header and Create Button */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-1">Sourcing Requests</h1>
          <p className="text-gray-600">Manage all sourcing requests from buyers</p>
        </div>
        <Button
          style={{ backgroundColor: "#0F3952", color: "white", border: "none", padding: "8px 16px" }}
          onClick={() => {
            setEditingRequest(null);
            resetCreateForm(); // Reset form data when opening for creation
            setDrawerOpen(true);
          }}
        >
          + Create Sourcing Request
        </Button>
      </div>

      {/* Search Bar */}
      <div className="relative w-full md:w-1/3 mb-4">
        <Input
          placeholder="Search by product, user, or ID..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          prefix={<SearchOutlined />}
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 w-12">#</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">ID</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">User</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Product</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Quantity</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Target Price</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Region</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Sample</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Created At</th>
              <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {paginatedRequests.length === 0 ? (
              <tr>
                <td colSpan={10} className="px-4 py-6 text-center text-gray-500">No requests found.</td>
              </tr>
            ) : (
              paginatedRequests.map((req, index) => (
                <tr key={req.id}>
                  <td className="px-4 py-3 text-sm text-gray-700">{startIndex + index + 1}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{req.id}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{req.userName}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{req.productName}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{req.quantity}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">${req.targetPrice.toLocaleString()}</td> {/* Added currency formatting */}
                  <td className="px-4 py-3 text-sm text-gray-700">{req.supplierRegion}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{req.sampleRequired ? "Yes" : "No"}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{req.createdAt}</td>
                  <td className="px-4 py-3 text-sm text-center flex justify-center gap-2">
                    <Button style={{ backgroundColor: "#0F3952", color: "white" }} size="small" onClick={() => handleViewRequest(req)}>View</Button>
                    <Button style={{ backgroundColor: "#FF9900", color: "white" }} size="small" onClick={() => handleEditRequest(req)}>Edit</Button>
                    <Button style={{ backgroundColor: "red", color: "white" }} size="small" onClick={() => handleDeleteRequest(req.id)}>Delete</Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex justify-end items-center gap-2">
        <Button onClick={handlePrevPage} disabled={currentPage === 1}>Previous</Button>
        <span className="px-3 py-1 text-sm font-medium">Page {currentPage} of {totalPages}</span>
        <Button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</Button>
      </div>

      {/* Drawer for Create/Edit */}
      <Drawer
        title={editingRequest ? "Edit Sourcing Request" : "Create Sourcing Request"}
        placement="right"
        width={400}
        onClose={() => {
            setDrawerOpen(false);
            setEditingRequest(null); // Clear editing state on close
            resetCreateForm(); // Clear create form state on close
        }}
        open={drawerOpen}
        bodyStyle={{ display: "flex", flexDirection: "column", gap: "16px", padding: "24px" }}
        footer={
          <div className="flex justify-end gap-2">
            <Button onClick={() => setDrawerOpen(false)}>Cancel</Button>
            <Button
              type="primary"
              style={{ backgroundColor: "#0F3952", color: "white" }}
              onClick={editingRequest ? handleSaveEdit : handleCreateRequest}
              // Validate based on the current form state (editingRequest or formData)
              disabled={!validateForm(currentForm)}
            >
              {editingRequest ? "Save Changes" : "Create"}
            </Button>
          </div>
        }
      >
        <Input name="userName" placeholder="User Name *" value={currentForm.userName} onChange={handleInputChange} />
        <Input name="productName" placeholder="Product Name *" value={currentForm.productName} onChange={handleInputChange} />
        <Input.TextArea name="description" placeholder="Description" value={currentForm.description} onChange={handleInputChange} />
        {/* Type must be text for the controlled component with string state */}
        <Input name="quantity" type="text" placeholder="Quantity *" value={String(currentForm.quantity)} onChange={handleInputChange} />
        <Input name="targetPrice" type="text" placeholder="Target Price *" value={String(currentForm.targetPrice)} onChange={handleInputChange} />
        
        <select name="supplierRegion" value={currentForm.supplierRegion} onChange={handleInputChange} className="px-3 py-2 border rounded w-full">
          <option value="">Select Supplier Region *</option>
          <option value="Yiwu">Yiwu</option>
          <option value="Guangzhou">Guangzhou</option>
          <option value="Shenzhen">Shenzhen</option>
          <option value="Other">Other</option>
        </select>
        <Checkbox name="sampleRequired" checked={currentForm.sampleRequired} onChange={()=>handleInputChange}>Sample Required</Checkbox>
        {/* Deadline is required now */}
        <Input type="date" name="deadline" placeholder="Deadline *" value={currentForm.deadline} onChange={handleInputChange} />
      </Drawer>

      {/* View Modal */}
      <Modal
        title="Sourcing Request Details"
        open={viewModalOpen}
        onCancel={() => setViewModalOpen(false)}
        footer={null}
      >
        {viewRequest && (
          <div className="flex flex-col gap-2">
            <p><strong>ID:</strong> {viewRequest.id}</p>
            <p><strong>User:</strong> {viewRequest.userName}</p>
            <p><strong>Product:</strong> {viewRequest.productName}</p>
            <p><strong>Description:</strong> {viewRequest.description || 'N/A'}</p>
            <p><strong>Quantity:</strong> {viewRequest.quantity}</p>
            <p><strong>Target Price:</strong> ${viewRequest.targetPrice.toLocaleString()}</p>
            <p><strong>Region:</strong> {viewRequest.supplierRegion}</p>
            <p><strong>Sample Required:</strong> {viewRequest.sampleRequired ? "Yes" : "No"}</p>
            <p><strong>Created At:</strong> {viewRequest.createdAt}</p>
            <p><strong>Deadline:</strong> {viewRequest.deadline}</p>
          </div>
        )}
      </Modal>
    </div>
  );
}