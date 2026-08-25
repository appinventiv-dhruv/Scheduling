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
            const account = await this.accountModel.findOne({ email });
            if (!account) 
                throw new Error('Account not found');
            account.balance += amount;
<<<<<<< Updated upstream:src/bank-account/back-account.service.ts
            console.log(account.balance);
=======
            console.log(`Deposited ${amount} to account ${email}. New balance: ${account.balance}`);
>>>>>>> Stashed changes:src/bank-account/bank-account.service.ts
            return account.save();
        }
        catch(err){
            console.log(err);
            throw new Error(err);
        }
    }

    async withdraw(email: string, amount: number): Promise<Bank>  {
        try{
            const account = await this.accountModel.findOne({ email });
            console.log(`Attempting to withdraw ${amount} from account ${email}. Current balance: ${account?.balance}`);
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
