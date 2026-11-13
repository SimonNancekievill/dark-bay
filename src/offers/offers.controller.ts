import {
	Controller,
	Delete,
	HttpCode,
	HttpStatus,
	Param,
	ParseUUIDPipe,
	Request,
} from "@nestjs/common";

import type { AuthenticatedRequest } from "@/auth/login.type";

import { OffersService } from "./offers.service";

@Controller("offers")
export class OffersController {
	constructor(private readonly offersService: OffersService) {}

	@Delete(":id")
	@HttpCode(HttpStatus.NO_CONTENT)
	remove(@Param("id", ParseUUIDPipe) id: string, @Request() req: AuthenticatedRequest) {
		return this.offersService.remove(id, req.user);
	}
}
