import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException, Body, Req } from '@nestjs/common';
import { ObjectSchema } from 'joi';
import mongoose from 'mongoose';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { isValid } from 'zod';


@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private schema: ObjectSchema) { }
  transform(value: any, metadata: ArgumentMetadata) {
    try {
      this.schema.validate(value);
      return value
    }
    catch (error) {
      throw new BadRequestException(error.message);
    }
  }


}

@Injectable()
export class CommentValidationPipe implements PipeTransform {
  constructor(private readonly objectSchema: ObjectSchema) { }
  transform(value: any, metadata: ArgumentMetadata) {
    try {
      this.objectSchema.validate(value);
      return value;
    }
    catch (error) {
      throw new BadRequestException(error.message)
    }

  }
}


const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
const FILE_SIZE_LIMIT = 5 * 1024 * 1024;


export class FileValidationPipe implements PipeTransform {
  transform(value: Express.Multer.File, metadata: ArgumentMetadata) {
    this.isValidFile(value);
    if (this.isValidFile) {
      return value;
    }
    else {
      throw new BadRequestException(`Invalid file type or size, only 'image/jpeg', 'image/png', 'image/gif' files are accepted`)
    }
  }
  isValidFile(file: Express.Multer.File): boolean {
    return (
      ALLOWED_MIME_TYPES.includes(file.mimetype) && file.size <= FILE_SIZE_LIMIT
    );
  }

}


export class FilesValidationPipe implements PipeTransform {
  transform(value: Express.Multer.File[]) {
    const validFiles: Express.Multer.File[] = [];
    for (const [index, file] of value.entries()) {
      if (this.isValidFile(file)) {
        validFiles.push(file);
      } else {
        throw new BadRequestException(`Invalid file type or size at value[${index}],only 'image/jpeg', 'image/png', 'image/gif' files are accepted and file size should not be more than 5MB.`);
      }
    }
    return validFiles;
  }

  isValidFile(file: Express.Multer.File): boolean {
    return (
      ALLOWED_MIME_TYPES.includes(file.mimetype) && file.size <= FILE_SIZE_LIMIT
    );
  }

}

@Injectable()
export class ObjectIdValidationPipe implements PipeTransform<string, mongoose.Types.ObjectId>{

  transform(value: string): mongoose.Types.ObjectId {
    try {
      const newValue = new mongoose.Types.ObjectId(value);
      return newValue;
    } catch (error) {
      console.log(error)
      throw new BadRequestException("Invalid ObjectId Parsed")
    }
  }
}