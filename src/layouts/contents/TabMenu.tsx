import { useState } from "react";
import type { VFC } from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { PostCard } from "./PostCard";
import { Posts } from "../posts/Posts";

export const TabMenu: VFC = () => {
  const [posts, setPosts] = useState<Array<any>>([]);
  return (
    <div className="lg:mr-8 mb-24">
      <Tabs isFitted variant="enclosed">
        <TabList>
          <Tab
            fontWeight="bold"
            textColor="gray.700"
            _selected={{ bg: "#3C82F6", color: "white" }}
          >
            質問を投稿する
          </Tab>
          <Tab
            fontWeight="bold"
            p="3"
            textColor="gray.700"
            _selected={{ bg: "#3C82F6", color: "white" }}
          >
            質問に回答する
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel p="0" h="100vh">
            <Posts />
          </TabPanel>
          <TabPanel p="0" h="100vh">
            {/* {posts.length === 0 ? (
            <p className="text-gray-700">質問はまだありません</p>
          ) : ( */}
            <PostCard />
            <PostCard />
            <PostCard />
            {/* )} */}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};
