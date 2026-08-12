import { Modal, Tabs } from "@mantine/core";

type Props = {
  opened: boolean;
  onClose: () => void;
};

export const LicenseModal = ({ opened, onClose }: Props) => {
  return (
    <Modal opened={opened} onClose={onClose} title="Licenses" fullScreen>
      <Tabs defaultValue="frontend">
        <Tabs.List mb="xl">
          <Tabs.Tab value="frontend">Frontend Licenses</Tabs.Tab>
          <Tabs.Tab value="rust">Rust Licenses</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="frontend" mx="md">
          Frontend Licenses
        </Tabs.Panel>

        <Tabs.Panel value="rust" mx="md">
          Rust Licenses
        </Tabs.Panel>
      </Tabs>
    </Modal>
  );
};
