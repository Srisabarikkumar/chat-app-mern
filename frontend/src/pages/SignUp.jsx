import * as Yup from "yup";
import { Form, Formik } from "formik";
import {
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  MessageSquareText,
  User,
} from "lucide-react";
import { useState } from "react";
import { useAuthStore } from "../zustand/useAuthStore";
import AuthImageDesign from "../components/AuthImageDesign";
import { Link } from "react-router-dom";
// import toast from "react-hot-toast";

function SignUp() {
  const { isSigningUp, signup } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);

  const SignUpSchema = Yup.object({
    fullname: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be atleast 6 characters")
      .required("Password is required"),
  });

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* LOGO */}
          <div className="text-center mb-4">
            <div className="flex flex-col items-center gap-2 group">
              <div
                className="size-12 rounded-xl bg-primary/10 flex items-center justify-center 
              group-hover:bg-primary/20 transition-colors"
              >
                <MessageSquareText className="size-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold mt-2">Create Account</h1>
            </div>
          </div>
          {/* <div className="space-y-6"> */}
          <Formik
            initialValues={{
              fullname: "",
              email: "",
              password: "",
            }}
            validationSchema={SignUpSchema}
            onSubmit={(values, { setSubmitting }) => {
              signup(values);
              setSubmitting(false);
            }}
          >
            {({ errors, touched, getFieldProps }) => (
              // <div className="flex flex-col justify-center items-center p-6 sm:p-12">
              <Form className="space-y-6">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Full Name</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="size-5 text-base-content/40" />
                    </div>
                    <input
                      type="text"
                      className={`input input-bordered w-full pl-10`}
                      placeholder="John Doe"
                      {...getFieldProps("fullname")}
                    />
                  </div>
                  {errors.fullname && touched.fullname ? (
                    <div className="text-red-500">{errors.fullname}</div>
                  ) : null}
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Email</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="size-5 text-base-content/40" />
                    </div>
                    <input
                      type="email"
                      className={`input input-bordered w-full pl-10`}
                      placeholder="you@example.com"
                      {...getFieldProps("email")}
                    />
                  </div>
                  {errors.email && touched.email ? (
                    <div className="text-red-500">{errors.email}</div>
                  ) : null}
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Password</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="size-5 text-base-content/40" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      className={`input input-bordered w-full pl-10`}
                      placeholder="••••••••"
                      {...getFieldProps("password")}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="size-5 text-base-content/40" />
                      ) : (
                        <Eye className="size-5 text-base-content/40" />
                      )}
                    </button>
                  </div>
                  {errors.password && touched.password ? (
                    <div className="text-red-500">{errors.password}</div>
                  ) : null}
                </div>
                <button
                  type="submit"
                  className="btn btn-primary w-full"
                  disabled={isSigningUp}
                >
                  {isSigningUp ? (
                    <>
                      <Loader2 className="size-5 animate-spin" />
                      Loading...
                    </>
                  ) : (
                    "Create Account"
                  )}
                </button>
              </Form>
              // </div>
            )}
          </Formik>
          {/* </div> */}
          <div className="text-center">
            <p className="text-base-content/60">
              Already have an account?{" "}
              <Link to="/login" className="link link-primary">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
      <AuthImageDesign
        title="Chat App"
        subtitle="Stay in touch and share moments with your loved ones"
      />
    </div>
  );
}

export default SignUp;
