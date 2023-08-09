import App from './App';
import React from 'react';
import renderWithRouter from './_common/renderWithRouter';
import userEvent from '@testing-library/user-event';
import { waitFor, act, screen } from "@testing-library/react";
import UserRegisterForm from './Users/UserRegisterForm';
import UserLoginForm from './Users/UserLoginForm'
import UserPage from './Users/UserPage';
import Api from './Api/Api';
import User from './Api/UserService';

jest.mock('./Api/Api');

describe("App Integration Tests", () => {
    it("should handle user registration", async () => {

        const { queryByText, queryByLabelText} = renderWithRouter({
            element: <App />,
            path: '/',
            children:
                [
                    {
                        path: '/',
                        element: <UserRegisterForm />
                    }, 
                    {
                        path: '/users/:userId',
                        element: <UserPage />,
                        loader: ({ params }) => {
                            return User.getUser(params.userId)
                        }
                    }
                ],
            loader: () => {
                const localStorageToken = localStorage.getItem('token');

                Api.token = localStorageToken;

                const localStorageCurrUser = JSON.parse(localStorage.getItem('currUser'));

                return [localStorageToken, localStorageCurrUser];
            },
        }
        );

        await waitFor(async () => {
            expect(queryByText('Register')).toBeInTheDocument();
            expect(queryByLabelText('Username *')).toBeInTheDocument();
            expect(queryByLabelText('Password *')).toBeInTheDocument();
            expect(queryByLabelText('Email *')).toBeInTheDocument();
        })

        const date = new Date();
        Api.request.mockResolvedValue({ token: 'testToken', user: { username: 'test', email: 'email@test.com', id: 1, created_at: date.toString() } })

        await act(async () => {
            userEvent.type(queryByLabelText('Username *'), 'test');
            userEvent.type(queryByLabelText('Password *'), 'password');
            userEvent.type(queryByLabelText('Email *'), 'email@test.com');
            userEvent.click(queryByText('Register!'));
        })

        await waitFor(async () => {
            expect(queryByText('test')).toBeInTheDocument();
            expect(queryByText('email@test.com')).toBeInTheDocument();
            expect(queryByText('Logout')).toBeInTheDocument();
            expect(queryByText(`View test's`)).toBeInTheDocument();
            expect(queryByText(`Collection`)).toBeInTheDocument();
            expect(queryByText(`Cards For Trade`)).toBeInTheDocument();
            expect(queryByText(`Want List`)).toBeInTheDocument();
        })

        expect(JSON.parse(localStorage.getItem('currUser'))).toEqual({ username: 'test', email: 'email@test.com', id: 1, created_at: expect.any(String)});
    });

    it("should handle user login and logout", async () => {

        const { queryByText, queryByLabelText } = renderWithRouter({
            element: <App />,
            path: '/',
            children:
                [
                    {
                        path: '/',
                        element: <UserLoginForm />
                    }, 
                    {
                        path: '/users/:userId',
                        element: <UserPage />,
                        loader: ({ params }) => {
                            return User.getUser(params.userId)
                        }
                    }
                ],
            loader: () => {
                const localStorageToken = localStorage.getItem('token');

                Api.token = localStorageToken;

                const localStorageCurrUser = JSON.parse(localStorage.getItem('currUser'));

                return [localStorageToken, localStorageCurrUser];
            },
        }
        );

        await waitFor(async () => {
            expect(queryByText('Login')).toBeInTheDocument();
            expect(queryByLabelText('Username *')).toBeInTheDocument();
            expect(queryByLabelText('Password *')).toBeInTheDocument();
        });

        const date = new Date();
        Api.request.mockResolvedValue({ token: 'testToken', user: { username: 'test', email: 'email@test.com', id: 1, created_at: date.toString() } })

        await act(async () => {
            userEvent.type(queryByLabelText('Username *'), 'test');
            userEvent.type(queryByLabelText('Password *'), 'password');
            userEvent.click(queryByText('Log In'));
        })

        await waitFor(async () => {
            expect(queryByText('test')).toBeInTheDocument();
            expect(queryByText('email@test.com')).toBeInTheDocument();
            expect(queryByText('Logout')).toBeInTheDocument();
            expect(queryByText(`View test's`)).toBeInTheDocument();
            expect(queryByText(`Collection`)).toBeInTheDocument();
            expect(queryByText(`Cards For Trade`)).toBeInTheDocument();
            expect(queryByText(`Want List`)).toBeInTheDocument();
        })

        expect(JSON.parse(localStorage.getItem('currUser'))).toEqual({ username: 'test', email: 'email@test.com', id: 1, created_at: expect.any(String)});

        await act(async() => {
            userEvent.click(queryByText('Logout'));
        })

        expect(JSON.parse(localStorage.getItem('currUser'))).toBe(null);
    });
})