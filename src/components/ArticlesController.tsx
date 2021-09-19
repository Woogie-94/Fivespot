import { ViewCompact } from "@material-ui/icons";
import { FormatListBulleted } from "@mui/icons-material";
import { Button, ToggleButton, ToggleButtonGroup } from "@mui/material";
import React, { Dispatch, MouseEvent, SetStateAction, useCallback } from "react";
import styled from "styled-components";

const ArticlesController = ({ toggle, setToggle }: { toggle: string; setToggle: Dispatch<SetStateAction<string>> }): JSX.Element => {
  const onToggle = useCallback(
    (e: MouseEvent<HTMLElement>, newDevices: string): void => {
      if (newDevices !== null) {
        setToggle(() => newDevices);
      }
    },
    [setToggle]
  );

  return (
    <ControllerContainer>
      <ToggleButtonGroup value={toggle} exclusive style={{ marginRight: `20px` }} onChange={onToggle}>
        <ToggleButton value="list">
          <FormatListBulleted />
        </ToggleButton>
        <ToggleButton value="grid">
          <ViewCompact />
        </ToggleButton>
      </ToggleButtonGroup>
      <Button variant="outlined" style={{ background: `#ff7921`, color: `#fff`, border: `0` }}>
        작성하기
      </Button>
    </ControllerContainer>
  );
};

const ControllerContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 1100px;
  height: 40px;
  margin-top: 50px;
  padding: 0 10px;
`;

export default ArticlesController;
