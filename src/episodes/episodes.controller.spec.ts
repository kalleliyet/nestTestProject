import { Test, TestingModule } from '@nestjs/testing';
import { EpisodesController } from './episodes.controller';
import { EpisodesService } from './episodes.service';
import { ConfigModule } from '../config/config.module';

describe('EpisodesController', () => {
  let controller: EpisodesController;

  const mockEpisodesService = {
    findAll: async () => [{ id: 'id'}],
    findFeaturedEpisodes: async () => [{ id: 'id'}],
    findOne: async () => ({ id: 'id'}),
    create: async () => ({ id: 'id'})
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      controllers: [EpisodesController],
      providers: [EpisodesService]
    }).compile();

    controller = module.get<EpisodesController>(EpisodesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
