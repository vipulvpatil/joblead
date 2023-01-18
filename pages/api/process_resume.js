import FileParser from "@/lib/file_parser"
import formidable from "formidable"

export const config = {
  api: {
    bodyParser: false,
  },
}

const ProcessResume = async (req, res) => {
  if(req.method !== "POST"){
    res.status(405).json({error: "method not allowed"})
  } else {
    const form = new formidable.IncomingForm()
    form.parse(req, async (err, fields, files) => {
      if (files && files["resume"]){
        FileParser.parse(files["resume"])
      }
    })

    res.status(200)
    res.json({result: "okay"})
  }
}

export default ProcessResume
