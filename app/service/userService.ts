import { connectDB } from "@/app/DB-Config/dbCOnfig";
export class User {
    constructor(
        public id: number,
        public name: string,
        public email: string,
        public password: string,
        public createdAt: Date
    ) {}

    validatePassword(inputPassword: string): boolean {
        return this.password === inputPassword;
    }
}

export class UserService {
    private db;

    constructor() {
        this.db = connectDB();
    }

    async createUser(name: string, email: string, password: string): Promise<User> {
        try {
            const query = `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`;
            const [result]:any = await (await this.db).query(query, [name, email, password]);
            return new User(result.insertId, name, email, password, new Date());
        } catch (error:any) {
            throw new Error("User creation failed: " + error.message);
        }
    }

    async getUserByEmail(email: string): Promise<User | null> {
        try {
            const query = `SELECT * FROM users WHERE email = ?`;
            const [results]: any = await (await this.db).query(query, [email]);
            if (results.length > 0) {
                const userData = results[0];
                return new User(
                    userData.id,
                    userData.name,
                    userData.email,
                    userData.password,
                    userData.created_at
                );
            }
            return null;
        } catch (error:any) {
            throw new Error("Failed to fetch user: " + error.message);
        }
    }

    async getAllUsers(): Promise<User[]> {
        try {
            const query = `SELECT * FROM users`;
            const [results]: any = await (await this.db).query(query);
            return results.map((userData: any) => new User(
                userData.id,
                userData.name,
                userData.email,
                userData.password,
                userData.created_at
            ));
        } catch (error:any) {
            throw new Error("Failed to fetch users: " + error.message);
        }
    }
}
