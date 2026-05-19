import "@mantine/core/styles.css";

import { Button, MantineProvider, Stack, Text } from "@mantine/core";

const App = () => {
  return (
    <MantineProvider>
      <Stack>
        <Text>Hello Mantine!</Text>
        <Button>Click me</Button>
      </Stack>
    </MantineProvider>
  );
};

export default App;
