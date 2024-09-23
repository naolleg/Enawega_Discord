import { prisma } from "../../config/prisma.js";

const profileController={
  getProfile: async (req, res) => {
    const userId = parseInt(req.params.id, 10);
  
    if (isNaN(userId) || userId <= 0) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    try {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          username:true,
          email: true,
          phonenumber:true,
          avatar: true
        },
      });
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
 editProfile: async (req, res) => {
  }
}
export default profileController;