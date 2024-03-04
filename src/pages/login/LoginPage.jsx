import React from 'react'
import { useFormik } from 'formik'
import "./login.css"
import { Form, Button, Spinner, Alert } from 'react-bootstrap'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import validations from './validations'
import { useAuth } from '../../contexts/AuthContext'
import { Link,useNavigate } from 'react-router-dom';
import { fetchLogin } from '../../services/Api';

function LoginPage() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const formik = useFormik({
    initialValues: {
      userName: "",
      password: "",
      checkRemember: false,
    },
    validationSchema: validations,
    onSubmit: async (values, bag) => {
      try {
        const loginResponse = await fetchLogin({
          userName:values.userName,
          password: values.password
        })
        login(loginResponse)
        navigate(`/`)
      }
      catch (error) {
        console.log(error.response.data)
        bag.setErrors({ general: error.response.data })
      }
    }
  })
  return (
    <div className='login'>
      <div className="container p-0 h-100">
        <div className="h-100 d-flex justify-content-center align-items-center">
          <div className="card text-light">
            <div className="card-header text-center h4 d-flex flex-column justify-content-center align-items-center">
            <img src='https://upload.wikimedia.org/wikipedia/tr/thumb/c/c6/Samsun_%C3%9Cniversitesi_logo.png/200px-Samsun_%C3%9Cniversitesi_logo.png' className='sidebar-img my-2 ' />
              Giriş Yap
            </div>
            <div className="card-body text-center">
              <div className="d-flex justify-content-center align-items center">
                <Form onSubmit={formik.handleSubmit} className='w-75 custom-form'>
                {
                formik.errors.general && (
                  <Alert variant="danger">
                    {formik.errors.general}
                  </Alert>
                )
              }
                  <Form.Group className="mb-3 mt-3">
                    <FloatingLabel
                      controlId="userName"
                      label="Kullanıcı Adınızı Giriniz"
                      className="mb-3 text-dark form-floating"
                    >
                      <Form.Control
                        name='userName'
                        className='form-control'
                        type="userName"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        isInvalid={formik.touched.userName && formik.errors.userName}
                        placeholder="name"
                      />
                      {formik.errors.userName && formik.touched.userName && <div className='text-danger text-start'>{formik.errors.userName}</div>}
                    </FloatingLabel>
                  </Form.Group>
                  <Form.Group className="mb-3 mt-3">
                    <FloatingLabel
                      controlId="password"
                      label="Şifrenizi Giriniz"
                      className="mb-3 text-dark"
                    >
                      <Form.Control
                        name='password'
                        type="password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        isInvalid={formik.touched.password && formik.errors.password}
                        placeholder="Password"
                      />
                      {formik.errors.password && formik.touched.password && <div className='text-danger text-start'>{formik.errors.password}</div>}
                    </FloatingLabel>
                  </Form.Group>
                  <Form.Group className="mb-3 text-start">
                    <Form.Check type="checkbox" label="Beni Hatırla" name='checkRemember' id="checkRemember" onChange={formik.handleChange} />
                  </Form.Group>
                  {formik.isValid ?
                    <Button variant="primary" type="submit" className='w-100'>
                      {formik.isSubmitting ? <Spinner></Spinner> : <div>Giriş Yap</div>}
                    </Button>
                    :
                    <Button variant="primary" type="submit" className='w-100' disabled>
                      Giriş Yap
                    </Button>
                  }
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage 