import { useEffect, useState } from 'react';
import Meta from '../components/Meta';
import VodTemplate from '../components/templates/VodTemplate';
import HttpException from '../exceptions/http-exception';
import Evoke from '../filters/evoke';
import useModal from '../hooks/useModal';
import delay from '../services/delay';
import Spaceship from '../services/spaceship';
import Page from './Page';

const VodPage: React.FC = () => {
  const modal = useModal();

  const [featured, setFeatured] = useState<ApiResponse.Playlist.ReadFeatured | null>(null);
  const [playlists, setPlaylists] = useState<IPlaylist[]>([]);

  useEffect(() => {
    modal({
      type: 'text',
      content: `현재 일부 영상의 재생이 제한되고 있습니다. 자세한 내용은 공지를 참고해주세요.\nPlayback of some videos is currently restricted. Please be advised to the notice for details.`,
    });

    loadData();
  }, []);

  const loadFeatured = async () => {
    const response = await Spaceship.readFeatured('vod');
    if (!response.ok) throw new HttpException(response);

    setFeatured(response);
  };

  const loadPlaylists = async () => {
    const response = await Spaceship.readAllPlaylists('vod');
    if (!response.ok) throw new HttpException(response);

    const playlists = response.playlists;
    setPlaylists(playlists);
  };

  const loadData = async () => {
    await delay(200);
    new Evoke(loadFeatured());
    new Evoke(loadPlaylists());
  };

  return (
    <Page>
      <Meta data={{ title: `VOD - IZFLIX`, url: 'https://izflix.net/vod' }} />
      <VodTemplate featured={featured} playlists={playlists} />
    </Page>
  );
};

export default VodPage;
