// import axios from 'axios';
import axios from 'axios';
import { useState } from 'react'

function ProductCreate() {
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState(1);
    const [stockQuantity, setStockQuantity] = useState(0);

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
        <div>
            <h3>Cadastrar Produto</h3>
            <form>
                <div className="input-group input-group-lg py-3 w-100">
                    <span className="input-group-text w-25" id="inputGroup-sizing-lg">Name</span>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        className="form-control"
                        placeholder="Name"
                        aria-label="Name"
                    />
                </div>

                <div className="input-group input-group-lg py-3 w-100">
                    <span className="input-group-text w-25" id="inputGroup-sizing-lg">Price</span>
                    <input
                        type="number"
                        name="price"
                        id="price"
                        value={price}
                        onChange={(event) => setPrice(event.target.value)}
                        className="form-control"
                        placeholder="Price"
                        aria-label="Price"
                    />
                </div>

                <div className="input-group input-group-lg py-3 w-100">
                    <span className="input-group-text w-25" id="inputGroup-sizing-lg">Description</span>
                    <input
                        type="text"
                        name="description"
                        id="description"
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                        className="form-control"
                        placeholder="Description"
                        aria-label="Description"
                    />
                </div>

                <div className="input-group input-group-lg py-3 w-100">
                    <label className="input-group-text w-25" htmlFor="status">Status</label>
                    <select
                        id="status"
                        name="status"
                        value={status}
                        onChange={(event) => {setStatus(event.target.value)}}
                        className="form-select"
                        aria-label="Status"
                    >
                        <option value="1">Estoque</option>
                        <option value="2">Reposição</option>
                        <option value="3">Em falta</option>
                    </select>
                </div>

                <div className="input-group input-group-lg py-3 w-100">
                    <span className="input-group-text w-25" id="inputGroup-sizing-lg">Stock Quantity</span>
                    <input
                        type="number"
                        name="stock_quantity"
                        id="stock_quantity"
                        value={stockQuantity}
                        onChange={(event) => setStockQuantity(event.target.value)}
                        className="form-control"
                        placeholder="Stock Quantity"
                        aria-label="Stock Quantity"
                    />
                </div>
                    <button className="btn btn-primary d-flex w-100 align-items-center justify-content-center text-bold fs-5 p-3 my-3 fw-bold" type="button" onClick={handleSubmit}>Cadastrar</button>
            </form>
        </div>
    )
}

export default ProductCreate