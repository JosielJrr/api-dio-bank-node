export interface User {
    name: string;
    email: string;
}

const db = [
    {
        name: "Joana",
        email: "joana@dio.com",
    }
];

export class UserService {
    db: User[];

    constructor(database = db) {
        this.db = database;
    }

    createUser = (name: string, email: string) => {
        const user = {
            name,
            email
        };

        this.db.push(user);
        console.log('DB atualizado', this.db);
    };

    getAllUsers = (): User[] => {
        return this.db;
    };

    deleteLastUser = (): User | undefined => {
        const removedUser = this.db.pop();
        console.log('Último usuário deletado:', removedUser);
        return removedUser;
    };
}
