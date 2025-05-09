import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import LoadingPage from "../loading";


function TeamDisplay(props) {
    const { name } = useParams();
    const [data,setData] = useState(null);
    const [loading,setLoading] = useState(true);

    useEffect(() => {
        getTeamDetails();
    },[])

    async function getTeamDetails() {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/hackathon/hackathonTeam/${name}/join`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });
            if(response.status === 403) navigate('/Error403');
            const data = await response.json();
            setData(data.data);
            props.func();
            setLoading(false);
        } catch (error) {
            console.error('Error posting data:', error);
        }
    }

    if(loading) {
        return(
            <LoadingPage/>
        );
    }

    return(
        <>
            <div className="rounded-lg shadow p-6 bg-gradient-to-tr from-blue via-blue-100 to-white ">
                <div>
                    Team Name: {data.teamName}
                </div>
                <div>
                    Team Code: {data.teamCode}
                </div>
                <div>
                    {
                        data.members.map((ele,i) => {
                            return <div key={i}>{ele.email} : {ele.role}</div>
                        })
                    }
                </div>
            </div>
        </>
    );
}

export default TeamDisplay