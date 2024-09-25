import { Request, Response } from 'express';
import { UserService } from '../services/UserService';

export class UserController {
    userService: UserService;

    constructor(userService = new UserService()) {
        this.userService = userService;
    }

    createUser = (request: Request, response: Response): Response => {
        const user = request.body;

        if (!user.name) {
            return response.status(400).json({ message: 'Bad request! Name obrigatório' });
        }

        if (!user.email) {
            return response.status(400).json({ message: 'Bad request! Email obrigatório' });
        }

        this.userService.createUser(user.name, user.email);
        return response.status(201).json({ message: 'Usuário criado' });
    };

    getAllUsers = (request: Request, response: Response) => {
        const users = this.userService.getAllUsers();
        return response.status(200).json(users);
    };

    deleteLastUser = (request: Request, response: Response) => {
        const removedUser = this.userService.deleteLastUser();

        if (removedUser) {
            return response.status(200).json({ message: 'Usuário deletado', user: removedUser });
        } else {
            return response.status(404).json({ message: 'Nenhum usuário encontrado para deletar' });
        }
    };
}
