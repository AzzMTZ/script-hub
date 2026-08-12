import { Test, TestingModule } from '@nestjs/testing';
import { ConfigItemsService } from './config-items.service';

describe('ConfigItemsService', () => {
    let service: ConfigItemsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [ConfigItemsService],
        }).compile();

        service = module.get<ConfigItemsService>(ConfigItemsService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
