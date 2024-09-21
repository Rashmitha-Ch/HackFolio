import { Routes, Route } from "react-router-dom";
import Hack_org from "./pages/Hack_org";
import ProjectSubmissionForm from "./pages/ProjectSubmissionForm";
import Org_form_completion from "./components/Org_form_completion";
import SuccessPage from "./pages/projectSuccessUpload";
import PrivateRoute from "./components/PrivateRoute";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Project_display from "./pages/ProjectDisplay";
import UserProjects from "./pages/UserProjects";
import HackathonProjectDispay from "./pages/hackathon_projects";
import Hackathon_page from "./pages/Hackathon_page";
import Hack_cards_disp from "./pages/Hack_cards_disp";
import HomePage from "./pages/HomePage";
import UserDashboard from "./pages/UserDashboard";
import My_hackathons from "./pages/My_hackathons";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route element={<PrivateRoute />}>
          <Route element={<SuccessPage />} path="/uploadsuccess" />
          <Route element={<UserProjects />} path="/userProjects" />
          <Route path="/createHackathon" element={<Hack_org />} />
          <Route
            path="/completeHackathonCreation/:id"
            element={<Org_form_completion />}
          />
          <Route path="organizedHackathons" element={<My_hackathons />} />
        </Route>
        <Route
          element={<Project_display />}
          path="/ProjectDisplay/:projectId"
        />

        {/* Update this route to handle @username */}
        <Route element={<UserDashboard />} path="/@/:username" />

        <Route path="/project_form" element={<ProjectSubmissionForm />} />

        <Route path="/hackathons" element={<Hack_cards_disp />} />
        <Route path="/hackathon/:id" element={<Hackathon_page />} />
      </Routes>
    </>
  );
}

export default App;
