import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import ProjectCard from "../../components/ProjectComponents/UserProjectCard";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import ReactingNavBar from "../../components/ReactingNavBar";
import ParaAnimation from "./ParaAnimation";
import { motion } from "framer-motion";
import LoadingPage from "../../components/loading";
function UserProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/project/userprojects`);
        setProjects(response.data);
        setLoading(false);
      } catch (err) {
        if (err.response && err.response.status === 404) {
          setProjects("No projects found");
        } else {
          console.error("Error fetching project:", err);
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, []);

  if (loading) return <LoadingPage/>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flex">
      <ReactingNavBar />

      <div className="space-y-3 size-full">
        <div className="min-h-screen bg-gray-100">
          <Header />

          {/* Full-Screen ParaAnimation */}
          <div className="ParaAnimation-container ">
            <ParaAnimation />
          </div>

          {/* Content Section */}
          <main className="max-w-10xl mx-auto p-6 bg-white bg-gradient-to-br from-slate-50 to-blue-100">
  
         

            <section className="my-12 ">
              <h2 className="text-2xl font-bold">Public Projects</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 max-w-5xl ">
                {Array.isArray(projects) && projects.length > 0 ? (
                  projects.map((project) => (
                    <Link key={project.id} to={`/ProjectDisplay/${project._id}`}>
                      <ProjectCard project={project} />
                    </Link>
                  ))
                ) : (
                  <p>{projects}</p>
                )}
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}

export default UserProjects;
