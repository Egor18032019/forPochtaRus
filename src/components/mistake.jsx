
import React, {PureComponent} from "react";
import PropTypes from "prop-types";

class Mistake extends PureComponent {

  constructor(props) {
    super(props);
  }


  render() {
    const {place} = this.props;
    if (place) {
      return (
        <li>{place.town}, {place.index}, {place.street}, {place.home}</li>
      );
    } else {
      return (``);
    }
  }
}

Mistake.propTypes = {
  place: PropTypes.func
};

export default Mistake;
