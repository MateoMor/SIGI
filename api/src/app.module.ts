import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SupabaseModule } from './infraestructure/external-apis/supabase';

@Module({
  imports: [SupabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
