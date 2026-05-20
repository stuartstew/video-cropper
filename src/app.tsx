import "@mantine/core/styles.css";

import { MantineProvider, Stack, Text } from "@mantine/core";
import { FrameCrop } from "./components/frame-crop";
import { VideoInput } from "./components/video-input";

const App = () => {
  return (
    <MantineProvider defaultColorScheme="dark">
      <Stack h="100vh" display="flex">
        <VideoInput />
        <FrameCrop />
        <Text px="xl" py="md">
          Footer
        </Text>
      </Stack>
    </MantineProvider>
  );
};

export default App;
