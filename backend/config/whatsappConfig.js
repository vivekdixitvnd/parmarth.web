import dotenv from 'dotenv';
dotenv.config();

const whatsappConfig = {
  // Single WhatsApp group ID for all notifications
  groupId: process.env.WHATSAPP_GROUP_ID || '',
  
  // Message templates
  messages: {
    attendance: (date, volunteers, mentors, totalStudents) => 
      `📊 *Attendance Update*\n\nDate: ${date}\n\nVolunteers: ${volunteers}\nMentors: ${mentors}\nTotal Students: ${totalStudents}`,
    
    studyMaterial: (classOrExam, subject, title) =>
      `📚 *New Study Material Uploaded*\n\nClass/Exam: ${classOrExam}\nSubject: ${subject}\nTitle: ${title}`,
    
    eventPhotos: (eventName, photoCount) =>
      `📸 *New Event Photos Uploaded*\n\nEvent: ${eventName}\nPhotos: ${photoCount}`
  }
};

export default whatsappConfig; 