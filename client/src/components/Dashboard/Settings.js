import React, { useState, useEffect } from "react";
import styled from "styled-components";
import DashboardSidebar from "./DashboardSidebar";
import Chip from "@material-ui/core/Chip";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
const Settings = () => {
  const [TextFieldContent, setTextFieldContent] = useState("");
  const [catagories, setCatagories] = useState([]);
  const [DialogOpen, setDialogOpen] = useState(false);
  const [aedRate, setAedRate] = useState(0);

  const handleChange = (event) => {
    setTextFieldContent(event.target.value);
  };

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleCategoryDelete = (categoryName) => {
    const catagoriesCopy = [...catagories];
    let index = catagories.findIndex(
      (category) => category.name === categoryName
    );
    catagoriesCopy.splice(index, 1);
    setCatagories(catagoriesCopy);
  };

  const handleCategoryAddition = (categoryName) => {
    console.log(categoryName);
    const catagoriesCopy = [...catagories];
    const newCategory = { name: categoryName };
    catagoriesCopy.push(newCategory);
    setCatagories(catagoriesCopy);
    handleDialogClose();
  };

  const handleAedRateSave = async (e) => {
    const response = await fetch("/api/settings/aedRate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ aedRate: Number(aedRate) }),
    });
    const data = await response.json();
    if (data.status === "success") {
      alert(data.message);
    } else {
      alert(data.message);
    }
  };

  const handleCatagoriesSave = async (e) => {
    const response = await fetch("/api/settings/catagories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ catagories }),
    });
    const data = await response.json();
    if (data.status === "success") {
      alert(data.message);
    } else {
      alert(data.message);
    }
  };

  useEffect(() => {
    console.log("hi");
    async function fetchSettings() {
      const response = await fetch("/api/settings");
      const data = await response.json();
      const settings = data[0];
      setAedRate(settings.aedRate);
      setCatagories(settings.catagories);
    }

    fetchSettings();
  }, []);

  return (
    <Container>
      <DashboardSidebar selectedId={4} />
      <SettingsPage>
        <Title>Settings</Title>
        <ContentWarper>
          <Form>
            <Field>
              <label> معامل التحويل بالجنيه </label>
              <input
                type="number"
                onChange={(e) => setAedRate(e.target.value)}
                value={aedRate}
              />
              <button className="save" onClick={handleAedRateSave}>
                {" "}
                حفظ{" "}
              </button>
            </Field>
            <CatagoriesContainer>
              {/* Dialog */}
              <Dialog open={DialogOpen}>
                <DialogTitle> Add Category </DialogTitle>
                <DialogContent>
                  <TextField type="text" onChange={handleChange}></TextField>
                </DialogContent>
                <DialogActions>
                  <button
                    style={{
                      padding: "3px  8px",
                      background: "#354555",
                      color: "white",
                    }}
                    onClick={() => handleCategoryAddition(TextFieldContent)}
                  >
                    {" "}
                    Add{" "}
                  </button>
                  <button
                    style={{
                      padding: "3px  8px",
                      background: "#354555",
                      color: "white",
                    }}
                    onClick={handleDialogClose}
                  >
                    {" "}
                    Close{" "}
                  </button>
                </DialogActions>
              </Dialog>

              <div style={{ textAlign: "right" }}>
                <label> الأقسام </label>
              </div>
              <CategoriesList>
                <Chip
                  label="Add Category"
                  color="secondary"
                  onClick={handleDialogOpen}
                />

                {catagories.map((category, index) => {
                  return (
                    <Chip
                      key={index}
                      label={category.name}
                      onDelete={() => handleCategoryDelete(category.name)}
                    />
                  );
                })}
              </CategoriesList>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleCatagoriesSave}
                >
                  حفظ
                </Button>
              </div>
            </CatagoriesContainer>
          </Form>
        </ContentWarper>
      </SettingsPage>
    </Container>
  );
};

export default Settings;
const Container = styled.div`
  position: relative;
  display: flex;
`;

const SettingsPage = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100% - 60px);
  position: relative;
  left: 60px;
`;

const Title = styled.h1`
  width: 100%;
  padding: 20px 40px 40px 40px;
`;

const ContentWarper = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;
  padding: 20px 40px;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
`;

const Field = styled.div`
  display: flex;
  align-items: center;

  label {
    margin-right: 20px;
  }

  input {
    height: 30px;
    padding: 0 10px;
  }

  button.save {
    margin-left: 20px;
    background: #354555;
    color: #fff;
    padding: 8px 16px;
    letter-spacing: 1.2px;
    border: none;
    cursor: pointer;
    outline: none;
    transition: 0.2s ease-in-out;
  }

  button:hover {
    background: #4f6780;
  }
`;

const CatagoriesContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  padding: 30px 0;
`;

const CategoriesList = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px 0;
  border: solid 1px #354555;
  margin: 10px 0;

  & > * {
    margin: 10px;
  }
`;
