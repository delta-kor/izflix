import Transmitter from './transmitter';

export default async function getTicket() {
  try {
    if (process.env.NODE_ENV === 'development') {
      return process.env.REACT_APP_TICKET;
    }

    const url = process.env.REACT_APP_TICKET_BASE! + '/book';
    const response = await fetch(url);
    const data = await response.json();

    if (!data.ok) throw new Error();

    return data.ticket;
  } catch (e) {
    Transmitter.emit('popup', {
      type: 'error',
      message: '서버 사용량이 많아 접속이 지연되고 있습니다\n잠시후 다시 시도해주세요',
    });
  }
}
