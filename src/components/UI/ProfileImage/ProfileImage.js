import { createAvatar } from "@dicebear/avatars";
import * as style from "@dicebear/pixel-art";

const ProfileImage = (props) => {
  const avatar = createAvatar(style, { seed: props.seed });
  return (
    <img
      src={`data:image/svg+xml;base64,${btoa(avatar)}`}
      {...props}
      alt="profile"
      width={props.width || "50"}
      height={props.height || "50"}
    />
  );
};

export default ProfileImage;
