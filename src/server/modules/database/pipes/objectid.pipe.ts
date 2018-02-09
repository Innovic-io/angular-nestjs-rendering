import { PipeTransform, Pipe, ArgumentMetadata, HttpStatus, HttpException } from '@nestjs/common';

@Pipe()
export class ObjectIDPipe implements PipeTransform<string> {

  async transform(value: string, metadata: ArgumentMetadata) {

    const checkForHexRegExp = new RegExp('^[0-9a-fA-F]{24}$');

    if (!checkForHexRegExp.test(value)) {
      throw new HttpException('Validation failed', HttpStatus.BAD_REQUEST);
    }

    return value;
  }
}
