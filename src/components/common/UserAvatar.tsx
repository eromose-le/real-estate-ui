import React from "react";

interface UserAvatarProps {
  className?: string;
  username?: string;
  alt: string;
  imageUrl?: string | null;
  [key: string]: any; // Allow any other additional props
}

const UserAvatar: React.FC<UserAvatarProps> = ({
  className,
  username,
  alt,
  imageUrl,
  ...restProps
}) => {
  
  const dynamicImageUrl = username
    ? `https://avatar.iran.liara.run/username?username=${encodeURIComponent(
        username
      )}`
    : "";

  return (
    <img
      className={className}
      src={imageUrl || dynamicImageUrl}
      alt={alt}
      {...restProps}
    />
  );
};

export default UserAvatar;
