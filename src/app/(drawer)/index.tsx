import { Stack } from 'expo-router';

import { Container } from '@/src/components/Container';
import { ScreenContent } from '@/src/components/ScreenContent';

export default function Home() {
  return (
    <>
      <Stack.Screen options={{ title: 'Home' }} />
      <Container>
        <ScreenContent path="app/(drawer)/index.tsx" title="Home" />
      </Container>
    </>
  );
}
