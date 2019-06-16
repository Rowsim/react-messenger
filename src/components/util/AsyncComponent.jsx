import React, { Component } from "react";
import Loader from "react-loader-spinner";

export default function asyncComponent(importComponent) {
  class AsyncComponent extends Component {
    constructor(props) {
      super(props);

      this.state = {
        component: null
      };
    }

    async componentDidMount() {
      const { default: component } = await importComponent();

      this.setState({
        component: component
      });
    }

    render() {
      const C = this.state.component;

      return C ? (
        <C {...this.props} />
      ) : (
        <div className="component-loader">
        <Loader type="Triangle" color="#dd7e47" height="200" width="200" />
        </div>
      );
    }
  }

  return AsyncComponent;
}
