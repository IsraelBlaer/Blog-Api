import { BadRequestException} from '@nestjs/common'
import * as joi from 'joi'
import { BlogPostCategoryTypesEnum } from '../enum/blog-post.enum'

export const BlogPostSchema = joi.object({
  title: joi.string().max(100),
  content: joi.string().custom((value: string, helpers) => {
    const wordCount: number = value.split(' ').length
    console.log(wordCount)
    if (wordCount < 150) throw new BadRequestException("content cannot be less than 150 words")
    return value;
  }),
  category: joi.string().valid(...Object.values(BlogPostCategoryTypesEnum)).optional(),
  featuredImages : joi.array().items(joi.string()).min(1).optional(),
})

export const BlogPostParamSchema = joi.object({
  category: joi.string().valid(...Object.values(BlogPostCategoryTypesEnum))
})

