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
    id: '5',
    title: {
      ko: '서비스 중단 안내',
      en: 'Discontinuance of Service',
    },
    content: {
      ko: `서비스 중단 안내  
현재 영상 제공 서버의 트래픽이 예상을 크게 초과하여 일시적으로 사용이 중단되었습니다..  
따라서 당분간 장편 영상 (10분 이상) 및 일부 영상에 대해 서비스를 중단하게 되었습니다.  
  
현재 서비스 복구 작업을 위해 노력 중에 있으며,  
최대한 빠르게 서비스를 복구시키기 위해 노력하고 있습니다.  
  
추후 서비스 재개일정에 대해서는 별도로 공지드리겠습니다.  
감사합니다.
  
------
*2023. 02. 22.*  
*contact@izflix.net*`,
      en: `Discontinuance of Service  
The current video delivery server's traffic has exceeded expectations and is temporarily out of use.  
Therefore, for the time being, the service for videos (more than 10 minutes) will be discontinued.  
  
We are currently working on a service recovery effort.  
We are committed to recovering our services as quickly as possible.  
  
We will notify you about the resumption schedule of the service in the future.  
Thank you.  
  
------
*2023. 02. 22.*
*contact@izflix.net*`,
    },
  },
  {
    id: '4',
    title: {
      ko: '(복구 완료) 현재 일부 영상 재생이 제한되고 있습니다',
      en: '(Recovered) Playback of some videos is currently restricted',
    },
    content: {
      ko: `현재 일부 영상 재생이 제한되고 있습니다.  
해당 문제를 확인했으며, 복구 작업중에 있습니다.  
  
-----
12\\. 28\\. 13:10 - 아이즈원 츄 환상캠퍼스 복구 완료  
12\\. 28\\. 14:34 - 아이즈원 츄 ON:TACT 복구 완료  
12\\. 28\\. 15:07 - 아이즈원 츄 비밀친구 복구 완료  
12\\. 28\\. 15:28 - 아이즈원 츄 시즌 1 복구 완료  
  
------
*2022. 12. 28.*  
*contact@izflix.net*`,
      en: `Playback of some videos is currently restricted.  
The problem has been identified and is in the process of recovery.  
  
------
12\\. 28\\. 13:10 - IZ\\*ONE Chu Fantasy Campus Recovered  
12\\. 28\\. 14:34 - IZ\\*ONE Chu ON:TACT Recovered  
12\\. 28\\. 15:07 - IZ\\*ONE Chu Secret Friends Recovered  
12\\. 28\\. 15:28 - IZ\\*ONE Chu Season 1 Recovered  
  
------
*2022. 12. 28.*  
*contact@izflix.net*`,
    },
  },
  {
    id: '3',
    title: { ko: '버그 신고 / 기능 제안 / 문의', en: 'Bug report / Feature suggestions / Contact' },
    content: {
      ko: `버그 신고 / 기능 제안 / 문의  
**Email**: contact@izflix.net  
**Form**: [https://forms.gle/TcL8SBfZuSEjCMxbA](https://forms.gle/TcL8SBfZuSEjCMxbA)  

------
*2022. 12. 25.*  
*contact@izflix.net*`,
      en: `Bug report / Feature suggestions / Contact  
**Email**: contact@izflix.net  
**Form**: [https://forms.gle/TcL8SBfZuSEjCMxbA](https://forms.gle/TcL8SBfZuSEjCMxbA)  

------
*2022. 12. 25.*  
*contact@izflix.net*`,
    },
  },
  {
    id: '2',
    title: { ko: 'IZFLIX은 아이즈원 팬 사이트입니다', en: 'IZFLIX is fan site of IZ*ONE' },
    content: {
      ko: `IZFLIX은 아이즈원 팬 사이트입니다.  
IZFLIX을 통해서 어떠한 수익도 창출하지 않으며 금전적 후원을 받지 않습니다.  
트위터, 인스타그램 등에서의 사칭 계정에 유의하세요.

------
*2022. 12. 25.*   
*contact@izflix.net*`,
      en: `IZFLIX is fan site of IZ*ONE.  
IZFLIX does not make any profit and does not receive financial supportive.  
Be careful of impersonating accounts on Twitter, Instagram, etc.

------
*2022. 12. 25.*   
*contact@izflix.net*`,
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
*contact@izflix.net*`,
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
*contact@izflix.net*`,
    },
  },
];

export default Notice;
