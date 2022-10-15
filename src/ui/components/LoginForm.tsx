import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as React from 'react';
import * as Yup from 'yup';

interface MyFormValues {
  username: string;
  password: string;
  image?: File;
  gender: string;
  field: string[];
}
const FILE_SIZE = 1024 * 1024;
const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/gif', 'image/png'];
const loginSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, 'Too Short!')
    .max(70, 'Too Long!')
    .required('No Username provided.'),
  password: Yup.string()
    .required('No password provided.')
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .matches(/^(?=.*[a-z])/, 'Password must contain one lowercase.')
    .matches(/^(?=.*[A-Z])/, 'Password must contain one uppercase.')
    .matches(/^(?=.*[0-9])/, 'Password must contain one number.')
    .matches(
      /^(?=.*[!@#$%^&*])/,
      'Password must contain one special case character.'
    ),

  image: Yup.mixed()
    .notRequired()
    .test(
      'fileSize',
      'File too large',
      (value) => !value || (value && value[0].size <= FILE_SIZE)
    )
    .test(
      'fileFormat',
      'Unsupported Format',
      (value) => !value || (value && SUPPORTED_FORMATS.includes(value[0].type))
    ),
  gender: Yup.string().required('No gender provided.'),
  field: Yup.array().of(Yup.string()).min(1).required('No field provided.'),
});
export const LoginForm = () => {
  const initialValues: MyFormValues = {
    username: '',
    password: '',
    gender: '',
    field: [],
  };

  return (
    <div className="relative mt-52 flex h-full w-full items-center justify-center">
      <Formik
        initialValues={initialValues}
        onSubmit={(values, actions) => {
          actions.setSubmitting(false);
          alert(JSON.stringify(values, null, 2));
        }}
        validationSchema={loginSchema}
      >
        {({ errors, touched }) => (
          <div className=" w-full max-w-md">
            <Form className="mb-4  rounded-lg bg-white px-10 py-14 shadow-md ">
              <h1 className="mb-4 text-center text-2xl font-bold text-orange-500">
                Sign Up
              </h1>
              <div className="mb-4">
                <label
                  className="mb-2 block text-sm font-bold text-orange-500"
                  htmlFor="username"
                >
                  Username
                </label>
                <Field
                  className="mb-3 w-full appearance-none rounded border py-2 px-3 leading-tight text-orange-500 shadow outline-0 focus:outline-none"
                  id="username"
                  name="username"
                  placeholder="Username"
                />
                {errors.username && touched.username ? (
                  <ErrorMessage
                    name="username"
                    className="text-base  text-red-500 "
                    component="div"
                  />
                ) : null}
              </div>
              <div className="mb-4">
                <label
                  className="mb-2 block text-sm font-bold text-orange-500"
                  htmlFor="password"
                >
                  Password
                </label>
                <Field
                  className="mb-3 w-full appearance-none rounded border py-2 px-3 leading-tight text-orange-500 shadow outline-0 focus:outline-none"
                  id="password"
                  name="password"
                  placeholder="Password"
                  type="password"
                />
                {errors.password && touched.password ? (
                  <ErrorMessage
                    name="password"
                    className="text-base  text-red-500"
                    component="div"
                  />
                ) : null}
              </div>
              <div className="mb-4">
                <label
                  className="mb-2 block text-sm font-bold text-orange-500"
                  htmlFor="password"
                >
                  Upload Image
                </label>
                <Field
                  className="mb-3 w-full appearance-none rounded border py-2 px-3 leading-tight text-orange-500 shadow outline-0 focus:outline-none"
                  id="image"
                  name="image"
                  placeholder="Image"
                  type="file"
                  onChange={(event: any) => {
                    const {
                      target: { files },
                    } = event;
                  }}
                />
                {errors.image && touched.image ? (
                  <ErrorMessage
                    name="image"
                    className="text-base  text-red-500"
                    component="div"
                  />
                ) : null}
              </div>
              <div className="mb-4">
                <label
                  className="mb-2 block text-sm font-bold text-orange-500"
                  htmlFor="password"
                >
                  Choose Gender
                </label>
                <Field type="radio" name="gender" value="male" />{' '}
                <span className="mr-3">Male</span>
                <Field type="radio" name="gender" value="female" /> Female
                {errors.gender && touched.gender ? (
                  <ErrorMessage
                    name="gender"
                    className="text-base  text-red-500"
                    component="div"
                  />
                ) : null}
              </div>
              <div className="mb-6">
                <label
                  className="mb-2 block text-sm font-bold text-orange-500"
                  htmlFor="password"
                >
                  Choose Field
                </label>
                <Field
                  type="checkbox"
                  name="field"
                  value="Frontend"
                  id="frontend"
                  className="mr-1"
                />
                <label className="ml-1 mr-3" htmlFor="frontend">
                  Front end
                </label>
                <Field
                  type="checkbox"
                  name="field"
                  value="Backend"
                  className="mr-1"
                  id="backend"
                />
                <label className="ml-1 mr-3" htmlFor="backend">
                  Back end
                </label>{' '}
                {errors.field && touched.field ? (
                  <ErrorMessage
                    name="field"
                    className="text-base  text-red-500"
                    component="div"
                  />
                ) : null}
              </div>
              <div className="flex items-center justify-between">
                <button
                  className="rounded bg-orange-500 py-2 px-4 font-bold text-white outline-0  focus:outline-none"
                  type="submit"
                >
                  Sign In
                </button>
                <a
                  className="inline-block align-baseline text-sm font-bold text-orange-500 hover:text-white"
                  href="#"
                >
                  Forgot Password?
                </a>
              </div>
            </Form>
          </div>
        )}
      </Formik>
    </div>
  );
};
