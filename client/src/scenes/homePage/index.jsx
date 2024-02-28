import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "../navbar";
import UserWidget from "../widgets/UserWidget";
import MyPostWidget from "../widgets/MyPostWidget";
import PostsWidget from "../widgets/PostsWidget";
import AdvertWidget from "../widgets/AdvertWidget";
import FriendListWidget from "../widgets/FriendListWidget";

const HomePage = () => {
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
    const { _id, picturePath } = useSelector((state) => state.user);
    console.log(`UserId:${_id}`)
    console.log("Picture Path:",picturePath)

    return (
        <Box>
            <Navbar />
            <Box
                width="100%"
                padding="2rem 6%"
                display={isNonMobileScreens ? "flex" : "block"}
                gap="0.5rem"
                justifyContent="space-between"
                mt="8rem"
                

            >
                <Box flexBasis={isNonMobileScreens ? "26%" : undefined} position="fixed" left="1rem" display={isNonMobileScreens ? "flex" : "block"}>
                    <UserWidget userId={_id} picturePath={picturePath} />
                </Box>
                <Box
                    flexBasis={isNonMobileScreens ? "42%" : undefined}
                    mt={isNonMobileScreens ? undefined : "2rem"}
                    mx="auto"
                >
                    <MyPostWidget userId={_id} picturePath={picturePath} />
                    <PostsWidget userId={_id} />
                </Box>
                {isNonMobileScreens && (
                    <Box flexBasis="26%" position="fixed" right="1rem" maxWidth="28%">
                        <AdvertWidget />
                        <Box m="2rem 0" />
                        <FriendListWidget userId={_id} />
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default HomePage;