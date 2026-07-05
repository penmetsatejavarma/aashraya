/* ============================================================
   SURAKSHA CIRCLE – Mock Data
   All simulated data objects for the application
   ============================================================ */

const seniorData = {
  name: "Ramaiah K.",
  age: 72,
  bloodGroup: "B+",
  allergies: ["Penicillin", "Aspirin"],
  lastCheckin: "Today, 9:30 AM",
  riskScore: 32,
  riskLevel: "Low",
  phone: "+91 98765 43210",
  address: "12-3-456, Banjara Hills, Hyderabad",
  emergencyContacts: [
    { name: "Suresh K. (Son)", phone: "+91 98765 12345", relation: "Son" },
    { name: "Lakshmi K. (Daughter)", phone: "+91 98765 67890", relation: "Daughter" },
    { name: "Dr. Ravi Sharma", phone: "+91 90000 11111", relation: "Doctor" }
  ],
  primaryDoctor: { name: "Dr. Ravi Sharma", phone: "+91 90000 11111", specialization: "General Physician" },
  photo: null
};

const medicines = [
  { id: 1, name: "Metformin 500mg", dosage: "500mg", time: "8:00 AM", taken: true, category: "Diabetes", notes: "Take after breakfast", timesPerDay: 2, startDate: "2024-01-15", endDate: "2024-12-31" },
  { id: 2, name: "Amlodipine 5mg", dosage: "5mg", time: "2:00 PM", taken: false, category: "Blood Pressure", notes: "Take with water", timesPerDay: 1, startDate: "2024-03-01", endDate: "2024-12-31" },
  { id: 3, name: "Atorvastatin 10mg", dosage: "10mg", time: "9:00 PM", taken: false, category: "Cholesterol", notes: "Take before bed", timesPerDay: 1, startDate: "2024-02-10", endDate: "2024-12-31" },
  { id: 4, name: "Aspirin 75mg", dosage: "75mg", time: "8:00 AM", taken: true, category: "Heart", notes: "Take after food", timesPerDay: 1, startDate: "2024-01-01", endDate: "2024-12-31" },
  { id: 5, name: "Pantoprazole 40mg", dosage: "40mg", time: "7:30 AM", taken: true, category: "Gastric", notes: "Take before breakfast", timesPerDay: 1, startDate: "2024-04-01", endDate: "2024-12-31" }
];

const sosHistory = [
  { date: "June 10, 2024", time: "3:42 PM", location: "Home", status: "Resolved", resolvedBy: "Suresh M. (Volunteer)" },
  { date: "May 28, 2024", time: "11:15 AM", location: "Park", status: "Resolved", resolvedBy: "Priya L. (Volunteer)" },
  { date: "May 15, 2024", time: "7:30 PM", location: "Market", status: "Resolved", resolvedBy: "Ambulance Service" },
  { date: "April 22, 2024", time: "9:00 AM", location: "Home", status: "Resolved", resolvedBy: "Lakshmi K. (Family)" },
  { date: "March 5, 2024", time: "4:15 PM", location: "Temple", status: "Resolved", resolvedBy: "Raju V. (Volunteer)" }
];

const hospitals = [
  { name: "Apollo Hospital", distance: "1.2 km", phone: "040-23607777", address: "Jubilee Hills, Hyderabad", rating: 4.5 },
  { name: "KIMS Hospital", distance: "2.4 km", phone: "040-44885000", address: "Secunderabad", rating: 4.3 },
  { name: "Yashoda Hospital", distance: "3.1 km", phone: "040-45674567", address: "Somajiguda", rating: 4.4 },
  { name: "Care Hospital", distance: "3.8 km", phone: "040-30418888", address: "Banjara Hills", rating: 4.2 }
];

const volunteers = [
  { id: 1, name: "Suresh M.", rating: 4.8, responses: 34, distance: "0.8 km", phone: "+91 99999 11111", verified: true, available: true },
  { id: 2, name: "Priya L.", rating: 4.5, responses: 21, distance: "1.3 km", phone: "+91 99999 22222", verified: true, available: true },
  { id: 3, name: "Raju V.", rating: 4.9, responses: 56, distance: "2.1 km", phone: "+91 99999 33333", verified: true, available: false },
  { id: 4, name: "Anita D.", rating: 4.2, responses: 12, distance: "1.8 km", phone: "+91 99999 44444", verified: false, available: true },
  { id: 5, name: "Kumar R.", rating: 4.6, responses: 28, distance: "0.5 km", phone: "+91 99999 55555", verified: true, available: true }
];

const adminStats = {
  totalSeniors: 1247,
  activeSOS: 3,
  volunteersAvailable: 89,
  medicineAdherence: 78,
  totalVolunteers: 156,
  totalCaregivers: 432
};

const adminUsers = [
  { name: "Ramaiah K.", role: "Senior", phone: "+91 98765 43210", status: "active", lastActive: "Today" },
  { name: "Suresh M.", role: "Volunteer", phone: "+91 99999 11111", status: "active", lastActive: "Today" },
  { name: "Lakshmi K.", role: "Caregiver", phone: "+91 98765 67890", status: "active", lastActive: "Yesterday" },
  { name: "Priya L.", role: "Volunteer", phone: "+91 99999 22222", status: "active", lastActive: "Today" },
  { name: "Venkat R.", role: "Senior", phone: "+91 98765 11111", status: "inactive", lastActive: "3 days ago" },
  { name: "Padma S.", role: "Caregiver", phone: "+91 98765 22222", status: "active", lastActive: "Today" },
  { name: "Raju V.", role: "Volunteer", phone: "+91 99999 33333", status: "active", lastActive: "Today" },
  { name: "Anita D.", role: "Volunteer", phone: "+91 99999 44444", status: "pending", lastActive: "2 days ago" }
];

const volunteerHistory = [
  { date: "June 10, 2024", senior: "R**** K.", responseTime: "4 min", outcome: "Resolved", rating: 5 },
  { date: "June 5, 2024", senior: "V**** R.", responseTime: "7 min", outcome: "Resolved", rating: 4 },
  { date: "May 28, 2024", senior: "P**** S.", responseTime: "3 min", outcome: "Resolved", rating: 5 },
  { date: "May 20, 2024", senior: "K**** M.", responseTime: "6 min", outcome: "Resolved", rating: 5 },
  { name: "May 12, 2024", senior: "S**** R.", responseTime: "5 min", outcome: "Resolved", rating: 4 }
];

/* Adherence data for weekly chart */
const weeklyAdherence = [
  { day: "Mon", percentage: 100 },
  { day: "Tue", percentage: 67 },
  { day: "Wed", percentage: 100 },
  { day: "Thu", percentage: 33 },
  { day: "Fri", percentage: 100 },
  { day: "Sat", percentage: 67 },
  { day: "Sun", percentage: 100 }
];

/* SOS frequency data for charts */
const sosFrequencyData = {
  labels: Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`),
  data: [0,1,0,0,2,0,1,0,0,0,1,0,0,0,0,1,0,0,2,0,0,0,1,0,0,0,0,1,0,3]
};

/* Risk score trend data */
const riskTrendData = {
  labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6", "Week 7"],
  data: [45, 38, 42, 35, 30, 28, 32]
};

/* Medicine adherence weekly data */
const adherenceWeeklyData = {
  labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
  data: [85, 78, 92, 87]
};

/* Check-in compliance data */
const checkinComplianceData = {
  labels: Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`),
  data: [1,1,1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1]
};

/* Risk distribution */
const riskDistribution = { low: 742, medium: 389, high: 116 };

/* Telugu translations */
const teluguTranslations = {
  "Suraksha Circle": "సురక్ష సర్కిల్",
  "Your Safety, Our Priority": "మీ భద్రత, మా ప్రాధాన్యత",
  "Emergency": "అత్యవసర పరిస్థితి",
  "I'm Safe": "నేను సురక్షితంగా ఉన్నాను",
  "Medicines": "మందులు",
  "Help": "సహాయం",
  "SOS": "SOS",
  "Send OTP": "OTP పంపండి",
  "Verify & Login": "ధృవీకరించి లాగిన్ చేయండి",
  "Phone Number": "ఫోన్ నంబర్",
  "Enter OTP": "OTP నమోదు చేయండి",
  "Login": "లాగిన్",
  "Hello": "హలో",
  "Home": "హోమ్",
  "Profile": "ప్రొఫైల్",
  "Check-In": "చెక్-ఇన్",
  "My Medicines": "నా మందులు",
  "Nearby Hospitals": "సమీపంలోని ఆసుపత్రులు",
  "My Health Card": "నా ఆరోగ్య కార్డు",
  "Press and hold for emergency": "అత్యవసర పరిస్థితి కోసం నొక్కి పట్టుకోండి",
  "Emergency Alert Sent!": "అత్యవసర హెచ్చరిక పంపబడింది!",
  "Help is on the way.": "సహాయం మార్గంలో ఉంది.",
  "Mark as Taken": "తీసుకున్నట్లు గుర్తించండి",
  "Medicine Reminders": "మందుల రిమైండర్లు",
  "View QR Code": "QR కోడ్ చూడండి",
  "Last check-in": "చివరి చెక్-ఇన్",
  "medicines today": "ఈరోజు మందులు",
  "hospitals nearby": "సమీపంలో ఆసుపత్రులు",
  "Dashboard": "డాష్‌బోర్డ్",
  "Map": "మ్యాప్",
  "Reports": "నివేదికలు",
  "Settings": "సెట్టింగ్‌లు",
  "Logout": "లాగ్అవుట్",
  "Senior": "సీనియర్",
  "Caregiver": "సంరక్షకుడు",
  "Volunteer": "వాలంటీర్",
  "Admin": "అడ్మిన్"
};

/* Documents for health vault */
const healthDocuments = [
  { name: "Blood Report – June 2024", type: "pdf", date: "June 15, 2024", size: "2.4 MB" },
  { name: "ECG Report", type: "pdf", date: "May 20, 2024", size: "1.8 MB" },
  { name: "X-Ray – Chest", type: "image", date: "April 10, 2024", size: "5.2 MB" },
  { name: "Prescription – Dr. Sharma", type: "pdf", date: "June 1, 2024", size: "0.5 MB" }
];
