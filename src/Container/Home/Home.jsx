import React, { Fragment } from 'react';
import axios from "axios";
import "./Home.scss";
import WeatherCard from "../../Components/WeatherCard/WeatherCard";
import { TabStrip, TabStripTab } from '@progress/kendo-react-layout';
import { Loader } from '@progress/kendo-react-indicators';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            API_KEY: "79b404c351b766cb48f9bea74a988957",
            currentWeather: [],
            forecast: [],
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

    handleSelect = (e) => {
        this.setState({ selected: e.selected })
    }

    getDay(date) {
        let newDate = new Date(date * 1000);
        return newDate.toUTCString().slice(0, 3);
    }

    getTime(date) {
        let newDate = new Date(date * 1000);
        return newDate.getUTCHours();
    }

    getHour(dt_txt) {
        return dt_txt.slice(11, 16);
    }

    render() {
        return this.state.isLoaded ? (
            <Fragment>
                <div className="content-wrapper">
                    <WeatherCard data={this.state.currentWeather} />

                    <TabStrip selected={this.state.selected} onSelect={this.handleSelect}>
                        <TabStripTab title={this.getDay(this.state.dayOne[0].dt)}>
                            <div className="row no-gutters p-3">
                                {this.state.dayOne.map(value => {
                                    return (
                                        <div className="card card-body mr-2 border-0 weather-card" style={{ width: "10rem", height: "14rem" }}>
                                            <p className="text-center">{value.dt_txt} hrs</p>
                                            <img src={`http://openweathermap.org/img/wn/${value.weather[0].icon}@2x.png`} alt="weather-icon" style={{ alignSelf: "center" }} />
                                            <h2 className="text-center">
                                                {Math.round(value.main.temp)} &#8457;
                                            </h2>
                                        </div>
                                    )
                                })}
                            </div>

                        </TabStripTab>
                        <TabStripTab title={this.getDay(this.state.dayTwo[0].dt)}>
                            <div className="row no-gutters p-3">
                                {this.state.dayTwo.map(value => {
                                    return (
                                        <div className="card card-body mr-2 border-0 weather-card" style={{ width: "10rem", height: "14rem" }}>
                                            <p className="text-center">{value.dt_txt} hrs</p>
                                            <img src={`http://openweathermap.org/img/wn/${value.weather[0].icon}@2x.png`} alt="weather-icon" style={{ alignSelf: "center" }} />
                                            <h2 className="text-center">
                                                {Math.round(value.main.temp)} &#8457;
                                        </h2>
                                        </div>
                                    )
                                })}
                            </div>

                        </TabStripTab>
                        <TabStripTab title={this.getDay(this.state.dayThree[0].dt)}>
                            <div className="row no-gutters p-3">
                                {this.state.dayThree.map(value => {
                                    return (
                                        <div className="card card-body mr-2 border-0 weather-card" style={{ width: "10rem", height: "14rem" }}>
                                            <p className="text-center">{value.dt_txt} hrs</p>
                                            <img src={`http://openweathermap.org/img/wn/${value.weather[0].icon}@2x.png`} alt="weather-icon" style={{ alignSelf: "center" }} />
                                            <h2 className="text-center">
                                                {Math.round(value.main.temp)} &#8457;
                                        </h2>
                                        </div>
                                    )
                                })}
                            </div>

                        </TabStripTab>
                        <TabStripTab title={this.getDay(this.state.dayFour[0].dt)}>
                            <div className="row no-gutters p-3">
                                {this.state.dayFour.map(value => {
                                    return (
                                        <div className="card card-body mr-2 border-0 weather-card" style={{ width: "10rem", height: "14rem" }}>
                                            <p className="text-center">{value.dt_txt} hrs</p>
                                            <img src={`http://openweathermap.org/img/wn/${value.weather[0].icon}@2x.png`} alt="weather-icon" style={{ alignSelf: "center" }} />
                                            <h2 className="text-center">
                                                {Math.round(value.main.temp)} &#8457;
                                        </h2>
                                        </div>
                                    )
                                })}
                            </div>

                        </TabStripTab>
                        <TabStripTab title={this.getDay(this.state.dayFive[0].dt)}>
                            <div className="row no-gutters p-3">
                                {this.state.dayFive.map(value => {
                                    return (
                                        <div className="card card-body mr-2 border-0 weather-card" style={{ width: "10rem", height: "14rem" }}>
                                            <p className="text-center">{value.dt_txt} hrs</p>
                                            <img src={`http://openweathermap.org/img/wn/${value.weather[0].icon}@2x.png`} alt="weather-icon" style={{ alignSelf: "center" }} />
                                            <h2 className="text-center">
                                                {Math.round(value.main.temp)} &#8457;
                                        </h2>
                                        </div>
                                    )
                                })}
                            </div>

                        </TabStripTab>
                    </TabStrip>

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