import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import ColorModeSwitch from './ColorModeSwitch.vue';

const RenderComponent = () => render(ColorModeSwitch);

describe('Color Mode Switcher', () => {
  it('renders', () => {
    RenderComponent();
    const toggle = screen.getByRole('switch');
    expect(toggle).toBeInTheDocument();
  })

  it ('has a name that details an explicit on/off state', () => {
    RenderComponent();
    const toggle = screen.getByRole('switch');
    expect(toggle).toHaveAccessibleName('Dark mode');
  })

  it ('toggles dark mode with the keyboard', async () => {
    RenderComponent();
    const toggle = screen.getByRole('switch', {
      name: /Dark mode/
    });

    await userEvent.type(toggle, '{enter}');

    expect(toggle).toHaveAttribute('aria-checked', 'true');
  })
})