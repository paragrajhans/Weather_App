import React from "react";
import Home from "../src/Container/Home/Home";

export const routes = [
  {
    path: "/",
    exact: true,
    main: (routeProps) => <Home {...routeProps} />,
  }
];
