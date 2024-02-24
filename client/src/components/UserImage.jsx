import { Box } from "@mui/material";

const UserImage = ({image, size="60px"}) => {
    return (
    <Box width={size} height={size}>
        <img 
        style={{ objectFit: 'cover', borderRadius: "50%"}}
        width={size} height={size}
        alt="user"
        src={`http://kairos-opal.vercel.app/assets/${image}`}
        />
    </Box>
)}

export default UserImage
