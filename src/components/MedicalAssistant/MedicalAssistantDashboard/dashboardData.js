export const dashboardData = {
  medicalAssistant: {
    userInfo: {
      name: "Emily Carter",
      role: "Medical Assistant",
      department: "Primary Care",
      avatar: "EC",
      employeeId: "MA-24789",
      email: "emily.carter@hospital.com",
      phone: "+1 (555) 123-4567",
      joinDate: "2022-03-15"
    },
    
    dailyTasks: [
      { id: 1, title: "Morning Patient Vitals", priority: "high", time: "8:00 AM", completed: true },
      { id: 2, title: "Room Preparation", priority: "medium", time: "9:30 AM", completed: true },
      { id: 3, title: "Patient Intake Forms", priority: "high", time: "10:00 AM", completed: false },
      { id: 4, title: "Lab Sample Collection", priority: "high", time: "11:00 AM", completed: false },
      { id: 5, title: "Medical Record Update", priority: "medium", time: "2:00 PM", completed: false },
      { id: 6, title: "Equipment Sterilization", priority: "medium", time: "3:30 PM", completed: false },
      { id: 7, title: "End-of-Day Reports", priority: "low", time: "4:45 PM", completed: false }
    ],
    
    patientQueue: [
      { id: 101, name: "John Smith", age: 45, appointmentTime: "10:15 AM", reason: "Annual Checkup", status: "waiting", room: "Exam 3" },
      { id: 102, name: "Maria Garcia", age: 32, appointmentTime: "10:30 AM", reason: "Follow-up", status: "waiting", room: "Exam 2" },
      { id: 103, name: "Robert Chen", age: 58, appointmentTime: "11:00 AM", reason: "Blood Pressure", status: "scheduled", room: "Exam 1" },
      { id: 104, name: "Sarah Johnson", age: 29, appointmentTime: "11:30 AM", reason: "Vaccination", status: "scheduled", room: "Exam 4" },
      { id: 105, name: "David Wilson", age: 67, appointmentTime: "1:00 PM", reason: "Diabetes Check", status: "waiting", room: "Exam 3" },
      { id: 106, name: "Lisa Brown", age: 41, appointmentTime: "1:30 PM", reason: "Skin Examination", status: "scheduled", room: "Exam 2" }
    ],
    
    quickStats: {
      patientsToday: 18,
      pendingForms: 7,
      labSamples: 12,
      roomsPrepared: 8,
      completedTasks: 2,
      pendingTasks: 5,
      urgentCases: 3,
      onTimeRate: "94%"
    },
    
    upcomingAppointments: [
      { id: 201, patient: "David Wilson", time: "1:30 PM", type: "New Patient", doctor: "Dr. Miller", duration: "30 min", notes: "Diabetes management" },
      { id: 202, patient: "Lisa Brown", time: "2:00 PM", type: "Follow-up", doctor: "Dr. Miller", duration: "20 min", notes: "Skin biopsy results" },
      { id: 203, patient: "Michael Davis", time: "2:45 PM", type: "Consultation", doctor: "Dr. Miller", duration: "45 min", notes: "Pre-surgery consultation" },
      { id: 204, patient: "Jennifer Lee", time: "3:30 PM", type: "Routine Check", doctor: "Dr. Patel", duration: "25 min", notes: "Annual physical" },
      { id: 205, patient: "Thomas Moore", time: "4:15 PM", type: "Vaccination", doctor: "Dr. Patel", duration: "15 min", notes: "Flu shot" }
    ],
    
    recentMessages: [
      { id: 301, from: "Nurse Station", message: "Room 204 needs supplies - gloves, gauze, alcohol swabs", time: "9:15 AM", unread: true, priority: "high" },
      { id: 302, from: "Lab Dept", message: "Lab results for Patient #104 are ready for collection", time: "8:45 AM", unread: false, priority: "medium" },
      { id: 303, from: "Dr. Miller", message: "Please prepare room 3 for minor procedure at 2 PM", time: "8:30 AM", unread: false, priority: "high" },
      { id: 304, from: "Pharmacy", message: "Prescription refill approved for Patient #101", time: "9:00 AM", unread: true, priority: "low" },
      { id: 305, from: "Billing Dept", message: "Insurance verification needed for Patient #203", time: "8:15 AM", unread: false, priority: "medium" }
    ],
    
    vitalSigns: {
      averageBP: "120/80",
      avgHeartRate: "72 bpm",
      avgTemperature: "98.6°F",
      avgOxygen: "98%"
    },
    
    recentActivity: [
      { id: 401, action: "Checked vitals for Patient #101", time: "8:30 AM", user: "You" },
      { id: 402, action: "Prepared Exam Room 2", time: "9:00 AM", user: "You" },
      { id: 403, action: "Collected blood sample", time: "9:45 AM", user: "You" },
      { id: 404, action: "Updated medical records", time: "10:15 AM", user: "Nurse Jane" }
    ],
    
    inventory: {
      lowStock: ["Gloves", "Alcohol Swabs", "Bandages", "Syringes"],
      wellStocked: ["Gauze", "Thermometers", "BP Cuffs", "Masks"]
    },
    
    shifts: {
      current: "Morning Shift (8 AM - 4 PM)",
      next: "Evening Shift (4 PM - 12 AM)",
      assignedDoctor: "Dr. Miller",
      assignedNurse: "Nurse Jane"
    }
  }
};