import renderer from 'react-test-renderer';
import FPSButtonGroup from './FPSButtonGroup';

it('the button group should render correctly', () => {
  const component = renderer.create(
    <FPSButtonGroup setFPS={null} />
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});