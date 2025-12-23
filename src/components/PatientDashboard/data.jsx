// Patient data
export const patientData = {
  name: "John Doe",
  email: "john.doe@example.com",
  phone: "+91 (555) 123-4567",
  dob: "1990-05-15",
  bloodGroup: "O+",
  gender: "Male",
  address: "123 Health Street, Medical City",
  emergencyContact: "Jane Doe (Spouse) - +1 (555) 987-6543",
  primaryDoctor: "Dr. Sarah Smith",
  insuranceProvider: "MediCare Plus",
  policyNumber: "MP-789456123"
};

// Appointments data
export const appointments = [
  {
    id: 1,
    date: "2024-03-20",
    time: "10:00 AM",
    doctor: "Dr. Sarah Smith",
    department: "Cardiology",
    status: "confirmed",
    reason: "Regular Checkup"
  },
  {
    id: 2,
    date: "2024-03-25",
    time: "2:30 PM",
    doctor: "Dr. Michael Chen",
    department: "Orthopedics",
    status: "pending",
    reason: "Knee Pain Consultation"
  },
  {
    id: 3,
    date: "2024-04-05",
    time: "11:15 AM",
    doctor: "Dr. Emily Wilson",
    department: "Dermatology",
    status: "confirmed",
    reason: "Skin Allergy Follow-up"
  }
];

// Medical reports data
export const medicalReports = [
  { name: "Blood Test Report", date: "2024-03-15", doctor: "Smith" },
  { name: "X-Ray Results", date: "2024-03-16", doctor: "Chen" },
  { name: "Prescription", date: "2024-03-17", doctor: "Wilson" }
];

// Help & Support data
export const helpData = [
  {
    title: "📞 Contact Support",
    description: "24/7 Helpline: +1-800-MED-HELP",
    email: "Email: support@medcare.com",
    buttonText: "Chat Now",
    buttonType: "primary"
  },
  {
    title: "📚 FAQs",
    description: "Find answers to common questions",
    buttonText: "Browse FAQs",
    buttonType: "light"
  },
  {
    title: "📋 User Guides",
    description: "Learn how to use patient portal features",
    buttonText: "View Guides",
    buttonType: "light"
  }
];