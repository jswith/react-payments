import { useContext } from 'react';
import { CardInfoContext } from 'contexts/CardInfoContextProvider';

import { ERROR_MESSAGE } from 'constants';
import { useNavigate } from 'react-router-dom';

function CardInputForm({ children }) {
  const { state, dispatch } = useContext(CardInfoContext);

  const navigate = useNavigate();

  const { number1, number2, number3, number4, month, year, cvc } = state.inputs;

  const validator = (conditions) => {
    conditions.forEach(({ checker, errorMsg }) => {
      if (checker()) throw new Error(errorMsg);
    });
  };

  const checkCardNumber = (number1, number2, number3, number4) => {
    return number1.length < 4 || number2.length < 4 || number3.length < 4 || number4.length < 4;
  };

  const checkMonth = (month) => {
    return Number(month) > 12 || Number(month) < 1;
  };

  const checkYear = (year) => {
    return Number(year) < 22;
  };

  const checkMonthAndYear = (month, year) => {
    const date = new Date();
    const currentMonth = date.getMonth() + 1;
    const currentYear = Number(date.getFullYear().toString().slice(2, 4));

    return Number(month) < currentMonth && Number(year) === currentYear;
  };

  const checkCVC = (cvc) => {
    return cvc.length < 3;
  };

  const checkCardInfo = ({ number1, number2, number3, number4, month, year, cvc }) => {
    validator([
      {
        checker: () => checkCardNumber(number1, number2, number3, number4),
        errorMsg: ERROR_MESSAGE.CARD_NUMBER,
      },
      {
        checker: () => checkMonth(month),
        errorMsg: ERROR_MESSAGE.MONTH,
      },
      {
        checker: () => checkYear(year),
        errorMsg: ERROR_MESSAGE.YEAR,
      },
      {
        checker: () => checkMonthAndYear(month, year),
        errorMsg: ERROR_MESSAGE.MONTH_AND_YEAR,
      },
      {
        checker: () => checkCVC(cvc),
        errorMsg: ERROR_MESSAGE.CVC,
      },
    ]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      checkCardInfo({ number1, number2, number3, number4, month, year, cvc });

      dispatch({ type: 'SET_CARD_INPUT_VALID', boolean: true });

      navigate('/card-name');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <form className="card-input-form" onSubmit={handleSubmit}>
      {children}
    </form>
  );
}

export default CardInputForm;
