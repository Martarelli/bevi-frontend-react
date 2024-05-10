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

    it('should have login button', () => { 
        render( <BrowserRouter>
                    <Login/>
                </BrowserRouter>
        );
        const button = screen.getByText(/Login/i);
        fireEvent.click(button);
    });
 })