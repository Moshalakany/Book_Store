import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Formik, Form, Field ,ErrorMessage} from "formik";
import * as Yup from 'yup';




function EditUser() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const user = JSON.parse(localStorage.getItem("Users"));
  console.log(user);
  const onUpdateName = async (data) => {
    setLoading(true);
    try {
      const updatedUserInfo = {
        name: data.name,
      };
      const res = await axios.put("http://localhost:4001/user/edit-name", updatedUserInfo, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      console.log(res.data);
      toast.success("Account information updated successfully");
    } catch (error) {
      console.error(error);
      toast.error("Error updating account information");
    }
    setLoading(false);
  };
  const onUpdatePassword = async (data) => {
    setLoading(true);
    try {
      const updatedUserInfo = {
        name: data.name,
      };
      const res = await axios.put("http://localhost:4001/user/edit-password", updatedUserInfo, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      console.log(res.data);
      toast.success("Account information updated successfully");
    } catch (error) {
      console.error(error);
      toast.error("Error updating account information");
    }
    setLoading(false);
  };

  return (
    <>
    <Navbar/>
    <div className=" max-w-screen-2xl container mx-auto md:px-20 px-4">
        <div className="mt-28 items-center justify-center text-center">
          <h1 className="text-2xl  md:text-4xl">
            Manage your Account{" "}
            <span className="text-pink-500"> Here! </span>
          </h1>
          <div>
            
          <p className="mt-12">
            Edit your account information here. 
            You can change your name and password</p>
          </div>
        </div>
      </div>
      <div className="mt-28 items-center justify-center text-center" >
        <div>
      <h1 className="text-2xl md:text-2xl">Update name</h1>
      <br />

      <Formik 
      className="text-2xl md:text-2xl"
        initialValues={{ Name: '' }}
        validationSchema={Yup.object({
          Name: Yup.string().required('Name is required'),
        })}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            onUpdateName(values)
            setSubmitting(false);
          }, 400);
        }}
      >
        {formik => (
          <Form className="text-2xl md:text-2xl">
            <div>
            <label htmlFor="Name">Name:</label>
            <Field type="text" id="Name" name="Name" />
            <ErrorMessage name="Name" component="div" />
            </div>
            
            <br />
            <button className="mt-6 bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-700 duration-300" type="submit" disabled={formik.isSubmitting}>
              Update Name
            </button>
          </Form>
        )}
      </Formik>
    </div>
      </div>
      <div className="mt-28 items-center justify-center text-center" >
        <div>
      <h1 className="text-2xl md:text-2xl">Update Password</h1>
      <br />

      <Formik 
      className="text-2xl md:text-2xl"
        initialValues={{ oldpassword: '',
        newpassword:''
         }}
        validationSchema={Yup.object({
          oldpassword: Yup.string().required('oldpassword is required'),
          newpassword: Yup.string().required('newpassword is required'),
        })}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            onUpdateName(values)
            setSubmitting(false);
          }, 400);
        }}
      >
        {formik => (
          <Form className="text-2xl md:text-2xl">
            <div>
            <label htmlFor="oldpassword">oldpassword:</label>
            <Field type="text" id="oldpassword" name="oldpassword" />
            <ErrorMessage name="oldpassword" component="div" />
            </div>
            
            <br />
            <div>
            <label htmlFor="newpassword">newpassword:</label>
            <Field type="text" id="newpassword" name="newpassword" />
            <ErrorMessage name="newpassword" component="div" />
            </div>
            
            <br />

            <button className="mt-6 bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-700 duration-300" type="submit" disabled={formik.isSubmitting}>
              Update Password
            </button>
          </Form>
        )}
      </Formik>
    </div>
      </div>
<br />
<br />
    <Footer/>
    </>
  );
}

export default EditUser;
