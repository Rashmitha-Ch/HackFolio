import React, { useState } from "react";
import axios from "axios";
import LoadingPage from "../loading"
import { useNavigate, useParams } from 'react-router-dom';

function HackathonProjectSubmissionForm() {
    const {name} = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    hackathonName: "",
    teamCode: "",
    projectName: "",
    slogan: "",
    aboutProject: "",
    challenges: "",
    tech: "",
    links: "",
    videoLink: "",
  });
  
  const [logo, setLogo] = useState(null);
  const [images, setImages] = useState([]);
  const [coverimage, setCoverimage] = useState(null);
  const [isLoading,setIsloading]=useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageUpload = async (file) => {
    const uploadPreset = 'projectform'; // Replace with your Cloudinary upload preset
    const cloudName = 'dv1a0uvfm'; // Replace with your Cloudinary cloud name
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', uploadPreset);
    

    try {
      const response = await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          withCredentials: false, 
        }
      );
      return response.data.secure_url;
    } catch (error) {
      console.error('Error uploading file:', error.response ? error.response.data : error.message);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsloading(true);

    const logoUrl = logo ? await handleImageUpload(logo) : null;
    const imageUrls = await Promise.all(Array.from(images).map(handleImageUpload));
    const coverUrl=coverimage?await handleImageUpload(coverimage):null;

    const projectData = {
      ...formData,
      coverUrl,
      logoUrl,
      imageUrls,
    };

    try {
      console.log(projectData);
      const response = await axios.post(`/api/project/hackathonProject/${name}`, projectData);
      console.log('Server response:', response.data);
      navigate('/uploadsuccess');
      
      
    } catch (error) {
      console.error('Error sending data to /api/project:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <>
    {isLoading?(<LoadingPage></LoadingPage>):(
    <div className="p-6 min-w-[50%]">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6">Project Submission Form</h1>
        <form onSubmit={handleSubmit}>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Project Name</label>
            <input
              type="text"
              name="projectName"
              value={formData.projectName}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="What are you calling it?"
              maxLength="50"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Tagline</label>
            <input
              type="text"
              name="slogan"
              value={formData.tagline}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Brief description or slogan"
              maxLength="200"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">About Project</label>
            <textarea
              name="aboutProject"
              value={formData.problem}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
              placeholder="Describe the problem your project addresses"
              maxLength="2000"
            ></textarea>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Challenges I Ran Into</label>
            <textarea
              name="challenges"
              value={formData.challenges}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
              placeholder="Describe any specific bug or hurdle and how you overcame it"
              maxLength="2000"
            ></textarea>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Technologies I Used</label>
            <input
              type="text"
              name="tech"
              value={formData.technologies}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Comma-separated list of technologies"
              maxLength="100"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Links</label>
            <input
              type="text"
              name="links"
              value={formData.links}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Add links (e.g., GitHub, website)"
              maxLength="1000"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Video Demo</label>
            <input
              type="text"
              name="videoLink"
              value={formData.videoDemo}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Add a link to a video demo"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Cover Image</label>
            <input
              type="file"
              name="coverImage"
              onChange={(e) => setCoverimage(e.target.files[0])}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Logo</label>
            <input
              type="file"
              name="logo"
              onChange={(e) => setLogo(e.target.files[0])}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Pictures</label>
            <input
              type="file"
              name="pictures"
              multiple
              onChange={(e) => setImages(Array.from(e.target.files))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>)}
    </>
  );
}

export default HackathonProjectSubmissionForm;
