import Login from './login';
import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from '@jest/globals';
import { BrowserRouter } from "react-router-dom";

describe('Login', () => {

    it('should be render', () => {
        render( <BrowserRouter>
                    <Login/>
                </BrowserRouter>
        );
    });

    it('should title be welcome', () => { 
        render( <BrowserRouter>
                    <Login/>
                </BrowserRouter>
        );

        const title = screen.getByText('Seja Bem-Vindo');
        expect(title).toBeInTheDocument();
    });

    it('should have form with email and password', () => { 
        render( <BrowserRouter>
                    <Login/>
                </BrowserRouter>
        );

        expect(screen.getByLabelText('Email')).toBeInTheDocument();
        expect(screen.getByLabelText('Password')).toBeInTheDocument();
    });

    it('renders the Login component with all elements', () => {
        render( <BrowserRouter>
            <Login/>
        </BrowserRouter>
        );
        expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
    });

    it('validates email and password fields', async () => {
        render( <BrowserRouter>
            <Login/>
        </BrowserRouter>
        );
        const loginButton = screen.getByRole('button', { name: /login/i });
      
        fireEvent.click(loginButton);
      
        expect(await screen.findByText(/email é um campo obrigatório/i)).toBeInTheDocument();
        expect(await screen.findByText(/password é um campo obrigatório/i)).toBeInTheDocument();
    });
 })