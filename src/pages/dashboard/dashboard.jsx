import Header from '../../components/header/header'
import { useEffect, useState } from 'react';
import api from '../../services/api';
import Product from '../../components/products/product';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [isOpenCreate, setIsOpenCreate] = useState(false);

  const getData = async () => {
    try {
      await api.post('/product/list')
      .then((response) => {
        setProducts(response.data.data);
      });
    } catch (error) {
      alert('Ocorreu um erro ao processar sua requisição...\nError fetching data: ' + error.message);
      console.log('Error fetching data: ' + error.message);
      if (error.response.status == 422) {
        navigate('/login');
      }
      console.log(error);
    }
  };
  
  function handleOpenCreate () {
    setIsOpenCreate(!isOpenCreate);
    console.log(isOpenCreate);
  }

  useEffect(() => {
    getData()
  },[])

  return (
    <div>
      <Header/>
      <div className="container py-2">
        <div className="d-flex p-3 w-100 justify-content-between">
          <h1>Listagem dos Produtos</h1> 
          <button type="button" className="btn btn-success" onClick={handleOpenCreate}> 
            <span className="fw-bold">+ </span> 
            Adicionar Produto
          </button>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th className="text-center" scope="col">Nome do Produto</th>
              <th className="text-center" scope="col">Preço</th>
              <th className="text-center" scope="col">Descrição</th>
              <th className="text-center" scope="col">Status</th>
              <th className="text-center" scope="col">Qtd Estoque</th>
              <th className="text-center" scope="col">Ação</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <Product key={index} id={product.id} name={product.name} price={product.price} description={product.description} status={product.status} stock_quantity={product.stock_quantity} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Dashboard
