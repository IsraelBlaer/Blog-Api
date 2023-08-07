import * as Joi from "joi";


export const CommentSchema =Joi.object({
    //blogId: Joi.string().required(),
    parentCommentId : Joi.string().optional(),
    text: Joi.string().max(50)
})

export const ReplyCommentSchema =Joi.object({
   // blogId: Joi.string().required(),
    parentCommentId : Joi.string().required(),
    text: Joi.string().max(50).required()
})