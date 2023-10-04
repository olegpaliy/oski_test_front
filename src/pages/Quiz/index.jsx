import { useContext, useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { AuthContext } from "../../context/AuthProvider";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import { NavLink } from "react-router-dom";
import PageHeader from "../../components/PageHeader";

export default function Quiz() {
  const { authUser, updateAuthUser } = useContext(AuthContext);

  useEffect(() => {
    updateAuthUser();
  }, []);

  if (!authUser) return null;

  return (
    <>
      <PageHeader pageTitle="Quiz" />
      <Container sx={{ py: 8 }} maxWidth="md">
        <Grid container spacing={4}>
          {authUser.usersAssessments.map((item) => (
            <Grid item key={item.id} xs={12} sm={6} md={4}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {item.completed && (
                      <AssignmentTurnedInIcon sx={{ mr: 1, mt: 1 }} />
                    )}
                    {item.assessment.name}
                  </Typography>
                </CardContent>
                <CardActions>
                  <NavLink to={`questions/${item.id}`}>Link</NavLink>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}
