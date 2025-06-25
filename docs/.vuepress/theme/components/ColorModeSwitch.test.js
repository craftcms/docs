import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import ColorModeSwitch from './ColorModeSwitch.vue';

const RenderComponent = () => render(ColorModeSwitch);

describe('Color Mode Switcher', () => {
  it('renders', () => {
    RenderComponent();
    const toggle = screen.getByLabelText('Switch dark/light mode');
    console.log(toggle);
    expect(toggle).toBeInTheDocument();
  })

  // it ('toggles dark mode with the keyboard', async () => {
  //   RenderComponent();
  //   const toggle = screen.getByRole('switch', {
  //     name: /Dark mode/
  //   });

  //   await userEvent.type(toggle, '{enter}');

  //   expect(toggle).toHaveAttribute('aria-checked', 'true');
  // })
})