import axios from 'axios';
import { useEffect, useState } from 'react'
import PropTypes from 'prop-types';  

function ProductDelete({id}) {
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState(0);
    const [stockQuantity, setStockQuantity] = useState(0);

    ProductDelete.propTypes = {
        id: PropTypes.number.isRequired,
        name: PropTypes.string,
        price: PropTypes.number,
        description: PropTypes.string,
        status: PropTypes.number,
        stockQuantity: PropTypes.number,
    };

    async function getDataById() {
        try {
            const token = localStorage.getItem('access_token');
            const response = await axios.create({
              baseURL: 'http://34.71.240.100/api',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              }
            }).get(`/product/read?id=${id}`)
            console.log(response);
            setName(response.data.data.name);
            setPrice(response.data.data.price);
            setDescription(response.data.data.description);
            setStatus(response.data.data.status);
            setStockQuantity(response.data.data.stock_quantity);
            } catch (error) {
                alert('Ocorreu um erro ao processar sua requisição...\n' + error.message)
                console.log('Error fetching data: ' + error.message);
                console.log(error);
            }
    }

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            const token = localStorage.getItem('access_token');
            console.log(id);
            const response = await axios.create({
              baseURL: 'http://34.71.240.100/api',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              }
            }).delete('/product/delete', {
                data:{id}
            })
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

    useEffect(() => {
        getDataById();
    },[])

    return (
        <div className='w-100 d-flex flex-column align-items-center justify-content-center'>
            <h3>Deletar Produto?</h3>
            <form className='w-100'>
                <div className="input-group input-group-sm mb-3 py-1 w-100">
                    <span className="input-group-text w-25" id="inputGroup-sizing-lg">Nome</span>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        className="form-control"
                        placeholder="Nome do Produto"
                        aria-label="Name"
                        disabled
                    />
                </div>

                <div className="input-group input-group-sm mb-3 py-1 w-100">
                    <span className="input-group-text w-25" id="inputGroup-sizing-lg">Preço</span>
                    <input
                        type="number"
                        name="price"
                        id="price"
                        value={price}
                        onChange={(event) => setPrice(event.target.value)}
                        className="form-control"
                        placeholder="Preço do Produto"
                        aria-label="Price"
                        disabled
                    />
                </div>

                <div className="input-group input-group-sm mb-3 py-1 w-100">
                    <span className="input-group-text w-25" id="inputGroup-sizing-lg">Descrição</span>
                    <input
                        type="text"
                        name="description"
                        id="description"
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                        className="form-control"
                        placeholder="Descrição do Produto"
                        aria-label="Description"
                        disabled
                    />
                </div>

                <div className="input-group input-group-sm mb-3 py-1 w-100">
                    <label className="input-group-text w-25" htmlFor="status">Status</label>
                    <select
                        id="status"
                        name="status"
                        value={status}
                        onChange={(event) => {setStatus(event.target.value)}}
                        className="form-select"
                        aria-label="Status"
                        disabled
                    >
                        <option value="0" disabled defaultValue={0}>Selecione o Status</option>
                        <option value="1">Estoque</option>
                        <option value="2">Reposição</option>
                        <option value="3">Em falta</option>
                    </select>
                </div>

                <div className="input-group input-group-sm mb-3 py-1 w-100">
                    <span className="input-group-text w-25" id="inputGroup-sizing-lg">Estoque</span>
                    <input
                        type="number"
                        name="stock_quantity"
                        id="stock_quantity"
                        value={stockQuantity}
                        onChange={(event) => setStockQuantity(event.target.value)}
                        className="form-control"
                        placeholder="Quantidade em Estoque"
                        aria-label="Stock Quantity"
                        disabled
                    />
                </div>
                    <button className="btn btn-primary d-flex w-100 align-items-center justify-content-center text-bold fs-5 p-2 my-3 fw-bold" type="button" onClick={handleSubmit}>Confirmar</button>
            </form>
        </div>
    )
}

export default ProductDelete