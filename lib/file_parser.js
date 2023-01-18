import mammoth from "mammoth"

const mammothParser = {
  parse: async (file) => {
    const data = await mammoth.extractRawText({path: file.filepath})
    return data
  }
}

const parserMapping = {
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": mammothParser
//text/rtf
//application/pdf
}


const parse = async (file) => {
  console.log(file)
  
  const parser = parserMapping[file.mimetype]
  
  if(parser) {
    const data = await parser.parse(file)
    console.log(data)
  }
}

const FileParser = {
  parse
}

export default FileParser
