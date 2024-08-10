import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from '../components/Navbar';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import '@testing-library/jest-dom';
import { AuthContext } from '../context/AuthContext';

// Mock the custom hooks
const mockLogout = vi.fn();
vi.mock('../hooks/useLogout', () => ({
  default: () => ({ logout: mockLogout })
}));

// Mock react-router-dom
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    BrowserRouter: ({ children }) => <div>{children}</div>,
    Link: ({ children, to }) => <a href={to}>{children}</a>,
    useNavigate: () => vi.fn()
  };
});

const renderNavbar = (user = null, openModal = vi.fn()) => {
  const dispatch = vi.fn();
  return render(
    <AuthContext.Provider value={{ user, dispatch }}>
      <Navbar openModal={openModal} />
    </AuthContext.Provider>
  );
};

describe('Navbar', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders Sweat Diary title', () => {
    renderNavbar();
    expect(screen.getByText('Sweat Diary')).toBeInTheDocument();
  });

  it('renders login and signup buttons when user is not logged in', () => {
    renderNavbar();
    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByText('Signup')).toBeInTheDocument();
  });

  it('renders user menu items when user is logged in', () => {
    renderNavbar({ email: 'test@example.com' });
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Statistics')).toBeInTheDocument();
    expect(screen.getByText('test@example.com')).toBeInTheDocument();
    expect(screen.getByText('Log out')).toBeInTheDocument();
  });



  it('calls openModal with correct type when login/signup buttons are clicked', () => {
    const openModal = vi.fn();
    renderNavbar(null, openModal);
    
    fireEvent.click(screen.getByText('Login'));
    expect(openModal).toHaveBeenCalledWith('login');
    
    fireEvent.click(screen.getByText('Signup'));
    expect(openModal).toHaveBeenCalledWith('signup');
  });

  it('calls logout function when Log out button is clicked', () => {
    renderNavbar({ email: 'test@example.com' });
    
    fireEvent.click(screen.getByText('Log out'));
    expect(mockLogout).toHaveBeenCalled();
  });
});