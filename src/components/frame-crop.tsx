import { Center, Image } from "@mantine/core";

export const FrameCrop = () => {
  return (
    <Center flex={1} bg="#000" style={{ overflow: "hidden" }}>
      <Image h="100%" w="100%" fit="contain" src="https://placehold.co/600x400" />
    </Center>
  );
};
