import React, { useContext, useEffect, useState } from "react";

import { XMarkIcon } from "@heroicons/react/20/solid";
import { Button } from "./shared/Button";
import ButtonContent from "./shared/ButtonContent";
import { Store } from "../store";
import axios from "axios";
import { useFieldArray, useForm } from "react-hook-form";
import { BookOpenIcon, PlusIcon } from "@heroicons/react/24/outline";
import Modal from "./shared/Modal";
import Table from "./shared/Table";
import { createColumnHelper } from "@tanstack/react-table";
import actionType from "../store/action-type";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Order() {
  let [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const { state, dispatch } = useContext(Store.State);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    control,
    setValue,
    reset,
  } = useForm({ defaultValues: { details: [{ item_code: "", item_name: "", qty: 0, price: 0, total: 0 }] } });

  const getOrders = async () => {
    const resp = await axios.get(`${process.env.REACT_APP_BASE_URL}/orders`, { headers: { Authorization: "Bearer " + localStorage.getItem("u_tkn") } });
    dispatch({ type: actionType.ADD_ORDERS, value: resp.data.data });
  };

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "details",
  });

  useEffect(() => {
    getOrders();
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      var newTotal = 0;
      value.details.forEach((detail, idx) => {
        const total = Number(detail.qty) * Number(detail.price);
        if (total != Number(detail.total)) {
          setValue(`details.${idx}.total`, total);
        }
        newTotal += total;
      });
      if (Number(value.total_header) != newTotal) {
        setValue("total_header", newTotal);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const [errorMsg, setErrorMsg] = useState([]);

  const handleOnSubmit = async (data) => {
    try {
      const resp = await axios.post(`${process.env.REACT_APP_BASE_URL}/orders`, data, { headers: { Authorization: "Bearer " + localStorage.getItem("u_tkn") } });
      toast("A new order created", { position: "bottom-center", type: "success", theme: "colored", autoClose: 2000 });
    } catch (error) {
      setErrorMsg(Array.isArray(error.response.data.message) ? error.response.data.message : [error.response.data.message]);
    }
  };

  const columnHelper = createColumnHelper();

  const handleCheckBox = (e) => {
    e.preventDefault();
    setSelected(e.target.value);
  };

  const handleOnClose = (e) => {
    setIsOpen(false);
    reset(state.orders.find((order) => order.id === Number(selected)));
    toast("Grid loaded!", { position: "bottom-center", type: "success", theme: "light", autoClose: 1000 });
  };

  const columns = [
    columnHelper.accessor("id", {
      id: "action",
      header: "Select",
      cell: (info) => (
        <>
          <input
            className="p-8 w-16 h-6"
            id={`${info.getValue()}-cb`}
            checked={Number(info.getValue()) === Number(selected)}
            type="checkbox"
            name="cb"
            value={info.getValue()}
            onChange={handleCheckBox}
          />
        </>
      ),
    }),
    columnHelper.accessor("customer_name", {
      cell: (info) => <i>{info.getValue()}</i>,
      header: () => <span>Name Customer</span>,
    }),
    columnHelper.accessor("transaction_date", {
      header: () => <span>Tanggal Transaksi</span>,
      cell: (info) => info.renderValue(),
    }),
    columnHelper.accessor("total_header", {
      header: () => <span>Total</span>,
      cell: (info) => info.renderValue(),
    }),
  ];

  return (
    <div className=" bg-slate-200">
      <Modal open={isOpen} onClose={handleOnClose}>
        <Table data={state.orders} columns={columns} />
      </Modal>
      <form className="flex items-center h-screen flex-col space-y-8 py-16" onSubmit={handleSubmit(handleOnSubmit)}>
        <div className=" bg-white p-6 rounded-md space-y-8 shadow-md">
          <section className="flex flex-col space-y-2 w-96">
            <label htmlFor="customer_name">Nama Customer</label>
            <input
              {...register("customer_name", { required: true })}
              placeholder="Ramon"
              id="customer_name"
              type="text"
              name="customer_name"
              className="border-b-2 focus-visible:outline-none focus-within:border-slate-700 transition duration-150"
            />
            {errors.customer_name && <span className=" text-red-500">This field is required</span>}
          </section>
          <section className="flex flex-col space-y-2 w-96">
            <label htmlFor="password">Tanggal Transaksi</label>
            <input
              {...register("transaction_date", { required: true })}
              id="transaction_date"
              type="date"
              name="transaction_date"
              className="border-b-2 focus-visible:outline-none focus-within:border-slate-700 transition duration-150"
            />
            {errors.transaction_date && <span className=" text-red-500">This field is required</span>}
          </section>
          <section className="flex flex-col space-y-2 w-96">
            <label htmlFor="password">Total Header</label>
            <input
              readOnly
              {...register("total_header", { required: false })}
              id="total_header"
              type="number"
              name="total_header"
              className="border-b-2 focus-visible:outline-none focus-within:border-slate-700 transition duration-150"
            />
          </section>
        </div>
        <div className="p-4 bg-white shadow-md rounded-md">
          <table>
            <thead>
              <tr className="text-left">
                <th>Kode Barang</th>
                <th>Nama Barang</th>
                <th>Qty</th>
                <th>Harga</th>
                <th>Total</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {fields.map((item, key) => {
                return (
                  <tr key={item.id}>
                    <td>
                      <input
                        {...register(`details.${key}.item_code`, { required: true })}
                        placeholder="GM123"
                        id={`details.${key}.item_code`}
                        type="text"
                        name={`details.${key}.item_code`}
                        className="p-2 border-b-2 focus-visible:outline-none focus-within:border-slate-700 transition duration-150"
                      />
                      {errors[`details.${key}.item_code`] && <span className=" text-red-500">This field is required</span>}
                    </td>
                    <td>
                      <input
                        {...register(`details.${key}.item_name`, { required: true })}
                        placeholder="Cheetos"
                        id={`details.${key}.item_name`}
                        type="text"
                        name={`details.${key}.item_name`}
                        className="p-2 border-b-2 focus-visible:outline-none focus-within:border-slate-700 transition duration-150"
                      />
                      {errors[`details.${key}.item_name`] && <span className=" text-red-500">This field is required</span>}
                    </td>
                    <td>
                      <input
                        defaultValue={0}
                        {...register(`details.${key}.qty`, { required: true, valueAsNumber: true })}
                        id={`details.${key}.qty`}
                        type="number"
                        name={`details.${key}.qty`}
                        className="p-2 border-b-2 focus-visible:outline-none focus-within:border-slate-700 transition duration-150"
                      />
                      {errors[`details.${key}.qty`] && <span className=" text-red-500">This field is required</span>}
                    </td>
                    <td>
                      <input
                        defaultValue={0}
                        {...register(`details.${key}.price`, { required: true, valueAsNumber: true })}
                        id={`details.${key}.price`}
                        type="number"
                        name={`details.${key}.price`}
                        className="p-2 border-b-2 focus-visible:outline-none focus-within:border-slate-700 transition duration-150"
                      />
                    </td>
                    <td>
                      <input
                        readOnly
                        {...register(`details.${key}.total`, { required: false })}
                        id={`totals.${key}`}
                        type="number"
                        name={`totals.${key}`}
                        className="p-2 border-b-2 focus-visible:outline-none focus-within:border-slate-700 transition duration-150"
                      />
                    </td>
                    <td>
                      <Button onClick={() => (fields.length > 1 ? remove(key) : null)}>
                        <XMarkIcon width={20} height={20} className=" text-rose-500" />
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <section className="flex space-x-2 justify-between">
            <Button className={"bg-blue-500 text-white mt-4 flex items-center"} onClick={() => setIsOpen(true)}>
              <ButtonContent icon={<BookOpenIcon width={16} height={16} />} text={"History"} />
            </Button>
            <Button className={"bg-emerald-500 text-white mt-4"} onClick={() => append()}>
              <ButtonContent icon={<PlusIcon width={16} height={16} />} />
            </Button>
          </section>
        </div>
        <section className="flex flex-col space-y-2 w-96">
          <Button type="submit" className={"bg-indigo-500 text-white"}>
            <ButtonContent text={"Save"} />
          </Button>
        </section>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Order;
