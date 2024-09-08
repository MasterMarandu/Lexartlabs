import React, { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, updateProduct, fetchProductById } from '../features/products/productSlice';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2'; // Install sweetalert2

const ProductForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();  
  const { items, error, successMessage, isLoading } = useSelector((state) => state.products);

  const product = items.find((p) => p.id === parseInt(id));

  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (successMessage) {
      Swal.fire({
        title: 'Éxito',
        text: successMessage,
        icon: 'success',
      }).then(() => {
        navigate('/products');
      });
    }
    if (error) {
      Swal.fire({
        title: 'Error',
        text: error,
        icon: 'error',
      });
    }
  }, [successMessage, error, navigate]);

  const validationSchema = Yup.object({
    name: Yup.string().required('El nombre es obligatorio'),
    brand: Yup.string().required('La marca es obligatoria'),
    model: Yup.string().required('El modelo es obligatorio'),
    data: Yup.array().of(
      Yup.object({
        price: Yup.number().required('El precio es obligatorio').positive('El precio debe ser positivo'),
        color: Yup.string().required('El color es obligatorio')
      })
    )
  });

  const initialValues = product
    ? {
      name: product.name,
      brand: product.brand,
      model: product.model,
      data: product.data || [{ price: '', color: '' }]
    }
    : {
      name: '',
      brand: '',
      model: '',
      data: [{ price: '', color: '' }]
    };

  const handleSubmit = (values, { setSubmitting }) => {
    const productData = {
      ...values,
      data: values.data.map(d => ({ price: d.price, color: d.color }))
    };

    if (id) {
      dispatch(updateProduct({ id: parseInt(id), productData }));
    } else {
      dispatch(addProduct(productData));
    }

    setSubmitting(false);
  };

  if (isLoading) return <p>Cargando...</p>;

  return (
    <div className="container mt-5">
      <h2>{id ? 'Editar Producto' : 'Agregar Producto'}</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, values }) => (
          <Form className="mt-3">
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Nombre</label>
              <Field name="name" type="text" className="form-control" />
              <ErrorMessage name="name" component="div" className="text-danger" />
            </div>

            <div className="mb-3">
              <label htmlFor="brand" className="form-label">Marca</label>
              <Field name="brand" type="text" className="form-control" />
              <ErrorMessage name="brand" component="div" className="text-danger" />
            </div>

            <div className="mb-3">
              <label htmlFor="model" className="form-label">Modelo</label>
              <Field name="model" type="text" className="form-control" />
              <ErrorMessage name="model" component="div" className="text-danger" />
            </div>

            {values.data.map((item, index) => (
              <div key={index} className="mb-3">
                <h4>Datos del Producto</h4>
                <div className="mb-3">
                  <label htmlFor={`data[${index}].price`} className="form-label">Precio</label>
                  <Field name={`data[${index}].price`} type="number" className="form-control" />
                  <ErrorMessage name={`data[${index}].price`} component="div" className="text-danger" />
                </div>

                <div className="mb-3">
                  <label htmlFor={`data[${index}].color`} className="form-label">Color</label>
                  <Field name={`data[${index}].color`} type="text" className="form-control" />
                  <ErrorMessage name={`data[${index}].color`} component="div" className="text-danger" />
                </div>
              </div>
            ))}

            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              {id ? 'Actualizar Producto' : 'Agregar Producto'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ProductForm;
