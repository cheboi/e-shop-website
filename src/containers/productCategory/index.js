import * as React from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage, input } from "formik";
import axios from "axios";
import Products from "../Products";

import "./index.css";

const INITIAL_VALUES = {
  title: "",
  description: "",
  price: "",
  image: "",
  category: "",
};
const AddProductValidation = Yup.object({
  title: Yup.string().required("Required"),
  price: Yup.string().required("Required"),
  // image: Yup.string().required("Required"),
  category: Yup.string().required("Required"),
});

function Categories() {
  const uri = "https://fakestoreapi.com/products";
  const [category, setCategory] = React.useState([]);
  // const [value, setValue] = React.useState({ INITIAL_VALUES });

  const getPerCategory = () => {
    
    axios.get(uri).then((res) => {
      // console.log(res)
      const categori = res.data;
      setCategory(categori);
    });
  };

  React.useEffect(() => {
    getPerCategory();
  }, []);


  const postProductData = (values, { setSubmitting, setStatus }) => {
    const { title, description, price, image, category } = values;
    axios
      .post("https://fakestoreapi.com/products", {
        title: "",
        description: "",
        price: "",
        image: "",
        category: "",
      })
      .then((res) => {
        if (res.status === 200) alert("Products successfully created");
        else Promise.reject();
      })
      .catch((err) => alert("Something went wrong"));

    console.log(values);
    setSubmitting(false);
  };
  

  return (
    <>
      <div className="form-wrapper">
        <Formik
          validationSchema={AddProductValidation}
          initialValues={INITIAL_VALUES}
          onSubmit={postProductData}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <>
              <Form onSubmit={handleSubmit} className="form-control">
                <label>Title</label>

                <Field
                  name="title"
                  type="text"
                  onChangeText={handleChange}
                  onBlur={handleBlur}
                  value={values.title}
                  className="input-field"
                />
                <ErrorMessage
                  name="title"
                  className="d-block invalid-feedback"
                  component="span"
                />
                <label>description</label>
                <Field
                  name="description"
                  type="text"
                  onChangeText={handleChange}
                  value={values.description}
                  className="description-fild"
                />
                <ErrorMessage
                  name="category"
                  className="d-block invalid-feedback"
                  component="span"
                />
                <label>Price</label>
                <Field
                  name="price"
                  type="text"
                  className="input-field"
                  onChangeText={handleChange}
                  value={values.price}
                />
                <ErrorMessage
                  name="price"
                  className="d-block invalid-feedback"
                  component="span"
                />
                <label>category</label>
                <Field
                  name="category"
                  type="text"
                  onChangeText={handleChange}
                  value={values.category}
                  className="input-field"
                />
                <ErrorMessage
                  name="category"
                  className="d-block invalid-feedback"
                  component="span"
                />
                <button type="submit" disabled={isSubmitting}>
                  Add Products
                </button>
              </Form>
            </>
          )}
        </Formik>
      </div>
    </>
  );
}
export default Categories;
