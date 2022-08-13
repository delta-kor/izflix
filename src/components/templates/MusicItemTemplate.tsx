import MusicItemSection from '../organisms/MusicItemSection';

interface Props {
  musics: IMusic[];
}

const MusicItemTemplate: React.FC<Props> = ({ musics }) => {
  return <MusicItemSection musics={musics} />;
};

export default MusicItemTemplate;
