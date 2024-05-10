
import axios from 'axios';
import { useState } from 'react'
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { object , string, number }  from 'yup'

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

function ProductCreate() {
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState(0);
    const [stockQuantity, setStockQuantity] = useState(0);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({resolver: yupResolver(schema)});

    async function onSubmit(data) {
        try {
            const token = localStorage.getItem('access_token');
            const response = await axios.create({
              baseURL: 'http://34.71.240.100/api',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              }
            }).post('/product/create', data)
            console.log(response);
            setTimeout(() => {
            window.location.reload();   
            }, 500);
            } catch (error) {
                alert('Ocorreu um erro ao processar sua requisição...\n' + error.message)
                console.log('Error fetching data: ' + error.message);
                console.log(error);
            }
    }

    return (
        <div className='w-100 d-flex flex-column align-items-center justify-content-center'>
            <h3>Cadastrar Produto</h3>
            <form className='w-100 d-flex flex-column gap-2' onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <div className="input-group input-group-sm w-100">
                        <span className="input-group-text w-25">Nome</span>
                        <input
                            type="text"
                            {...register("name")}
                            id="name"
                            value={name}
                            onInput={(event) => setName(event.target.value)}
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
                            onInput={(event) => setPrice(event.target.value)}
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
                            onInput={(event) => setDescription(event.target.value)}
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
                            onInput={(event) => {setStatus(event.target.value)}}
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
                            onInput={(event) => setStockQuantity(event.target.value)}
                            className="form-control"
                            placeholder="Quantidade em Estoque"
                            aria-label="Stock Quantity"
                        />
                    </div>
                    <span className='error__message'>{errors?.stock_quantity?.message}</span>
                </div>
            
                <button className="btn btn-primary d-flex w-100 align-items-center justify-content-center text-bold fs-5 mb-2 fw-bold" type="submit">Cadastrar</button>
            </form>
        </div>
    )
}

export default ProductCreate