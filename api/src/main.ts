import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// Use swagger-ui-express as a fallback to serve a static OpenAPI document
import swaggerUi from 'swagger-ui-express';
import * as fs from 'fs';
import * as path from 'path';

// Debug: muestra la carpeta desde la que se cargó .env y la URL (si existe)
// eslint-disable-next-line no-console
console.log('CONFIG DEBUG: cwd=', process.cwd());
// eslint-disable-next-line no-console
console.log('CONFIG DEBUG: SUPABASE_URL=', process.env.SUPABASE_URL ?? 'SUPABASE_URL not set');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger setup: try to serve a static OpenAPI JSON via swagger-ui-express
  const port = process.env.PORT ? Number(process.env.PORT) : 3000;
  try {
    const openapiPath = path.resolve(process.cwd(), 'docs', 'openapi.json');
    if (fs.existsSync(openapiPath)) {
      const doc = JSON.parse(fs.readFileSync(openapiPath, 'utf8'));
      // `app.use` is forwarded to the underlying express adapter
      app.use('/docs', swaggerUi.serve, swaggerUi.setup(doc));
      // eslint-disable-next-line no-console
      console.log(`Serving static Swagger UI from ${openapiPath}`);
    } else {
      // eslint-disable-next-line no-console
      console.warn('OpenAPI document not found at', openapiPath, '- /docs will not be available');
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Failed to setup static Swagger UI:', err);
  }

  await app.listen(port);
  // eslint-disable-next-line no-console
  console.log(`Server listening on http://localhost:${port}/`);
  // eslint-disable-next-line no-console
  console.log(`Swagger available at http://localhost:${port}/docs`);
}

bootstrap();
