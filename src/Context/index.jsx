import { useContext, createContext, useState, useEffect } from "react";
import axios from 'axios';
import PropTypes from 'prop-types';

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
    const [weather, setWeather] = useState({});
    const [values, setValues] = useState([]);
    const [place, setPlace] = useState('Islamabad');
    const [thisLocation, setLocation] = useState('');

    // fetch api
    const fetchWeather = async () => {
        const options = {
            method: 'GET',
            url: 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/',
            params: {
                location: place,
                unitGroup: 'metric',
                key: import.meta.env.VITE_API_KEY,
                contentType: 'json'
            }
        };

        try {
            const response = await axios.request(options);
            console.log(response.data);
            const thisData = response.data;
            setLocation(thisData.address);
            setValues(thisData.days);
            setWeather(thisData.days[0]);
        } catch (e) {
            console.error(e);
            alert('This place does not exist');
        }
    };

    useEffect(() => {
        fetchWeather();
    }, [place]);

    useEffect(() => {
        console.log(values);
    }, [values]);

    return (
        <StateContext.Provider value={{
            weather,
            setPlace,
            values,
            thisLocation,
            place
        }}>
            {children}
        </StateContext.Provider>
    );
};

StateContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export const useStateContext = () => useContext(StateContext);
