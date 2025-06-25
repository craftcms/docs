import '@testing-library/jest-dom';
import ColorModeSwitch from "../../components/ColorModeSwitch.vue";
import { render, screen, waitFor } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';

const RenderComponent = () => render(ColorModeSwitch);

describe('ColorModeSwitch', () => {
	it('renders', () => {
    RenderComponent();
		const toggle = screen.getByRole('switch');
    expect(toggle).toBeInTheDocument();
	});
  it ('has a name that details an explicit on/off state', () => {
    RenderComponent();
    const toggle = screen.getByRole('switch');
    expect(toggle).toHaveAccessibleName('Dark mode');
  })

  it ('toggles dark mode with the keyboard', async () => {
    RenderComponent();
    const toggle = screen.getByRole('switch');

    await userEvent.type(toggle, '{enter}');

    await waitFor(async () => {
      await expect(toggle).toHaveClass('dark');
    });

    expect(toggle).toHaveAttribute('aria-checked', 'true');
  })
})
