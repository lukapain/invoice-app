import React, { createContext, useEffect, useState } from "react";
import { Invoice, ListContextValue } from "./interfaces/List";
import {invoiceData} from '../data'
const ListContext = createContext<ListContextValue>(ListContextValue);
export const ListContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [data,setData] = useState<Invoice[]>(invoiceData)
  const [select,setSelect] = useState('all')
  const [isOpenFillter,setIsOpenFillter] = useState(false)
  //be able to toggle
  const filtered = select === "all" ? data : data.filter(data => data.status.toLowerCase() === select.toLowerCase())
  const handleAddInvoice = (newInvoice: Invoice) => {
    setData((prevData) => [...prevData, newInvoice]);
  };
  const value: ListContextValue = {
    data,
    setData,
    setSelect,
    filtered,
    select,
    setIsOpenFillter,
    isOpenFillter,
    handleAddInvoice
  };


  useEffect(() => {
    const savedData = localStorage.getItem("invoiceData");
    if (savedData) {
      setData(JSON.parse(savedData));
    } else {
      setData(invoiceData);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("invoiceData", JSON.stringify(data));
  }, [data]);
  return <ListContext.Provider value={value}>{children}</ListContext.Provider>;
};

export default ListContext;