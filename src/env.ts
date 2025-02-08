import 'dotenv/config';
import { z } from 'zod';

export const envSchema = z.object({
    PORT: z.number().default(3000),
    MONGO_URI: z.string(),
    S3_ACCESS_KEY: z.string(),
    S3_SECRET_KEY: z.string(),
    S3_BUCKET_NAME: z.string(),
    S3_BUCKET_REGION: z.string().default('us-east-1'),
    S3_ENDPOINT: z.string().default('http://localhost:9000')
})

const _env = envSchema.safeParse(process.env)

export const env = _env.success ? _env.data : {
    PORT: 3000,
    MONGO_URI: 'mongodb://admin:admin@localhost:27017/arquivos-db',
    S3_ACCESS_KEY: 'minioadmin',
    S3_SECRET_KEY: 'minioadmin',
    S3_BUCKET_NAME: 'arquivos-db',
    S3_BUCKET_REGION: 'us-east-1',
    S3_ENDPOINT: 'http://localhost:9000'
}