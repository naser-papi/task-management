import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TasksModule } from "./tasks/tasks.module";
import { TypeormConfig } from "./config";

@Module({
  imports: [TasksModule, TypeOrmModule.forRoot(TypeormConfig)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
