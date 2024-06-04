import * as React from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@mui/material"
import Slide from '@mui/material/Slide';
import Succes from './Succes';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


const AreYouSure = ({
    handleCloseModal,
    deletePost, openModal,
    handleAlertClick,
    handleCloseAlert,
    openAlert
}) => {

    return (
        <div>
            <Dialog
                open={openModal}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleCloseModal}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Delete Post!!"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Are you sure you want to delete this post
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseModal}>No</Button>
                    <Button onClick={() => {
                        deletePost(handleAlertClick);
                        handleCloseModal();
                    }}>Yes</Button>
                </DialogActions>
            </Dialog>

            <Succes
                handleCloseAlert={handleCloseAlert}
                openAlert={openAlert}
                message="Post deleted"
            />
        </div>
    )
}

export default AreYouSure;
