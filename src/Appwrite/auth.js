import {Client, Account, ID} from 'appwrite';
import conf from '../conf/conf.js'

export class AuthService
{
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        
        this.account = new Account(this.client);
    }


    async createAccount({email, password, name}) {
        const userAccount = await this.account.create(ID.unique(), email, password, name);

        if(userAccount) {
            return this.login({email, password});
        }

        return null;
    }

    async login({email, password}) {
        return this.account.createEmailPasswordSession(email, password);
    }


    async getCurrentUser() {
        try{
            return await this.account.get();
        }
        catch {
            return null;
        }
    }

    async logout() {
        try{
            return await this.account.deleteSession('current');
        }
        catch {
            return false;
        }
    }

}


const authService = new AuthService();

export default authService;
