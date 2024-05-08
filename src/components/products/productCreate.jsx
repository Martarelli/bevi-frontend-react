// import axios from 'axios';
import axios from 'axios';
import { useState } from 'react'
import PropTypes from 'prop-types';  

function ProductCreate() {
    const [name, setName] = useState('');
    const [price, setPrice] = useState(undefined);
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState(undefined);
    const [stockQuantity, setStockQuantity] = useState(undefined);

    ProductCreate.propTypes = {
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        description: PropTypes.string.isRequired,
        status: PropTypes.number.isRequired,
        stockQuantity: PropTypes.number.isRequired,
    };

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            console.log(status);
            console.log(stockQuantity);
            console.log(price);
            const token = localStorage.getItem('access_token');
            const response = await axios.create({
              baseURL: 'http://34.71.240.100/api',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              }
            }).post('/product/create', {
                name: name,
                price: price,
                description: description,
                status: status,
                stock_quantity: stockQuantity
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

    return (
        <div className='w-100 d-flex flex-column align-items-center justify-content-center'>
            <h3>Cadastrar Produto</h3>
            <form className='w-100'>
                <div className="input-group input-group-sm mb-3 py-1 w-100">
                    <span className="input-group-text w-25" id="inputGroup-sizing-lg">Name</span>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        className="form-control"
                        placeholder="Nome do Produto"
                        aria-label="Name"
                    />
                </div>

                <div className="input-group input-group-sm mb-3 py-1 w-100">
                    <span className="input-group-text w-25" id="inputGroup-sizing-lg">Price</span>
                    <input
                        type="number"
                        name="price"
                        id="price"
                        value={price}
                        onChange={(event) => setPrice(event.target.value)}
                        className="form-control"
                        placeholder="Preço do Produto"
                        aria-label="Price"
                    />
                </div>

                <div className="input-group input-group-sm mb-3 py-1 w-100">
                    <span className="input-group-text w-25" id="inputGroup-sizing-lg">Description</span>
                    <input
                        type="text"
                        name="description"
                        id="description"
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                        className="form-control"
                        placeholder="Descrição do Produto"
                        aria-label="Description"
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
                    >
                        <option value="0" disabled defaultValue={0}>Selecione o Status</option>
                        <option value="1">Estoque</option>
                        <option value="2">Reposição</option>
                        <option value="3">Em falta</option>
                    </select>
                </div>

                <div className="input-group input-group-sm mb-3 py-1 w-100">
                    <span className="input-group-text w-25" id="inputGroup-sizing-lg">Stock Quantity</span>
                    <input
                        type="number"
                        name="stock_quantity"
                        id="stock_quantity"
                        value={stockQuantity}
                        onChange={(event) => setStockQuantity(event.target.value)}
                        className="form-control"
                        placeholder="Quantidade em Estoque"
                        aria-label="Stock Quantity"
                    />
                </div>
                    <button className="btn btn-primary d-flex w-100 align-items-center justify-content-center text-bold fs-5 p-2 my-3 fw-bold" type="button" onClick={handleSubmit}>Cadastrar</button>
            </form>
        </div>
    )
}

export default ProductCreate