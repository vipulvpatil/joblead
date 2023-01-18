import mammoth from "mammoth"

const parseDocX = async (file) => {
  const data = await mammoth.extractRawText({path: file.filepath})
  return data
}

export default parseDocX
