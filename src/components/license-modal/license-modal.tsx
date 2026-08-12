import { DataList, Modal, Tabs } from "@mantine/core";
import { useLicenses } from "./hooks/use-licenses";

type Props = {
  opened: boolean;
  onClose: () => void;
};

export const LicenseModal = ({ opened, onClose }: Props) => {
  const { frontendLicenses } = useLicenses();

  return (
    <Modal opened={opened} onClose={onClose} title="Licenses" fullScreen>
      <Tabs defaultValue="frontend">
        <Tabs.List mb="xl">
          <Tabs.Tab value="frontend">Frontend Licenses</Tabs.Tab>
          <Tabs.Tab value="rust">Rust Licenses</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="frontend" mx="md">
          <DataList orientation="horizontal">
            {frontendLicenses.map((lib) => (
              <DataList.Item key={lib.name}>
                <DataList.ItemLabel miw={0}>{`${lib.name} (${lib.versions[0]})`}</DataList.ItemLabel>
                <DataList.ItemValue>{lib.license}</DataList.ItemValue>
              </DataList.Item>
            ))}
          </DataList>
        </Tabs.Panel>

        <Tabs.Panel value="rust" mx="md">
          Rust Licenses
        </Tabs.Panel>
      </Tabs>
    </Modal>
  );
};
