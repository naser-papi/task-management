import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const TypeormConfig: TypeOrmModuleOptions = {
  type: "postgres",
  host: "localhost",
  port: 5432,
  database: "task-managment",
  username: "postgres",
  password: "p0n.p1234",
  // entities: [TaskEntity],
  synchronize: true,
  autoLoadEntities: true,
};
