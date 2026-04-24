import imagekit from "../config/imagekit.js";

async function uploadImage(req,res){
  try {
    const file=req.file;
    if(!file){
      return res.status(400).json({
        message:"No file uploaded till Now"
      });
     
    }
    const response = await imagekit.upload({
      file: file.buffer.toString("base64"),
      fileName: file.originalname,
      folder: "/shoes-website"
})
    return res.status(200).json({
      url:response.url,
      fileId:response.fileId,
      message:"Image uploaded successfully"
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message:"Internal Server Error"
    })
  }
}

export default uploadImage