import React, { Fragment } from "react";
import "./WeatherCard.scss";

class WeatherCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Fragment>
        <div className="row no-gutters">
          <div className="card card-body border-0 text-center">
            <img src={`http://openweathermap.org/img/wn/${this.props.data.data.weather[0].icon}@2x.png`} alt="weather-icon" style={{ alignSelf: "center" }} />
            <h3>
              <p className="mb-1 text-capitalize">{this.props.data.data.weather[0].description}</p>
            </h3>
            <p className="mb-1"> {this.props.data.data.name}</p>
            <h1 className="m-0 font-weight-bold">
              {Math.round(this.props.data.data.main.temp)} &#8457;
                        </h1>
          </div>
        </div>
        <div className="row no-gutters p-5">
          <div className="card card-body border-0 text-center">
            <i className="fas fa-tint icon-container"></i>
            <p className="mb-1">Humidity</p>
            <h5 className="mb-3 font-weight-bold">{this.props.data.data.main.humidity}&nbsp;&#37;</h5>
          </div>
          <div className="card card-body border-0 text-center">
            <i className="fab fa-mixcloud icon-container"></i>
            <p className="mb-1">Air Pressure</p>
            <h5 className="mb-3 font-weight-bold">{this.props.data.data.main.pressure} {"PS"}</h5>
          </div>
          <div className="card card-body border-0 text-center">
            <i className="fas fa-wind icon-container"></i>
            <p className="mb-1">Wind Speed</p>
            <h5 className="mb-3 font-weight-bold">{this.props.data.data.main.pressure}&nbsp;{"mph"}</h5>
          </div>
          <div className="card card-body border-0 text-center">
            <i className="fas fa-temperature-high icon-container"></i>
            <p className="mb-1 font-weight-bold">Max Temp</p>
            <h5 className="mb-3">{Math.round(this.props.data.data.main.temp_max)}&#8457;</h5>
          </div>
          <div className="card card-body border-0 text-center">
            <i className="fas fa-temperature-low icon-container"></i>
            <p className="mb-1">Min Temp</p>
            <h5 className="mb-3 font-weight-bold">{Math.round(this.props.data.data.main.temp_min)}&#8457;</h5>

          </div>
        </div>
      </Fragment>
    );
  }
}

export default WeatherCard;