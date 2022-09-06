interface Props {
  action?: ApiResponse.Video.Action;
  onLike(): void;
}

const VideoAction: React.FC<Props> = ({ action, onLike }) => {
  const liked = action?.liked;
  const likesTotal = action?.likes_total;

  return (
    <div onClick={onLike}>
      {liked} {likesTotal}
    </div>
  );
};

export default VideoAction;
