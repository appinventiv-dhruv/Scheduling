import { Module } from "@nestjs/common";
import { BankService } from "./bank-account.service";
import { BankController } from "./bank-account.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Bank, BankSchema } from "./bank-account.schema";
import { ScheduleService } from "src/scheduling/scheduling.service";
import { EmailModule } from "src/email/email.module";



@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Bank.name,
                schema: BankSchema,
            },
        ]),
        EmailModule
    ],
    providers: [BankService, ScheduleService],
    controllers: [BankController]
})

export class BankModule { }