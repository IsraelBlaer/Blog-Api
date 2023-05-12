import { Injectable } from '@nestjs/common'
import * as joi from 'joi'

@Injectable()
export class UserValidaton {

  static userSchema = joi.object({

    userName: joi.string().required(),
    password: joi.string().min(8).required(),
    email: joi.string().email().required(),
    Avatar: joi.string(),
    firstName:joi.string().required(),
    lastName: joi.string().required(),
    

})

}
