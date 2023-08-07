import { Body, Controller, Get, Param, Post, Query, Req, UseGuards, UsePipes } from '@nestjs/common';
import { CommentService } from '../service/comment.service';
import { CommentDto } from '../dto/createCommentDto';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { CommentValidationPipe, JoiValidationPipe } from 'src/utils/pipes/validation.pipe';
import { CommentSchema, ReplyCommentSchema } from '../validator/comment.validator';
import { PaginationDto } from 'src/utils/dtos/pagination.dto';

@Controller('comment')
export class CommentController {

    constructor(
        private commentService: CommentService
    ) { }

    @UseGuards(AuthGuard)
    @UsePipes(new CommentValidationPipe(CommentSchema))
    @Post('blogpost/comment-on-post/:blogid')
    commentOnBlogPost(
        @Body() commentDto: CommentDto,
        @Param('blogid') blogid: string,
        @Req() req
    ) {
        const userId = req.user.userId;
        return this.commentService.createComment(blogid, commentDto, userId)
    }


    @Get('get-blogpost-comments/:blogid')
    async getAllComments(
        @Query() pagination: PaginationDto,
        @Param('blogid') blogid: string,
    ) {
        const parentComment = await this.commentService.getParentComment(pagination, blogid);
        const Replies = await this.commentService.getCommentReplies(pagination, blogid);

       return {
        parentComment : parentComment,
        replies:Replies
       }
    }

    /*
    not needed though
    */
    @Get('get-blogpost-comment-replies/:parentcommentId')
    getAllCommentReplies(
        @Query() pagination: PaginationDto,
        @Param('parentcommentId') parentcommentId: string
    ) {
        return this.commentService.getCommentReplies(pagination, parentcommentId)
    }
}
