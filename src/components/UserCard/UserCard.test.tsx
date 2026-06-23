import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { UserCard } from './UserCard';
import styles from './UserCard.module.css';
import type { User } from '../../types/user';

const createUser = (overrides: Partial<User> = {}): User => ({
  id: 1,
  name: 'Leanne Graham',
  username: 'Bret',
  email: 'leanne@example.com',
  address: {
    street: 'Kulas Light',
    suite: 'Apt. 556',
    city: 'Gwenborough',
    zipcode: '92998-3874',
    geo: {
      lat: '-37.3159',
      lng: '81.1496',
    },
  },
  phone: '1-770-736-8031',
  website: 'hildegard.org',
  company: {
    name: 'Romaguera-Crona',
    catchPhrase: 'Multi-layered client-server neural-net',
    bs: 'harness real-time e-markets',
  },
  ...overrides,
});

describe('UserCard', () => {
  it('should render user name and username', () => {
    const user = createUser();

    render(<UserCard user={user} isSelected={false} onShowTodos={vi.fn()} />);

    expect(
      screen.getByRole('heading', { name: 'Leanne Graham' })
    ).toBeInTheDocument();
    expect(screen.getByText('@Bret')).toBeInTheDocument();
  });

  it('should mark card as selected when isSelected is true', () => {
    const user = createUser();

    render(<UserCard user={user} isSelected={true} onShowTodos={vi.fn()} />);

    expect(
      screen.getByRole('heading', { name: user.name }).parentElement
        ?.parentElement
    ).toHaveClass(styles.selected);
  });

  it('should call onShowTodos when Show TODOs button is clicked', async () => {
    const user = userEvent.setup();
    const onShowTodos = vi.fn();

    render(
      <UserCard
        user={createUser()}
        isSelected={false}
        onShowTodos={onShowTodos}
      />
    );

    await user.click(screen.getByRole('button', { name: 'Show TODOs' }));

    expect(onShowTodos).toHaveBeenCalledTimes(1);
  });
});
