import mimeTypes from 'mime-types'

class MimeTypesService {
  isValidMimeType(filename: string): boolean {
    const mimeType = mimeTypes.lookup(filename)
    return !!mimeType
  }

  getMimeType(filename: string): string | false {
    return mimeTypes.lookup(filename)
  }
}

export default new MimeTypesService()
