import React from "react";
import styled from "styled-components";
import GeneralView from "./Dashboard/GeneralVeiw";
import DashboardSidebar from "./Dashboard/DashboardSidebar";
function Dashboard() {
  return (
    <Container>
      <DashboardSidebar selectedId={0} />
      <MainSection>
        <GeneralView />
      </MainSection>
    </Container>
  );
}

export default Dashboard;
const Container = styled.div`
  @media screen and (max-width: 900px) {
    flex-direction: column;
  }
  min-width: 100vw;
  min-height: 100vh;
  display: flex;
  font-family: Roboto, sans-serif;
`;

const MainSection = styled.div`
  @media screen and (max-width: 900px) {
    width: 100vw;
    left: 0px;
  }
  width: calc(100vw - 60px);
  position: relative;
  left: 60px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;
