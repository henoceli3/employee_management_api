import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const server_port = process.env.SERVER_PORT || 3000;
  await app
    .listen(4000)
    .then(() =>
      console.log(
        `Server is running on port ${server_port} : http://localhost:${server_port}`,
      ),
    )
    .catch((err) => console.log(err));
}
bootstrap();
