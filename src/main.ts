import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

import { AppModule } from "./app.module";
import { setupApp } from "./app.setup";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	setupApp(app);

	const config = new DocumentBuilder()
		.setTitle("Dark Bay API")
		.setDescription("Auctions, offers and users")
		.setVersion("1.0")
		.addBearerAuth()
		.build();

	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup("api", app, document);

	const port = process.env.PORT ?? 3030;
	await app.listen(port);
	console.log(`http://localhost:${port}`);
}
bootstrap();
