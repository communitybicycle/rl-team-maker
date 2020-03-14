import React from "react";
import styled from "styled-components";
import TeamBoard from "./TeamBoard";
import Settings from "./Settings";
import AddNewTeam from "./AddNewTeam";

const Container = styled.div`
  width: 80%;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px 0 20px 0;
`;

const TeamHeader = styled.div`
  display: flex;
  align-content: center;
  > h1 {
    margin: 0 20px 0 0;
  }
`;

const ButtonDiv = styled.div`
  display: flex;
  align-items: center;
`;

export default function TeamSection() {
  return (
    <Container>
      <Header>
        <TeamHeader>
          <h1>Teams</h1>
          <ButtonDiv>
            <AddNewTeam />
          </ButtonDiv>
        </TeamHeader>
        <Settings />
      </Header>
      <TeamBoard />
    </Container>
  );
}
