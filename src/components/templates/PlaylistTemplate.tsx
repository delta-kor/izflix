import PlaylistListSection from '../organisms/PlaylistListSection';

interface Props {
  playlists: IPlaylist[];
}

const PlaylistTemplate: React.FC<Props> = ({ playlists }) => {
  return <PlaylistListSection playlists={playlists} />;
};

export default PlaylistTemplate;
