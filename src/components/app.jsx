import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import {connect} from "react-redux";
import Main from "./main.jsx";
import Footer from "./footer.jsx";
import {Operation} from "./data-reducer.js";
import {getPlacesNormilse} from "./selectors.js";

class App extends PureComponent {
  constructor(props) {
    super(props);
  }

  _renderApp() {
    const {getNewData, places} = this.props;

    return (
      <main>
        <Main
          getNewData={getNewData}
          places={places}
        />
        <Footer />
      </main>
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
            <Main
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

const mapStateToProps = (store) => {
  return {
    places: getPlacesNormilse(store),

  };
};

App.propTypes = {
  getNewData: PropTypes.func.isRequired,
  places: PropTypes.object
};

export {App};
export default connect(mapStateToProps, mapDispatchToTitle)(App); // первым стате а вторым диспатчеры
