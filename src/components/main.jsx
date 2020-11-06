import React, {PureComponent, createRef} from "react";
import PropTypes from "prop-types";

import MistakesList from "./mistakes.jsx";
import ImportButton from "./import_button.jsx";

class Main extends PureComponent {

  constructor(props) {
    super(props);
    this.textRef = createRef();
    this.onChange = this.onChange.bind(this);
  }

  onChange() {
    console.log(this.textRef.current.value);
  }

  render() {
    const {getNewData, places} = this.props;
    return (
      <div className="description ">
        <h1>Нормализация вашей базы</h1>
        <div className="forBuisnes">
          <p>Если большой обьем то воспользуйтесь этим вариантом</p>
          <p className="principle">Заполните файл в формате .csv или .excell согласно образцу</p>
          <img src="img/obrazec.jpg" alt="Заполните по образцу" width="500" height="90" />
          <div>Тарифы
            <ul>
              <li>Проверка от 100 до 1000 адресов = 10 рубль адрес.</li>
              <li>Проверка от 1000 до 10000 адресов = 5 рубль адрес.</li>
            </ul>
          </div>
          <ImportButton
            getNewData={getNewData}
          />
          <MistakesList
            places={places}
          />

        </div>

        <div className="forFamily">
          <p>Если не большой обьем то воспользуйтесь по строчным поиском</p>
          <p className="principle">Вводите адрес следующим образом:
            <span>Населёный пункт, улицу,дом,квартира</span>
          </p>
          <input type="text" placeholder=" город,улицу,дом,кв" name="pochtaRus" ref={this.textRef} onChange={this.onChange} />
        </div>
      </div>
    );
  }
}
Main.propTypes = {
  getNewData: PropTypes.func.isRequired,
  places: PropTypes.object
};
export default Main;
