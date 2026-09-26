import { render } from '@testing-library/react-native';

import { StarterStatus } from '@/components/starter-status';

describe('StarterStatus', () => {
  it('renders release identity', () => {
    const screen = render(
      <StarterStatus environment="staging" gitSha="abc123" />,
    );

    expect(screen.getByText('Environment: staging')).toBeTruthy();
    expect(screen.getByText('Revision: abc123')).toBeTruthy();
  });
});
