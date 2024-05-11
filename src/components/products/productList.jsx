import trashCan from '../../assets/trash-can.svg';
import editCan from '../../assets/edit-icon.svg';
import PropTypes from 'prop-types';  
import { useEffect, useState } from 'react';
import ProductDelete from './productDelete';
import Modal from '../modal/modal';
import ProductEdit from './productEdit';
import '../../styles/productList.css';

function ProductList({products} ) {

  const [productsList, setProductsList] = useState([]);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(undefined);

  ProductList.propTypes = {
    products:PropTypes.array.isRequired,
    productsList: PropTypes.array
  };

  const openEditModal = (productId) => {
    setSelectedProductId(productId);
    setIsOpenEdit(!isOpenEdit);
  };

  const openDeleteModal = (productId) => {
    setSelectedProductId(productId);
    setIsOpenDelete(!isOpenDelete);
  };

  useEffect(()=>{
    setProductsList(products)
  },[products])

  if (productsList.length > 0) {
    return (
      <div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th className="text-center align-middle" scope="col">Nome do Produto</th>
              <th className="text-center align-middle" scope="col">Preço</th>
              <th className="text-center align-middle" scope="col">Descrição</th>
              <th className="text-center align-middle" scope="col">Status</th>
              <th className="text-center align-middle" scope="col">Qtd Estoque</th>
              <th className="text-center div__action align-middle" scope="col" colSpan="2">Ação</th>
            </tr>
          </thead>
          <tbody>
            {productsList.map((product, key) => (
            <tr key={key} id={product.id}>
              <td className="text-center align-middle">{product.name}</td>
              <td className="text-center align-middle">{product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
              <td className="text-center align-middle">{product.description}</td>
              <td className={"text-center align-middle"}>
                <span className={`${product.status == 1 ? 'stock' : product.status == 2 ? 'reorder' : 'outstock'}`}>{product.status == 1 ? 'Estoque ' : product.status == 2 ? 'Reposição' : 'Em Falta'}</span>
                
              </td>
              <td className="text-center align-middle">{product.stock_quantity}</td>
              <td className="text-center div__icons align-middle">
                  <div className="h100" onClick={() => {openEditModal(product.id)}}><img src={editCan} className="img__style" alt="edit"/></div>
              </td>
              <td className="text-center div__icons align-middle">
                  <div onClick={() => {openDeleteModal(product.id)}}><img src={trashCan} className="img__style" alt="delete"/></div>
              </td>
            </tr>
            ))}
          </tbody>
  
        </table>
          <Modal isOpen={isOpenEdit}>
            <ProductEdit id={selectedProductId}/>
            <button className="btn btn-danger d-flex w-100 align-items-center justify-content-center text-bold fs-5 p-2 fw-bold" type="button" onClick={() => {setIsOpenEdit(!isOpenEdit)}}>Cancelar</button>
          </Modal>  
          <Modal isOpen={isOpenDelete}>
            <ProductDelete id={selectedProductId}/>
            <button className="btn btn-danger d-flex w-100 align-items-center justify-content-center text-bold fs-5 p-2 fw-bold" type="button" onClick={() => {setIsOpenDelete(!isOpenDelete)}}>Cancelar</button>
          </Modal>  
      </div>
    );
  } 
  return (
    <div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th className="text-center align-middle" scope="col">Nome do Produto</th>
            <th className="text-center align-middle" scope="col">Preço</th>
            <th className="text-center align-middle" scope="col">Descrição</th>
            <th className="text-center align-middle" scope="col">Status</th>
            <th className="text-center align-middle" scope="col">Qtd Estoque</th>
            <th className="text-center div__action align-middle" scope="col" colSpan="2">Ação</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="text-center align-middle fw-bold" colSpan={6}>NENHUM PRODUTO CADASTRADO</td>
          </tr>
        </tbody>
      </table>
    </div>
  );

}

export default ProductList;