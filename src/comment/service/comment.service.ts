import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, ObjectId } from 'mongoose';
import { Comment } from '../model/comment.model';
import { CommentDto } from '../dto/createCommentDto';
import { BlogPostService } from 'src/blog-post/service/blog-post.service';
import { PaginationDto } from 'src/utils/dtos/pagination.dto';
//import { BlogPostService } from 'src/blog-post/service/blog-post.service';


@Injectable()
export class CommentService {
    constructor(
        @InjectModel(Comment.name) private commentModel: Model<Comment>,
        private readonly blogPostService: BlogPostService
    ) { }


    async createComment(blogId: string, commentDto: CommentDto, userId: string ) {
        const blogPost = await this.blogPostService.getBlogPostById(blogId);
        if (!blogPost) throw new BadRequestException("Not Found");
        const comment = await this.commentModel.create({ ...commentDto, Author: userId, blogId });
        return comment;
    }

    /**
     * apply pagination to get load comments for a blogPost
     * @param paginationDto 
     * 
     * @param blogId 
     * @returns 
     */
    async getParentComment(paginationDto: PaginationDto, blogId: string) {
        const { limit, page } = paginationDto;
        const skip = (page - 1) * limit;
        //find comment
        const comment = await this.commentModel
            .find({ blogId, parentCommentId: undefined })
            .sort({ createdAt: -1 })
            .limit(limit)
            .skip(skip)
            // .populate({
            //     path: 'Author',
            //     select: 'userName firstName lastName email' // Exclude the 'password' and 'email' fields
            // })
            .exec();
        if (!comment) throw BadRequestException;
        return comment;
    }
    
    async getCommentReplies(pagination: PaginationDto, blogId:string) {
        const { limit, page } = pagination;
        const skip = (page - 1) * limit;
        const commentReplies = await this.commentModel
            .find({ parentCommentId:{$ne:null}, blogId:blogId })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
           // .populate('Author')
            .exec();
        return commentReplies;
    }

}
