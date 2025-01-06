import {Box, Button, CircularProgress} from '@mui/material';
import {DataGrid, GridToolbar} from '@mui/x-data-grid';
import {tokens} from '../../theme';
import Header from '../../components/Header';
import {useTheme} from '@mui/material';
import {useEffect, useState} from 'react';
import CarroService from '../../services/Carro';
import {useNavigate} from 'react-router-dom';
import toast from 'react-hot-toast';
import DeleteItemConfirmationModal from '../../components/DeleteCarroModal';
import {Carro} from '../../model/carro';

const Carros = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [loading, setLoading] = useState<boolean>(true);

    const [carros, setCarros] = useState<Carro[]>([]);

    const carroService = new CarroService();
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        carroService.getAllPaginated(0, 100).then((response) => {
            setCarros(response.data);
        }).catch((error) => {
            toast.error('Error ao carregar os dados.');
        }).finally(() => {
            setLoading(false);
        });
    }, []);

    const handleEdit = (id: string) => {
        navigate('/form-edit-carro/' + id, {state: {mode: 'update'}});
    };

    // Delete Handlers
    const [idCarroDelete, setIdCarroDelete] = useState<string>('');
    const [openModalDelete, setOpenModalDelete] = useState(false); // variavel de controle de abertura do modal

    const handleDelete = (id: string) => {
        setIdCarroDelete(id);
        setOpenModalDelete(true);
    };

    const handleCloseDelete = () => {
        setOpenModalDelete(false);
    };

    const handleConfirmDelete = () => {
        carroService.delete(idCarroDelete).then((response) => {
            carroService.getAllPaginated(0, 100).then((response) => {
                setCarros(response.data);
                toast.success(`Carro de ID = ${idCarroDelete} excluído.`);
                setOpenModalDelete(false);
            });
        }).catch((error) => {
            toast.error(`Não foi possível excluir o carro selecionado.`);
            setOpenModalDelete(false);
        });
    };

    const columns = [
        {field: 'id', headerName: 'ID', flex: 0.5},
        {field: 'modelo', headerName: 'Modelo', flex: 1},
        {field: 'ano', headerName: 'Ano', flex: 1},
        {field: 'cor', headerName: 'Cor', flex: 1},
        {field: 'cavalosDePotencia', headerName: 'Cavalos de Potência', flex: 1},
        {field: 'fabricante', headerName: 'Fabricante', flex: 1},
        {field: 'pais', headerName: 'País', flex: 1},
        {
            field: 'actions',
            headerName: 'Actions',
            flex: 1,
            renderCell: (params: any) => (
                <Box>
                    <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={() => handleEdit(params.row.id)}
                        style={{marginRight: 8}}
                    >
                        Edit
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        size="small"
                        onClick={() => handleDelete(params.row.id)}
                    >
                        Delete
                    </Button>
                </Box>
            ),
        },
    ];

    return (
        <Box m="20px">
            <Header
                title="CARROS"
                subtitle="Lista de carros cadastrados"
            />
            <Button
                variant="contained"
                color="info"
                size="small"
                onClick={() => {
                    navigate('/form-novo-carro');
                }}
            >
                Adicionar Carro
            </Button>
            <Box
                m="40px 0 0 0"
                height="75vh"
                sx={{
                    '& .MuiDataGrid-root': {
                        border: 'none',
                    },
                    '& .MuiDataGrid-cell': {
                        borderBottom: 'none',
                    },
                    '& .name-column--cell': {
                        color: colors.greenAccent[300],
                    },
                    '& .MuiDataGrid-columnHeaders': {
                        backgroundColor: colors.blueAccent[700],
                        borderBottom: 'none',
                    },
                    '& .MuiDataGrid-virtualScroller': {
                        backgroundColor: colors.primary[400],
                    },
                    '& .MuiDataGrid-footerContainer': {
                        borderTop: 'none',
                        backgroundColor: colors.blueAccent[700],
                    },
                    '& .MuiCheckbox-root': {
                        color: `${colors.greenAccent[200]} !important`,
                    },
                    '& .MuiDataGrid-toolbarContainer .MuiButton-text': {
                        color: `${colors.grey[100]} !important`,
                    },
                }}
            >
                {loading ? (
                    <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                        <CircularProgress/>
                    </Box>
                ) : (
                    <DataGrid
                        rows={carros}
                        columns={columns}
                        components={{Toolbar: GridToolbar}}
                    />
                )
                }
            </Box>

            <DeleteItemConfirmationModal
                open={openModalDelete}
                onClose={handleCloseDelete}
                onConfirm={handleConfirmDelete}
                id={idCarroDelete}
            />
        </Box>
    );
};

export default Carros;
