import {Box, Button, TextField} from '@mui/material';
import {Formik} from 'formik';
import * as yup from 'yup';
import useMediaQuery from '@mui/material/useMediaQuery';
import Header from '../../components/Header';
import {useEffect, useState} from 'react';
import CarroService from '../../services/Carro';
import {useNavigate, useParams} from 'react-router-dom';
import toast from 'react-hot-toast';
import {Carro} from '../../model/carro';

const FormEditCarro = () => {
    const isNonMobile = useMediaQuery('(min-width:600px)');
    const navigate = useNavigate();

    const carroService = new CarroService();
    const [carro, setCarro] = useState<Carro>();
    const {id} = useParams<{ id: string }>();

    const handleFormSubmit = (values: Carro) => {
        if (!id) {
            toast.error(`Carro com ID = ${id} não encontrado.`);
            return;
        } else {
            carroService.update(id, values).then((response) => {
                toast.success('Carro editado com sucesso.');
                navigate('/carros');
            }).catch((error) => {
                toast.error('Error ao editar o carro.');
                navigate('/carros');
            });
        }
    };

    useEffect(() => {
            if (!id) {
                toast.error(`Carro com ID = ${id} não encontrado.`);
                return;
            } else {
                carroService.getById(id).then((response) => {
                    setCarro(response.data);
                });
            }
        }
        , []);

    const initialValues = {
        modelo: carro?.modelo || '',
        fabricante: carro?.fabricante || '',
        ano: carro?.ano || 2020,
        cor: carro?.cor || '',
        cavalosDePotencia: carro?.cavalosDePotencia || 150,
        pais: carro?.pais || 'Brasil',
    };

    return (
        <Box m="20px">
            <Header title="Editar Carro" subtitle="Alterando os valores do carro"/>
            {carro?.modelo && (
                <Formik
                    onSubmit={handleFormSubmit}
                    initialValues={initialValues}
                    validationSchema={checkoutSchema}
                >
                    {({
                          values,
                          errors,
                          touched,
                          handleBlur,
                          handleChange,
                          handleSubmit,
                      }) => (
                        <form onSubmit={handleSubmit}>
                            <Box
                                display="grid"
                                gap="30px"
                                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                                sx={{
                                    '& > div': {gridColumn: isNonMobile ? undefined : 'span 4'},
                                }}
                            >
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Modelo"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.modelo}
                                    name="modelo"
                                    error={!!touched.modelo && !!errors.modelo}
                                    helperText={touched.modelo && errors.modelo}
                                    sx={{gridColumn: 'span 4'}}
                                />
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Fabricante"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.fabricante}
                                    name="fabricante"
                                    error={!!touched.fabricante && !!errors.fabricante}
                                    helperText={touched.fabricante && errors.fabricante}
                                    sx={{gridColumn: 'span 4'}}
                                />

                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="number"
                                    label="Ano"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.ano}
                                    name="ano"
                                    error={!!touched.ano && !!errors.ano}
                                    helperText={touched.ano && errors.ano}
                                    sx={{gridColumn: 'span 2'}}
                                />
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Cor"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.cor}
                                    name="cor"
                                    error={!!touched.cor && !!errors.cor}
                                    helperText={touched.cor && errors.cor}
                                    sx={{gridColumn: 'span 2'}}
                                />

                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="number"
                                    label="Cavalos de Potência"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.cavalosDePotencia}
                                    name="cavalosDePotencia"
                                    error={!!touched.cavalosDePotencia && !!errors.cavalosDePotencia}
                                    helperText={touched.cavalosDePotencia && errors.cavalosDePotencia}
                                    sx={{gridColumn: 'span 2'}}
                                />
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="País"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.pais}
                                    name="pais"
                                    error={!!touched.pais && !!errors.pais}
                                    helperText={touched.pais && errors.pais}
                                    sx={{gridColumn: 'span 2'}}
                                />
                            </Box>
                            <Box display="flex" justifyContent="end" mt="20px">
                                <Button type="submit" color="secondary" variant="contained">
                                    Salvar
                                </Button>
                            </Box>
                        </form>
                    )}
                </Formik>
            )}
        </Box>
    );
};

const checkoutSchema = yup.object().shape({
    modelo: yup.string().required('required'),
    fabricante: yup.string().required('required'),
    ano: yup.number().required('required'),
    cor: yup.string().required('required'),
    cavalosDePotencia: yup.number().required('required'),
    pais: yup.string().required('required'),
});

export default FormEditCarro;
