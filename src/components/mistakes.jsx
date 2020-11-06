import React, {PureComponent} from "react";
import PropTypes from "prop-types";

import Mistake from "./mistake.jsx";
class MistakesList extends PureComponent {

  constructor(props) {
    super(props);
  }


  render() {
    const {places} = this.props;

    let mistakes = places.place ? `Найдены следующие ошибки` : `Ошибок не найдено`;
    if (places.place) {
      return (
        <div className="mistakes">
          <p className="mistakes-result">{mistakes}</p>

          <ul className="mistakes-list">
            {places.place.map(
                (place) => {
                  return (
                    <Mistake
                      place={place}
                      key={place.id + place.town}
                    />
                  );
                })}
          </ul>
        </div>
      );
    } else {
      return ``;
    }

  }
}

MistakesList.propTypes = {
  places: PropTypes.object
};

export default MistakesList;
