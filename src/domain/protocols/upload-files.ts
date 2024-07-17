import { NextFunction, Request, Response } from "express";

interface UploadFiles {
  singleFile(fieldName: string): (
    request: Request,
    response: Response,
    next: NextFunction,
  ) => void

  multFiles(fieldName: string, maxCount?: number): (
    request: Request,
    response: Response,
    next: NextFunction,
  ) => void
}

export { UploadFiles }
