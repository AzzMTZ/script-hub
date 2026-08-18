import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { Client, estypes } from '@elastic/elasticsearch';

const ELASTICSEARCH_URL = process.env.ELASTICSEARCH_URL ?? 'http://localhost:9200';

@Injectable()
export class ElasticsearchService implements OnModuleDestroy {
    private readonly client = new Client({ node: ELASTICSEARCH_URL });

    async index<TDocument extends object>(params: estypes.IndexRequest<TDocument>): Promise<void> {
        await this.client.index(params);
    }

    async search<TDocument>(params: estypes.SearchRequest): Promise<TDocument[]> {
        const response = await this.client.search<TDocument>(params);
        return response.hits.hits.flatMap((hit) => (hit._source ? [hit._source] : []));
    }

    onModuleDestroy(): Promise<void> {
        return this.client.close();
    }
}
