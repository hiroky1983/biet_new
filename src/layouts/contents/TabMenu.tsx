import { useState, VFC } from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel, Box } from "@chakra-ui/react";
import { PostCard } from "./PostCard";

export const TabMenu: VFC = () => {
  const [posts, setPosts] = useState<Array<any>>([]);
  return (
    <Tabs isFitted variant="enclosed">
      <TabList mb="1em">
        <Tab>質問を投稿する</Tab>
        <Tab>質問に回答する</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <Box>
            <PostCard />
            <PostCard />
          </Box>
        </TabPanel>
        <TabPanel>
          {posts.length === 0 ? (
            <p className="text-gray-700">質問はまだありません</p>
          ) : (
            <PostCard />
          )}
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};
