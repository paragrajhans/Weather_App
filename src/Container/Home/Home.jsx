import React, { Fragment } from 'react';
import axios from "axios";

import { Loader } from '@progress/kendo-react-indicators';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            API_KEY: "79b404c351b766cb48f9bea74a988957",
            currentWeather: [],
            selected: 0,
            isLoaded: false
        };
    }

    componentDidMount() {
        this.getCurrentLocation();
    }

    getCurrentLocation() {
        navigator.geolocation.getCurrentPosition(position => {
            this.getWeatherForecast(position.coords.latitude, position.coords.longitude);
        });
    }

    getWeatherForecast(lat, long) {
        const CURRENT_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${this.state.API_KEY}&units=imperial`;
        const FORECAST_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${this.state.API_KEY}&units=imperial`;

        axios.all([axios.get(CURRENT_URL), axios.get(FORECAST_URL)])
            .then(([currentWeather, forecast]) => {
                console.log(currentWeather);
                console.log(forecast);

                let dayOne = [], dayTwo = [], dayThree = [], dayFour = [], dayFive = [];

                for (let i = 0; i < forecast.data.list.length; i++) {
                    if (forecast.data.list[i].dt_txt.slice(0, 10) === forecast.data.list[0].dt_txt.slice(0, 10)) {
                        dayOne.push(forecast.data.list[i]);
                    }
                    else if (forecast.data.list[i].dt_txt.slice(0, 10) === forecast.data.list[dayOne.length + 1].dt_txt.slice(0, 10)) {
                        dayTwo.push(forecast.data.list[i]);
                    }

                    else if (forecast.data.list[i].dt_txt.slice(0, 10) === forecast.data.list[dayOne.length + dayTwo.length + 1].dt_txt.slice(0, 10)) {
                        dayThree.push(forecast.data.list[i]);
                    }
                    else if (forecast.data.list[i].dt_txt.slice(0, 10) === forecast.data.list[dayOne.length + dayTwo.length + dayThree.length + 1].dt_txt.slice(0, 10)) {
                        dayFour.push(forecast.data.list[i]);
                    }
                    else if (forecast.data.list[i].dt_txt.slice(0, 10) === forecast.data.list[dayOne.length + dayTwo.length + dayThree.length + dayFour.length + 1].dt_txt.slice(0, 10)) {
                        dayFive.push(forecast.data.list[i]);
                    }

                }

                this.setState({
                    currentWeather: currentWeather,
                    dayOne: dayOne,
                    dayTwo: dayTwo,
                    dayThree: dayThree,
                    dayFour: dayFour,
                    dayFive: dayFive,
                    isLoaded: true
                })
            }).catch((error) => {
                console.log(error);
            });

    }

    render() {
        return this.state.isLoaded ? (
            <Fragment>
                <div className="content-wrapper">
                </div>
            </Fragment>
        ) : (
                <div className='col-12 text-center' style={{ padding: "25%" }}>
                    <Loader type='converging-spinner' />
                </div>
            );
    }
}

export default Home;