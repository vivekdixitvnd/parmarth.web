import Admin from "../models/admin.js";

const status2FA = async(req, res, next) => {
  const { userId, status } = req.body;
try {
    const userAdmin = await Admin.findById(userId)
    if(!userAdmin){
      res.status(422).json({ error: "User with this ID doesn't exist" });
    }
    userAdmin.status2FA = status
    const result = await data.save();
    res.status(200).json({
      message: `Successfully ${status ? "enabled" : "disabled"} 2FA for this user`,
    });
    
} catch (error) {
  return res.status(500).json({ error: error.message });
}
};

export default status2FA