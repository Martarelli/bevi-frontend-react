import axios from 'axios';
import { useEffect, useState } from 'react';
import Header from '../../components/header/header';
import ProductList from '../../components/products/productList';
import Loading from '../../components/loading/loading';
import Modal from '../../components/modal/modal';
import ProductCreate from '../../components/products/productCreate';
import '../../styles/dashboard.css';

function Dashboard() {
  const [products, setProducts] = useState([]);
  const [isOpenLoading, setIsOpenLoading] = useState(true);
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
      }).post('/product/list');
      setProducts(response.data.data);
      setIsOpenLoading(false);
    } catch (error) {
      alert('Ocorreu um erro ao processar sua requisição...\nError fetching data: ' + error.message);
      console.log('Error fetching data: ' + error.message);
      console.log(error);
    }
  }

  useEffect(() => {
      getData();
  },[])

  return (
    <div>
      <Loading isOpen={isOpenLoading}/>
      <Header/>
      <div className="div__dashboard px-5 py-3">
        <div className="d-flex py-3 w-100 justify-content-between">
          <h1 className='title__text'>Listagem dos Produtos</h1> 
          <button type="button" className="btn btn-success" onClick={() => {setIsOpenCreate(!isOpenCreate)
          }}> 
            Adicionar Produto
          </button>
        </div>
        <div className="div__table">
          <ProductList products={products}/>
          <Modal isOpen={isOpenCreate}>
            <ProductCreate />
            <button className="btn btn-danger d-flex w-100 align-items-center justify-content-center text-bold fs-5 p-2 fw-bold" type="button" onClick={() => {setIsOpenCreate(!isOpenCreate)
            }}>Cancelar</button>
          </Modal>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
