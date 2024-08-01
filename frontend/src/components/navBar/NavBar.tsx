import { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useNavigate } from 'react-router-dom';

export const PATHS = [
  { label: "Books", location: "/books" },
  { label: "Authors", location: "/authors" }

];

export const NavBar = () => {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();

  const handleChange = (event: unknown, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    navigate(PATHS[value].location);
  }, [value]);


  return (
    <AppBar position="static" color="transparent" style={{ position: "fixed", top: 0 }}>
      <Tabs
        value={value}
        aria-label="Navigation"
        indicatorColor="primary"
        textColor="primary"
        onChange={handleChange}
      >
        {PATHS.map((path, index) => {
          return <Tab key={index} label={path.label} />;
        })}
      </Tabs>
    </AppBar>
  );
};

