import React, { useState } from 'react';

import Card from '../common/Card';
import PageTitle from '../common/PageTitle';
import NextPageButton from '../common/NextPageButton';

import CardInputForm from './CardAddPageComponents/CardInputForm';
import CardNumber from './CardAddPageComponents/CardNumber';
import CardExpirationDate from './CardAddPageComponents/CardExpirationDate';
import CardOwner from './CardAddPageComponents/CardOwner';
import CVC from './CardAddPageComponents/CVC';
import CardPassword from './CardAddPageComponents/CardPassword';
import PrevPageButton from './CardAddPageComponents/PrevPageButton';

function CardAddPage(props) {
  const [cardNumbers, setCardNumbers] = useState({
    number1: '',
    number2: '',
    number3: '',
    number4: '',
    month: '',
    year: '',
    owner: '',
    cvc: '',
    password1: '',
    password2: '',
  });

  const handleOnChange = (event) => {
    const { value, name } = event.target;
    setCardNumbers({
      ...cardNumbers,
      [name]: value,
    });

    console.log(cardNumbers);
  };

  return (
    <div className="app">
      <PrevPageButton />
      <PageTitle title="카드추가" />
      <Card isEmpty={false} cardNumbers={cardNumbers} />
      {/* 카드 번호  */}
      <CardInputForm>
        <CardNumber cardNumbers={cardNumbers} setCardNumbers={setCardNumbers} />
        {/* 만료일 */}
        <CardExpirationDate cardNumbers={cardNumbers} setCardNumbers={setCardNumbers} />
        {/* 카드 소유자 이름 */}
        <CardOwner cardNumbers={cardNumbers} setCardNumbers={setCardNumbers} />
        {/* 보안 코드  */}
        <CVC cardNumbers={cardNumbers} setCardNumbers={setCardNumbers} />
        {/* 카드 비밀번호 */}
        <CardPassword cardNumbers={cardNumbers} setCardNumbers={setCardNumbers} />
        {/* 다음 버튼  */}
        <NextPageButton text="다음" />
      </CardInputForm>
    </div>
  );
}

export default CardAddPage;
