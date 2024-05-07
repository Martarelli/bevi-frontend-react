import Header from '../../components/header/header'
import { useEffect, useState } from 'react';
import ProductList from '../../components/products/productList';
import axios from 'axios';
import Modal from '../../components/modal/modal';
import ProductCreate from '../../components/products/productCreate';

function Dashboard() {
  const [products, setProducts] = useState([]);
  const [isOpenCreate, setIsOpenCreate] = useState(false);

  async function getData() {
    try {
      const token = localStorage.getItem('access_token');
      const response = await axios.create({
        baseURL: 'http://34.71.240.100/api',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }).post('/product/list')
      setProducts(response.data.data);
    } catch (error) {
      alert('Ocorreu um erro ao processar sua requisição...\nASASError fetching data: ' + error.message);
      console.log('Error fetching data: ' + error.message);
      console.log(error);
    }
  }

  useEffect(() => {
      getData()
  },[])

  return (
    <div>
      <Header/>
      <div className="container py-2">
        <div className="d-flex py-3 w-100 justify-content-between">
          <h1>Listagem dos Produtos</h1> 
          <button type="button" className="btn btn-success" onClick={() => {setIsOpenCreate(!isOpenCreate)
          }}> 
            <span className="fw-bold">+ </span> 
            Adicionar Produto
          </button>
        </div>
        <ProductList products={products}/>
        <Modal isOpen={isOpenCreate}>
          <ProductCreate/>
          <button className="btn btn-danger d-flex w-100 align-items-center justify-content-center text-bold fs-5 p-3 my-3 fw-bold" type="button" onClick={() => {setIsOpenCreate(!isOpenCreate)
          }}>Cancelar</button>
        </Modal>
      </div>
    </div>
  )
}

export default Dashboard
