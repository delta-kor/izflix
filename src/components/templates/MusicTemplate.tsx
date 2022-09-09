import AlbumSection from '../organisms/AlbumSection';

interface Props {
  albums: IAlbum[];
}

const MusicTemplate: React.FC<Props> = ({ albums }) => {
  return <AlbumSection albums={albums} />;
};

export default MusicTemplate;
