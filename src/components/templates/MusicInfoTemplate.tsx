import MusicInfoSection from '../organisms/MusicInfoSection';

interface Props {
  musics: IMusic[];
}

const MusicInfoTemplate: React.FC<Props> = ({ musics }) => {
  return <MusicInfoSection musics={musics} />;
};

export default MusicInfoTemplate;
