import React, { useState } from "react";
import{ useNavigate} from 'react-router-dom'
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const AddItem = () => {
    const[name, setName]=useState('')
    const[discount, setDicount]=useState("")
    const[price, setPrice]=useState(null)
    const[description, setDescriptions]=useState("")
    const[checkbox, setSponsored]=useState(false)
    console.log(checkbox)
    const nav=useNavigate()
    const toastMessage = () => {
      toast.success("Item Successfully Added!", {
        position: toast.POSITION.TOP_CENTER,
        className: "toast-message",
      });
    };
    function handleSubmit(event) {
        event.preventDefault()
        fetch('http://localhost:3000/api/items',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                  name: name,
                  discount: discount,
                  price: price,
                  description: description,
                  sponsored: checkbox
            })
        })

        .then(r=>{
          if(r.ok){
            r.json().then(()=>{
              setTimeout(() => {
                toastMessage();
                nav("/");
              }, 4000);
            })
          }
        })
   
    }
  return (
    <>
    <ToastContainer/>
    <div className=" m-auto h-screen lg:p-10 sm:p-1 bg-gradient-to-r from-purple-400 to-purple-800 ">
      <form onSubmit={handleSubmit} className="lg:w-4/5 sm:w-full m-auto">
        <div className="lg:grid grid-cols-3">
          <div className="">
            <label
              htmlFor="street-address"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              onChange={(e) => setName(e.target.value)}
              placeholder="product name"
              className="mt-2 block w-1/2 rounded-md border-0 p-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>

          <div className="">
            <label
              htmlFor="Price"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Price
            </label>
            <input
              type="number"
              name="price"
              id="price"
              onChange={(e)=> setPrice(e.target.value)}
              placeholder="Product Price"
              className="mt-2 block w-1/2 rounded-md border-0 p-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>

          <div className="">
            <label
              htmlFor="Discount"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Discount
            </label>
            <input
              type="number"
              name="dicount"
              id="discount"
              onChange={(e)=> setDicount(e.target.value)}
              placeholder="Discount"
              className="mt-2 block w-1/2 rounded-md border-0 p-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div className="lg:flex items-center justify-start">
          <div className="mr-20">
            <label
              htmlFor="description"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Description
            </label>
            <textarea
              type="text"
              name="description"
              id="description"
              onChange={(e)=> setDescriptions(e.target.value)}
              placeholder="A brief description of the product"
              className="mt-2 block w-full rounded-md border-0 p-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          <div className="flex h-6 items-center">
            <label className="block text-sm font-medium leading-6 text-gray-900 pr-2">
              Sponsored?
            </label>
            <input
              id="Sponsored"
              aria-describedby="Sponsored-item"
              name="sponsored"
              type="checkbox"
              onChange={(e)=>setSponsored(e.target.checked)}
              className="h-4 w-4 pl-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
            />
          </div>
        </div>
        <div className="flex justify-end mt-4 border-t p-4">
          <button
            type="submit"
            className="ml-3 rounded-md bg-gradient-to-r from-teal-500 to-cyan-500 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
    </>
  );
};

export default AddItem;
