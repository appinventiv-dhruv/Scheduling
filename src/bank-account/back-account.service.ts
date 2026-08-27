import { Model } from "mongoose";
import { Bank } from "./bank-account.schema";
import { InjectModel } from "@nestjs/mongoose";
import { BadRequestException, ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateDTO } from "./dto/dto.createAccount";

@Injectable()
export class BankService {
    constructor(@InjectModel(Bank.name) private accountModel: Model<Bank>) {}

    async createAccount(createDto: CreateDTO): Promise<Bank> {
        const existing = await this.accountModel.findOne({ email: createDto.email });
        if (existing)
            throw new ConflictException('Account already exists');
        return this.accountModel.create({
            email: createDto.email,
            name: createDto.name,
            balance: createDto.balance
        });

        
    }

    async deposit(email: string, amount: number): Promise<Bank>  {
        if (!(amount > 0))
            throw new BadRequestException('Amount must be a positive number');
        const account = await this.accountModel.findOne({ email });
        if (!account)
            throw new NotFoundException('Account not found');
        account.balance += amount;
        return account.save();
    }

    async withdraw(email: string, amount: number): Promise<Bank>  {
        if (!(amount > 0))
            throw new BadRequestException('Amount must be a positive number');
        const account = await this.accountModel.findOne({ email });
        if (!account)
            throw new NotFoundException('Account not found');

        if (account.balance < amount)
            throw new BadRequestException('Insufficient funds');
        account.balance -= amount;
        return account.save();
    }

    async getBalance(email: string): Promise<Object>  {
        const account = await this.accountModel.findOne({ email });
        if (!account)
            throw new NotFoundException('Account not found');
        return { balance: account.balance };
    }
}
