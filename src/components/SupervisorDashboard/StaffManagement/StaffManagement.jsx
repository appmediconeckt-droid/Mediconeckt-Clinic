import React, { useMemo, useState } from "react";
import {
  Building2,
  CalendarClock,
  CheckCircle2,
  ClipboardClock,
  Download,
  Filter,
  ListFilter,
  MoreVertical,
  Plus,
  Search,
  Users,
} from "lucide-react";
import "./StaffManagement.css";

const drStaffMgmtRows = [
  {
    id: "#MC-4002",
    name: "Jane Cooper",
    email: "jane.c@mediconeckt.com",
    department: "Emergency",
    role: "Nurse",
    shift: "Morning",
    verification: "Verified",
    status: "Active",
    lastLogin: "Today, 08:42 AM",
    avatar: "JC",
    avatarTone: "teal",
  },
  {
    id: "#MC-4105",
    name: "Robert Fox",
    email: "robert.f@mediconeckt.com",
    department: "Pathology",
    role: "Lab Technician",
    shift: "Night",
    verification: "Pending Docs",
    status: "Active",
    lastLogin: "Yesterday, 10:15 PM",
    avatar: "RF",
    avatarTone: "blue",
  },
  {
    id: "#MC-3890",
    name: "Cameron Williamson",
    email: "cameron.w@mediconeckt.com",
    department: "Finance",
    role: "Billing",
    shift: "Morning",
    verification: "Verified",
    status: "On Leave",
    lastLogin: "Oct 12, 2023",
    avatar: "CW",
    avatarTone: "amber",
  },
  {
    id: "#MC-4211",
    name: "Jerome Bell",
    email: "jerome.b@mediconeckt.com",
    department: "Admin",
    role: "Receptionist",
    shift: "Evening",
    verification: "Verified",
    status: "Active",
    lastLogin: "Today, 02:30 PM",
    avatar: "JB",
    avatarTone: "green",
  },
];

const drStaffMgmtStats = [
  {
    label: "Total Staff",
    value: "126",
    note: "+ 8 this month",
    type: "success",
    icon: Users,
  },
  {
    label: "Active Staff",
    value: "118",
    note: "(94%)",
    type: "active",
    icon: CheckCircle2,
  },
  {
    label: "Pending Verification",
    value: "6",
    note: "Requires attention",
    type: "warning",
    icon: ClipboardClock,
  },
  {
    label: "Departments",
    value: "12",
    note: "Across hospital",
    type: "department",
    icon: Building2,
  },
];

const StaffManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [deptFilter, setDeptFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [shiftFilter, setShiftFilter] = useState("All");

  const filteredRows = useMemo(() => {
    return drStaffMgmtRows.filter((staff) => {
      const searchValue = `${staff.name} ${staff.email} ${staff.id}`.toLowerCase();
      const matchesSearch = searchValue.includes(searchTerm.toLowerCase());
      const matchesRole = roleFilter === "All" || staff.role === roleFilter;
      const matchesDept = deptFilter === "All" || staff.department === deptFilter;
      const matchesStatus = statusFilter === "All" || staff.status === statusFilter;
      const matchesShift = shiftFilter === "All" || staff.shift === shiftFilter;

      return matchesSearch && matchesRole && matchesDept && matchesStatus && matchesShift;
    });
  }, [searchTerm, roleFilter, deptFilter, statusFilter, shiftFilter]);

  const renderSelect = (label, value, onChange, options) => (
    <label className="drstaff-mgmt-select-wrap">
      <span className="drstaff-mgmt-sr-only">{label}</span>
      <select
        className="drstaff-mgmt-select"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {label}: {option}
          </option>
        ))}
      </select>
    </label>
  );

  return (
    <main className="drstaff-mgmt-page">
      <section className="drstaff-mgmt-shell">
        <div className="drstaff-mgmt-header">
          <div>
            <h1 className="drstaff-mgmt-title">Staff Management</h1>
            <p className="drstaff-mgmt-subtitle">
              Manage staff accounts, permissions, departments, and employment status.
            </p>
          </div>

          <div className="drstaff-mgmt-header-actions">
            <label className="drstaff-mgmt-top-search">
              <Search size={18} strokeWidth={2.2} />
              <input
                type="search"
                placeholder="Search staff..."
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
              />
            </label>
            <button className="drstaff-mgmt-primary-btn" type="button">
              <Plus size={16} strokeWidth={2.4} />
              Add Staff Member
            </button>
          </div>
        </div>

        <div className="drstaff-mgmt-stats-grid">
          {drStaffMgmtStats.map((stat) => {
            const StatIcon = stat.icon;

            return (
              <article className="drstaff-mgmt-stat-card" key={stat.label}>
                <div className={`drstaff-mgmt-stat-icon drstaff-mgmt-stat-icon-${stat.type}`}>
                  <StatIcon size={22} strokeWidth={2.2} />
                </div>
                <div>
                  <p className="drstaff-mgmt-stat-label">{stat.label}</p>
                  <div className="drstaff-mgmt-stat-row">
                    <strong>{stat.value}</strong>
                    <span className={`drstaff-mgmt-stat-note drstaff-mgmt-stat-note-${stat.type}`}>
                      {stat.note}
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="drstaff-mgmt-toolbar">
          <label className="drstaff-mgmt-wide-search">
            <Search size={17} strokeWidth={2.1} />
            <input
              type="search"
              placeholder="Search by name, ID or email..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </label>

          <div className="drstaff-mgmt-filter-group">
            {renderSelect("Role", roleFilter, setRoleFilter, [
              "All",
              "Nurse",
              "Lab Technician",
              "Billing",
              "Receptionist",
            ])}
            {renderSelect("Dept", deptFilter, setDeptFilter, [
              "All",
              "Emergency",
              "Pathology",
              "Finance",
              "Admin",
            ])}
            {renderSelect("Status", statusFilter, setStatusFilter, ["All", "Active", "On Leave"])}
            {renderSelect("Shift", shiftFilter, setShiftFilter, ["All", "Morning", "Night", "Evening"])}
          </div>

          <div className="drstaff-mgmt-toolbar-actions">
            <button className="drstaff-mgmt-icon-btn" type="button" aria-label="List filters">
              <ListFilter size={16} />
            </button>
            <button className="drstaff-mgmt-icon-btn" type="button" aria-label="Advanced filter">
              <Filter size={16} />
            </button>
            <button className="drstaff-mgmt-export-btn" type="button">
              <Download size={15} />
              Export
            </button>
          </div>
        </div>

        <section className="drstaff-mgmt-table-card">
          <div className="drstaff-mgmt-table-scroll">
            <table className="drstaff-mgmt-table">
              <thead>
                <tr>
                  <th>Staff</th>
                  <th>ID</th>
                  <th>Dept & Role</th>
                  <th>Shift</th>
                  <th>Verification</th>
                  <th>Status</th>
                  <th>Last Login</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredRows.map((staff) => (
                  <tr key={staff.id}>
                    <td>
                      <div className="drstaff-mgmt-person">
                        <div className={`drstaff-mgmt-avatar drstaff-mgmt-avatar-${staff.avatarTone}`}>
                          {staff.avatar}
                        </div>
                        <div>
                          <strong>{staff.name}</strong>
                          <span>{staff.email}</span>
                        </div>
                      </div>
                    </td>
                    <td className="drstaff-mgmt-id-cell">{staff.id}</td>
                    <td>
                      <div className="drstaff-mgmt-role-stack">
                        <span>{staff.department}</span>
                        <b className={`drstaff-mgmt-role-pill drstaff-mgmt-role-${staff.role.replace(/\s+/g, "").toLowerCase()}`}>
                          {staff.role}
                        </b>
                      </div>
                    </td>
                    <td>{staff.shift}</td>
                    <td>
                      <span
                        className={`drstaff-mgmt-verify drstaff-mgmt-verify-${
                          staff.verification === "Verified" ? "done" : "pending"
                        }`}
                      >
                        {staff.verification === "Verified" ? (
                          <CheckCircle2 size={14} />
                        ) : (
                          <CalendarClock size={14} />
                        )}
                        {staff.verification}
                      </span>
                    </td>
                    <td>
                      <span
                        className={`drstaff-mgmt-status drstaff-mgmt-status-${
                          staff.status === "Active" ? "active" : "leave"
                        }`}
                      >
                        {staff.status}
                      </span>
                    </td>
                    <td className="drstaff-mgmt-login-cell">{staff.lastLogin}</td>
                    <td>
                      <button className="drstaff-mgmt-more-btn" type="button" aria-label={`Actions for ${staff.name}`}>
                        <MoreVertical size={17} />
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredRows.length === 0 && (
                  <tr>
                    <td className="drstaff-mgmt-empty" colSpan="8">
                      No staff members match these filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="drstaff-mgmt-pagination">
            <span>Showing 1 to {filteredRows.length} of 126 entries</span>
            <div className="drstaff-mgmt-pages">
              <button type="button" disabled>
                Previous
              </button>
              <button className="drstaff-mgmt-page-active" type="button">
                1
              </button>
              <button type="button">2</button>
              <button type="button">3</button>
              <span>...</span>
              <button type="button">Next</button>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
};

export default StaffManagement;
