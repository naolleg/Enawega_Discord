import { prisma } from "../../config/prisma.js";

const roomController={
    register: async (req, res ) => {
        try {
          const newroom = await prisma.room.create({
            data: {
              name: req.body.name,
            },
          });
          return res.status(201).json({
            success: true,
            message: 'room registered successfully',
            data: newroom,
          });
        } catch (error) {
          console.error(error);
          return res.status(500).json({
            success: false,
            message: 'Error registering room',
          });
        }
      },
    update: async(req,res)=>{
        const id = req.params.id;
               
        const roomExist = await prisma.room.findFirst({where:{
            id: +id,
        }})
        if(!roomExist){
            return res.status(404).json({
                success: false,
                message: "room not found"
            })
        }

        const updateroom = await prisma.room.update({
            where:{
                id: +id,
            },     
         
                data:{
                    name: req.body.name,
                }
        });

        return res.status(200).json({
            success: true,
            message: 'updated room',
            data: updateroom
        })
    }
    , getsingle:async(req,res)=>{
        const id = req.params.id;
               
        const roomExist = await prisma.room.findFirst({where:{
            id: +id,
        }})
        if(!roomExist){
            return res.status(404).json({
                success: false,
                message: "room not found"
            })
        }
        try {
            const room= await prisma.room.findFirst()
            res.status(200).json({ success: true,
              message: "all room",room});
          } catch (error) {
            throw(error);
          }
        },
    getAll:async(req,res)=>{

        try {
            const room= await prisma.room.findMany()
            res.status(200).json({ success: true,
              message: "all room",room});
          } catch (error) {
            throw(error);
          }
        },

    delete: async(req,res)=>{
        const id = req.params.id;
        const roomExist = await prisma.room.findFirst({where:{
            id: +id,
        }})
        if(!roomExist){
            return res.status(404).json({
                success: false,
                message: "room not found"
            })
        }
        const deletedroom = await prisma.room.delete({
            where: {
                id: +id
            }
        });

        return res.status(200).json({
            success: true,
            message: 'room deleted sucessfully',
            data:deletedroom
        })
    },

}
export default roomController;