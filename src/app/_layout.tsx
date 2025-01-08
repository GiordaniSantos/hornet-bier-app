import { Slot } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StoreWrapper } from '../store/StoreWrapper';
import SweetAlert from '../components/sweetAlert';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(drawer)',
};

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StoreWrapper>
        <SweetAlert />
        <Slot />
      </StoreWrapper>
    </GestureHandlerRootView>
  );
}
