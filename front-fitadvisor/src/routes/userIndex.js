import {useEffect, useState} from "react";
import '../CSS/user.css';
import MedData from "../components/userMainPage/medDataInfo";
import MedDataForm from "../components/userMainPage/medDataForm";
import Map from "../components/userMainPage/mapaGym";
import Image from "react-bootstrap/Image";
import gif from "../../src/img/loading.gif";

function youPage() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [userData, setUserData] = useState(null);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [userInfo, setUserInfo] = useState(null);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [ShowMedDataForm, setShowMedDataForm] = useState(true);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [isLoading, setIsLoading] = useState(true);
    const url = window.location.href;
    let userID = url.substring(url.lastIndexOf('/') + 1);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        let fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:8200/people/${userID}`, {
                    method: 'GET',
                });
                let res = await response.json();
                if (res.success) {
                    setUserData(res.data);
                } else if (!res.success) {
                    alert("Faltas datos del usuario");
                }
            } catch (error) {
                console.log('Error fetching data:', error);
            }
        };
        fetchData();

    }, [userID]);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        let fetchInfo = async () => {
            try {
                const resp = await fetch(`http://localhost:8200/info/${userData[4]}`, {
                    method: 'GET',
                });
                if (resp.status === 404) {
                    setIsLoading(false);
                    console.log(userData);
                    setShowMedDataForm(true);

                }
                let request = await resp.json();
                if (request.success) {
                    setUserInfo(request.data);
                    if (userInfo != null) {
                        setShowMedDataForm(false);
                        setIsLoading(false);
                    }
                }
            } catch (error) {
                console.log('Error fetching data:', error);
            }
        }
        if (userData != null) {
            fetchInfo();
        }
    }, [userData, userInfo]);
    if (isLoading) {
        return (
            <div className='container-userInfo'>
                <Image
                    src={gif}
                    alt={'Loading'}
                    className='loading-screan'
                />
            </div>
        );
    } else if (ShowMedDataForm) {
        return (
            <MedDataForm userID={userData[4]}></MedDataForm>
        );
    }
    if (!isLoading && userInfo != null) {
        console.log(JSON.stringify(userInfo['chronic_conditions']));
        return (
            <div className='container-user'>
                <div className='container-userInfo'>
                    <h1>Bienvenido {userData[0]}</h1>
                    <div>
                        <MedData weight={userInfo['weight']} height={userInfo['height']}
                                 allergies={userInfo['allergies']}
                                 chronic_conditions={userInfo['chronic_conditions']}
                                 medications={userInfo['medications']}/>
                    </div>
                </div>
                <Map clasName='map'/>
            </div>
        );
    }
}

export default youPage;