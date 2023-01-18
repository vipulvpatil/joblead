import mammoth from "mammoth"

const parsePdf = async (file) => {
  const data = await mammoth.extractRawText({path: file.filepath})
  return data
}

export default parsePdf
