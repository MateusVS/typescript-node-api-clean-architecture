import multer, { StorageEngine } from 'multer'
import path from 'node:path'
import mimeTypesService from './mime-types.service'
import { NextFunction, Request, Response } from 'express'
import { UploadFiles } from '@domain/protocols/upload-files'

const storage: StorageEngine = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function(req, file, cb) {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`
    const ext = path.extname(file.originalname)
    cb(null, file.fieldname + '-' + uniqueSuffix + ext)
  },
})

class MulterAdapter implements UploadFiles {
  private upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
      const isValid = mimeTypesService.isValidMimeType(file.originalname)
      if (isValid) {
        cb(null, true)
      } else {
        cb(new Error('Tipo de arquivo não suportado'))
      }
    }
  })

  singleFile(fieldName: string): (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => void {
    return this.upload.single(fieldName)
  }

  multFiles(fieldName: string, maxCount?: number): (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => void {
    return this.upload.array(fieldName, maxCount)
  }
}

export { MulterAdapter }
