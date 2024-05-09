// import axios from 'axios';
import axios from 'axios';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";  
import { yupResolver } from "@hookform/resolvers/yup";
import { object , string, number }  from 'yup';
import Loading from '../loading/loading';

const schema = object({
    name: string().required("Nome é um campo obrigatório.").min(2,"Mínimo 2 caracteres."),
    price: number().transform((value, originalValue) => {
        return originalValue === '' ? null : value;
      }).required("Preço é um campo obrigatório.").moreThan(0, "Preço deve ser maior que 0."),
    description: string().required("Descrição é um campo obrigatório."),
    status: number().required("Status é um campo obrigatório.").min(1, "Selecione uma opção válida.").max(3,"Selecione uma opção válida."),
    stock_quantity: number().transform((value, originalValue) => {
        return originalValue === '' ? null : value;
      }).required("Qtde Estoque é um campo obrigatório.").min(0),
})

function ProductEdit({id}) {
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState(0);
    const [stockQuantity, setStockQuantity] = useState(0);
    const [isOpenLoading, setIsOpenLoading] = useState(true);

    ProductEdit.propTypes = {
        id: PropTypes.number.isRequired,
    };

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({resolver: yupResolver(schema)});

    async function getDataById() {
        try {
            const token = localStorage.getItem('access_token');
            const response = await axios.create({
              baseURL: 'http://34.71.240.100/api',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              }
            }).get(`/product/read?id=${id}`);
            console.log(response);
            setName(response.data.data.name);
            setPrice(response.data.data.price);
            setDescription(response.data.data.description);
            setStatus(response.data.data.status);
            setStockQuantity(response.data.data.stock_quantity);
            reset();
            setIsOpenLoading(false);
            } catch (error) {
                alert('Ocorreu um erro ao processar sua requisição...\n' + error.message);
                console.log('Error fetching data: ' + error.message);
                console.log(error);
            }
    }

    async function onSubmit(data) {
        console.log(data);
        try {
            const token = localStorage.getItem('access_token');
            console.log(id);
            const response = await axios.create({
              baseURL: 'http://34.71.240.100/api',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              }
            })
            .put('/product/update', {
                id: id,
                name: name,
                price: price,
                description: description,
                status: status,
                stock_quantity: stockQuantity
            });
            console.log(response);
            setTimeout(() => {
            window.location.reload();   
            }, 500);
            } catch (error) {
                alert('Ocorreu um erro ao processar sua requisição...\n' + error.message);
                console.log('Error fetching data: ' + error.message);
                console.log(error);
            }
    }

    useEffect(() => {
        getDataById();
    },[])

    return (
        <div className='w-100 d-flex flex-column align-items-center justify-content-center'>
            <Loading isOpen={isOpenLoading}/>
            <h3>Editar Produto</h3>
            <form className='w-100 d-flex flex-column gap-2' onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <div className="input-group input-group-sm w-100">
                        <span className="input-group-text w-25">Nome</span>
                        <input
                            type="text"
                            {...register("name")}
                            id="name"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            className="form-control"
                            placeholder="Nome do Produto"
                            aria-label="Name"
                        />
                    </div>
                    <span className='error__message'>{errors?.name?.message}</span>
                </div>

                <div>
                    <div className="input-group input-group-sm w-100">
                        <span className="input-group-text w-25">Preço</span>
                        <input
                            type="number"
                            {...register("price")}
                            id="price"
                            value={price}
                            onChange={(event) => setPrice(event.target.value)}
                            className="form-control"
                            placeholder="Preço do Produto"
                            aria-label="Price"
                        />
                    </div>
                    <span className='error__message'>{errors?.price?.message}</span>
                </div>

                <div>
                    <div className="input-group input-group-sm  w-100">
                        <span className="input-group-text w-25">Descrição</span>
                        <input
                            type="text"
                            {...register("description")}
                            id="description"
                            value={description}
                            onChange={(event) => setDescription(event.target.value)}
                            className="form-control"
                            placeholder="Descrição do Produto"
                            aria-label="Description"
                        />
                    </div>
                    <span className='error__message'>{errors?.description?.message}</span>
                </div>

                <div>
                    <div className="input-group input-group-sm w-100">
                        <label className="input-group-text w-25" htmlFor="status">Status</label>
                        <select
                            id="status"
                            {...register("status")}
                            value={status}
                            onChange={(event) => {setStatus(event.target.value)}}
                            className="form-select"
                            aria-label="Status"
                        >
                            <option value={0} disabled >Selecione o Status</option>
                            <option value={1}>Estoque</option>
                            <option value={2}>Reposição</option>
                            <option value={3}>Em falta</option>
                        </select>
                    </div>
                    <span className='error__message'>{errors?.status?.message}</span>
                </div>

                <div>
                    <div className="input-group input-group-sm w-100">
                        <span className="input-group-text w-25">Estoque</span>
                        <input
                            type="number"
                            {...register("stock_quantity")}
                            id="stock_quantity"
                            value={stockQuantity}
                            onChange={(event) => setStockQuantity(event.target.value)}
                            className="form-control"
                            placeholder="Quantidade em Estoque"
                            aria-label="Stock Quantity"
                        />
                    </div>
                    <span className='error__message'>{errors?.stock_quantity?.message}</span>
                </div>
            
                <button className="btn btn-primary d-flex w-100 align-items-center justify-content-center text-bold fs-5 mb-2 fw-bold" type="submit">Confirmar Edição</button>
            </form>
        </div>
    )
}

export default ProductEdit;