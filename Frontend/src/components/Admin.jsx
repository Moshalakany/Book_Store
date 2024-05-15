import React, { useState, useEffect } from "react";
import { Formik, Form, Field ,ErrorMessage} from "formik";
import * as Yup from 'yup';

import axios from "axios";
import Cards from "./Cards";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";

const AdminComponent = () => {
  const [book, setBook] = useState([]);
  const [category, setCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  let result=localStorage.getItem("Users");
  const user = JSON.parse(result);
  const token=user.token;


  useEffect(() => {
    
    const getBook = async () => {
      try {
        let result=localStorage.getItem("Users");
        const user = JSON.parse(result);
        const token=user.token;
        const res = await axios.get("http://localhost:4001/book");  
        const data = res.data;
        let tosearch = data;

        if (category) {
          tosearch = tosearch.filter(
            (book) => book.category.toLowerCase() === category.toLowerCase()
          );
        }

        if (searchTerm) {
          tosearch = tosearch.filter((book) =>
            book.name.toLowerCase().includes(searchTerm.toLowerCase())
          );
        }

        setBook(tosearch);
      } catch (error) {
        console.log(error);
      }
    };

    getBook();
  }, [category, searchTerm]);

  const handleAddBook = async (values, actions) => {
    try {
      let result=localStorage.getItem("Users");
const user = JSON.parse(result);
const token=user.token;
      await axios.post("http://localhost:4001/admin/books/add",{
        headers: {
          Authorization: `Bearer ${token}`,
        },
  
        data:values,
      });
      actions.resetForm();
    } catch (error) {
      console.error("Error adding book:", error);
    }
  };

  const handleUpdateBook = async (values, actions) => {
    try {
      let result=localStorage.getItem("Users");
const user = JSON.parse(result);
const token=user.token;
      await axios.put("http://localhost:4001/admin/books/update",{
        headers: {
          Authorization: `Bearer ${token}`,
        },
  
        data: values,
      });
      actions.resetForm();
    } catch (error) {
      console.error("Error updating book:", error);
    }
  };

  const handleDeleteBook = async (bookId) => {
    try {
      let result=localStorage.getItem("Users");
      const user = JSON.parse(result);
      const token=user.token;
      await axios.delete("http://localhost:4001/admin/books/remove", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
  
        data: bookId,
      });
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };
  if(user.isAdmin==false)
    {
      return (
        <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 mt-28">
        <h1 className="text-2xl md:text-4xl">
          un Authorized access <span className="text-pink-500">You do not have Admin permission  :)</span>
        </h1>
        <Link to="/">
          <button className="mt-6 bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-700 duration-300">
            Back
          </button>
          </Link>
        </div>
      );
    }
  
  return (
    <>
      <Navbar />
      <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 mt-28">
        {/* Your existing code */}
        <div>
      <h1 className="text-2xl md:text-2xl">Delte Book</h1>
      <Formik 
      className="text-2xl md:text-2xl"
        initialValues={{ bookId: '' }}
        validationSchema={Yup.object({
          bookId: Yup.string().required('Book ID is required'),
        })}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            handleDeleteBook(values.bookId)
            setSubmitting(false);
          }, 400);
        }}
      >
        {formik => (
          <Form className="text-2xl md:text-2xl">
            <label htmlFor="bookId">Book ID:</label>
            <Field type="text" id="bookId" name="bookId" />
            <ErrorMessage name="bookId" component="div" />
            <br />
            <button className="mt-6 bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-700 duration-300" type="submit" disabled={formik.isSubmitting}>
              Delete
            </button>
          </Form>
        )}
      </Formik>
    </div>
    <br />
    <br />

    <div>
      <h1 className="text-2xl md:text-2xl">Update Book</h1>
      <Formik
        initialValues={{
          _id: '',
          name: book.name,
          price: book.price,
          category: book.category,
          image: book.image,
          author: book.author,
          quantity: book.quantity,
          sale: book.sale
        }}
        validationSchema={Yup.object({
          _id: Yup.string().required('Book ID is required'),
        })}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            console.log('Updated Book:', values);
            handleUpdateBook(values);
            setSubmitting(false);
          }, 400);
        }}
      >
        {formik => (
          <Form className="text-2xl md:text-2xl">
            <div>
              <label htmlFor="_id">Book ID:</label>
              <Field type="text" id="_id" name="_id" />
              <ErrorMessage name="_id" component="div" />
            </div>
            <br />
            <div>
              <label htmlFor="name">Name:</label>
              <Field type="text" id="name" name="name" />
              <ErrorMessage name="name" component="div" />
            </div>
            <br />

            <div>
              <label htmlFor="price">Price:</label>
              <Field type="number" id="price" name="price" />
              <ErrorMessage name="price" component="div" />
            </div>
            <br />

            <div>
              <label htmlFor="category">Category:</label>
              <Field type="text" id="category" name="category" />
              <ErrorMessage name="category" component="div" />
            </div>
            <br />
            
            <div>
              <label htmlFor="image">Image URL:</label>
              <Field type="text" id="image" name="image" />
              <ErrorMessage name="image" component="div" />
            </div>
            <br />
            
            <div>
              <label htmlFor="author">Author:</label>
              <Field type="text" id="author" name="author" />
              <ErrorMessage name="author" component="div" />
            </div>
            <br />
            
            <div>
              <label htmlFor="quantity">Quantity:</label>
              <Field type="number" id="quantity" name="quantity" />
              <ErrorMessage name="quantity" component="div" />
            </div>
            <br />
            
            <div>
              <label htmlFor="sale">Sale:</label>
              <Field type="number" id="sale" name="sale" />
              <ErrorMessage name="sale" component="div" />
            </div>
            <br />
            
            <button className="mt-6 bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-700 duration-300" type="submit" disabled={formik.isSubmitting}>
              Update
            </button>
          </Form>
        )}
      </Formik>
    </div>
    <br />
    <br />

<div>
      <h1 className="text-2xl md:text-2xl">Add Book</h1>
      <Formik
        initialValues={{
          name: '',
          price: '',
          category: '',
          image: '',
          author: '',
          quantity: '',
          sale: 0 // Default sale value
        }}
        validationSchema={Yup.object({
          name: Yup.string().required('Name is required'),
          price: Yup.number().required('Price is required').min(0, 'Price must be a positive number'),
          category: Yup.string().required('Category is required'),
          image: Yup.string().required('Image URL is required'),
          author: Yup.string().required('Author is required'),
          quantity: Yup.number().required('Quantity is required').min(0, 'Quantity must be a non-negative number'),
          sale: Yup.number().min(0, 'Sale must be a non-negative number')
        })}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            console.log('Submitted Book:', values);
            handleAddBook(values);
            setSubmitting(false);
          }, 400);
        }}
      >
        {formik => (
          <Form className="text-2xl md:text-2xl">
            <div>
            <label htmlFor="name">Name:</label>
            <Field type="text" id="name" name="name" />
            <ErrorMessage name="name" component="div" />
            </div>
            <br />

            <div>
            <label htmlFor="price">Price:</label>
            <Field type="number" id="price" name="price" />
            <ErrorMessage name="price" component="div" />
            </div>
            <br />

            <div>
            <label htmlFor="category">Category:</label>
            <Field type="text" id="category" name="category" />
            <ErrorMessage name="category" component="div" />
            </div>
            <br />

            <div>
            <label htmlFor="image">Image URL:</label>
            <Field type="text" id="image" name="image" />
            <ErrorMessage name="image" component="div" />
            </div>
            <br />

            <div>
            <label htmlFor="author">Author:</label>
            <Field type="text" id="author" name="author" />
            <ErrorMessage name="author" component="div" />
            </div>
            <br />

            <div>
            <label htmlFor="quantity">Quantity:</label>
            <Field type="number" id="quantity" name="quantity" />
            <ErrorMessage name="quantity" component="div" />
            </div>
            <br />

            <div>
            <label htmlFor="sale">Sale:</label>
            <Field type="number" id="sale" name="sale" />
            <ErrorMessage name="sale" component="div" />
            </div>
            <br />

            <button className="mt-6 bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-700 duration-300" type="submit" disabled={formik.isSubmitting}>
              Add
            </button>
          </Form>
        )}
      </Formik>
    </div>            <br />
        <p className="text-pink-400">
          <h3 className="text-1xl md:text-2xl">You can search By name or category Here</h3>
        </p>
        <div className="flex items-center gap-4 mt-4">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="outline-none rounded-md px-3 py-2 border dark:bg-slate-900 dark:text-white"
          >
            <option value="">All Categories</option>
            <option value="comedy">comedy</option>
            <option value="fiction">fiction</option>
            <option value="horror">horror</option>
            <option value="romantic">romantic</option>
            <option value="kitchen">kitchen</option>
            <option value="science">science</option>
            <option value="math">math</option>
            <option value="history">history</option>
            <option value="politics">politics</option>
            <option value="biography">biography</option>
            <option value="selfhelp">selfhelp</option>
            <option value="health">health</option>
            <option value="travel">travel</option>
            <option value="biography">biography</option>
            {/* Add other options */}
          </select>
          <input
            type="search"
            className="outline-none rounded-md px-3 py-2 border dark:bg-slate-900 dark:text-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name"
          />
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-4">
          {book.map((item) => (
            <Cards key={item.id} item={item} />
          ))}
        </div>
      </div>
    </>
  );
};

export default AdminComponent;
