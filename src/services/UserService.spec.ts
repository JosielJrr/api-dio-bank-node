import { User, UserService } from "./UserService";

describe('UserService', () => {
    const mockDb: User[] = [];
    const userService = new UserService(mockDb);

    const mockConsole = jest.spyOn(global.console, 'log');

    it('Deve adicionar um novo usuário', () => {
        userService.createUser('nath', 'nath@test.com');
        expect(mockConsole).toHaveBeenCalledWith('DB atualizado', mockDb);
    });

    it('Deve deletar o último usuário cadastrado', () => {
        userService.createUser('nath', 'nath@test.com');
        const mockRemoved = { name: 'nath', email: 'nath@test.com' };
        userService.deleteLastUser();
        expect(mockConsole).toHaveBeenCalledWith('Último usuário deletado:', mockRemoved);
    });
});
