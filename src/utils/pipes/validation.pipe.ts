import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { ObjectSchema } from 'joi';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private schema: ObjectSchema) {
   
  }
   
  transform(value: any, metadata: ArgumentMetadata) {
   // const {error} = metadata
   
    const { error } = metadata.type === 'param'
    ? this.schema.validate({ [metadata.data]: value })
    : this.schema.validate(value);
   // const {error} = this.schema.validate()
    if (error) {
      throw new BadRequestException(error.message);
    }
    return value;
  }
}

