import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import FormControl from "@mui/material/FormControl";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import { AuthContext } from "../../context/AuthProvider";
import PageHeader from "../../components/PageHeader";
import { useAssessmentById } from "../../hook/useAssesments";
import { updateAssesmentById } from "../../api/updateAssessment";
import { useNavigate } from "react-router-dom";

export default function Questions() {
  const { authUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  console.log("🚀 formData:", formData);

  const { id: usersAssessmentId } = useParams();

  const { assessment } = useAssessmentById(usersAssessmentId);
  console.log(assessment);

  useEffect(() => {
    if (!assessment) return;
    const preparedData = assessment.answer.reduce(
      (acc, curr) => ({
        ...acc,
        [curr.question.id]: curr.answer,
      }),
      {}
    );
    setFormData(preparedData);
  }, [assessment]);

  const handleChangeAnswer = (questionId, value) => {
    setFormData({
      ...formData,
      [questionId]: JSON.parse(value),
    });
  };

  const submitHandler = () => {
    updateAssesmentById(
      JSON.parse(localStorage.getItem("authToken")),
      usersAssessmentId,
      {
        ...assessment,
        answer: assessment.answer.map((answer) => ({
          ...answer,
          answer: formData[answer.questionId],
        })),
      }
    );
    navigate("/quiz");
  };

  if (!authUser || !assessment) return null;

  const isSubmitDisabled =
    Object.values(formData).some((item) => typeof item !== "boolean") ||
    assessment.completed;

  return (
    <>
      <PageHeader pageTitle="Questions" />
      <Container sx={{ py: 8 }} maxWidth="md">
        <Grid container spacing={4}>
          {assessment.answer.map((item) => (
            <Grid item key={item.id} xs={12} sm={6} md={4}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {item.question.body}
                  </Typography>
                </CardContent>
                <CardActions>
                  <FormControl>
                    <RadioGroup
                      aria-labelledby="radio-buttons-group-label"
                      name="radio-buttons-group"
                      value={formData[item.question.id] ?? null}
                      onChange={(e) =>
                        handleChangeAnswer(item.question.id, e.target.value)
                      }
                      row
                    >
                      <FormControlLabel
                        required
                        control={<Radio value={true} />}
                        label="Yes"
                      />
                      <FormControlLabel
                        required
                        control={<Radio value={false} />}
                        label="No"
                      />
                    </RadioGroup>
                  </FormControl>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Grid
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button
            onClick={submitHandler}
            variant="contained"
            sx={{ mt: 6 }}
            disabled={isSubmitDisabled}
          >
            Submit
          </Button>
          {assessment.completed && (
            <Typography gutterBottom variant="h5" component="h2" sx={{ mt: 3 }}>
              Quiz already completed
            </Typography>
          )}
        </Grid>
      </Container>
    </>
  );
}
