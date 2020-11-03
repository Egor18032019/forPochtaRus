import React, {PureComponent, createRef} from "react";
import {parse} from "papaparse";
import PropTypes from "prop-types";

class ImportButton extends PureComponent {

  constructor(props) {
    super(props);
    this.textRef = createRef();
    this.onChange = this.onChange.bind(this);
  }

  _handleNewData(e) {
    const {getNewData} = this.props;
    e.preventDefault();
    const file = e.target.files[0];
    let name = file.name;
    let nameForData = name.slice(0, -4);
    if (file.type !== `application/vnd.ms-excel`) {
      // eslint-disable-next-line no-alert
      alert(`Вы загрузили не Excel`);
    }
    // парсит файл и возвращает промис
    const foo = () => {
      let data;
      return new Promise((resolve, reject) => {
        parse(file, {
          header: true,
          download: true,
          dynamicTyping: true,
          complete(results) {
            resolve(data = results.data);
          },
          error(err, file) {
            reject(err);
          }
        });

      });
    };

    const main = async () => {
      try {
        const data = await foo();
        const newDataObj = {
          name: nameForData,
          place: data
        };
        console.log(newDataObj);
        getNewData(newDataObj);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(`Could not parse file`, err);
      }
    };
    main();
  }

  onChange() {
    console.log(this.textRef.current.value);
  }

  render() {
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
          <div className="btn">
            <input type="file" id="images" name="images" className="ad-form__input visually-hidden"
              onChange={(e) => this._handleNewData(e)} />
            <label htmlFor="images" className="ad-form__drop-zone">Загрузить файл...</label>
          </div>
          <div>
            <p className="answer">Ошибок нет</p>
            <ul>
              <li><p>Когда приходят ошибки то тут будет написано до какого пункта было правильно.
                Например: [г.Екатеринбург, ул.Молодежи, д.83, кв 1]
                будет возваращено [г.Екатеринбург, ул.Молодежи,] и написано что д.83 дома нет на этой улице </p></li>
            </ul>
          </div>
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
ImportButton.propTypes = {
  getNewData: PropTypes.func.isRequired
};
export default ImportButton;
