import MusicItemSection from '../organisms/MusicItemSection';

interface Props {
  musics: IMusic[];
  selected?: string;
}

const MusicItemTemplate: React.FC<Props> = ({ musics, selected }) => {
  return <MusicItemSection musics={musics} selected={selected} />;
};

export default MusicItemTemplate;
