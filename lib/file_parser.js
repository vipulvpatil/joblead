import parseDocX from "@/lib/parse_docx"
import parsePdf from "@/lib/parse_pdf"
const {encode, decode} = require("gpt-3-encoder")

const parseFuncMapping = {
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": parseDocX,
  "application/pdf": parsePdf,
}


const parse = async (file) => {
  const parseFunc = parseFuncMapping[file.mimetype]
  const result = {}

  if(parseFunc) {
    try {
      let data = await parseFunc(file.filepath)

      const tokens = encode(data)

      if(tokens.length > 3000){
        data = decode(tokens.slice(0,3000))
      }

      result["data"] = data
    } catch (err) {
      result["err"] = err.toString()
    }
  } else {
    result["err"] = `Unknown file type: ${file.mimetype}. Please try pdf or docx.`
  }
  return result
}

const FileParser = {
  parse
}

export default FileParser
