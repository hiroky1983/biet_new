import React, { VFC } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { PostCard } from "./PostCard";
import { CreateButton } from "../../components/button/CreateButton";

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

export const TabPanel: VFC<TabPanelProps> = (porps) => {
  const { children, index, value, ...other } = porps;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

function a11yProps(index: any) {
  return {
    id: `nav-tab-${index}`,
    "aria-controls": `nav-tabpanel-${index}`,
  };
}

interface LinkTabProps {
  label?: string;
  href?: string;
}

function LinkTab(props: LinkTabProps) {
  return (
    <Tab
      component="a"
      onClick={(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  line: {
    color: "#374251",
    boxShadow: "0 0px 0px 0px rgba(0, 0, 0, 0)",
  },
}));

export const TabMenu: VFC = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (e: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="inherit" className={classes.line}>
        <Tabs
          variant="fullWidth"
          value={value}
          onChange={handleChange}
          aria-label="nav tabs"
          indicatorColor="primary"
        >
          <LinkTab label="質問をする" href="/drafts" {...a11yProps(0)} />
          <LinkTab label="質問を見る" href="/trash" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <div className=" max-h-screen justify-end ">
          <CreateButton />
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <PostCard />
        <PostCard />
        <PostCard />
      </TabPanel>
    </div>
  );
};
