import { useContext } from 'react';
import { CardInfoContext } from 'contexts/CardInfoContextProvider';

import { MONTH, LIMIT_LENGTH } from 'constants';
import { inputNumberOnly, limitInputLength } from 'utils';

function CardExpirationDate() {
  const { state, dispatch } = useContext(CardInfoContext);

  const cardExpirationDate = { month: state.inputs.month, year: state.inputs.year };

  const setCardExpirationDate = (cardExpirationDate) =>
    dispatch({ type: 'SET_CARD_EXPIRATION_DATE', cardExpirationDate });

  const handleMonthInputBlur = (event) => {
    const { value } = event.target;

    const monthInput = value === String(MONTH.JANUARY) ? value.padStart(2, '0') : value;
    const newCardExpirationDate = { ...cardExpirationDate, month: monthInput };

    setCardExpirationDate(newCardExpirationDate);
  };

  const handleMonthInputChange = (event) => {
    const { value } = event.target;

    const monthInputNumberOnly = inputNumberOnly(value);

    const monthInputLengthSliced = limitInputLength(
      monthInputNumberOnly,
      LIMIT_LENGTH.EXPIRATION_DATE,
    );

    const monthInputPadded =
      monthInputLengthSliced >= MONTH.FEBRUARY && monthInputLengthSliced <= MONTH.SEPTEMBER
        ? monthInputLengthSliced.padStart(2, '0')
        : monthInputLengthSliced;

    const newCardExpirationDate = { ...cardExpirationDate, month: monthInputPadded };

    setCardExpirationDate(newCardExpirationDate);
  };

  const handleYearInputChange = (event) => {
    const { value } = event.target;

    const yearInputNumberOnly = inputNumberOnly(value);

    const yearInputLengthSliced = limitInputLength(
      yearInputNumberOnly,
      LIMIT_LENGTH.EXPIRATION_DATE,
    );

    const newCardExpirationDate = { ...cardExpirationDate, year: yearInputLengthSliced };

    setCardExpirationDate(newCardExpirationDate);
  };

  return (
    <div className="input-container">
      <span className="input-title">만료일</span>
      <div className="input-box w-50">
        <input
          name="month"
          className={`input-basic ${
            cardExpirationDate.month?.length === LIMIT_LENGTH.EXPIRATION_DATE &&
            cardExpirationDate.month !== '00' &&
            cardExpirationDate.month !== '0' &&
            cardExpirationDate.month >= MONTH.JANUARY &&
            cardExpirationDate.month <= MONTH.DECEMBER
              ? 'input-correct'
              : ''
          }`}
          type="number"
          placeholder="MM"
          onChange={handleMonthInputChange}
          onBlur={handleMonthInputBlur}
          value={cardExpirationDate.month}
          required
        />
        <input
          name="year"
          className={`input-basic ${
            cardExpirationDate.year?.length >= LIMIT_LENGTH.EXPIRATION_DATE ? 'input-correct' : ''
          }`}
          type="number"
          placeholder="YY"
          onChange={handleYearInputChange}
          value={cardExpirationDate.year}
          required
        />
      </div>
    </div>
  );
}

export default CardExpirationDate;
