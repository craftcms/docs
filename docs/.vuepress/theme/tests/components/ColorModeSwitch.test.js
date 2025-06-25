import '@testing-library/jest-dom';
import ColorModeSwitch from "../../components/ColorModeSwitch.vue";
import {render, screen} from '@testing-library/vue';

describe('ColorModeSwitch', () => {
	it('renders', () => {
    render(ColorModeSwitch);
		const toggle = screen.getByRole('switch');
    expect(toggle).toBeInTheDocument();
	});
})
