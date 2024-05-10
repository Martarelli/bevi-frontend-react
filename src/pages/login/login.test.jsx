import Login from './login';
import { render, screen } from '@testing-library/react'
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


 })