import venom from 'venom-bot';

let client = null;

const initializeWhatsApp = async () => {
  try {
    client = await venom.create({
      session: 'parmarth-app',
      multidevice: true
    });
    console.log('WhatsApp client initialized successfully');
  } catch (error) {
    console.error('Error initializing WhatsApp client:', error);
  }
};

// Function to get all groups and their IDs
const getAllGroups = async () => {
  try {
    if (!client) {
      await initializeWhatsApp();
    }
    const groups = await client.getAllGroups();
    return groups.map(group => ({
      name: group.name,
      id: group.id._serialized
    }));
  } catch (error) {
    console.error('Error getting groups:', error);
    return [];
  }
};

const sendWhatsAppMessage = async (groupId, message) => {
  try {
    if (!client) {
      await initializeWhatsApp();
    }
    await client.sendText(groupId, message);
  } catch (error) {
    console.error('Error sending WhatsApp message:', error);
  }
};

const sendWhatsAppMedia = async (groupId, mediaUrl, caption) => {
  try {
    if (!client) {
      await initializeWhatsApp();
    }
    await client.sendImage(groupId, mediaUrl, 'image', caption);
  } catch (error) {
    console.error('Error sending WhatsApp media:', error);
  }
};

export {
  initializeWhatsApp,
  getAllGroups,
  sendWhatsAppMessage,
  sendWhatsAppMedia
}; 