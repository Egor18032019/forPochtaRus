import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import {connect} from "react-redux";
import ImportButton from "./import_button.jsx";
import Footer from "./footer.jsx";
import {Operation} from "./data-reducer.js";

class App extends PureComponent {
  constructor(props) {
    super(props);
  }

  _renderApp() {
    const {getNewData} = this.props;

    return (
      <div>
        <ImportButton
          getNewData={getNewData}
        />
        <Footer />
      </div>
    );
  }


  render() {
    const {getNewData} = this.props;
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderApp()}
          </Route>
          <Route exact path="/property">
            <ImportButton
              getNewData={getNewData}
            />
          </Route>
          <Route exact path="/login">

          </Route>
        </Switch>
      </BrowserRouter >
    );
  }
}

const mapDispatchToTitle = (dispatch) => ({
  getNewData(newDataObj) {
    dispatch(Operation.postData(newDataObj));
  },
});

const mapStateToProps = () => {
  return {
  };
};

App.propTypes = {
  getNewData: PropTypes.func.isRequired
};

export {App};
export default connect(mapStateToProps, mapDispatchToTitle)(App); // первым стате а вторым фдиспатчеры
