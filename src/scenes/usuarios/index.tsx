import {Box, CircularProgress, useTheme} from '@mui/material';
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import {tokens} from '../../theme';
import Header from '../../components/Header';
import {useEffect, useState} from 'react';
import UsuarioService from '../../services/Usuario';
import {Usuario} from '../../model/usuario';
import toast from 'react-hot-toast';

const Usuarios = () => {
    const theme = useTheme();
    const [loading, setLoading] = useState<boolean>(true);
    const colors = tokens(theme.palette.mode);
    const columns: GridColDef[] = [
        {
            field: 'id',
            headerName: 'ID',
            flex: 0.05,
            type: 'number',
        },
        {
            field: 'nome',
            headerName: 'Nome',
            flex: 1,
            type: 'string'
        },
        {
            field: 'cargo',
            headerName: 'Cargo',
            flex: 1,
            type: 'string'
        },
        {
            field: 'email',
            headerName: 'Email',
            flex: 1,
            type: 'string'
        },
    ];

    const usuarioService = new UsuarioService();
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);

    useEffect(() => {
        setLoading(true);
        usuarioService.getAll()
            .then((response) => {
                setUsuarios(response.data);
            })
            .catch(() => {
                toast.error('Não foi possível carregar os dados.');
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return (
        <Box m="20px">
            <Header title="USUÁRIOS" subtitle="Membros de sua equipe"/>
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
                }}
            >
                {loading ? (
                    <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                        <CircularProgress/>
                    </Box>
                ) : (
                    <DataGrid rows={usuarios} columns={columns}/>
                )}

            </Box>
        </Box>
    );
};

export default Usuarios;
