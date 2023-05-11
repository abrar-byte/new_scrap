import React, { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
// Skema Validasi Formik
const bankSchema = Yup.object().shape({
  username: Yup.string()
    .max(255, "Username maksimum berisi 255 karakter")
    .required("Username harus diisi"),

  password: Yup.string()
    .min(6, "Password minimal berisi 6 karakter")
    .required("Password harus diisi"),
  start_date: Yup.string()
    .matches(/^[0-9]+$/, "harus berupa angka dan minimal 31 hari yang lalu")
    .required("harus diisi"),
  end_date: Yup.string()
    .matches(/^[0-9]+$/, "harus berupa angka")
    .required("harus diisi"),
  start_month: Yup.string()
    .matches(/^[0-9]+$/, "harus berupa angka")
    .required("harus diisi"),
  end_month: Yup.string()
    .matches(/^[0-9]+$/, "harus berupa angka")
    .required("harus diisi"),
});

// skema data awal formik
const initialValues = {
  username: "",
  password: "",
  phone: "",
  start_date: "",
  end_date: "",
  end_month: "",
  start_month: "",
};

function Home() {
  const [show, setShow] = useState(false);
  const [data, setData] = useState("");

  const [showConfirm, setShowConfirm] = useState(false);
  const [step, setStep] = useState(1);
  const [nama, setNama] = useState({
    nama: "",
    umur: "",
  });
  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    validationSchema: bankSchema,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      setSubmitting(true);
      axios
        .post("api/scrap", {
          username: values.username,
          password: values.password,
          start_date: values.start_date,
          end_date: values.end_date,
          start_month: values.start_month,
          end_month: values.end_month,
        })
        .then((data) => {
          setData(data);
          setStep(step + 1);
          setSubmitting(false);
          resetForm();
        })
        .catch((error) => {
          console.log("error:", error);
          setSubmitting(false);
          resetForm();
        });
    },
  });
  return (
    <div className="flex justify-center items-center min-h-screen p-10">
      <div className={`p-4 w-full ${step === 1 ? 'max-w-lg' :'max-w-full'} bg-white rounded-lg 0 shadow-lg sm:p-6 md:p-8`}>
        <form className="space-y-6" onSubmit={formik.handleSubmit}>
          {step === 1 && (
            <>
              <div>
                <input
                  type="text"
                  // name="username"
                  {...formik.getFieldProps("username")}
                  className="bg-gray-50 shadow-md text-gray-900 text-sm rounded-md  block w-full px-2.5 py-3 "
                  placeholder="Username"
                />
                {formik.touched.username && formik.errors.username && (
                  <p className="  text-rose-500  mt-2  text-xs">
                    {formik.errors.username}
                  </p>
                )}
              </div>
              <div>
                <input
                  type="password"
                  {...formik.getFieldProps("password")}
                  className="bg-gray-50 shadow-md text-gray-900 text-sm rounded-md  block w-full px-2.5 py-3 "
                  placeholder="Password"
                />
                {formik.touched.password && formik.errors.password && (
                  <p className="  text-rose-500  mt-2  text-xs">
                    {formik.errors.password}
                  </p>
                )}
              </div>
              <div>
                <input
                  type="number"
                  {...formik.getFieldProps("start_date")}
                  className="bg-gray-50 shadow-md text-gray-900 text-sm rounded-md  block w-full px-2.5 py-3 "
                  placeholder="Tanggal Dimulai"
                />
                {formik.touched.start_date && formik.errors.start_date && (
                  <p className="  text-rose-500  mt-2  text-xs">
                    {formik.errors.start_date}
                  </p>
                )}
              </div>
              <div>
                <input
                  type="number"
                  {...formik.getFieldProps("start_month")}
                  className="bg-gray-50 shadow-md text-gray-900 text-sm rounded-md  block w-full px-2.5 py-3 "
                  placeholder="Bulan Dimulai"
                />
                {formik.touched.start_month && formik.errors.start_month && (
                  <p className="  text-rose-500  mt-2  text-xs">
                    {formik.errors.start_month}
                  </p>
                )}
              </div>
              <div>
                <input
                  type="number"
                  {...formik.getFieldProps("end_date")}
                  className="bg-gray-50 shadow-md text-gray-900 text-sm rounded-md  block w-full px-2.5 py-3 "
                  placeholder="Tanggal Berakhir"
                />
                {formik.touched.end_date && formik.errors.end_date && (
                  <p className="  text-rose-500  mt-2  text-xs">
                    {formik.errors.end_date}
                  </p>
                )}
              </div>
              <div>
                <input
                  type="number"
                  {...formik.getFieldProps("end_month")}
                  className="bg-gray-50 shadow-md text-gray-900 text-sm rounded-md  block w-full px-2.5 py-3 "
                  placeholder="Bulan Berakhir"
                />
                {formik.touched.end_month && formik.errors.end_month && (
                  <p className="  text-rose-500  mt-2  text-xs">
                    {formik.errors.end_month}
                  </p>
                )}
              </div>

              <button
                disabled={formik.isSubmitting || !formik.isValid}
                type="submit"
                className="w-full uppercase text-white bg-red-500 hover:bg-red-800  font-medium rounded-md text-sm px-5 py-2.5 text-center shadow-lg "
              >
                Submit
              </button>
              <hr />
              <div className="text-sm text-center font-medium text-gray-500 dark:text-gray-300">
                Sudah scrap data?
                <span
                  onClick={() => setStep(step+1)}
                  className="text-red-600 ml-1 hover:text-red-500 cursor-pointer "
                >
                  Lihat
                </span>
              </div>
            </>
          )}

          {/* {step === 2 && (
            <>
              <div
                className="flex cursor-pointer"
                onClick={() => setStep(step - 1)}
              >
                <h5 className="text-xl ml-1 font-medium text-red-600">
                  Kembali
                </h5>
              </div>
              <div>
                <input
                  type="number"
                  {...formik.getFieldProps("phone")}
                  className="bg-gray-50 shadow-md text-gray-900 text-sm rounded-md  block w-full px-2.5 py-3 "
                  placeholder="Nomor Telepon"
                />
                {formik.touched.phone && formik.errors.phone && (
                  <p className="  text-rose-500  mt-2  text-xs">
                    {formik.errors.phone}
                  </p>
                )}
              </div>
              <div className="relative  ">
                <input
                  type={show ? "text" : "password"}
                  {...formik.getFieldProps("password")}
                  placeholder="Password"
                  className="bg-gray-50 shadow-md text-gray-900 text-sm rounded-md  block w-full px-2.5 py-3 "
                />
                <span
                  className="absolute top-3 right-3 text-red-600 hover:text-red-500 text-sm cursor-pointer"
                  onClick={() => setShow(!show)}
                >
                  {show ? "Hide" : "Show"}
                </span>
                {formik.touched.password && formik.errors.password && (
                  <p className="  text-rose-500  mt-2  text-xs">
                    {formik.errors.password}
                  </p>
                )}
              </div>
              <div className="relative  ">
                <input
                  type={showConfirm ? "text" : "password"}
                  {...formik.getFieldProps("password_confirmation")}
                  placeholder="Konfirmasi Password"
                  className="bg-gray-50 shadow-md text-gray-900 text-sm rounded-md  block w-full px-2.5 py-3 "
                />
                <span
                  className="absolute top-3 right-3 text-red-600 hover:text-red-500 text-sm cursor-pointer"
                  onClick={() => setShowConfirm(!showConfirm)}
                >
                  {showConfirm ? "Hide" : "Show"}
                </span>
                {formik.touched.password_confirmation &&
                  formik.errors.password_confirmation && (
                    <p className="  text-rose-500  mt-2  text-xs">
                      {formik.errors.password_confirmation}
                    </p>
                  )}
              </div>

              <button
                disabled={formik.isSubmitting || !formik.isValid}
                type="submit"
                className="w-full uppercase text-white bg-red-500 hover:bg-red-800  font-medium rounded-md text-sm px-5 py-2.5 text-center shadow-lg disabled:opacity-50 "
              >
                Selanjutnya
              </button>
              <hr />
              <div className="text-sm text-center font-medium text-gray-500 dark:text-gray-300">
                Sudah punya akun?
                <span
                  onClick={() => navigate("/login")}
                  className="text-red-600 ml-1 hover:text-red-500 cursor-pointer "
                >
                  Masuk
                </span>
              </div>
            </>
          )} */}
        </form>
        {step === 2 && data && (
          <>
            <button className="text-red-700" onClick={() => setStep(step - 1)}>
              Kembali
            </button>
            <div className="relative  overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Tanggal
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Keterangan
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Nama
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Cabang
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Nominal
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Mutasi
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Saldo Akhir
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data?.data?.map((item, idx) => (
                    <tr
                      key={idx}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {item.tanggal}
                      </th>
                      <td className="px-6 py-4"> {item.keterangan}</td>
                      <td className="px-6 py-4"> {item.name}</td>
                      <td className="px-6 py-4"> {item.cab}</td>
                      <td className="px-6 py-4"> {item.nominal}</td>
                      <td className="px-6 py-4"> {item.mutasi}</td>
                      <td className="px-6 py-4"> {item.saldoakhir}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Home;
