import { Body, Controller, DefaultValuePipe, Get, NotFoundException, Param, ParseIntPipe, Post, Query, ValidationPipe } from '@nestjs/common';
import { EpisodesService } from './episodes.service';
import { CreateEpisodeDto } from './dto/create-episode.dto';
import { ConfigService } from '../config/config.service';
import { NotFoundError } from 'rxjs';
import { IsPositivePipePipe } from 'src/is-positive-pipe/is-positive-pipe.pipe';

@Controller('episodes')
export class EpisodesController {
    constructor(
        private episodesService: EpisodesService,
        private configService: ConfigService //only for demo purposes
    ) {}
    @Get()
    findAll(
        @Query('sort') sort: 'asc' | 'desc' = 'desc',
        @Query('limit',new DefaultValuePipe(100), ParseIntPipe, IsPositivePipePipe) limit: string,
    ) {
        console.log(sort)
        return this.episodesService.findAll(sort,limit)
    }

    @Get('featured')
    findFeatured(){
        return this.episodesService.findFeatured()
    }

    @Get(':id')
    async findOne(@Param() id:string){
        console.log(id)
        const episode = await this.episodesService.findOne(id);
        if(!episode) {
            throw new NotFoundException('Episode not found')
        }
        return episode
    }

    @Post()
    create(@Body(ValidationPipe) input: CreateEpisodeDto){
        console.log(input)
        return this.episodesService.create(input);
    }
}
