interface Locale {
  ko: string;
  en: string;
}

interface Notice {
  id: string;
  title: Locale;
  content: Locale;
}

const Notice: Notice[] = [
  {
    id: '2',
    title: { ko: 'IZFLIX은 아이즈원 팬 사이트입니다', en: 'IZFLIX is fan site of IZ*ONE' },
    content: {
      ko: `IZFLIX은 아이즈원 팬 사이트입니다.  
IZFLIX을 통해서 어떠한 수익도 창출하지 않으며 금전적 후원을 받지 않습니다.  
트위터, 인스타그램 등에서의 사칭 계정에 유의하세요.

------
*2022. 12. 25.*   
*IZFLIX*`,
      en: `IZFLIX is fan site of IZ*ONE.  
IZFLIX does not make any profit and does not receive financial supportive.  
Be careful of impersonating accounts on Twitter, Instagram, etc.

------
*2022. 12. 25.*   
*IZFLIX*`,
    },
  },
  {
    id: '1',
    title: { ko: 'IZFLIX 2.0 업데이트 안내', en: 'IZFLIX 2.0 Update' },
    content: {
      ko: `IZFLIX 2.0 업데이트 안내  
IZFLIX가 새로운 버전으로 업데이트 되었어요.  
새롭게 달라진 IZFLIX를 사용해 보세요!

### VOD
아이즈원 츄, 히든스쿨 등 예능 방송 프로그램이 VOD 탭으로 이동했어요.

### 좋아요 표시
영상마다 좋아요 표시를 할 수 있어요.

### 재생목록 생성
원하는 영상을 모아 재생목록을 만들고, 다른 사람에게 공유 할 수 있어요.

### 달력
날짜별로 영상이 분류되었어요.

### 자막
일부 영상에 영어 자막을 이용할 수 있어요.

### 다국어 지원
이제 IZFLIX를 영어로 사용 할 수 있어요.

------
*2022. 12. 25.*   
*IZFLIX*`,
      en: `IZFLIX 2.0 Update  
IZFLIX has been updated to a new version.  
Try the new IZFLIX!

### VOD
Variety show programs such as IZ*ONE Chu and Hidden School have been moved to the VOD tab.

### Like
You can press 'like' button on every video.

### Playlist
You can select videos you want, make a playlist, and share them with others.

### Calendar
Videos are now categorized by date.

### Subtitles
English subtitles are available in some videos.

### Multilingual Support
You can use IZFLIX in English.

------
*2022. 12. 25.*   
*IZFLIX*`,
    },
  },
];

export default Notice;
