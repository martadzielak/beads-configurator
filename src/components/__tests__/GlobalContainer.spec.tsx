import React from 'react';
import { render, screen } from '@testing-library/react';
import { GlobalContainer } from '@/components/styles/styled';

describe('GlobalContainer', () => {
    it('renders children content', () => {
        render(
            <GlobalContainer data-testid="global-container">
                <div>Child content</div>
            </GlobalContainer>
        );
        expect(screen.getByTestId('global-container')).toBeInTheDocument();
        expect(screen.getByTestId('global-container')).toHaveStyle({
            display: 'flex',
            height: '100vh',
        })
        expect(screen.getByText('Child content')).toBeInTheDocument();
    });
});
