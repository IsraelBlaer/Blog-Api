import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    UseInterceptors,
    UploadedFiles
} from '@nestjs/common';
import { BlogPostService } from '../service/blog-post.service';
import { CreateBlogPostDto } from '../dto/create-blog-post.dto';
import { BlogPost } from '../model/blog-post.model';
import { JoiValidationPipe, ObjectIdValidationPipe, FilesValidationPipe } from '../../utils/pipes/validation.pipe'
import { BlogPostSchema, BlogPostParamSchema } from '../validator/blog-post.validator';
import { UserService } from 'src/user/service/user.service';
import { TokenDecorator } from 'src/utils/decorators/user.decorator';
import { TokenDto } from 'src/auth/dto/create-auth.dto';
import { Public } from 'src/utils/decorators/public.decorator';
import { FilesInterceptor } from '@nestjs/platform-express';
import { UploadService } from '../../upload/service/upload.service';

@Controller('blog-post')
export class BlogPostController {
    constructor(
        private readonly blogPostservice: BlogPostService,
        private readonly userService: UserService,
        private readonly uploadService: UploadService
    ) { }


    @UseInterceptors(FilesInterceptor('files'))
    @Post('create')
    async createBlogPost(
        @Body(new JoiValidationPipe(BlogPostSchema)) blogPost: CreateBlogPostDto,
        @UploadedFiles(
            new FilesValidationPipe()
        )
        files: Array<Express.Multer.File>,
        @TokenDecorator() tokenDto: TokenDto
    ): Promise<BlogPost> {
        blogPost.featuredImages = await this.uploadService.uploadFeaturedImages(files);
        return this.blogPostservice.createBlogPost(blogPost, tokenDto.userId);
    }

    @Public()
    @Get()
    getAllBlogPost(): Promise<BlogPost[]> {
        return this.blogPostservice.getAllBlogPost();
    }

    @Public()
    @Get(':id')
    getBlogPostById(@Param('id', new ObjectIdValidationPipe()) id: string): Promise<BlogPost> {
        console.log("id type:", typeof id)
        return this.blogPostservice.getBlogPostById(id);
    }

    @Public()
    @Get('category/:category')
    getAllBlogPostByCategory(@Param('category', new JoiValidationPipe(BlogPostParamSchema)) category: string): Promise<BlogPost[]> {
        return this.blogPostservice.getAllBlogPostByCategory(category);
    }

    @Put('update/:id')
    updateBlogPost(@Param('id', new ObjectIdValidationPipe()) id: string, @Body() blogPost: CreateBlogPostDto): Promise<BlogPost[]> {
        return this.blogPostservice.updateBlogPost(id, blogPost);
    }

    @Delete('delete/:id')
    deleteBlogPost(@Param('id', new ObjectIdValidationPipe()) id: string): Promise<BlogPost[]> {
        return this.blogPostservice.deleteBlogPost(id)
    }

}
