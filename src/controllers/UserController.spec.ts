import { UserController } from "./UserController";
import { User, UserService } from '../services/UserService';
import { Request } from 'express';
import { makeMockResponse } from "../__mocks__/mockResponse.mock";

describe('UserController', () => {

    const mockUserService: Partial<UserService> = {
        createUser: jest.fn(),
        getAllUsers: jest.fn(),
        deleteLastUser: jest.fn()
    };

    const userController = new UserController(mockUserService as UserService);

    const mockRequest = {
        body: {
            name: 'Nath',
            email: 'nath@test.com'
        }
    } as Request;

    const mockResponse = makeMockResponse();

    it('Deve adicionar um novo usuário', () => {
        userController.createUser(mockRequest, mockResponse);
        expect(mockResponse.state.status).toBe(201);
        expect(mockResponse.state.json).toMatchObject({ message: 'Usuário criado' });
    });

    it('Deve exibir mensagem de erro caso o usuário não informe o nome', () => {
        const mockRequest = {
            body: {
                name: '',
                email: 'Josiel@test.com'
            }
        } as Request;
        userController.createUser(mockRequest, mockResponse);
        expect(mockResponse.state.status).toBe(400);
        expect(mockResponse.state.json).toMatchObject({ message: 'Bad request! Name obrigatório' });
    });

    it('Deve exibir mensagem de erro caso o usuário não informe o email', () => {
        const mockRequest = {
            body: {
                name: 'Josiel',
                email: ''
            }
        } as Request;
        userController.createUser(mockRequest, mockResponse);
        expect(mockResponse.state.status).toBe(400);
        expect(mockResponse.state.json).toMatchObject({ message: 'Bad request! Email obrigatório' });
    });

    it('Deve retornar todos os usuários', () => {
        userController.getAllUsers(mockRequest, mockResponse);
        expect(mockResponse.state.status).toBe(200);
        expect(mockUserService.getAllUsers).toHaveBeenCalled();
    });

    it('Deve deletar o último usuário cadastrado', () => {
        const mockRemovedUser = { name: 'Joana', email: 'joana@dio.com' }; // Simulando um usuário removido
        mockUserService.deleteLastUser = jest.fn().mockReturnValue(mockRemovedUser); // Mock para deleteLastUser

        userController.deleteLastUser(mockRequest, mockResponse);

        expect(mockUserService.deleteLastUser).toHaveBeenCalled();
        expect(mockResponse.state.status).toBe(200);
        expect(mockResponse.state.json).toMatchObject({ message: 'Usuário deletado', user: mockRemovedUser });
    });

    it('Deve retornar 404 se não houver usuários para deletar', () => {
        mockUserService.deleteLastUser = jest.fn().mockReturnValue(null); // Mock para não haver usuários

        userController.deleteLastUser(mockRequest, mockResponse);

        expect(mockUserService.deleteLastUser).toHaveBeenCalled();
        expect(mockResponse.state.status).toBe(404);
        expect(mockResponse.state.json).toMatchObject({ message: 'Nenhum usuário encontrado para deletar' });
    });
});
