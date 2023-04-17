type Props = {
  isOnline: string;
  image: string;
};

const Avatar = ({ image }: Props) => {
  return (
    <div className="avatar">
      <div className="avatar-img">
        <img src={image} alt="#" />
      </div>
      {/* <span className={`isOnline ${isOnline}`} /> */}
    </div>
  );
};

export default Avatar;
