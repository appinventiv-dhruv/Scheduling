import { Module } from "@nestjs/common";
import { ScheduleService } from "./scheduling.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Bank, BankSchema } from "src/bank-account/bank-account.schema";
import { EmailModule } from "src/email/email.module";
import { ScheduleModule } from "@nestjs/schedule";


Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Bank.name,
                schema: BankSchema,
            },
        ]),
        EmailModule,
        ScheduleModule.forRoot()
    ],
    providers: [ScheduleService],
    exports:[ScheduleService]
})
export class SchedulerModule{}