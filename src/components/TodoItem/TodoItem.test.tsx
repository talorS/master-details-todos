import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TodoItem } from './TodoItem';
import type { Todo } from '../../types/todo';

const createTodo = (overrides: Partial<Todo> = {}): Todo => ({
  id: 1,
  userId: 1,
  title: 'Test todo item',
  completed: false,
  ...overrides,
});

describe('TodoItem', () => {
  it('should render todo title correctly', () => {
    const todo = createTodo();

    render(<TodoItem todo={todo} />);

    expect(screen.getByText('Test todo item')).toBeInTheDocument();
  });

  it('should show checkbox as unchecked when todo is not completed', () => {
    const todo = createTodo({ title: 'Incomplete todo' });

    render(<TodoItem todo={todo} />);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();
  });

  it('should show checkbox as checked when todo is completed', () => {
    const todo = createTodo({
      id: 2,
      title: 'Completed todo',
      completed: true,
    });

    render(<TodoItem todo={todo} />);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
  });

  it('should call onToggle with the todo when checkbox is clicked', async () => {
    const user = userEvent.setup();
    const todo = createTodo();
    const onToggle = vi.fn();

    render(<TodoItem todo={todo} onToggle={onToggle} />);

    await user.click(screen.getByRole('checkbox'));

    expect(onToggle).toHaveBeenCalledTimes(1);
    expect(onToggle).toHaveBeenCalledWith(todo);
  });
});
