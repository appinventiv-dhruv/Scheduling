import { Model } from "mongoose";
import { Bank } from "./bank-account.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Injectable } from "@nestjs/common";
import { CreateDTO } from "./dto/dto.createAccount";

@Injectable()
export class BankService {
    constructor(@InjectModel(Bank.name) private accountModel: Model<Bank>) {}

    async createAccount(createDto: CreateDTO): Promise<Bank> {
        try{
            const existing = await this.accountModel.findOne({ email: createDto.email });
            if (existing) 
                throw new Error('Account already exists');
            return this.accountModel.create({ 
                email: createDto.email, 
                name: createDto.name,
                balance: createDto.balance 
            });
        }
        catch(err){
            console.log(err);
            throw new Error(err);
        }
    }

    async deposit(email: string, amount: number): Promise<Bank>  {
        try{
            if (!(amount > 0))
                throw new Error('Amount must be a positive number');
            const account = await this.accountModel.findOne({ email });
            if (!account)
                throw new Error('Account not found');
            account.balance += amount;
            console.log(account.balance);
            return account.save();
        }
        catch(err){
            console.log(err);
            throw new Error(err);
        }
    }

    async withdraw(email: string, amount: number): Promise<Bank>  {
        try{
            if (!(amount > 0))
                throw new Error('Amount must be a positive number');
            const account = await this.accountModel.findOne({ email });
            if (!account)
                throw new Error('Account not found');

            if (account.balance < amount)
                throw new Error('Insufficient funds');
            account.balance -= amount;
            return account.save();
        }
        catch(err){
            console.log(err);
            throw new Error(err);
        }
    }

    async getBalance(email: string): Promise<Object>  {
        try{
            const account = await this.accountModel.findOne({ email });
            if (!account) 
                throw new Error('Account not found');
            return { balance: account.balance };
        }
        catch(err){
            console.log(err);
            throw new Error(err);
        }   
    }
}
