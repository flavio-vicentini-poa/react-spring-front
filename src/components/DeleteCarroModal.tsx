import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from '@mui/material';

interface DeleteConfirmationProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    id: any;
}

const DeleteItemConfirmationModal: React.FC<DeleteConfirmationProps> = ({open, onClose, onConfirm, id}) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Confirmação de Exclusão</DialogTitle>
            <DialogContent>
                <p>Excluindo carro de ID = {id}</p>
                <p> Você tem certeza que deseja excluir este carro? </p>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancelar
                </Button>
                <Button onClick={onConfirm} color="secondary">
                    Confirmar
                </Button>
            </DialogActions>
        </Dialog>
    );
};
export default DeleteItemConfirmationModal;