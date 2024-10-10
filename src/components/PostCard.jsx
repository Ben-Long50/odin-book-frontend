const PostCard = (props) => {
  return (
    <div className="aspect-square overflow-hidden object-cover">
      <img
        className="timing cursor-pointer hover:opacity-60"
        src={props.image}
        alt="Post"
      />
    </div>
  );
};

export default PostCard;
