import api from "./api";

export const fetchNotifications = async (params = {}) => {
  try {
    const response = await api.get("/notifications", { params });
    console.log("API SUCCESS:", response.data);
    return { data: response.data.notifications || response.data, isDemo: false };
  } catch (error) {
    console.warn("API ERROR OR EXPIRED TOKEN - Falling back to local data");
    
    let mockData = [
      {
        ID: "notif_101",
        Type: "Placement",
        Message: "Congratulations! You have been shortlisted for the final interview round with Google. Please check your email for the schedule.",
        Timestamp: new Date().toISOString()
      },
      {
        ID: "notif_102",
        Type: "Result",
        Message: "Your Semester 5 results have been published. You have secured a GPA of 9.2.",
        Timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString()
      },
      {
        ID: "notif_103",
        Type: "Event",
        Message: "Join us for the Annual Tech Symposium 'Anokha 2026' starting this Friday. Registration is free for all current students.",
        Timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
      },
      {
        ID: "notif_104",
        Type: "Placement",
        Message: "Deloitte is visiting the campus for recruitment next week. Ensure your resumes are updated in the portal.",
        Timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString()
      },
      {
        ID: "notif_105",
        Type: "Event",
        Message: "Hackathon registration closes tomorrow. Form your teams now!",
        Timestamp: new Date(Date.now() - 72 * 60 * 60 * 1000).toISOString()
      }
    ];

    if (params.notification_type) {
      mockData = mockData.filter(n => n.Type === params.notification_type);
    }
    
    if (params.limit && params.page) {
       const start = (params.page - 1) * params.limit;
       mockData = mockData.slice(start, start + parseInt(params.limit));
    } else if (params.limit) {
       mockData = mockData.slice(0, parseInt(params.limit));
    }

    return { data: mockData, isDemo: true };
  }
};