import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

// Harness smoke test: proves jsdom + React Testing Library + the @ alias resolve correctly.
describe('test harness', () => {
  it('renders JSX and resolves the @ path alias', async () => {
    const { MultipleChoice } = await import(
      '@/components/assignments/MultipleChoice'
    );
    expect(typeof MultipleChoice).toBe('function');
    render(<div data-testid="harness-probe">harness-ok</div>);
    expect(screen.getByTestId('harness-probe').textContent).toBe('harness-ok');
  });
});
